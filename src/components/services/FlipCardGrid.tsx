import { useState } from "react";
import {
  UserPlus,
  Rocket,
  Calendar,
  BarChart3,
  GraduationCap,
  FileText,
  DoorOpen,
  ShieldCheck,
  Check,
  RotateCcw,
} from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const serviceIcons = [UserPlus, Rocket, Calendar, BarChart3, GraduationCap, FileText, DoorOpen, ShieldCheck];

interface FlipCardProps {
  index: number;
  icon: React.ElementType;
  name: string;
  hook: string;
  tag: string;
  isHighlighted: boolean;
  items: string[];
  automatedLabel: string;
  flipLabel: string;
  ctaLabel: string;
  isRtl: boolean;
  isMobile: boolean;
}

const FlipCard = ({
  icon: Icon,
  name,
  hook,
  tag,
  isHighlighted,
  items,
  automatedLabel,
  flipLabel,
  ctaLabel,
  isRtl,
  isMobile,
}: FlipCardProps) => {
  const [flipped, setFlipped] = useState(false);

  const handleInteraction = () => setFlipped((f) => !f);

  const arrow = isRtl ? "←" : "→";

  return (
    <div
      className="flip-card-container group cursor-pointer"
      onClick={isMobile ? handleInteraction : undefined}
      onMouseEnter={!isMobile ? () => setFlipped(true) : undefined}
      onMouseLeave={!isMobile ? () => setFlipped(false) : undefined}
    >
      <div
        className={`flip-card-inner ${flipped ? "flipped" : ""}`}
        style={{ direction: isRtl ? "rtl" : "ltr" }}
      >
        {/* FRONT */}
        <div
          className="flip-card-face flip-card-front flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%), hsl(222 47% 5%)" }}
        >
          {isHighlighted && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_currentColor]" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-wider whitespace-nowrap">
                {tag}
              </span>
            </div>
          )}

          {isMobile && (
            <RotateCcw className={`absolute top-3 ${isRtl ? "left-3" : "right-3"} w-3.5 h-3.5 text-muted-foreground/50`} />
          )}

          <div className="mb-6 p-4 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
            <Icon className="w-8 h-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3">{name}</h3>
          <p className="text-base text-muted-foreground leading-relaxed px-2">{hook}</p>

          <span className="mt-auto pt-4 text-xs text-muted-foreground/50 font-mono animate-pulse">
            {flipLabel}
          </span>
        </div>

        <div
          className={`flip-card-face flip-card-back flex flex-col p-6 rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)] ${isRtl ? "text-right" : "text-left"}`}
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 100%), hsl(222 47% 5%)" }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-wider mb-4 opacity-80">
            {automatedLabel}
          </span>

          <ul className={`pb-12 ${items.length > 5 ? "space-y-1.5" : "space-y-2.5"}`}>
            {items.map((item) => (
              <li key={item} className={`flex items-start gap-2 text-muted-foreground ${isRtl ? "flex-row-reverse font-['Tajawal',sans-serif]" : ""} text-[13px] leading-tight`}>
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openCalendly();
            }}
            className="absolute bottom-6 left-6 right-6 btn-primary-hover bg-primary text-primary-foreground text-[15px] font-medium px-4 py-2 rounded-md transition-all duration-300 shadow-[0_4px_15px_hsl(var(--primary)/0.2)]"
          >
            {ctaLabel} {arrow}
          </button>
        </div>
      </div>
    </div>
  );
};

const FlipCardGrid = () => {
  const { t, isRtl } = useLanguage();
  const isMobile = useIsMobile();

  const services = Array.from({ length: 8 }, (_, i) => {
    const idx = i + 1;
    return {
      icon: serviceIcons[i],
      name: t(`services.tab${idx}`),
      hook: t(`services.s${idx}.hook`),
      tag: t(`services.s${idx}.tag`),
      items: [
        t(`services.s${idx}.b1`),
        t(`services.s${idx}.b2`),
        t(`services.s${idx}.b3`),
        t(`services.s${idx}.b4`),
        t(`services.s${idx}.b5`),
        t(`services.s${idx}.b6`),
        t(`services.s${idx}.b7`),
        t(`services.s${idx}.b8`),
      ].filter(item => !item.startsWith("services.s")),
    };
  });

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${isRtl ? "direction-rtl" : ""}`}>
      {services.map((s, i) => (
        <FlipCard
          key={i}
          index={i}
          icon={s.icon}
          name={s.name}
          hook={s.hook}
          tag={s.tag}
          isHighlighted={i === 0}
          items={s.items}
          automatedLabel={t("services.automatedLabel")}
          flipLabel={t("services.flipExplore")}
          ctaLabel={t("services.discussService")}
          isRtl={isRtl}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default FlipCardGrid;
