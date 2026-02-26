import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const serviceIcons = [UserPlus, Rocket, Calendar, BarChart3, GraduationCap, FileText, DoorOpen, ShieldCheck];

const generatedGains = [
  // 1 Hiring
  ["80% Faster Time-to-Hire", "Bias-Free Candidate Filtering", "Unified Talent Pipeline", "Real-time Stakeholder Visibility"],
  // 2 Onboarding
  ["Day 1 Productivity Boost", "Zero Compliance Gaps", "Automated Asset Provisioning", "Elevated Employee Experience"],
  // 3 Leave
  ["Instant Balance Verification", "Zero Calculation Errors", "Automated Payroll Sync", "Eliminated Manager Bottlenecks"],
  // 4 Performance
  ["100% Review Completion Rate", "Bias-mitigated Scoring", "Real-time Goal Tracking", "Dynamic Compensation Linking"],
  // 5 Training
  ["Continuous Skill Progression", "Automated Certification Renewals", "Targeted Role Alignment", "Zero L&D Blind Spots"],
  // 6 Documents
  ["Instant Audit-Ready Retrieval", "Zero Lost Files", "Automated Version Control", "Secure Role-based Access"],
  // 7 Exit
  ["Secured System Offboarding", "Automated Exit Interviews", "Instant Asset Recovery", "Protected Corporate Data"],
  // 8 Compliance
  ["Zero Regulatory Fines", "Continuous Policy Tracking", "Automated Labor Law Sync", "Real-time Audit Trails"]
];

const generatedGainsAr = [
  // 1 Hiring
  ["توظيف أسرع بنسبة 80%", "تصفية حيادية للمرشحين", "مسار مواهب موحد", "رؤية فورية لأصحاب المصلحة"],
  // 2 Onboarding
  ["إنتاجية من اليوم الأول", "انعدام فجوات الامتثال", "استخراج الأصول تلقائياً", "تجربة موظف استثنائية"],
  // 3 Leave
  ["تحقق فوري من الرصيد", "انعدام أخطاء الحساب", "مزامنة تلقائية مع الرواتب", "القضاء على تأخير المديرين"],
  // 4 Performance
  ["اكتمال التقييمات 100%", "تقييم خالي من التحيز", "تتبع فوري للأهداف", "ربط ديناميكي للتعويضات"],
  // 5 Training
  ["تطوير مستمر للمهارات", "تجديد تلقائي للشهادات", "مواءمة دقيقة مع الأدوار", "رؤية شاملة للتدريب"],
  // 6 Documents
  ["استرجاع فوري للاستعداد للتدقيق", "انعدام الملفات المفقودة", "تحكم تلقائي في الإصدارات", "وصول آمن حسب الصلاحيات"],
  // 7 Exit
  ["إلغاء الوصول للأنظمة بأمان", "مقابلات خروج تلقائية", "استرداد فوري للأصول", "حماية البيانات المؤسسية"],
  // 8 Compliance
  ["انعدام غرامات المخالفات", "تتبع مستمر للسياسات", "مزامنة تلقائية لقوانين العمل", "سجلات تدقيق فورية"]
];

interface HologramCardProps {
  idx: number;
  icon: React.ElementType;
  name: string;
  hook: string;
  items: string[];
  gains: string[];
  isRtl: boolean;
  onClick: () => void;
}

