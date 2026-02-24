import Layout from "@/components/Layout";
import { Shield, Zap, Target, Eye, Linkedin } from "lucide-react";
import { useFadeUp, useStaggerReveal } from "@/hooks/use-scroll-animations";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { ref: missionRef, visible: missionVisible } = useFadeUp();
  const { ref: founderRef, visible: founderVisible } = useFadeUp();
  const { ref: valuesRef, visibleItems } = useStaggerReveal(4, 0.1);
  const { t, isRtl } = useLanguage();

  const values = [
    { icon: Shield, label: t("about.values.v1.label"), desc: t("about.values.v1.desc") },
    { icon: Zap, label: t("about.values.v2.label"), desc: t("about.values.v2.desc") },
    { icon: Target, label: t("about.values.v3.label"), desc: t("about.values.v3.desc") },
    { icon: Eye, label: t("about.values.v4.label"), desc: t("about.values.v4.desc") },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          {/* About */}
          <div ref={missionRef} className={`depth-panel rounded-md p-8 mb-12 fade-up ${missionVisible ? "visible" : ""} ${isRtl ? "text-right" : ""}`}>
            <div className="section-label mb-8">{t("about.sectionLabel")}</div>

            <div className="space-y-6 max-w-3xl">
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">{t("about.block1.label")}</div>
                <p className="text-[18px] text-muted-foreground leading-[1.8] font-medium" style={{ fontSize: '18px' }}>
                  {t("about.block1.content")}
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">{t("about.block2.label")}</div>
                <p className="text-[18px] text-muted-foreground leading-[1.8] font-medium" style={{ fontSize: '18px' }}>
                  {t("about.block2.content")}
                </p>
              </div>
              <div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">{t("about.block3.label")}</div>
                <p className="text-[18px] text-muted-foreground leading-[1.8] font-medium" style={{ fontSize: '18px' }}>
                  {t("about.block3.content")}
                </p>
              </div>
            </div>
          </div>

          {/* Founder */}
          <div className="section-divider mb-12" />
          <div className="section-label mb-6">{t("about.founder.sectionLabel")}</div>
          <div
            ref={founderRef}
            className={`rounded-md p-6 md:p-8 mb-16 ${isRtl ? "border-r-2 border-primary" : "border-l-2 border-primary"} fade-up ${founderVisible ? "visible" : ""}`}
            style={{ background: "hsl(226 40% 10%)" }}
          >
            <div className={`flex flex-col gap-1 ${isRtl ? "text-right" : ""}`}>
              <h3 className="text-[20px] font-bold text-foreground">{t("about.founder.name")}</h3>
              <p className="text-[14px] text-muted-foreground mt-1">{t("about.founder.title")}</p>
              <div className="text-[14px] text-muted-foreground">{t("about.founder.location")}</div>
              <a
                href="https://www.linkedin.com/in/tariqalmaskari/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-primary hover:brightness-125 transition-all duration-300 w-fit inline-flex"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Values */}
          <div className="section-divider mb-12" />
          <div className="section-label mb-6">{t("about.values.sectionLabel")}</div>
          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <div key={v.label} className={`card-hover content-card rounded-md p-4 fade-up ${visibleItems[i] ? "visible" : ""} ${isRtl ? "text-right" : ""}`}>
                <div className={`w-8 h-8 rounded-md bg-secondary flex items-center justify-center mb-3 ${isRtl ? "ml-auto" : ""}`}>
                  <v.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className={`text-[20px] font-bold text-foreground mb-1 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>{v.label}</h3>
                <p className={`text-[15px] text-muted-foreground leading-[1.7] ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="section-divider mb-12 mt-16" />
          <div className="depth-panel rounded-md p-8 text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold text-foreground mb-2 leading-[1.2]">{t("about.bottomCta.headline")}</h2>
            <p className="text-[16px] text-muted-foreground mb-6 leading-[1.6]">{t("about.bottomCta.subtext")}</p>
            <button onClick={openCalendly} className="btn-primary-hover bg-primary text-primary-foreground text-[15px] font-medium px-6 py-2.5 rounded-md">
              {t("about.bottomCta.cta")}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
