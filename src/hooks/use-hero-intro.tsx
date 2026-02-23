import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface HeroIntroContextType {
  /** true once the full cinematic intro is complete */
  introComplete: boolean;
  /** called by HeroSection when the final reveal fires */
  completeIntro: () => void;
}

const HeroIntroContext = createContext<HeroIntroContextType | null>(null);

export const HeroIntroProvider = ({ children }: { children: ReactNode }) => {
  const [introComplete, setIntroComplete] = useState(false);
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  return (
    <HeroIntroContext.Provider value={{ introComplete, completeIntro }}>
      {children}
    </HeroIntroContext.Provider>
  );
};

/**
 * Returns intro state. On pages without the provider, returns introComplete=true
 * so the navbar shows normally.
 */
export const useHeroIntro = () => {
  const ctx = useContext(HeroIntroContext);
  if (!ctx) return { introComplete: true, completeIntro: () => {} };
  return ctx;
};
