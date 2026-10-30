// Generates the introduction audio ONCE (public/voice/intro-fr.wav and intro-en.wav).
// Usage:  node scripts/generate-voice.mjs
// Needs GEMINI_API_KEY in .env.local. Once the files exist, the site no longer calls any API.
import { mkdir, readFile, writeFile } from "node:fs/promises";

const MODEL = process.env.GEMINI_TTS_MODEL ?? "gemini-2.5-flash-preview-tts";
const VOICE = "Kore";

async function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  for (const file of [".env.local", ".env"]) {
    try {
      const match = (await readFile(file, "utf8")).match(/^\s*GEMINI_API_KEY\s*=\s*(.+?)\s*$/m);
      if (match) return match[1].replace(/^["']|["']$/g, "");
    } catch {
      /* file missing */
    }
  }
  throw new Error("GEMINI_API_KEY not found (.env.local).");
}

async function loadTexts() {
  const source = await readFile("src/data/portfolio.ts", "utf8");
  const block = source.match(/export const voiceIntro = \{([\s\S]*?)\}\s*as Record/);
  if (!block) throw new Error("voiceIntro not found in src/data/portfolio.ts");
  const texts = {};
  for (const lang of ["fr", "en"]) {
    const m = block[1].match(new RegExp(`${lang}:\\s*"([^"]*)"`));
    if (!m) throw new Error(`voiceIntro.${lang} not found`);
    texts[lang] = m[1];
  }
  return texts;
}

// Gemini returns raw 16-bit mono PCM at 24 kHz: wrap it in a WAV header so browsers can play it.
function toWav(pcm) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(24000, 24);
  header.writeUInt32LE(24000 * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function synthesize(key, text) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } },
        },
      }),
    },
  );
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 400);
    throw new Error(`Gemini ${response.status}${response.status === 429 ? " (daily quota reached, retry after the reset)" : ""}: ${detail}`);
  }
  const json = await response.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const chunks = parts.filter((p) => p?.inlineData?.data).map((p) => Buffer.from(p.inlineData.data, "base64"));
  if (!chunks.length) throw new Error("No audio returned by Gemini.");
  return toWav(Buffer.concat(chunks));
}

const key = await loadKey();
const texts = await loadTexts();
await mkdir("public/voice", { recursive: true });
for (const [lang, text] of Object.entries(texts)) {
  process.stdout.write(`Generating ${lang}... `);
  const wav = await synthesize(key, text);
  await writeFile(`public/voice/intro-${lang}.wav`, wav);
  console.log(`ok (${(wav.length / 1024 / 1024).toFixed(1)} MB)`);
}
console.log("Done. Reload the site: the robot now plays these files.");
