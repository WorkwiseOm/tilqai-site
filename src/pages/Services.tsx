import Layout from "@/components/Layout";
import { openCalendly } from "@/lib/calendly";
import { Link } from "react-router-dom";
import FlipCardGrid from "@/components/services/FlipCardGrid";
import { useFadeUp, useStaggerReveal } from "@/hooks/use-scroll-animations";
import { useLanguage } from "@/i18n/LanguageContext";

const Services = () => {
  const { ref: headerRef, visible: headerVisible } = useFadeUp();
  const { ref: tabRef, visible: tabVisible } = useFadeUp();
  const { ref: deptRef, visible: deptVisible } = useFadeUp();
  const { ref: ctaRef, visible: ctaVisible } = useFadeUp();
  const { t, isRtl } = useLanguage();

  const departments = [
    { label: t("services.extend.sales"), key: "sales" },
    { label: t("services.extend.procurement"), key: "procurement" },
    { label: t("services.extend.finance"), key: "finance" },
    { label: t("services.extend.legal"), key: "legal" },
  ];

  const arrow = isRtl ? "←" : "→";

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div ref={headerRef} className={`relative rounded-3xl p-8 md:p-12 fade-up overflow-hidden ${headerVisible ? "visible" : ""} ${isRtl ? "text-right" : ""}`}>
            <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)' }} />

            <div className={`relative z-10 inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm`}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
              <span className="text-[11px] font-mono text-primary uppercase tracking-wider">{t("services.sectionLabel")}</span>
            </div>
            <h1 className="text-[32px] md:text-[42px] font-bold text-foreground mb-3 leading-[1.2]">
              {t("services.headline")}
            </h1>
            <p className="text-[18px] max-w-2xl leading-[1.6]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t("services.subheadline")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="pb-16">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div ref={tabRef} className={`fade-up ${tabVisible ? "visible" : ""}`}>
            <FlipCardGrid />
          </div>
        </div>
      </section>

      {/* Department Add-ons */}
      <section className="pt-20 pb-16">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div ref={deptRef} className={`relative rounded-3xl p-10 md:p-16 text-center fade-up overflow-hidden ${deptVisible ? "visible" : ""}`}>
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)' }} />

            <div className={`relative z-10 inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm`}>
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
              <span className="text-[11px] font-mono text-primary uppercase tracking-wider">{t("services.extend.sectionLabel")}</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground mb-10 leading-[1.2]">
              {t("services.extend.headline")}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((d) => (
                <button
                  key={d.key}
                  onClick={openCalendly}
                  className="relative group overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-2.5 text-sm text-foreground/90 font-medium transition-all duration-300 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                >
                  <span className="relative z-10 flex items-center">
                    {d.label}
                    <span className={`text-primary transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? "mr-2 group-hover:-translate-x-1" : "ml-2"} text-xs`}>{arrow}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pt-20 pb-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div ref={ctaRef} className={`relative rounded-3xl p-10 md:p-14 overflow-hidden fade-up ${ctaVisible ? "visible" : ""} ${isRtl ? "text-right" : "text-left"}`}>
            <div className="absolute inset-0 bg-primary/10 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)' }} />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground mb-2 leading-[1.2]">
                {t("services.bottomCta.headline")}
              </h2>
              <p className="text-[16px] mb-6 max-w-xl leading-[1.6]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t("services.bottomCta.body")}
              </p>
              <button
                onClick={openCalendly}
                className="btn-primary-hover bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-md text-[15px] mb-3"
              >
                {t("services.bottomCta.cta")} {arrow}
              </button>
              <p className="text-xs text-muted-foreground/60 font-mono">
                {t("services.bottomCta.subtext")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
