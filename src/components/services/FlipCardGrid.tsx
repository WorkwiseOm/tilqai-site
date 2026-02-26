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
} from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const serviceIcons = [UserPlus, Rocket, Calendar, BarChart3, GraduationCap, FileText, DoorOpen, ShieldCheck];

interface Glass3DCardProps {
  index: number;
  icon: React.ElementType;
  name: string;
  hook: string;
  tag: string;
  isHighlighted: boolean;
  items: string[];
  automatedLabel: string;
  ctaLabel: string;
  isRtl: boolean;
  isMobile: boolean;
}

const Glass3DCard = ({
  icon: Icon,
  name,
  hook,
  tag,
  isHighlighted,
  items,
  automatedLabel,
  ctaLabel,
  isRtl,
  isMobile,
}: Glass3DCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useLanguage();

  const handleInteraction = () => setIsActive((prev) => !prev);
  const arrow = isRtl ? "←" : "→";

  return (
    <motion.div
      layout
      onMouseEnter={!isMobile ? () => setIsActive(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsActive(false) : undefined}
      onClick={isMobile ? handleInteraction : undefined}
      className={`relative group cursor-pointer perspective-[1200px] h-full ${isActive ? "z-50" : "z-10"}`}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <motion.div
        animate={{
          rotateX: isActive ? 0 : 4,
          rotateY: isActive ? 0 : isRtl ? 4 : -4,
          scale: isActive ? 1.05 : 1,
          translateZ: isActive ? 40 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full h-full min-h-[420px] rounded-2xl transform-style-3d overflow-hidden border border-white/5 transition-colors duration-500"
        style={{
          background: isActive
            ? "linear-gradient(145deg, rgba(34, 211, 238, 0.03) 0%, rgba(0, 0, 0, 0.6) 100%), hsl(222 47% 3%)"
            : "linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%), hsl(222 47% 5%)",
          backdropFilter: "blur(24px)",
          boxShadow: isActive
            ? "0 30px 60px -12px rgba(0,0,0,0.8), inset 0 0 30px rgba(34,211,238,0.05)"
            : "0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.3)",
        }}
      >
        {/* Cinematic Volumetric Light */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15), transparent 70%)' }}
        />

        {/* Content Panel */}
        <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">

          {isHighlighted && !isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 shadow-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_currentColor]" />
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider whitespace-nowrap drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                {tag}
              </span>
            </motion.div>
          )}

          {/* Holographic Circular Icon */}
          <motion.div
            animate={{
              rotateY: isActive ? 180 : 0,
              rotateZ: isActive ? [0, 5, -5, 0] : 0,
              scale: isActive ? 0.75 : 1,
              y: isActive ? -15 : 0,
            }}
            transition={{ duration: 1.5, type: isActive ? "spring" : "tween" }}
            className={`relative flex items-center justify-center w-24 h-24 mb-6 rounded-full ${isActive ? 'mt-0' : 'mt-8'}`}
          >
            {/* Holographic Orbits */}
            <div className={`absolute inset-0 rounded-full border border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-opacity duration-500 ${isActive ? 'opacity-100 animate-[spin_8s_linear_infinite]' : 'opacity-50'}`} />
            <div className={`absolute inset-2 rounded-full border border-primary/40 shadow-[inset_0_0_20px_rgba(37,99,235,0.3)] transition-opacity duration-500 ${isActive ? 'opacity-100 animate-[spin_6s_linear_infinite_reverse]' : 'opacity-50'}`} />

            <Icon className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] relative z-10" />

            {/* Holographic Scanline */}
            <motion.div
              animate={{ y: ["-120%", "120%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1/2 mix-blend-screen pointer-events-none rounded-full"
            />
          </motion.div>

          {/* Service Name */}
          <h3 className="text-2xl font-bold text-white mb-2 tracking-wide" style={{ textShadow: "0 2px 15px rgba(0,0,0,0.8)" }}>{name}</h3>

          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="front"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="flex-1 flex flex-col justify-center w-full mt-2"
              >
                <p className="text-base text-muted-foreground/90 font-light leading-relaxed px-2">
                  {hook}
                </p>
                <span className="mt-8 text-[11px] text-primary/50 font-mono tracking-widest uppercase animate-pulse">
                  {t("services.flipExplore")}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="flex-1 flex flex-col w-full h-full relative z-20"
              >
                <span className="inline-block text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-6 opacity-80" style={{ textShadow: "0 0 10px rgba(34,211,238,0.5)" }}>
                  {automatedLabel}
                </span>

                <ul className="flex-1 w-full space-y-3 pb-6">
                  {items.map((item, idx) => (
                    <motion.li
                      initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      key={item}
                      className={`flex items-start gap-3 text-[14px] text-white/90 ${isRtl ? "flex-row-reverse" : "text-left leading-tight"}`}
                    >
                      <Check className="w-4 h-4 text-cyan-400 mt-[3px] flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <span className="opacity-95" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCalendly();
                  }}
                  className="w-full mt-auto relative overflow-hidden group/btn bg-primary/20 hover:bg-primary/40 text-primary-foreground border border-primary/30 hover:border-cyan-400/80 text-[15px] font-medium px-4 py-3.5 rounded-xl transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md"
                >
                  <span className="relative z-10">{ctaLabel} {arrow}</span>
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
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
      ].filter((item) => !item.startsWith("services.s")),
    };
  });

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${isRtl ? "direction-rtl" : ""}`}>
      {services.map((s, i) => (
        <Glass3DCard
          key={i}
          index={i}
          icon={s.icon}
          name={s.name}
          hook={s.hook}
          tag={s.tag}
          isHighlighted={i === 0}
          items={s.items}
          automatedLabel={t("services.automatedLabel")}
          ctaLabel={t("services.discussService")}
          isRtl={isRtl}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default FlipCardGrid;
