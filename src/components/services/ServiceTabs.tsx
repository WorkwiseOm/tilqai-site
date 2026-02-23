import { useState, useRef, useEffect } from "react";
import {
  UserPlus,
  ClipboardCheck,
  Calendar,
  Star,
  BookOpen,
  FileText,
  UserMinus,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";

const serviceIcons = [UserPlus, ClipboardCheck, Calendar, Star, BookOpen, FileText, UserMinus, ShieldCheck];

const ServiceTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const tabStripRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const { t, isRtl } = useLanguage();

  const services = Array.from({ length: 8 }, (_, i) => {
    const idx = i + 1;
    return {
      icon: serviceIcons[i],
      tabLabel: t(`services.tab${idx}`),
      label: t(`services.s${idx}.label`),
      title: t(`services.s${idx}.title`),
      description: t(`services.s${idx}.desc`),
      tasks: [t(`services.s${idx}.b1`), t(`services.s${idx}.b2`), t(`services.s${idx}.b3`), t(`services.s${idx}.b4`), t(`services.s${idx}.b5`)],
      tag: t(`services.s${idx}.tag`),
      tagStyle: i === 0 ? "bg-primary text-primary-foreground"
        : (i === 1 || i === 5) ? "border border-primary/60 text-primary bg-transparent"
        : i === 2 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        : i === 7 ? "bg-muted text-muted-foreground"
        : "bg-muted text-muted-foreground",
    };
  });

  const active = services[activeIndex];

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 150);
  };

  const checkOverflow = () => {
    const el = tabStripRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 4);
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkOverflow();
    const el = tabStripRef.current;
    if (el) {
      el.addEventListener("scroll", checkOverflow);
      window.addEventListener("resize", checkOverflow);
    }
    return () => {
      el?.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const arrow = isRtl ? "←" : "→";

  return (
    <div>
      {/* Tab Bar */}
      <div className="relative mb-8">
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(255,255,255,0.03)] to-transparent z-10 pointer-events-none rounded-l-lg" />
        )}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(255,255,255,0.03)] to-transparent z-10 pointer-events-none rounded-r-lg" />
        )}
        <div
          ref={tabStripRef}
          className="flex overflow-x-auto scrollbar-hide rounded-lg p-4 md:px-6 gap-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => handleTabClick(i)}
              className="flex-shrink-0 whitespace-nowrap cursor-pointer relative"
              style={{
                fontSize: '16px',
                fontWeight: i === activeIndex ? 600 : 500,
                color: i === activeIndex ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                background: i === activeIndex ? 'rgba(0,212,255,0.12)' : 'transparent',
                border: i === activeIndex ? '1px solid rgba(0,212,255,0.4)' : '1px solid transparent',
                padding: '12px 20px',
                borderRadius: '6px',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                if (i !== activeIndex) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (i !== activeIndex) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }
              }}
            >
              {s.tabLabel}
              {i === activeIndex && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="mx-auto max-w-[1300px] border border-primary/30 rounded-md p-6 md:p-8 relative overflow-hidden shadow-[0_0_15px_-5px_hsl(var(--primary)/0.15)]">
        <div
          className={`
            grid grid-cols-1 ${isRtl ? "md:grid-cols-[55%_45%]" : "md:grid-cols-[45%_55%]"} gap-8
            transition-all duration-300 ease-in-out
            ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
            ${isRtl ? "direction-rtl" : ""}
          `}
        >
          {/* Description Column */}
          <div className={`flex flex-col gap-4 ${isRtl ? "text-right md:order-2" : ""}`}>
            <div>
              <span className="text-[11px] font-mono text-primary uppercase tracking-wider">
                {active.label}
              </span>
              <h3 className="text-xl font-bold text-foreground mt-1">
                {active.title}
              </h3>
              <span
                className={`inline-block mt-2 text-[10px] font-mono px-2.5 py-0.5 rounded-full ${active.tagStyle}`}
              >
                {active.tag}
              </span>
            </div>
            <p className="text-[16px] text-muted-foreground leading-[1.6]">
              {active.description}
            </p>
            <button
              onClick={openCalendly}
              className="bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors text-[15px] w-fit mt-auto"
            >
              {t("services.discussService")} {arrow}
            </button>
          </div>

          {/* Tasks Column */}
          <div className={`${isRtl ? "text-right md:order-1" : ""}`}>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-4">
              {t("services.automationLabel")}
            </span>
            <ul className="space-y-2.5">
              {active.tasks.map((task) => (
                <li
                  key={task}
                  className="text-[16px] text-muted-foreground flex items-start gap-2.5"
                >
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  {task}
                </li>
              ))}
            </ul>

            {/* Arrow watermark */}
            <div className={`absolute bottom-4 ${isRtl ? "left-6" : "right-6"} opacity-[0.07] pointer-events-none`}>
              <ArrowIcon className="w-20 h-20 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTabs;
