import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { Lang } from "@/data/portfolio";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  pick: (field: Record<Lang, string>) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  setLang: () => {},
  pick: (field) => field.fr,
});

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const pick = (field: Record<Lang, string>) => field[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, pick }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
