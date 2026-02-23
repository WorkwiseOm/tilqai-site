import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFadeUp } from "@/hooks/use-scroll-animations";
import { openCalendly } from "@/lib/calendly";

export let openROIModal: () => void = () => { };

export default function ROISimulator() {
  const { t, isRtl } = useLanguage();
  const { ref: sectionRefFade, visible: sectionVisible } = useFadeUp();
  const containerRef = useRef<HTMLElement>(null);

  const [teamMembers, setTeamMembers] = useState<number>(5);
  const [salaryOption, setSalaryOption] = useState<"500-800" | "800-1200" | "1200-2000" | "2000+" | null>(null);
  const [manualHours, setManualHours] = useState<number>(10);
  const [processOption, setProcessOption] = useState<"1-3" | "4-6" | "7+" | null>(null);

  useEffect(() => {
    openROIModal = () => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }, []);

  const salaryMidpoints = {
    '500-800': 650,
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
    { key: "500-800", label: isRtl ? "500–800 ر.ع" : "OMR 500–800" },
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

  return (
    <section ref={containerRef} className="py-20 lg:py-24 border-t border-white/5 relative overflow-hidden bg-[#060b13]">
      <div className="absolute inset-x-0 -top-40 h-[400px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10 lg:px-12 relative z-10" dir={isRtl ? "rtl" : "ltr"}>

        <div ref={sectionRefFade} className={`text-center max-w-2xl mx-auto mb-16 fade-up ${sectionVisible ? "visible" : ""}`}>
          <div className="section-label">{t("roi.sectionLabel")}</div>
          <h2 className={`text-[32px] md:text-[42px] font-bold text-white leading-[1.15] mb-4 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
            {t("roi.headline")}
          </h2>
          <p className={`text-[17px] text-muted-foreground ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
            {t("roi.subheadline")}
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl space-y-12">

          {/* Input 1: Team Members */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
              <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
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

          {/* Input 2: Salary Range */}
          <div className="space-y-5">
            <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
              {t("roi.field2Label")}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {salaryOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSalaryOption(opt.key as any)}
                  className={`py-3 px-2 text-sm font-medium rounded-lg border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${salaryOption === opt.key
                      ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                      : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input 3: Manual Hours */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
              <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
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

          {/* Input 4: Processes */}
          <div className="space-y-5">
            <label className={`block text-[15px] font-medium text-white/90 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
              {t("roi.field4Label")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {processOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setProcessOption(opt.key as any)}
                  className={`py-3 px-2 text-sm font-medium rounded-lg border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${processOption === opt.key
                      ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                      : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Area */}
        <div className="mt-16">
          {!isComplete ? (
            <div className="p-8 text-center border border-white/10 rounded-3xl bg-black/20">
              <p className={`text-[16px] text-muted-foreground ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                {t("roi.completeFields")}
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              {/* Three cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Headline Result */}
              <div className="text-center bg-[hsl(225_35%_10%)] border border-primary/20 rounded-3xl pt-12 pb-10 px-6 backdrop-blur-sm relative overflow-hidden mt-8 shadow-2xl">
                <div className="absolute inset-0 bg-primary/10 blur-[80px] pointer-events-none" />
                <h3 className={`text-[32px] md:text-[42px] font-bold text-white leading-tight mb-5 relative z-10 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                  {t("roi.resultHeadline")
                    .replace("{val}", `${formatNumber(totalRecoverableCapacity)}`)
                    .replace("{totalRecoverableCapacity}", `${formatNumber(totalRecoverableCapacity)}`)}
                </h3>
                <p className={`text-[17px] text-muted-foreground max-w-3xl mx-auto relative z-10 leading-relaxed ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                  {t("roi.resultSubtext")}
                </p>

                <div className="mt-10 relative z-10">
                  <button
                    onClick={openCalendly}
                    className="btn-primary-hover bg-primary text-primary-foreground text-[16px] font-bold px-10 py-4 rounded-xl shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 transform hover:scale-105"
                  >
                    {t("roi.bookAssessment")}
                  </button>
                  <div className={`mt-4 text-[14px] text-muted-foreground/70 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                    {t("roi.bookAssessmentSub")}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}

const ResultCard = ({ label, value, supporting, accent, isRtl }: { label: string; value: string; supporting: string; accent?: boolean; isRtl?: boolean }) => (
  <div className="rounded-3xl p-8 bg-[hsl(225_35%_10%)] border border-primary/30 h-full flex flex-col justify-center transition-all hover:bg-[hsl(225_35%_12%)] hover:border-primary/50 shadow-xl">
    <div className={`text-[12px] font-bold text-primary/90 tracking-[2px] mb-3 ${isRtl ? "text-right font-['Tajawal',sans-serif]" : "font-mono uppercase"}`}>
      {label}
    </div>
    <div className={`text-[40px] font-bold font-mono leading-tight mb-3 ${accent ? "text-primary drop-shadow-[0_0_12px_rgba(0,180,216,0.3)]" : "text-foreground"} ${isRtl ? "text-right" : ""}`}>
      {value}
    </div>
    <div className={`text-[14px] text-muted-foreground leading-relaxed mt-auto ${isRtl ? "text-right font-['Tajawal',sans-serif]" : ""}`}>
      {supporting}
    </div>
  </div>
);
