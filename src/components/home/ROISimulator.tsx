import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFadeUp } from "@/hooks/use-scroll-animations";
import { openCalendly } from "@/lib/calendly";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export let openROIModal: () => void = () => { };

export default function ROISimulator() {
  const { t, isRtl } = useLanguage();
  const { ref: sectionRefFade, visible: sectionVisible } = useFadeUp();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [teamMembers, setTeamMembers] = useState<number>(5);
  const [salaryOption, setSalaryOption] = useState<"325-800" | "800-1200" | "1200-2000" | "2000+" | null>(null);
  const [manualHours, setManualHours] = useState<number>(10);
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
      // Optional: reset step when closing to start fresh next time
      setStep(1);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const salaryMidpoints = {
    '325-800': 562.5,
    '800-1200': 1000,
    '1200-2000': 1600,
    '2000+': 2500
  };

  const processMultipliers = {
    '1-3': 1.0,
    '4-6': 1.2,
    '7+': 1.4
  };

  const salaryOptions = [
    { key: "325-800", label: isRtl ? "325–800 ر.ع" : "OMR 325–800" },
    { key: "800-1200", label: isRtl ? "800–1,200 ر.ع" : "OMR 800–1,200" },
    { key: "1200-2000", label: isRtl ? "1,200–2,000 ر.ع" : "OMR 1,200–2,000" },
    { key: "2000+", label: isRtl ? "+2,000 ر.ع" : "OMR 2,000+" }
  ];

  const processOptions = [
    { key: "1-3", label: isRtl ? "1–3 عمليات" : "1–3 processes" },
    { key: "4-6", label: isRtl ? "4–6 عمليات" : "4–6 processes" },
    { key: "7+", label: isRtl ? "7 عمليات أو أكثر" : "7 or more" }
  ];

  const isComplete = salaryOption !== null && processOption !== null;

  let totalAnnualHours = 0;
  let trappedCapacityCost = 0;
  let qualityImprovementOpportunity = 0;
  let totalRecoverableCapacity = 0;
  let workingDaysRecoverable = 0;

  if (isComplete) {
    const salaryMidpoint = salaryMidpoints[salaryOption!];
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
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" style={{ animation: "fadeIn 0.3s ease-out" }}>
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div
            className="relative z-10 w-full max-w-[800px] max-md:max-w-[95vw] rounded-3xl border border-white/10 bg-[#060b13]/95 backdrop-blur-3xl shadow-[0_0_80px_hsl(var(--primary)/0.15)] flex flex-col"
            style={{ padding: "clamp(24px, 4vw, 40px)", maxHeight: "90vh", animation: "slideUpFade 0.4s ease-out" }}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none rounded-t-3xl" />

            <button
              onClick={() => setOpen(false)}
              className={`absolute top-6 ${isRtl ? "left-6" : "right-6"} text-muted-foreground hover:text-white transition-colors z-20 hover:rotate-90 duration-300 bg-white/5 hover:bg-white/10 p-2 rounded-full`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto no-scrollbar relative z-10 flex-1">
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2 text-[14px] text-muted-foreground hover:text-white transition-colors mb-6 w-fit ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}
                >
                  <BackIcon className="w-4 h-4" />
                  {isRtl ? "إعادة الحساب" : "Recalculate"}
                </button>
              )}

              <h2 className={`text-[28px] md:text-[36px] font-bold text-white leading-[1.15] mb-8 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                {step === 1 ? t("roi.headline") : (isRtl ? "النتائج التقديرية للسعة المستردة" : "Estimated Capacity Recovery")}
              </h2>

              {step === 1 ? (
                /* STEP 1: INPUTS (New Layer) */
                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 md:p-8 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">

                  {/* Input 1: Team Members */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                      <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                        {t("roi.field1Label")}
                      </label>
                      <div className="text-[24px] font-bold text-primary">{teamMembers}</div>
                    </div>
                    <Slider
                      value={[teamMembers]}
                      onValueChange={(v) => setTeamMembers(v[0])}
                      min={1}
                      max={50}
                      step={1}
                      dir={isRtl ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Input 2: Salary Range Dropdown */}
                  <div className="space-y-3">
                    <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                      {t("roi.field2Label")}
                    </label>
                    <Select value={salaryOption || undefined} onValueChange={(val: any) => setSalaryOption(val)} dir={isRtl ? "rtl" : "ltr"}>
                      <SelectTrigger className={`w-full bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-1 focus:ring-primary ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                        <SelectValue placeholder={isRtl ? "اختر النطاق" : "Select Option"} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#080f1a] border-white/10 text-white rounded-xl">
                        {salaryOptions.map((opt) => (
                          <SelectItem key={opt.key} value={opt.key} className={`focus:bg-primary/20 focus:text-white cursor-pointer py-3 ${isRtl ? "font-['Tajawal',sans-serif] flex-row-reverse" : ""}`}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Input 3: Manual Hours */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                      <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                        {t("roi.field3Label")}
                      </label>
                      <div className="text-[24px] font-bold text-primary">{manualHours}</div>
                    </div>
                    <Slider
                      value={[manualHours]}
                      onValueChange={(v) => setManualHours(v[0])}
                      min={1}
                      max={40}
                      step={1}
                      dir={isRtl ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Input 4: Processes Dropdown */}
                  <div className="space-y-3">
                    <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                      {t("roi.field4Label")}
                    </label>
                    <Select value={processOption || undefined} onValueChange={(val: any) => setProcessOption(val)} dir={isRtl ? "rtl" : "ltr"}>
                      <SelectTrigger className={`w-full bg-black/40 border-white/10 text-white h-12 rounded-xl focus:ring-1 focus:ring-primary ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                        <SelectValue placeholder={isRtl ? "اختر عدد العمليات" : "Select Option"} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#080f1a] border-white/10 text-white rounded-xl">
                        {processOptions.map((opt) => (
                          <SelectItem key={opt.key} value={opt.key} className={`focus:bg-primary/20 focus:text-white cursor-pointer py-3 ${isRtl ? "font-['Tajawal',sans-serif] flex-row-reverse" : ""}`}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 mt-8 border-t border-white/5">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!isComplete}
                      className="w-full btn-primary-hover bg-primary text-primary-foreground text-[16px] font-bold px-8 py-4 rounded-xl shadow-[0_4px_20px_hsl(var(--primary)/0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                    >
                      {isRtl ? "احسب السعة المستردة الأسبوعية" : "Calculate Recoverable Capacity"}
                    </button>
                    {!isComplete && (
                      <p className={`text-center text-[13px] text-muted-foreground mt-3 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                        {t("roi.completeFields")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* STEP 2: RESULTS (Pushed to new layer) */
                <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
                  {/* Headline Result */}
                  <div className="text-center bg-[hsl(225_35%_12%)] border border-primary/20 rounded-2xl pt-10 pb-8 px-5 backdrop-blur-sm relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/80" />
                    <div className="absolute inset-0 bg-primary/5 blur-[80px] pointer-events-none" />
                    <h3 className={`text-[32px] md:text-[42px] font-bold text-white leading-tight mb-4 relative z-10 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {t("roi.resultHeadline")
                        .replace("{val}", `${formatNumber(totalRecoverableCapacity)}`)
                        .replace("{totalRecoverableCapacity}", `${formatNumber(totalRecoverableCapacity)}`)}
                    </h3>
                    <p className={`text-[15px] text-muted-foreground/90 max-w-2xl mx-auto relative z-10 leading-relaxed ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {t("roi.resultSubtext")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ResultCard
                      label={t("roi.card1Label")}
                      value={`${formatNumber(totalAnnualHours)}`}
                      supporting={`${formatNumber(workingDaysRecoverable)} ${t("roi.card1Support")}`}
                      isRtl={isRtl}
                    />
                    <ResultCard
                      label={t("roi.card2Label")}
                      value={`OMR ${formatNumber(trappedCapacityCost)}`}
                      supporting={t("roi.card2Support")}
                      accent
                      isRtl={isRtl}
                    />
                    <ResultCard
                      label={t("roi.card3Label")}
                      value={`OMR ${formatNumber(qualityImprovementOpportunity)}`}
                      supporting={t("roi.card3Support")}
                      isRtl={isRtl}
                    />
                  </div>

                  <div className="mt-8 relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => { setOpen(false); openCalendly(); }}
                      className="w-full sm:w-auto btn-primary-hover bg-primary text-primary-foreground text-[16px] font-bold px-12 py-4 rounded-xl shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 transform hover:scale-105"
                    >
                      {t("roi.bookAssessment")}
                    </button>
                    <div className={`mt-4 text-[13px] text-muted-foreground/60 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {t("roi.bookAssessmentSub")}
                    </div>
                  </div>
                </div>
              )}
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
        /* Custom scrollbar handling for modal */
        .no-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .no-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .no-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .no-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 180, 216, 0.5); /* primary color */
        }
      `}</style>
    </>
  );
}

const ResultCard = ({ label, value, supporting, accent, isRtl }: { label: string; value: string; supporting: string; accent?: boolean; isRtl?: boolean }) => (
  <div className="rounded-2xl p-6 bg-[hsl(225_35%_10%)] border border-white/5 h-full flex flex-col justify-center transition-all hover:bg-[hsl(225_35%_12%)] shadow-md relative overflow-hidden group">
    <div className={`absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${accent ? 'opacity-100' : ''}`} />
    <div className={`text-[11px] font-bold text-primary/80 tracking-[2px] mb-2 relative z-10 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : "font-mono uppercase"}`}>
      {label}
    </div>
    <div className={`text-[28px] md:text-[32px] font-bold font-mono leading-tight mb-2 relative z-10 ${accent ? "text-primary drop-shadow-[0_0_8px_rgba(0,180,216,0.3)]" : "text-foreground"} ${isRtl ? "text-right" : ""}`}>
      {value}
    </div>
    <div className={`text-[13px] text-muted-foreground leading-relaxed mt-auto relative z-10 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : ""}`}>
      {supporting}
    </div>
  </div>
);
