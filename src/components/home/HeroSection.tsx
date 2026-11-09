import { useState, useEffect, useRef } from "react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHeroIntro } from "@/hooks/use-hero-intro";
import { useTypewriter } from "@/hooks/use-typewriter";
import HrFlowScene, { type HrFlowHandle } from "@/components/home/hr-flow/HrFlowScene";

/**
 * Cinematic hero load sequence:
 *  0 — dark screen (everything opacity-0)
 *  1 — typewriter types headline
 *  2 — subheadline fades in  (300ms after typing)
 *  3 — trust line fades in   (400ms after subheadline)
 *  4 — nav + CTAs + image    (500ms after trust line) — all at once
 *  5 — HR → results animation starts (300ms after CTAs visible)
 */
const HeroSection = () => {
  const { t, isRtl, locale } = useLanguage();
  const { completeIntro } = useHeroIntro();

  const [bgStage, setBgStage] = useState(0);

  // Exact Requested Typewriter Texts
  const headlineText = isRtl
    ? "ماذا لو... كانت أعمالك تُنجز تلقائيًا."
    : "What if... your work runs by itself.";

  // Typewriter hook: 75ms speed, 400ms delay to start
  const { displayedText, showCursor, done: headlineDone } = useTypewriter(headlineText, 75, 400);

  const [subheadlineVisible, setSubheadlineVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  // The animation starts after the full hero text sequence completes
  const [sceneReady, setSceneReady] = useState(false);
  const sceneRef = useRef<HrFlowHandle>(null);

  useEffect(() => {
    setBgStage(1);
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setSubheadlineVisible(true);
      setBadgeVisible(true);
      setCtaVisible(true);
      completeIntro();
      const t0 = setTimeout(() => setSceneReady(true), 100);
      return () => clearTimeout(t0);
    }

    if (headlineDone) {
      const t1 = setTimeout(() => setSubheadlineVisible(true), 400);
      const t2 = setTimeout(() => setBadgeVisible(true), 400 + 300);
      const t3 = setTimeout(() => {
        setCtaVisible(true);
        completeIntro();
      }, 400 + 300 + 300);
      // Animation starts 300ms after CTAs appear — hero text is complete
      const t4 = setTimeout(() => setSceneReady(true), 400 + 300 + 300 + 300);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [headlineDone, completeIntro]);

  return (
    <section className={`py-20 lg:py-24 pb-6 relative hero-section flex flex-col justify-center min-[1360px]:flex-row min-[1360px]:items-center min-h-[100dvh] transition-colors duration-1000 ease-in-out ${bgStage >= 1 ? "bg-[#0a1628]" : "bg-[#050a12]"} overflow-hidden`}>

      {/* 1. Breathing Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50 hero-breathing-gradient"
      />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 relative z-10 w-full pointer-events-none lg:pl-[80px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full relative">
          {/* Text column - Strictly 520px width & no overlap */}
          <div className={`hero-content hero-text w-full lg:max-w-[520px] ${isRtl ? "lg:text-right lg:ml-auto lg:pl-0 lg:pr-[80px]" : "lg:text-left lg:mr-auto"} pointer-events-auto flex flex-col items-start`}>
            {/* Headline */}
            <h1
              className={`text-[32px] md:text-[42px] lg:text-[56px] tracking-tight font-bold text-white leading-[1.1] flex flex-wrap ${isRtl ? "justify-end lg:flex-row-reverse" : "justify-start text-left items-baseline"}`}
              style={{ minHeight: "2.4em", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <span className="inline-block relative">
                {displayedText.endsWith('.')
                  ? <>{displayedText.slice(0, -1)}<span style={{ color: '#00b4d8' }}>.</span></>
                  : displayedText}
                <span className={`inline-block w-[3px] h-[0.9em] bg-[#00b4d8] align-middle mx-1 transition-opacity ${showCursor ? "opacity-100 animate-pulse" : "opacity-0"}`} />
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`mt-4 md:mt-6 text-[18px] md:text-[22px] max-w-2xl leading-[1.5] transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform ${subheadlineVisible ? "opacity-75 translate-y-0 blur-none" : "opacity-0 translate-y-[5px] blur-[2px]"}`}
              style={{ color: "rgba(255,255,255,1)", textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
            >
              {isRtl ? "نحدد ما يبطئ أداءك، ونصلحه، ونحوّله إلى تشغيل تلقائي" : "We map, fix, and automate the work that slows you down."}
            </p>

            {/* Trust line / Pill badge */}
            <div
              className={`mt-6 md:mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${badgeVisible ? "opacity-100 scale-100 shadow-[0_0_40px_rgba(255,255,255,0.1)]" : "opacity-0 scale-95 shadow-none"}`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_currentColor]" />
              <p className="text-[14px] font-semibold tracking-wide text-white">
                {isRtl ? "نظامك. بياناتك. حوكمتك." : "Your system. Your data. Your control."}
              </p>
            </div>

            {/* CTAs */}
            <div className={`mt-8 md:mt-10 flex w-full lg:w-auto gap-4`}>
              <button
                onClick={openCalendly}
                onMouseEnter={() => sceneRef.current?.setTurbo(true)}
                onMouseLeave={() => sceneRef.current?.setTurbo(false)}
                onFocus={() => sceneRef.current?.setTurbo(true)}
                onBlur={() => sceneRef.current?.setTurbo(false)}
                className={`btn-primary-hover min-w-[44px] min-h-[44px] w-full sm:w-auto bg-[#00b4d8] text-white hover:bg-[#009ac2] text-[16px] font-semibold px-8 py-4 md:py-3.5 rounded-lg shadow-[0_0_20px_rgba(0,180,216,0.3)] transition-all duration-[500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] flex items-center justify-center ${ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`}
              >
                {t("hero.primaryCta")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HR activities → Tilqai → business results.
             Below 1360px it sits under the text; from 1360px it fills the space beside the text column. */}
      <div className="relative z-[5] w-full mt-10 min-[1360px]:mt-0 min-[1360px]:absolute min-[1360px]:inset-0 min-[1360px]:pointer-events-none">
        <div className="relative mx-auto max-w-[1400px] h-full px-5 sm:px-10 min-[1360px]:px-12">
          <HrFlowScene
            ref={sceneRef}
            active={sceneReady}
            locale={locale}
            className={`min-[1360px]:!absolute min-[1360px]:inset-y-0 ${isRtl ? "min-[1360px]:left-12 min-[1360px]:right-[620px]" : "min-[1360px]:left-[640px] min-[1360px]:right-12"}`}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