const HologramCard = ({ idx, icon: Icon, name, hook, isRtl, onClick }: HologramCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer h-full min-h-[340px] rounded-2xl overflow-hidden border border-cyan-400/10 bg-[#080c12] transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,180,216,0.15)] flex flex-col items-center justify-center p-8 text-center ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}
    >
      {/* Background Matrix/Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1f35]/50 to-[#080c12] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

      {/* 3D Holographic Base Assembly */}
      <div className="relative w-32 h-32 flex flex-col items-center justify-end mb-8">

        {/* Floating Icon (Hologram projection) */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute z-10 bottom-8 drop-shadow-[0_0_15px_rgba(0,180,216,0.9)]"
        >
          <Icon className="w-12 h-12 text-[#22d3ee] filter brightness-110" strokeWidth={1.5} />
        </motion.div>

        {/* 3D Metallic Lens Underneath */}
        <div className="absolute bottom-0 w-24 h-12" style={{ transformStyle: 'preserve-3d', perspective: '500px' }}>
          <div className="w-full h-full rounded-[100%] bg-gradient-to-t from-[#020617] via-[#0f1f35] to-[#1e293b] border border-cyan-500/30 shadow-[0_15px_30px_rgba(0,180,216,0.4),inset_0_2px_10px_rgba(255,255,255,0.1)] group-hover:shadow-[0_20px_45px_rgba(0,180,216,0.6),inset_0_2px_15px_rgba(255,255,255,0.2)] transition-shadow duration-500" style={{ transform: 'rotateX(75deg)' }} />
          {/* Glowing lens core */}
          <div className="absolute inset-0 rounded-[100%] bg-cyan-400/10 blur-[8px] group-hover:bg-cyan-400/20 transition-all duration-500" style={{ transform: 'rotateX(75deg)' }} />
          {/* Projection Cone */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[20px] h-[60px] bg-gradient-to-t from-cyan-400/40 to-transparent blur-[12px] opacity-0 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
        </div>
      </div>

      <h3 className="relative z-10 text-[22px] font-bold text-white mb-3 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">{name}</h3>
      <p className="relative z-10 text-[15px] text-[#8ba2be] font-light leading-relaxed max-w-[250px]">{hook}</p>
    </div>
  );
};

const ServicePopup = ({
  service,
  isOpen,
  onClose,
  isRtl,
  isMobile,
  t
}: {
  service: any,
  isOpen: boolean,
  onClose: () => void,
  isRtl: boolean,
  isMobile: boolean,
  t: any
}) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  const colAutomatedLabel = isRtl ? "ما يتم تلقائياً" : "WHAT GETS AUTOMATED";
  const colGainsLabel = isRtl ? "ما يكسبه فريقك" : "WHAT YOUR TEAM GAINS";
  const btnLabel = isRtl ? "احجز تقييماً مجانياً ←" : "Book Free Assessment →";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Deep Overlay */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[rgba(0,0,0,0.85)] z-0"
          onClick={onClose}
        />

        {/* Cinematic Popup Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-[780px] bg-[#0f1f35] border border-[rgba(0,180,216,0.3)] rounded-[16px] shadow-[0_30px_100px_rgba(0,180,216,0.15)] flex flex-col overflow-hidden"
          style={{ maxHeight: '90vh' }}
        >
          {/* Close Header Bar */}
          <div className={`p-6 flex items-center justify-between border-b border-cyan-400/10 relative z-20 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <service.icon className="w-6 h-6 text-[#00b4d8]" />
              <h2 className={`text-[20px] font-bold text-white ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                {service.name}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Two-Column Scrollable Body */}
          <div className="overflow-y-auto p-10 hide-scrollbar flex-1 relative z-10 w-full">
            <div className={`flex flex-col md:flex-row w-full gap-10 md:gap-0 ${isRtl ? 'md:flex-row-reverse' : ''}`}>

              {/* Left Column: Automated */}
              <div className="flex-1 w-full md:pr-10 md:border-r border-[rgba(0,180,216,0.3)] rtl:md:pr-0 rtl:md:pl-10 rtl:md:border-l rtl:md:border-r-0">
                <h4 className={`text-[11px] font-mono font-bold text-[#00b4d8] uppercase tracking-[3px] mb-6 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : "text-left"}`}>
                  {colAutomatedLabel}
                </h4>
                <ul className="space-y-4">
                  {service.items.map((item: string, i: number) => (
                    <li key={i} className={`flex items-start gap-4 text-[15px] text-white leading-[1.8] ${isRtl ? "flex-row-reverse text-right font-['Tajawal',sans-serif]" : "text-left"}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]/80 mt-[10px] flex-shrink-0" />
                      <span className="opacity-95">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Gains */}
              <div className="flex-1 w-full md:pl-10 rtl:md:pl-0 rtl:md:pr-10">
                <h4 className={`text-[11px] font-mono font-bold text-[#00b4d8] uppercase tracking-[3px] mb-6 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : "text-left"}`}>
                  {colGainsLabel}
                </h4>
                <ul className="space-y-4">
                  {service.gains.map((gain: string, i: number) => (
                    <li key={i} className={`flex items-start gap-4 text-[15px] text-white leading-[1.8] ${isRtl ? "flex-row-reverse text-right font-['Tajawal',sans-serif]" : "text-left"}`}>
                      <Check className="w-4 h-4 text-[#00b4d8] mt-[7px] flex-shrink-0 drop-shadow-[0_0_5px_rgba(0,180,216,0.5)]" strokeWidth={3} />
                      <span className="opacity-95">{gain}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CTA Form Bottom Block */}
            <div className={`mt-12 w-full flex ${isMobile ? 'justify-center' : isRtl ? 'justify-start' : 'justify-end'}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  openCalendly();
                }}
                className={`w-full md:w-auto px-8 py-3.5 rounded-lg border border-[rgba(0,180,216,0.5)] bg-transparent hover:bg-[rgba(0,180,216,0.1)] text-white font-medium text-[15px] transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}
              >
                {btnLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const FlipCardGrid = () => {
  const { t, isRtl } = useLanguage();
  const isMobile = useIsMobile();
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const services = Array.from({ length: 8 }, (_, i) => {
    const idx = i + 1;
    return {
      id: idx,
      icon: serviceIcons[i],
      name: t(`services.tab${idx}`),
      hook: t(`services.s${idx}.hook`),
      targetItems: [
        t(`services.s${idx}.b1`),
        t(`services.s${idx}.b2`),
        t(`services.s${idx}.b3`),
        t(`services.s${idx}.b4`),
        t(`services.s${idx}.b5`),
        t(`services.s${idx}.b6`),
        t(`services.s${idx}.b7`),
        t(`services.s${idx}.b8`),
      ].filter((item) => !item.startsWith("services.s")),
      targetGains: isRtl ? generatedGainsAr[i] : generatedGains[i]
    };
  });

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
        {services.map((s, i) => (
          <HologramCard
            key={i}
            idx={i}
            icon={s.icon}
            name={s.name}
            hook={s.hook}
            items={s.targetItems}
            gains={s.targetGains}
            isRtl={isRtl}
            onClick={() => setSelectedService(s)}
          />
        ))}
      </div>

      <ServicePopup
        service={selectedService ? {
          icon: selectedService.icon,
          name: selectedService.name,
          items: selectedService.targetItems,
          gains: selectedService.targetGains
        } : null}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        isRtl={isRtl}
        isMobile={isMobile}
        t={t}
      />
    </>
  );
};

export default FlipCardGrid;
