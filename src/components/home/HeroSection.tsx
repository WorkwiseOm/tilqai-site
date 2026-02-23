import { useState, useEffect } from "react";
import { openCalendly } from "@/lib/calendly";
import { openROIModal } from "@/components/home/ROISimulator";
import { HeroKeywords } from "@/components/home/HeroKeywords";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useHeroIntro } from "@/hooks/use-hero-intro";

/**
 * Cinematic hero load sequence:
 *  0 — dark screen (everything opacity-0)
 *  1 — typewriter types headline
 *  2 — subheadline fades in  (300ms after typing)
 *  3 — trust line fades in   (400ms after subheadline)
 *  4 — nav + CTAs + image    (500ms after trust line) — all at once
 */
const HeroSection = () => {
  const { t, isRtl } = useLanguage();
  const { completeIntro } = useHeroIntro();
  const { displayedText, showCursor, done: typingDone } = useTypewriter(
    t("hero.headline"),
    90,
    300,
  );

  // 0 = hidden, 1 = sub visible, 2 = trust visible, 3 = everything visible
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!typingDone) return;
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 500 + 700);
    const t3 = setTimeout(() => {
      setStage(3);
      completeIntro(); // tells Navbar to reveal
    }, 300 + 400 + 500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [typingDone, completeIntro]);

  const fade = (min: number, duration = 600) =>
    `transition-all ease-out ${stage >= min ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }` + ` duration-[${duration}ms]`;

  return (
    <section className="py-20 lg:py-24 pb-6 relative hero-section flex items-center min-h-[90vh] bg-[#0a1628]">

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 lg:justify-between w-full relative">
          {/* Text column */}
          <div className={`lg:w-[55%] ${isRtl ? "text-right" : ""}`}>
            {/* Headline — always structurally present for height */}
            <h1
              className="text-[36px] md:text-[48px] lg:text-[64px] tracking-tight font-bold text-white leading-[1.1] max-w-4xl"
              style={{ minHeight: "1.2em", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              <span className="whitespace-pre-wrap">{displayedText}</span>
              {showCursor && (
                <span className="animate-pulse text-primary font-light">|</span>
              )}
              {!showCursor && displayedText.length > 0 && (
                <span className="text-primary">.</span>
              )}
            </h1>

            {/* Subheadline — stage 1 */}
            <p
              className={`mt-6 text-[18px] md:text-[22px] max-w-2xl leading-[1.5] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
            >
              {t("hero.subheadline")}
            </p>

            {/* Trust line — stage 2 */}
            <div
              className={`mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_currentColor]" />
              <p className="text-[14px] font-semibold tracking-wide text-white">
                {t("hero.trustLine")}
              </p>
            </div>

            {/* CTAs — stage 3 */}
            <div
              className={`mt-10 flex gap-4 ${isRtl ? "justify-end" : ""} transition-all duration-700 ease-out ${stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
            >
              <button
                onClick={openCalendly}
                className="btn-primary-hover bg-primary text-primary-foreground text-[16px] font-semibold px-8 py-3.5 rounded-lg shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              >
                {t("hero.primaryCta")}
              </button>
              <button
                onClick={() => openROIModal()}
                className="btn-outline-hover border border-white/30 bg-transparent text-white text-[16px] font-semibold px-8 py-3.5 rounded-lg hover:border-white hover:text-white hover:bg-transparent transition-all duration-300"
              >
                {t("hero.secondaryCta")}
              </button>
            </div>
          </div>

          {/* Right column: Animated Keywords */}
          <div className="lg:w-[45%] w-full flex items-center justify-center min-h-[140px] lg:min-h-0 relative z-10">
            <HeroKeywords startAnimation={typingDone} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
