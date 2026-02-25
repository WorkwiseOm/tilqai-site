import { useState, useEffect } from "react";
import { openCalendly } from "@/lib/calendly";
import { openROIModal } from "@/components/home/ROISimulator";
import { HeroKeywords } from "@/components/home/HeroKeywords";
import { useLanguage } from "@/i18n/LanguageContext";
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

  // Stages:
  // 0: Init
  // 1: Background slightly lightens, noise activates (0ms)
  // 2: "What if..." (300ms)
  // 3: "work runs by itself" word 1 (800ms)
  // 4: "work runs by itself" word 2 (950ms)
  // 5: "work runs by itself" word 3 (1100ms)
  // 6: "work runs by itself" word 4 (1250ms)
  // 7: Subheadline (1400ms)
  // 8: Trust line (1900ms)
  // 9: CTA 1 (2300ms)
  // 10: CTA 2 (2430ms)
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setStage(10);
      completeIntro();
      return;
    }

    setStage(1); // 0.0s

    const t2 = setTimeout(() => setStage(2), 300); // 0.3s
    const t3 = setTimeout(() => setStage(3), 800); // 0.8s
    const t4 = setTimeout(() => setStage(4), 950); // 0.95s
    const t5 = setTimeout(() => setStage(5), 1100); // 1.1s
    const t6 = setTimeout(() => setStage(6), 1250); // 1.25s
    const t7 = setTimeout(() => setStage(7), 1400); // 1.4s
    const t8 = setTimeout(() => setStage(8), 1900); // 1.9s
    const t9 = setTimeout(() => setStage(9), 2300); // 2.3s
    const t10 = setTimeout(() => {
      setStage(10); // 2.43s
      completeIntro();
    }, 2430);

    return () => {
      clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7);
      clearTimeout(t8); clearTimeout(t9); clearTimeout(t10);
    };
  }, [completeIntro]);

  return (
    <section className={`py-20 lg:py-24 pb-6 relative hero-section flex items-center min-h-[90vh] transition-colors duration-1000 ease-in-out ${stage >= 1 ? "bg-[#0a1628]" : "bg-[#050a12]"} overflow-hidden`}>

      {/* 1. Breathing Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50 hero-breathing-gradient"
      />

      {/* 2. Noise Texture */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none noise-bg-element transition-opacity duration-1000 ease-in-out ${stage >= 1 ? "opacity-[0.035]" : "opacity-0"}`}
      />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 lg:justify-between w-full relative">
          {/* Text column */}
          <div className={`lg:w-[55%] ${isRtl ? "text-right" : ""}`}>
            {/* Headline */}
            <h1
              className={`text-[36px] md:text-[48px] lg:text-[64px] tracking-tight font-bold text-white leading-[1.1] max-w-4xl flex flex-wrap ${isRtl ? "justify-end text-right flex-row-reverse" : "justify-start text-left items-baseline"}`}
              style={{ minHeight: "1.2em", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {/* "What if..." */}
              <span
                className={`inline-block whitespace-pre transition-all duration-[800ms] ease-out will-change-transform flex-shrink-0 ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[6px]"}`}
              >
                {isRtl ? "ماذا لو كانت " : "What if... "}
              </span>

              {/* ...work runs by itself — cascaded */}
              <span className="inline-flex gap-[12px] whitespace-pre">
                {isRtl ? (
                  <>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 4 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>أعمالك</span>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 5 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>تُنجز</span>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] flex items-end ${stage >= 6 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>
                      تلقائياً
                      {/* 3. Pulsing Blue Dot - Injected right after last word in RTL */}
                      <span className={`inline-block translate-y-[4px] mr-1 text-primary heartbeat-dot transition-opacity duration-500 delay-500 ${stage >= 6 ? "opacity-100" : "opacity-0"}`}>.</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 3 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>work</span>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 4 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>runs</span>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 5 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>by</span>
                    <span className={`transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] flex items-end ${stage >= 6 ? "opacity-100 rotate-0" : "opacity-0 -rotate-[1deg]"}`}>
                      itself
                      {/* 3. Pulsing Blue Dot - Injected right after last word in LTR */}
                      <span className={`inline-block text-primary heartbeat-dot transition-opacity duration-500 delay-500 ${stage >= 6 ? "opacity-100" : "opacity-0"}`}>.</span>
                    </span>
                  </>
                )}
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`mt-6 text-[18px] md:text-[22px] max-w-2xl leading-[1.5] transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform ${stage >= 7 ? "opacity-75 translate-y-0 blur-none" : "opacity-0 translate-y-[5px] blur-[2px]"}`}
              style={{ color: "rgba(255,255,255,1)", textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
            >
              {t("hero.subheadline")}
            </p>

            {/* Trust line / Pill badge */}
            <div
              className={`mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${stage >= 8 ? "opacity-100 scale-100 shadow-[0_0_40px_rgba(255,255,255,0.1)]" : "opacity-0 scale-95 shadow-none"}`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_currentColor]" />
              <p className="text-[14px] font-semibold tracking-wide text-white">
                {t("hero.trustLine")}
              </p>
            </div>

            {/* CTAs */}
            <div className={`mt-10 flex gap-4 ${isRtl ? "justify-end" : ""}`}>
              <button
                onClick={openCalendly}
                className={`btn-primary-hover bg-primary text-primary-foreground text-[16px] font-semibold px-8 py-3.5 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 9 ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`}
              >
                {t("hero.primaryCta")}
              </button>
              <button
                onClick={() => openROIModal()}
                className={`btn-outline-hover border border-white/30 bg-transparent text-white text-[16px] font-semibold px-8 py-3.5 rounded-lg hover:border-white hover:text-white hover:bg-transparent transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${stage >= 10 ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`}
              >
                {t("hero.secondaryCta")}
              </button>
            </div>
          </div>

          {/* Right column: Animated Keywords */}
          <div className="lg:w-[45%] w-full flex items-center justify-center min-h-[140px] lg:min-h-0 relative z-10">
            <HeroKeywords startAnimation={stage >= 1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
