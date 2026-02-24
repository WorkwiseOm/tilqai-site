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

  // 0 = hidden, 1 = "What if...", 2 = "...runs by itself", 3 = dot, 4 = sub, 5 = trust, 6 = CTA/Keywords
  const [stage, setStage] = useState(0);

  // Fallback for prefers-reduced-motion
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setStage(6);
      completeIntro();
      return;
    }

    // Sequence timings
    // 1. "What if..." starts instantly string load (stage 1)
    setStage(1);

    // 2. "...runs by itself" starts 0.3s after step 1
    const t2 = setTimeout(() => setStage(2), 300);

    // 3. Dot bounce starts 0.15s after word 2 finishes (word 2 takes 0.6s) = 300 + 600 + 150 = 1050ms
    const t3 = setTimeout(() => setStage(3), 1050);

    // 4. Subheadline fades in 0.5s after step 2 finishes (300 + 600 + 500 = 1400)
    const t4 = setTimeout(() => setStage(4), 1400);

    // 5. Pill badge fades + slides 0.3s after subheadline finishes (1400 + 500 + 300 = 2200)
    const t5 = setTimeout(() => setStage(5), 2200);

    // 6. CTAs and Right-side Keywords start 0.2s after pill finishes (2200 + 400 + 200 = 2800)
    const t6 = setTimeout(() => {
      setStage(6);
      completeIntro(); // Tells Navbar it can reveal
    }, 2800);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [completeIntro]);

  return (
    <section className="py-20 lg:py-24 pb-6 relative hero-section flex items-center min-h-[90vh] bg-[#0a1628]">

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 lg:justify-between w-full relative">
          {/* Text column */}
          <div className={`lg:w-[55%] ${isRtl ? "text-right" : ""}`}>
            {/* Cinematic Headline Sequence */}
            <h1
              className={`text-[36px] md:text-[48px] lg:text-[64px] tracking-tight font-bold text-white leading-[1.1] max-w-4xl flex flex-wrap ${isRtl ? "justify-end text-right flex-row-reverse" : "justify-start text-left items-baseline"}`}
              style={{ minHeight: "1.2em", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              <span
                className={`inline-block whitespace-pre transition-all duration-600 ease-out will-change-transform ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}
              >
                {isRtl ? "ماذا لو... " : "What if... "}
              </span>
              <span
                className={`inline-block whitespace-pre transition-all duration-600 ease-out will-change-transform ${stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"}`}
              >
                {isRtl ? "العمل يُنجز تلقائيًا" : "work runs by itself"}
              </span>
              <span
                className={`inline-block text-primary transition-all duration-500 will-change-transform ${stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              >
                .
              </span>
            </h1>

            {/* Subheadline — stage 4 */}
            <p
              className={`mt-6 text-[18px] md:text-[22px] max-w-2xl leading-[1.5] transition-opacity duration-500 ease-out will-change-opacity ${stage >= 4 ? "opacity-100" : "opacity-0"
                }`}
              style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
            >
              {t("hero.subheadline")}
            </p>

            {/* Trust line / Pill badge — stage 5 */}
            <div
              className={`mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl transition-all duration-400 ease-out will-change-transform ${stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
                }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_currentColor]" />
              <p className="text-[14px] font-semibold tracking-wide text-white">
                {t("hero.trustLine")}
              </p>
            </div>

            {/* CTAs — stage 6 */}
            <div
              className={`mt-10 flex gap-4 ${isRtl ? "justify-end" : ""} transition-opacity duration-400 ease-out will-change-opacity ${stage >= 6 ? "opacity-100" : "opacity-0"
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
            <HeroKeywords startAnimation={stage >= 6} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
