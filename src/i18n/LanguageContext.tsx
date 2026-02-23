import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import en from "./en";
import ar from "./ar";

// Stable singleton context — do not re-create

type Locale = "en" | "ar";
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const dictionaries: Record<Locale, Translations> = { en, ar };

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem("tilqai-lang");
      if (saved === "ar" || saved === "en") return saved;
    } catch {}
    return "en";
  });

  const isRtl = locale === "ar";

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("tilqai-lang", newLocale);
    } catch {}
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", isRtl ? "rtl" : "ltr");
    html.setAttribute("lang", locale);
  }, [locale, isRtl]);

  const t = useCallback(
    (key: string): string => {
      return (dictionaries[locale] as Record<string, string>)[key] ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, isRtl, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
