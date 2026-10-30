import { useEffect, useRef, useState } from "react";
import { Volume2, Loader2 } from "lucide-react";

import assistantAvatar from "@/assets/assistant-avatar.png";
import { ui, voiceIntro } from "@/data/portfolio";
import { useLanguage } from "@/lib/language";

type VoiceState = "idle" | "loading" | "speaking" | "error";

// The introduction starts with a style instruction for the AI voice ("D'un ton chaleureux : ..."),
// which must not be read aloud by the browser voice.
function spokenText(text: string) {
  return text.replace(/^[^:]{0,40}:\s*/, "");
}

export function VoiceIntro() {
  const { lang, pick } = useLanguage();
  const [state, setState] = useState<VoiceState>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Each click gets a new id: events coming from a playback that was stopped are ignored.
  const runRef = useRef(0);

  const halt = () => {
    runRef.current += 1;
    const audio = audioRef.current;
    audioRef.current = null;
    if (audio) {
      audio.onplaying = null;
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
    }
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
  };

  useEffect(() => halt, []);

  const stop = () => {
    halt();
    setState("idle");
  };

  const fail = (run: number) => {
    if (run !== runRef.current) return;
    setState("error");
    window.setTimeout(() => setState((s) => (s === "error" ? "idle" : s)), 4000);
  };

  // Fallback: the voice built into the browser (works offline, no quota, no API key).
  const speakWithBrowser = (run: number) => {
    const synth = window.speechSynthesis;
    if (!synth) return fail(run);
    synth.cancel();
    const code = lang === "fr" ? "fr" : "en";
    const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith(code));
    const sentences = spokenText(voiceIntro[lang]).match(/[^.!?]+[.!?]+/g) ?? [voiceIntro[lang]];
    sentences.forEach((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence.trim());
      utterance.lang = lang === "fr" ? "fr-FR" : "en-US";
      if (voice) utterance.voice = voice;
      if (index === 0) {
        utterance.onstart = () => {
          if (run === runRef.current) setState("speaking");
        };
      }
      if (index === sentences.length - 1) {
        utterance.onend = () => {
          if (run === runRef.current) setState("idle");
        };
      }
      utterance.onerror = () => {
        if (run === runRef.current) fail(run);
      };
      synth.speak(utterance);
    });
  };

  // Click = start, click again = stop, and so on.
  // 1) the pre-generated audio file (public/voice/intro-fr.wav | intro-en.wav) if it exists,
  // 2) otherwise the browser voice.
  const toggle = () => {
    if (state === "loading" || state === "speaking") {
      stop();
      return;
    }
    halt();
    const run = runRef.current;
    setState("loading");
    const audio = new Audio(`/voice/intro-${lang}.wav`);
    audioRef.current = audio;
    audio.onplaying = () => {
      if (run === runRef.current) setState("speaking");
    };
    audio.onended = () => {
      if (run !== runRef.current) return;
      audioRef.current = null;
      setState("idle");
    };
    // onerror and play() can both fail for the same file: switch to the browser voice only once.
    const fallback = () => {
      if (run !== runRef.current || audioRef.current !== audio) return;
      audioRef.current = null;
      speakWithBrowser(run);
    };
    audio.onerror = fallback;
    audio.play().catch(fallback);
  };

  const label =
    state === "loading"
      ? pick(ui.voice.preparing)
      : state === "speaking"
        ? pick(ui.voice.playing)
        : state === "error"
          ? pick(ui.voice.error)
          : pick(ui.voice.open);

  return (
    <button
      type="button"
      data-voice-intro
      onClick={toggle}
      aria-pressed={state === "speaking"}
      className={`group inline-flex shrink-0 items-center gap-2.5 rounded-full border-2 py-1.5 pr-5 pl-1.5 shadow-sun transition-all hover:scale-[1.04] active:scale-95 ${
        state === "speaking"
          ? "border-primary bg-sun-strip text-primary-foreground"
          : "border-primary/25 bg-card text-foreground"
      }`}
    >
      <span className="relative">
        {state === "speaking" && (
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
        )}
        <img
          src={assistantAvatar}
          alt=""
          width={40}
          height={40}
          className={`relative size-10 rounded-full bg-secondary object-cover ${state === "speaking" ? "animate-bot-bounce" : ""}`}
        />
      </span>
      <span className="text-left">
        <span className="block text-xs font-bold leading-tight sm:text-sm">{label}</span>
        {state === "speaking" ? (
          <span aria-hidden className="mt-0.5 flex items-end gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                style={{ animationDelay: `${i * 0.15}s` }}
                className="eq-bar h-2 w-1 rounded-full bg-primary-foreground"
              />
            ))}
          </span>
        ) : (
          <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
            {state === "loading" ? (
              <Loader2 aria-hidden className="size-3 animate-spin text-primary" />
            ) : (
              <Volume2 aria-hidden className="size-3 text-primary" />
            )}
            {pick(ui.voice.hint)}
          </span>
        )}
      </span>
    </button>
  );
}
