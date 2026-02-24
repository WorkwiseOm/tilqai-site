import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFadeUp } from "@/hooks/use-scroll-animations";
import { openCalendly } from "@/lib/calendly";
import { X } from "lucide-react";

export let openROIModal: () => void = () => { };

export default function ROISimulator() {
  const { t, isRtl } = useLanguage();
  const { ref: sectionRefFade, visible: sectionVisible } = useFadeUp();
  const [open, setOpen] = useState(false);

  const [teamOption, setTeamOption] = useState<"1-5" | "6-10" | "11-20" | "21-50" | null>(null);
  const [salaryOption, setSalaryOption] = useState<"325-800" | "800-1200" | "1200-2000" | "2000+" | null>(null);
  const [hoursOption, setHoursOption] = useState<"1-5" | "6-10" | "11-20" | "20+" | null>(null);
  const [processOption, setProcessOption] = useState<"1-3" | "4-6" | "7+" | null>(null);

  useEffect(() => {
    openROIModal = () => {
      setOpen(true);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const teamMidpoints = {
    '1-5': 3,
    '6-10': 8,
    '11-20': 15,
    '21-50': 35
  };

  const salaryMidpoints = {
    '325-800': 560,
    '800-1200': 1000,
    '1200-2000': 1600,
    '2000+': 2500
  };

  const hoursMidpoints = {
    '1-5': 3,
    '6-10': 8,
    '11-20': 15,
    '20+': 25
  };

  const processMultipliers = {
    '1-3': 1.0,
    '4-6': 1.2,
    '7+': 1.4
  };

  const teamOptions = [
    { key: "1-5", label: "1–5" },
    { key: "6-10", label: "6–10" },
    { key: "11-20", label: "11–20" },
    { key: "21-50", label: "21–50" }
  ];

  const salaryOptions = [
    { key: "325-800", label: isRtl ? "325–800 ر.ع" : "OMR 325–800" },
    { key: "800-1200", label: isRtl ? "800–1,200 ر.ع" : "OMR 800–1,200" },
    { key: "1200-2000", label: isRtl ? "1,200–2,000 ر.ع" : "OMR 1,200–2,000" },
    { key: "2000+", label: isRtl ? "+2,000 ر.ع" : "OMR 2,000+" }
  ];

  const hoursOptions = [
    { key: "1-5", label: isRtl ? "1–5 س" : "1–5 hrs" },
    { key: "6-10", label: isRtl ? "6–10 س" : "6–10 hrs" },
    { key: "11-20", label: isRtl ? "11–20 س" : "11–20 hrs" },
    { key: "20+", label: isRtl ? "+20 س" : "20+ hrs" }
  ];

  const processOptions = [
    { key: "1-3", label: isRtl ? "1–3" : "1–3" },
    { key: "4-6", label: isRtl ? "4–6" : "4–6" },
    { key: "7+", label: isRtl ? "+7" : "7+" }
  ];

  const isComplete = teamOption !== null && salaryOption !== null && hoursOption !== null && processOption !== null;

  let totalAnnualHours = 0;
  let trappedCapacityCost = 0;
  let qualityImprovementOpportunity = 0;
  let totalRecoverableCapacity = 0;
  let workingDaysRecoverable = 0;

  if (isComplete) {
    const teamMembers = teamMidpoints[teamOption!];
    const salaryMidpoint = salaryMidpoints[salaryOption!];
    const manualHours = hoursMidpoints[hoursOption!];
    const multiplier = processMultipliers[processOption!];

    const monthlyWorkingHours = 176;
    const hourlyCost = salaryMidpoint / monthlyWorkingHours;
    const annualManualHoursPerEmployee = manualHours * 52;
    totalAnnualHours = annualManualHoursPerEmployee * teamMembers;
    trappedCapacityCost = hourlyCost * totalAnnualHours;
    qualityImprovementOpportunity = trappedCapacityCost * 0.15;
    totalRecoverableCapacity = (trappedCapacityCost + qualityImprovementOpportunity) * multiplier;
    workingDaysRecoverable = totalAnnualHours / 8;
  }

  const formatNumber = (num: number) => Math.round(num).toLocaleString();
  const arrowR = isRtl ? "←" : "→";

  return (
    <>
      <section className="py-8">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div className="section-divider mb-12" />
          <div ref={sectionRefFade} className={`text-center max-w-xl mx-auto fade-up ${sectionVisible ? "visible" : ""}`}>
            <div className="section-label">{t("roi.sectionLabel")}</div>
            <h2 className={`text-2xl sm:text-3xl font-bold text-foreground mb-3 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
              {t("roi.headline")}
            </h2>
            <p className={`text-sm text-muted-foreground mb-8 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
              {t("roi.subheadline")}
            </p>
            <button
              onClick={() => setOpen(true)}
              className="btn-outline-hover border border-white/30 bg-transparent text-white text-[16px] font-semibold px-8 py-3.5 rounded-lg hover:border-white hover:text-white hover:bg-transparent transition-all duration-300"
            >
              {t("roi.ctaButton")} {arrowR}
            </button>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-md" style={{ animation: "fadeIn 0.3s ease-out" }}>
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div
            className="relative z-10 w-full md:max-w-[1024px] max-h-[100vh] md:max-h-[95vh] md:rounded-3xl border-0 md:border border-white/10 bg-[#060b13] md:bg-[#060b13]/95 backdrop-blur-3xl shadow-[0_0_80px_hsl(var(--primary)/0.15)] flex flex-col"
            style={{ animation: "slideUpFade 0.4s ease-out" }}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none md:rounded-3xl" />

            <button
              onClick={() => setOpen(false)}
              className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} text-muted-foreground hover:text-white transition-colors z-20 duration-300 bg-white/5 hover:bg-white/10 p-2 rounded-full hidden md:block`}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 flex items-center justify-between border-b border-white/10 md:hidden relative z-20 bg-[#060b13]">
              <h2 className={`text-[20px] font-bold text-white ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                {isRtl ? "احسب السعة المستردة الأسبوعية" : "Calculate Recoverable Capacity"}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-white transition-colors p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto no-scrollbar relative z-10 flex-1 p-6 flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

              {/* Left Column: Inputs */}
              <div className="flex-1 w-full space-y-7 pb-2 md:pb-0">
                <h2 className={`text-[24px] font-bold text-white leading-[1.15] hidden md:block ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                  {isRtl ? "المعطيات" : "Variables"}
                </h2>

                <div className="space-y-6">
                  {/* Input 1: Team Members */}
                  <div className="space-y-2">
                    <label className={`block text-[14px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                      {isRtl ? "عدد أعضاء الفريق" : "Team members"}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {teamOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setTeamOption(opt.key as any)}
                          className={`py-2 px-1 text-[13px] font-medium rounded-md border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${teamOption === opt.key
                              ? "border-primary bg-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                              : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 2: Salary Range */}
                  <div className="space-y-2">
                    <label className={`block text-[14px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                      {isRtl ? "متوسط الراتب الشهري" : "Monthly salary"}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {salaryOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setSalaryOption(opt.key as any)}
                          className={`py-2 px-1 text-[13px] font-medium rounded-md border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${salaryOption === opt.key
                              ? "border-primary bg-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                              : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 3: Manual Hours */}
                  <div className="space-y-2">
                    <label className={`block text-[14px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                      {isRtl ? "ساعات العمل اليدوي أسبوعياً" : "Weekly manual hours"}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {hoursOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setHoursOption(opt.key as any)}
                          className={`py-2 px-1 text-[13px] font-medium rounded-md border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${hoursOption === opt.key
                              ? "border-primary bg-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                              : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 4: Processes */}
                  <div className="space-y-2">
                    <label className={`block text-[14px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                      {isRtl ? "عدد العمليات" : "Processes"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {processOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => setProcessOption(opt.key as any)}
                          className={`py-2 px-1 text-[13px] font-medium rounded-md border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${processOption === opt.key
                              ? "border-primary bg-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                              : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Results */}
              <div className="flex-[1.2] w-full bg-[#0a1424] lg:bg-transparent rounded-2xl lg:rounded-none p-5 lg:p-0 lg:border-l lg:border-white/10 lg:pl-10 flex flex-col justify-center relative">

                {!isComplete ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-[280px] lg:h-auto">
                    <p className={`text-[15px] text-muted-foreground/70 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {t("roi.completeFields")}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4 animate-in fade-in duration-500 w-full">

                    {/* Headline Result */}
                    <div className="text-center bg-[hsl(225_35%_12%)] border border-primary/20 rounded-xl pt-6 pb-5 px-4 relative overflow-hidden shadow-lg">
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/80" />
                      <div className="absolute inset-0 bg-primary/5 blur-[50px] pointer-events-none" />
                      <h3 className={`text-[28px] font-bold text-white leading-tight mb-2 relative z-10 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                        {isRtl ? `OMR ${formatNumber(totalRecoverableCapacity)} جهود سنوية جاهزة لإعادة التوجيه.` : `OMR ${formatNumber(totalRecoverableCapacity)} in annual capacity — ready to be redirected.`}
                      </h3>
                      <p className={`text-[13px] text-muted-foreground/90 mx-auto relative z-10 leading-relaxed ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                        {isRtl ? `لخدمة أفضل، وقرارات أسرع، وأعمال تحتاج فعلاً إلى عناية الفريق.` : `Capacity recovery for better service, faster decisions, and work that really needs teams attention.`}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                      <div className="md:col-span-2">
                        <ResultCard
                          label={isRtl ? "قيمة الجهود المهدرة / سنوياً" : "CAPACITY VALUE"}
                          value={`OMR ${formatNumber(trappedCapacityCost)} / ${isRtl ? "سنة" : "year"}`}
                          supporting={isRtl ? "القيمة السنوية للوقت المستغرق في مهام يدوية" : "Annual value of time in manual tasks"}
                          accent
                          isRtl={isRtl}
                        />
                      </div>
                      <ResultCard
                        label={isRtl ? "ساعات قابلة للاسترداد / سنوياً" : "HOURS RECOVERABLE"}
                        value={`${formatNumber(totalAnnualHours)} ${isRtl ? "س" : "hrs"} / ${isRtl ? "سنة" : "year"}`}
                        supporting={`${formatNumber(workingDaysRecoverable)} ${isRtl ? "أيام عمل سنوياً" : "working days annually"}`}
                        isRtl={isRtl}
                      />
                      <ResultCard
                        label={isRtl ? "فرصة تحسين الجودة / سنوياً" : "QUALITY OPPORTUNITY"}
                        value={`OMR ${formatNumber(qualityImprovementOpportunity)} / ${isRtl ? "سنة" : "year"}`}
                        supporting={isRtl ? "العائد السنوي من تقليل إعادة العمل" : "Annual gain from reducing rework"}
                        isRtl={isRtl}
                      />
                    </div>

                    <div className="mt-2 pt-4 border-t border-white/10 relative z-10 flex flex-col items-center">
                      <button
                        onClick={() => { setOpen(false); openCalendly(); }}
                        className="w-full btn-primary-hover bg-primary text-white text-[15px] font-bold px-8 py-3.5 rounded-xl shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300 hover:scale-[1.02]"
                      >
                        {t("roi.bookAssessment")}
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .no-scrollbar::-webkit-scrollbar {
          width: 0px;
          display: none;
        }
      `}</style>
    </>
  );
}

const ResultCard = ({ label, value, supporting, accent, isRtl }: { label: string; value: string; supporting: string; accent?: boolean; isRtl?: boolean }) => (
  <div className="rounded-xl p-4 bg-[hsl(225_35%_10%)] border border-white/5 flex flex-col justify-center transition-all hover:bg-[hsl(225_35%_12%)] shadow-md relative overflow-hidden group w-full">
    <div className={`absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${accent ? 'opacity-100' : ''}`} />
    <div className={`text-[11px] font-bold text-primary/80 tracking-[1px] mb-1.5 relative z-10 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : "font-mono uppercase"}`}>
      {label}
    </div>
    <div className={`text-[22px] font-bold font-mono leading-[1.1] mb-1.5 relative z-10 ${accent ? "text-primary drop-shadow-[0_0_8px_rgba(0,180,216,0.3)]" : "text-foreground"} ${isRtl ? "text-right" : ""}`}>
      {value}
    </div>
    <div className={`text-[12px] text-muted-foreground leading-snug mt-auto relative z-10 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : ""}`}>
      {supporting}
    </div>
  </div>
);
