import { Search, Cog, TrendingUp, ChevronRight, ChevronLeft } from "lucide-react";
import { useFadeUp, useStaggerReveal } from "@/hooks/use-scroll-animations";
import { useLanguage } from "@/i18n/LanguageContext";

const PipelineSection = () => {
  const { ref: headerRef, visible: headerVisible } = useFadeUp();
  const { ref: cardsRef, visibleItems } = useStaggerReveal(3, 150);
  const { t, isRtl } = useLanguage();

  const nodes = [
    {
      icon: Search,
      title: t("pipeline.step1.title"),
      points: [t("pipeline.step1.bullet1"), t("pipeline.step1.bullet2"), t("pipeline.step1.bullet3")],
      timeframe: t("pipeline.step1.duration"),
    },
    {
      icon: Cog,
      title: t("pipeline.step2.title"),
      points: [t("pipeline.step2.bullet1"), t("pipeline.step2.bullet2"), t("pipeline.step2.bullet3")],
      timeframe: t("pipeline.step2.duration"),
    },
    {
      icon: TrendingUp,
      title: t("pipeline.step3.title"),
      points: [t("pipeline.step3.bullet1"), t("pipeline.step3.bullet2"), t("pipeline.step3.bullet3")],
      timeframe: t("pipeline.step3.duration"),
    },
  ];

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section className="py-8 pb-4">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div ref={headerRef} className={`fade-up ${headerVisible ? "visible" : ""}`}>
          <div className="section-label">{t("pipeline.sectionLabel")}</div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch mt-6">
          {nodes.map((node, i) => {
            return (
              <div
                key={node.title}
                className={`relative flex items-center fade-up ${visibleItems[i] ? "visible" : ""}`}
              >
                <div className="card-hover content-card rounded-md p-5 flex-1 border border-[hsl(var(--content-card-border))] group relative overflow-hidden">
                  <span className={`absolute top-2 ${isRtl ? "left-3" : "right-3"} text-[4rem] font-bold leading-none text-white/[0.06] font-mono-numeric pointer-events-none select-none`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10">
                    <div className={`flex items-center gap-3 mb-3 ${isRtl ? "" : ""}`}>
                      <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                        <node.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className={`text-xs font-mono text-muted-foreground`}>{t("pipeline.step")} {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className={`text-lg font-semibold text-foreground mb-3 ${isRtl ? "text-right" : ""}`}>{node.title}</h3>
                    <ul className="space-y-1.5">
                      {node.points.map((p) => (
                        <li key={p} className={`text-[16px] text-muted-foreground flex items-start gap-2 ${isRtl ? "text-right" : ""}`}>
                          <span className="text-primary mt-1.5 text-[6px]">●</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3">
                      <span className={`inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 ${isRtl ? "font-mono" : "font-mono"}`}>
                        {node.timeframe}
                      </span>
                    </div>
                  </div>
                </div>
                {i < nodes.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-10 flex-shrink-0 -mx-1">
                    <div className="w-full border-t border-dashed border-primary/40" />
                    <ChevronIcon className="w-4 h-4 text-primary/60 absolute" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
