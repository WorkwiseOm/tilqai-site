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
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

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

  // Mouse Tracking for Relief Tilt & Directional Light
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const lightX = useTransform(x, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(y, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsActive(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      layout
      onMouseEnter={!isMobile ? () => setIsActive(true) : undefined}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={isMobile ? handleInteraction : undefined}
      className={`relative group cursor-pointer perspective-[1500px] h-full ${isActive ? "z-50" : "z-10"}`}
      style={{ direction: isRtl ? "rtl" : "ltr" }}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.05 : 1,
          translateZ: isActive ? 30 : 0,
        }}
        style={{
          rotateX: isMobile ? 0 : springRotateX,
          rotateY: isMobile ? 0 : springRotateY,
          // Dark Obsidian Matte Base
          backgroundColor: "#080c12",
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.5) 100%)",
          boxShadow: isActive
            ? "0 40px 80px -20px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -2px 5px rgba(0,0,0,0.8)"
            : "0 15px 35px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 3px rgba(0,0,0,0.6)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="relative w-full h-full min-h-[420px] rounded-[1.25rem] transform-style-3d overflow-hidden border border-[#1a2233]"
      >
        {/* Physical Directional Light (No ambient glowing) */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay z-0"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([lx, ly]) =>
                  `radial-gradient(circle at ${lx} ${ly}, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.4) 60%)`
              ),
            }}
          />
        )}

        {/* Content Panel */}
        <div className="relative z-10 p-8 h-full flex flex-col items-center text-center transform-style-3d">

          {isHighlighted && !isActive && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#1a2233] bg-[#0c121c] shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_1px_rgba(255,255,255,0.03)]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
              <span className="text-[10px] font-mono font-semibold text-[#809ab5] uppercase tracking-wider whitespace-nowrap">
                {tag}
              </span>
            </motion.div>
          )}

          {/* Cyan Metallic Carved Icon Element */}
          <motion.div
            animate={{
              y: isActive ? -15 : 0,
              scale: isActive ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-[#0a1018] border border-[#111827] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_1px_rgba(255,255,255,0.02)] ${isActive ? 'mt-0' : 'mt-8'}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Inner Metallic Bevel */}
            <div className="absolute inset-2 rounded-xl bg-[#0d141f] border-t border-[#1a2533] border-b border-[#000] shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center" style={{ transform: "translateZ(10px)" }}>
              {/* The sharp cyan metallic fill */}
              <Icon className="w-9 h-9 text-transparent" style={{ stroke: 'url(#cyan-metallic)', strokeWidth: 1.5, filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8))' }} />

              <svg width="0" height="0" className="absolute">
                <defs>
                  <linearGradient id="cyan-metallic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8be9fd" />
                    <stop offset="50%" stopColor="#1e90ff" />
                    <stop offset="100%" stopColor="#0052cc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Physical Stamped Service Name */}
          <h3 className="text-[22px] font-bold text-[#e1e7ef] mb-3 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ transform: "translateZ(15px)" }}>
            {name}
          </h3>

          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="front"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex-1 flex flex-col justify-center w-full mt-2"
                style={{ transform: "translateZ(10px)" }}
              >
                <p className="text-[15px] text-[#788a9f] font-light leading-relaxed px-2 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                  {hook}
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-8 rounded-full bg-[#1e293b] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_rgba(255,255,255,0.05)]" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.15 } }}
                className="flex-1 flex flex-col w-full h-full relative z-20"
                style={{ transform: "translateZ(20px)" }}
              >
                <span className="inline-block text-[10px] font-mono font-semibold text-[#5a728c] uppercase tracking-widest mb-6 border-b border-[#111827] pb-2 text-center w-full drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                  {automatedLabel}
                </span>

                <ul className="flex-1 w-full space-y-3 pb-6">
                  {items.map((item, idx) => (
                    <motion.li
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03, duration: 0.2 }}
                      key={item}
                      className={`flex items-start gap-3 text-[13px] text-[#bac5d5] ${isRtl ? "flex-row-reverse" : "text-left leading-tight"}`}
                    >
                      <div className="w-4 h-4 rounded mt-[2px] flex-shrink-0 bg-[#0c121c] border border-[#162133] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-cyan-500" strokeWidth={3} />
                      </div>
                      <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Matte Recessed CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCalendly();
                  }}
                  className="w-full mt-auto relative bg-[#111824] hover:bg-[#151e2e] text-[#d0dbe8] border border-[#1c2738] border-b-[#0b1016] text-[14px] font-medium px-4 py-3.5 rounded-xl transition-colors duration-300 shadow-[inset_0_1px_rgba(255,255,255,0.02),0_4px_10px_rgba(0,0,0,0.5)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {ctaLabel} <span className="text-[#4b617a]">{arrow}</span>
                  </span>
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
