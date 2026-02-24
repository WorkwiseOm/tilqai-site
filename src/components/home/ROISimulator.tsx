import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFadeUp } from "@/hooks/use-scroll-animations";
import { openCalendly } from "@/lib/calendly";
import { X } from "lucide-react";

export let openROIModal: () => void = () => { };

export default function ROISimulator() {
  const { t, isRtl } = useLanguage();
  const { ref: sectionRefFade, visible: sectionVisible } = useFadeUp();
  const [open, setOpen] = useState(false);

  const [teamOption, setTeamOption] = useState<"1-5" | "6-15" | "16-30" | "30+" | null>(null);
  const [hoursOption, setHoursOption] = useState<"5-10" | "11-20" | "21-30" | "30+" | null>(null);

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
    '6-15': 10,
    '16-30': 23,
    '30+': 40
  };

  const hoursMidpoints = {
    '5-10': 7.5,
    '11-20': 15,
    '21-30': 25,
    '30+': 35
  };

  const teamOptions = [
    { key: "1-5", label: "1–5" },
    { key: "6-15", label: "6–15" },
    { key: "16-30", label: "16–30" },
    { key: "30+", label: isRtl ? "+30" : "30+" }
  ];

  const hoursOptions = [
    { key: "5-10", label: isRtl ? "5–10 ساعات" : "5–10 hrs" },
    { key: "11-20", label: isRtl ? "11–20 ساعة" : "11–20 hrs" },
    { key: "21-30", label: isRtl ? "21–30 ساعة" : "21–30 hrs" },
    { key: "30+", label: isRtl ? "+30 ساعة" : "30+ hrs" }
  ];

  const isComplete = teamOption !== null && hoursOption !== null;

  let annualManualHours = 0;
  let trappedCapacityCost = 0;
  let qualityOpportunity = 0;
  let totalRecoverableCapacity = 0;
  let monthlyCapacity = 0;
  let fiveYearCapacity = 0;
  let workingDaysLost = 0;

  if (isComplete) {
    const teamSizeMidpoint = teamMidpoints[teamOption!];
    const weeklyHoursMidpoint = hoursMidpoints[hoursOption!];

    const hourlyCost = 700 / 176;
    annualManualHours = weeklyHoursMidpoint * 52 * teamSizeMidpoint;
    trappedCapacityCost = hourlyCost * annualManualHours;
    qualityOpportunity = trappedCapacityCost * 0.15;
    totalRecoverableCapacity = trappedCapacityCost + qualityOpportunity;

    monthlyCapacity = Math.round(totalRecoverableCapacity / 12);
    fiveYearCapacity = Math.round(totalRecoverableCapacity * 5);
    workingDaysLost = Math.round(annualManualHours / 8);
  }

  const formatNumber = (num: number) => Math.round(num).toLocaleString();
  const arrowR = isRtl ? "←" : "→";

  return (
    <>
      <section className="py-8">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div className="section-divider mb-12" />
          <div ref={sectionRefFade} className={`text-center max-w-3xl mx-auto fade-up ${sectionVisible ? "visible" : ""}`}>
            <div className="section-label">{t("roi.sectionLabel")}</div>
            <h2 className={`text-2xl sm:text-4xl font-bold text-foreground mb-4 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
              {isRtl ? "كم من طاقة فريقك مقيّدة في العمل اليدوي؟" : "How Much of Your Team's Capacity Is Tied Up in Manual Work?"}
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
              {isRtl ? "سؤالان. رقم واحد." : "Two questions. One number."}
            </p>
            <button
              onClick={() => setOpen(true)}
              className="btn-outline-hover border border-white/30 bg-transparent text-white text-[16px] font-semibold px-8 py-3.5 rounded-lg hover:border-white hover:text-white hover:bg-transparent transition-all duration-300"
            >
              {isRtl ? "احسب السعة المستردة الأسبوعية" : "Calculate Recoverable Capacity"} {arrowR}
            </button>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-0 md:p-4 bg-[rgba(0,0,0,0.85)]" style={{ animation: "fadeIn 0.3s ease-out" }}>
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div
            className="relative z-[9999] w-full md:max-w-[900px] max-h-[100vh] md:max-h-[90vh] md:rounded-[16px] border-0 md:border md:border-[rgba(0,180,216,0.3)] bg-[#0f1f35] flex flex-col overflow-hidden"
            style={{ animation: "slideUpFade 0.4s ease-out" }}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none md:rounded-[16px]" />

            <button
              onClick={() => setOpen(false)}
              className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} text-white hover:text-white transition-colors z-20 duration-300 bg-white/10 hover:bg-white/20 p-2 rounded-full hidden md:block`}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 flex items-center justify-between border-b border-white/10 md:hidden relative z-20 bg-[#0f1f35]">
              <h2 className={`text-[16px] font-[600] text-white ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                {isRtl ? "سؤالان. رقم واحد." : "Two questions. One number."}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area - No Scroll Required */}
            <div className="relative z-10 flex-1 p-[20px] md:p-[40px] flex flex-col gap-6 md:gap-8 items-stretch overflow-y-auto md:overflow-visible">

              {/* Two inputs side by side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Input 1 */}
                <div className="space-y-3 md:space-y-4">
                  <label className={`block text-[16px] font-[600] text-white leading-snug ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                    {isRtl ? "كم عدد أعضاء الفريق الذين يتعاملون مع مهام يدوية أو متكررة؟" : "How many team members handle manual or repetitive tasks?"}
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {teamOptions.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => setTeamOption(opt.key as any)}
                        className={`py-2 px-1 md:py-3 text-[15px] font-semibold rounded-lg border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${teamOption === opt.key
                          ? "border-primary bg-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                          : "border-white/20 hover:border-white/40 text-muted-foreground hover:text-white"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 2 */}
                <div className="space-y-3 md:space-y-4">
                  <label className={`block text-[16px] font-[600] text-white leading-snug ${isRtl ? "font-['Tajawal',sans-serif] text-right" : ""}`}>
                    {isRtl ? "كم ساعة في الأسبوع يقضي كل شخص في المهام اليدوية؟" : "How many hours per week does each person spend on manual tasks?"}
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {hoursOptions.map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => setHoursOption(opt.key as any)}
                        className={`py-2 px-1 md:py-3 text-[15px] font-semibold rounded-lg border transition-all duration-300 ${isRtl ? "font-['Tajawal',sans-serif]" : ""} ${hoursOption === opt.key
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

              {/* Instant Results Area */}
              {isComplete && (
                <div className="flex flex-col space-y-4 md:space-y-5 animate-in slide-in-from-bottom-4 fade-in duration-500 mt-2">

                  {/* Headline Result Panel */}
                  <div className="text-center bg-[hsl(225_35%_12%)] border border-primary/40 rounded-2xl p-5 md:p-8 relative overflow-hidden shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
                    <div className="absolute inset-0 bg-primary/10 blur-[60px] pointer-events-none" />

                    <h3 className={`text-[28px] font-bold text-white leading-tight relative z-10 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {isRtl ? `OMR ${formatNumber(totalRecoverableCapacity)} من الطاقة السنوية جاهزة لإعادة التوجيه.` : `OMR ${formatNumber(totalRecoverableCapacity)} in annual capacity — ready to be redirected.`}
                    </h3>

                    <div className={`mt-4 space-y-2 relative z-10 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      <p className="text-[15px]">
                        {isRtl ? (
                          <>أي <span className="text-primary font-bold text-[15px]">OMR {formatNumber(monthlyCapacity)}</span> تغادر عملياتك كل شهر.</>
                        ) : (
                          <>That's <span className="text-primary font-bold text-[15px]">OMR {formatNumber(monthlyCapacity)}</span> leaving your operation every month.</>
                        )}
                      </p>
                      <p className="text-[15px]">
                        {isRtl ? (
                          <>على مدى 5 سنوات: <span className="text-white font-bold text-[15px]">OMR {formatNumber(fiveYearCapacity)}</span> من الطاقة القابلة للاسترداد.</>
                        ) : (
                          <>Over 5 years: <span className="text-white font-bold text-[15px]">OMR {formatNumber(fiveYearCapacity)}</span> in recoverable capacity.</>
                        )}
                      </p>
                    </div>

                    <p className={`mt-5 text-[15px] text-white/80 mx-auto relative z-10 leading-relaxed font-medium ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {isRtl ? `استرداد الطاقة لخدمة أفضل، وقرارات أسرع، وعمل يحتاج فعلاً إلى إنسان.` : `Capacity recovery for better service, faster decisions, and work that actually needs a human.`}
                    </p>
                    <p className={`mt-3 text-[11px] text-muted-foreground/60 italic mx-auto relative z-10 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {isRtl ? `بناءً على متوسط راتب شهري OMR 700. احجز تقييمك للحصول على رقم دقيق.` : `Based on an average salary of OMR 700/month. Book your assessment for a precise figure.`}
                    </p>
                  </div>

                  {/* Two Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <ResultCard
                      label={isRtl ? "ساعات قابلة للاسترداد سنوياً" : "HOURS RECOVERABLE"}
                      value={`${formatNumber(annualManualHours)} ${isRtl ? "س" : "hrs"} / ${isRtl ? "سنة" : "year"}`}
                      supporting={`${formatNumber(workingDaysLost)} ${isRtl ? "يوم عمل سنوياً" : "working days annually"}`}
                      isRtl={isRtl}
                    />
                    <ResultCard
                      label={isRtl ? "فرصة تحسين الجودة سنوياً" : "QUALITY OPPORTUNITY"}
                      value={`OMR ${formatNumber(qualityOpportunity)} / ${isRtl ? "سنة" : "year"}`}
                      supporting={isRtl ? "العائد السنوي من تقليل الأخطاء اليدوية" : "Estimated gain from reducing manual errors"}
                      isRtl={isRtl}
                    />
                  </div>

                  <div className="mt-3 relative z-10 flex flex-col items-center">
                    <button
                      onClick={() => { setOpen(false); openCalendly(); }}
                      className="w-auto min-w-[200px] bg-[#00b4d8] text-white text-[16px] font-[700] px-10 py-3.5 rounded-xl transition-colors duration-300 hover:bg-[#009ac2]"
                    >
                      {isRtl ? "احجز تقييماً مجانياً ←" : "Book Free Assessment →"}
                    </button>
                    <div className={`mt-2 text-[13px] text-muted-foreground/80 ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`}>
                      {isRtl ? "سنوضح لك بالضبط ما يمكن لفريقك القيام به بدلاً من ذلك." : "We will show you exactly what your team could be doing instead."}
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
        .no-scrollbar::-webkit-scrollbar {
          width: 0px;
          display: none;
        }
      `}</style>
    </>
  );
}

const ResultCard = ({ label, value, supporting, isRtl }: { label: string; value: string; supporting: string; isRtl?: boolean }) => (
  <div className="rounded-xl p-5 md:p-6 bg-[hsl(225_35%_10%)] border border-white/5 flex flex-col justify-center transition-all hover:bg-[hsl(225_35%_12%)] shadow-md relative overflow-hidden group w-full text-center md:text-left">
    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    <div className={`text-[11px] font-bold text-primary tracking-[2px] mb-2 relative z-10 ${isRtl ? "md:text-right font-['Tajawal',sans-serif]" : "font-mono uppercase"}`}>
      {label}
    </div>
    <div className={`text-[19px] lg:text-[20px] font-bold font-mono leading-[1.1] mb-2 relative z-10 text-white ${isRtl ? "md:text-right" : ""}`}>
      {value}
    </div>
    <div className={`text-[12px] lg:text-[13px] text-muted-foreground leading-snug mt-auto relative z-10 ${isRtl ? "md:text-right font-['Tajawal',sans-serif]" : ""}`}>
      {supporting}
    </div>
  </div>
);
