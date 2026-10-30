import { createFileRoute } from "@tanstack/react-router";

import { loadLocalEnv } from "@/lib/server/env.server";
import { requestSpeech, type SpeechConfig } from "@/lib/server/speech-request";
import { voiceIntro } from "@/data/portfolio";

const SPEECH_CONFIG: SpeechConfig = {
  baseURL: "https://ai.gateway.lovable.dev",
  apiKey: "",
  model: "google/gemini-3.1-flash-tts-preview",
  format: "gemini",
  voice: "Kore",
};

const SSE_HEADERS = { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" };

// The introduction text is fixed, so the generated audio is cached (memory + .cache/voice on disk):
// the first visit generates it, every following visit starts instantly.
const memoryCache = new Map<string, Uint8Array>();

async function cacheFile(key: string) {
  const [{ createHash }, path, os] = await Promise.all([
    import("node:crypto"),
    import("node:path"),
    import("node:os"),
  ]);
  const name = createHash("sha1").update(key).digest("hex").slice(0, 16);
  // On Vercel the project folder is read-only: only /tmp is writable.
  const base = process.env["VERCEL"] ? os.tmpdir() : path.join(process.cwd(), ".cache");
  return path.join(base, "voice", `${name}.sse`);
}

async function readCache(key: string): Promise<Uint8Array | null> {
  const hit = memoryCache.get(key);
  if (hit) return hit;
  try {
    const fs = await import("node:fs/promises");
    const bytes = new Uint8Array(await fs.readFile(await cacheFile(key)));
    memoryCache.set(key, bytes);
    return bytes;
  } catch {
    return null;
  }
}

async function writeCache(key: string, bytes: Uint8Array) {
  memoryCache.set(key, bytes);
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = await cacheFile(key);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, bytes);
  } catch {
    /* read-only filesystem: memory cache only */
  }
}

// Local dev: call Google's Gemini TTS directly and re-emit the SSE events the client expects.
async function geminiSpeech(apiKey: string, text: string, signal: AbortSignal) {
  const model = process.env["GEMINI_TTS_MODEL"] ?? "gemini-2.5-flash-preview-tts";
  const cacheKey = `${model}|${SPEECH_CONFIG.voice}|${text}`;

  const cached = await readCache(cacheKey);
  if (cached) return new Response(cached as BodyInit, { headers: SSE_HEADERS });

  const upstream = await fetch(
    `${process.env["GEMINI_BASE_URL"] ?? "https://generativelanguage.googleapis.com"}/v1beta/models/${model}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: SPEECH_CONFIG.voice } } },
        },
      }),
      signal,
    },
  );
  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text();
    console.error("[Nour voice] Gemini error", upstream.status, detail.slice(0, 500));
    return Response.json({ message: detail }, { status: upstream.status });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const collected: Uint8Array[] = [];
  let buffer = "";
  const send = (c: TransformStreamDefaultController<Uint8Array>, payload: unknown) => {
    const bytes = encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
    collected.push(bytes);
    c.enqueue(bytes);
  };
  const handleLine = (line: string, c: TransformStreamDefaultController<Uint8Array>) => {
    if (!line.startsWith("data:")) return;
    const json = JSON.parse(line.slice(5).trim());
    for (const part of json?.candidates?.[0]?.content?.parts ?? []) {
      if (part?.inlineData?.data) send(c, { type: "speech.audio.delta", audio: part.inlineData.data });
    }
  };

  const body = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, c) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";
        for (const line of lines) handleLine(line, c);
      },
      async flush(c) {
        if (buffer) handleLine(buffer, c);
        send(c, { type: "speech.audio.done" });
        const total = collected.reduce((n, b) => n + b.length, 0);
        const all = new Uint8Array(total);
        let offset = 0;
        for (const b of collected) {
          all.set(b, offset);
          offset += b.length;
        }
        await writeCache(cacheKey, all);
      },
    }),
  );
  return new Response(body, { headers: SSE_HEADERS });
}

export const Route = createFileRoute("/api/public/speech")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        loadLocalEnv();
        let body: { text?: unknown };
        try {
          body = await request.json();
        } catch {
          return Response.json({ message: "Invalid request body" }, { status: 400 });
        }

        // Only the fixed introduction can be spoken: nobody can use this route as a free TTS.
        const text = typeof body?.text === "string" ? body.text.trim() : "";
        if (!Object.values(voiceIntro).includes(text)) {
          return Response.json({ message: "Unsupported text" }, { status: 400 });
        }

        const lovableKey = process.env["LOVABLE_API_KEY"];
        const geminiKey = process.env["GEMINI_API_KEY"];
        if (!lovableKey && !geminiKey) {
          return Response.json({ message: "Missing GEMINI_API_KEY configuration" }, { status: 401 });
        }

        try {
          if (!lovableKey) return await geminiSpeech(geminiKey!, text, request.signal);

          const config: SpeechConfig = { ...SPEECH_CONFIG, apiKey: lovableKey };
          const upstream = await requestSpeech(config, text, false, request.signal);
          return new Response(upstream.body, {
            status: upstream.status,
            headers: {
              "Content-Type": upstream.headers.get("content-type") ?? "text/event-stream",
              "Cache-Control": "no-cache",
            },
          });
        } catch (error) {
          if (request.signal.aborted) {
            return new Response(null, { status: 499 });
          }
          console.error("Speech synthesis failed", error);
          return Response.json({ message: "Speech synthesis is temporarily unavailable." }, { status: 500 });
        }
      },
    },
  },
});
