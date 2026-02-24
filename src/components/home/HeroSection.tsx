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

  useEffect(() => {
    completeIntro(); // Tells Navbar it can reveal immediately
  }, [completeIntro]);

  return (
    <section className="py-20 lg:py-24 pb-6 relative hero-section flex items-center min-h-[90vh] bg-[#0a1628] overflow-hidden">

      {/* 1. Breathing Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50 hero-breathing-gradient"
      />

      {/* 2. Noise Texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none noise-bg-element opacity-[0.035]"
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
              <span className="inline-block whitespace-pre">
                {isRtl ? "ماذا لو... " : "What if... "}
              </span>
              <span className="inline-block whitespace-pre">
                {isRtl ? "العمل يُنجز تلقائيًا" : "work runs by itself"}
              </span>
              {/* 3. Pulsing Blue Dot */}
              <span className="inline-block text-primary heartbeat-dot">
                .
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="mt-6 text-[18px] md:text-[22px] max-w-2xl leading-[1.5] opacity-75"
              style={{ color: "rgba(255,255,255,1)", textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
            >
              {t("hero.subheadline")}
            </p>

            {/* Trust line / Pill badge */}
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_currentColor]" />
              <p className="text-[14px] font-semibold tracking-wide text-white">
                {t("hero.trustLine")}
              </p>
            </div>

            {/* CTAs */}
            <div className={`mt-10 flex gap-4 ${isRtl ? "justify-end" : ""}`}>
              <button
                onClick={openCalendly}
                className="btn-primary-hover bg-primary text-primary-foreground text-[16px] font-semibold px-8 py-3.5 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                style={{ transition: 'all 0.4s ease-in-out' }}
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
            <HeroKeywords startAnimation={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
