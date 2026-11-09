/**
 * Copy for the hero "HR → business results" animation.
 *
 * Each HR activity sends documents; the number after each document is the
 * index of the business-result card it feeds. Every document also adds to
 * "Operating cost saved" (the `money` card) and "Hours back" (the `featured` card).
 *
 * NOTE: the figures are illustrative. Replace them with real client results
 * before removing the "Illustrative figures" note.
 */

export type HrFlowSource = { icon: keyof typeof ICONS; name: string; docs: [label: string, cardIndex: number][] };
export type HrFlowCard = {
  name: string;
  kpi: string;
  pre?: string;
  unit?: string;
  delta: string;
  sub: string;
  money?: boolean;
  featured?: boolean;
  goal?: number;
};
export type HrFlowCopy = {
  inLabel: string;
  outLabel: string;
  illustrative: string;
  ready: string;
  working: string;
  waiting: string;
  processing: string;
  steps: [string, string, string];
  today: string;
  sources: HrFlowSource[];
  cards: HrFlowCard[];
  plusMoney: (n: number) => string;
};

export const ICONS = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  userplus: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c.8-3.8 3.5-6 6.5-6s5.7 2.2 6.5 6M19 8v6M16 11h6"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
} as const;

export const HR_FLOW_COPY: Record<"en" | "ar", HrFlowCopy> = {
  en: {
    inLabel: "HR activities",
    outLabel: "Business results",
    illustrative: "Illustrative figures",
    ready: "Ready",
    working: "Working",
    waiting: "Waiting for work…",
    processing: "Processing",
    steps: ["Read", "Check", "Done"],
    today: "Handled today",
    sources: [
      { icon: "search", name: "Recruitment", docs: [["CV — Sales lead", 1], ["Interview scorecard", 1]] },
      { icon: "userplus", name: "Onboarding", docs: [["Employment contract", 1], ["Labour permit", 3]] },
      { icon: "book", name: "Learning & development", docs: [["Training plan", 1], ["Course completion", 2], ["Skills assessment", 1]] },
      { icon: "target", name: "Performance", docs: [["Goal check-in", 1], ["Appraisal form", 2]] },
      { icon: "heart", name: "Engagement", docs: [["Pulse survey", 2], ["Recognition award", 2], ["Exit interview", 2]] },
      { icon: "cal", name: "Leave & attendance", docs: [["Leave request", 3], ["Attendance log", 3]] },
      { icon: "cash", name: "Payroll", docs: [["WPS salary file", 3], ["Overtime sheet", 3]] },
    ],
    cards: [
      { name: "Operating cost saved", pre: "OMR", kpi: "48,600", delta: "this year", sub: "annualised, from automation", money: true },
      { name: "Workforce productivity", pre: "+", kpi: "18", unit: "%", delta: "▲ YoY", sub: "output per employee" },
      { name: "Employee retention", kpi: "92", unit: "%", delta: "▲ 6 pts", sub: "12-month rolling" },
      { name: "Compliance penalties", kpi: "0", delta: "100% compliant", sub: "MoL & WPS audits" },
      { name: "Hours back for strategic work", kpi: "312", unit: "h", delta: "this month", featured: true, goal: 400, sub: "of 400 h goal" },
    ],
    plusMoney: n => `+OMR ${n}`,
  },
  ar: {
    inLabel: "أنشطة الموارد البشرية",
    outLabel: "نتائج الأعمال",
    illustrative: "أرقام توضيحية",
    ready: "جاهز",
    working: "يعمل",
    waiting: "بانتظار العمل…",
    processing: "جارٍ معالجة",
    steps: ["قراءة", "تدقيق", "إنجاز"],
    today: "أُنجز اليوم",
    sources: [
      { icon: "search", name: "التوظيف", docs: [["سيرة ذاتية — مبيعات", 1], ["تقييم مقابلة", 1]] },
      { icon: "userplus", name: "تهيئة الموظفين الجدد", docs: [["عقد عمل", 1], ["تصريح عمل", 3]] },
      { icon: "book", name: "التعلّم والتطوير", docs: [["خطة تدريب", 1], ["إتمام دورة", 2], ["تقييم المهارات", 1]] },
      { icon: "target", name: "إدارة الأداء", docs: [["متابعة الأهداف", 1], ["نموذج تقييم الأداء", 2]] },
      { icon: "heart", name: "ارتباط الموظفين", docs: [["استبيان نبض", 2], ["تكريم موظف", 2], ["مقابلة خروج", 2]] },
      { icon: "cal", name: "الإجازات والحضور", docs: [["طلب إجازة", 3], ["سجل الحضور", 3]] },
      { icon: "cash", name: "الرواتب", docs: [["ملف حماية الأجور", 3], ["كشف العمل الإضافي", 3]] },
    ],
    cards: [
      { name: "تكاليف تشغيلية موفّرة", kpi: "48,600", unit: "ر.ع.", delta: "هذا العام", sub: "سنوياً بفضل الأتمتة", money: true },
      { name: "إنتاجية القوى العاملة", pre: "+", kpi: "18", unit: "%", delta: "▲ سنوياً", sub: "إنتاجية الموظف الواحد" },
      { name: "الاحتفاظ بالموظفين", kpi: "92", unit: "%", delta: "▲ 6 نقاط", sub: "آخر 12 شهراً" },
      { name: "مخالفات الامتثال", kpi: "0", delta: "امتثال 100%", sub: "تدقيقات وزارة العمل وحماية الأجور" },
      { name: "ساعات للعمل الاستراتيجي", kpi: "312", unit: "ساعة", delta: "هذا الشهر", featured: true, goal: 400, sub: "من هدف 400 ساعة" },
    ],
    plusMoney: n => `+${n} ر.ع.`,
  },
};
