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

  // Stages: 0: Init, 1: Parent Breathe, 2: "What if...", 3: "Runs by itself", 4: Blue dot, 5: Subhead, 6: Pill, 7: CTA, 8: Keywords
  const [stage, setStage] = useState(0);

  // Fallback for prefers-reduced-motion
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setStage(8);
      completeIntro();
      return;
    }

    // Sequence timings 12-second philosophy
    // 1. Parent Hero wrapper begins fade in immediately.
    setStage(1);

    // 2. "What if..." starts 0.8s after page load
    const t2 = setTimeout(() => setStage(2), 800);

    // 3. "...runs by itself" starts 1.6s after step 2 (800 + 1600 = 2400)
    const t3 = setTimeout(() => setStage(3), 2400);

    // 4. Blue dot starts 0.8s after step 3 begins (2400 + 800 = 3200)
    const t4 = setTimeout(() => setStage(4), 3200);

    // [PAUSE] 1.2 seconds of nothing after step 3 & 4 finish.
    // Step 3 animation = 1.8s duration. Finishes at 2400 + 1800 = 4200ms
    // Step 4 animation = 1.2s duration. Finishes at 3200 + 1200 = 4400ms
    // 1.2s pause starting from the final frame of headline elements (from 4400ms) = 5600ms

    // 5. Subheadline breathes in at 5600ms
    const t5 = setTimeout(() => setStage(5), 5600);

    // [PAUSE] 0.8 seconds after subheadline finishes. 
    // Subheadline duration = 2.0s. Finishes at 5600 + 2000 = 7600ms
    // 0.8s pause from 7600ms = 8400ms

    // 6. Pill badge appears at 8400ms
    const t6 = setTimeout(() => setStage(6), 8400);

    // 7. CTAs appear 0.6s after pill begins (8400 + 600 = 9000ms)
    const t7 = setTimeout(() => setStage(7), 9000);

    // 8. Right-side keywords begin exclusively after CTAs are fully visually established
    // CTA duration = 1.2s. Finishes at 9000 + 1200 = 10200ms
    const t8 = setTimeout(() => {
      setStage(8);
      completeIntro(); // Tells Navbar it can reveal
    }, 10200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, [completeIntro]);

  return (
    <section className={`py-20 lg:py-24 pb-6 relative hero-section flex items-center min-h-[90vh] transition-all duration-[1200ms] ease-in will-change-[background,opacity] ${stage >= 1 ? "bg-[#0a1628] opacity-100" : "bg-[#050a12] opacity-0"}`}>

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
                className={`inline-block whitespace-pre transition-opacity duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity ${stage >= 2 ? "opacity-100" : "opacity-0"}`}
              >
                {isRtl ? "ماذا لو... " : "What if... "}
              </span>
              <span
                className={`inline-block whitespace-pre transition-opacity duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity ${stage >= 3 ? "opacity-100" : "opacity-0"}`}
              >
                {isRtl ? "العمل يُنجز تلقائيًا" : "work runs by itself"}
              </span>
              <span
                className={`inline-block text-primary transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform will-change-opacity ${stage >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              >
                .
              </span>
            </h1>

            {/* Subheadline — stage 5 */}
            <p
              className={`mt-6 text-[18px] md:text-[22px] max-w-2xl leading-[1.5] transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity ${stage >= 5 ? "opacity-75" : "opacity-0"
                }`}
              style={{ color: "rgba(255,255,255,1)", textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
            >
              {t("hero.subheadline")}
            </p>

            {/* Trust line / Pill badge — stage 6 */}
            <div
              className={`mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl transition-opacity duration-[1000ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity ${stage >= 6 ? "opacity-100" : "opacity-0"
                }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_currentColor]" />
              <p className="text-[14px] font-semibold tracking-wide text-white">
                {t("hero.trustLine")}
              </p>
            </div>

            {/* CTAs — stage 7 */}
            <div
              className={`mt-10 flex gap-4 ${isRtl ? "justify-end" : ""} transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity ${stage >= 7 ? "opacity-100" : "opacity-0"
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
            <HeroKeywords startAnimation={stage >= 8} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
