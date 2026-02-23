import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
    en: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: February 2026",
        sections: [
            {
                title: "Section 1 — Who We Are",
                content: "Tilqai is an AI business process automation agency based in Muscat, Oman. Website: tilqai.om. Contact: hello@tilqai.om"
            },
            {
                title: "Section 2 — Information We Collect",
                content: "We collect information you voluntarily provide when booking an assessment or contacting us — including your name, email address, company name, and job title. We do not collect sensitive personal data."
            },
            {
                title: "Section 3 — How We Use Your Information",
                content: "Information you provide is used solely to respond to your enquiry and schedule your assessment. We do not sell, share, or distribute your data to third parties."
            },
            {
                title: "Section 4 — Cookies",
                content: "This website uses minimal cookies for basic functionality and analytics. No advertising or tracking cookies are used."
            },
            {
                title: "Section 5 — Data Storage",
                content: "Your data is stored securely and retained only as long as necessary to fulfil the purpose for which it was collected."
            },
            {
                title: "Section 6 — Your Rights",
                content: "You have the right to request access to, correction of, or deletion of your personal data at any time. Contact us at hello@tilqai.om to exercise these rights."
            },
            {
                title: "Section 7 — Changes to This Policy",
                content: "We may update this policy periodically. The date at the top of this page reflects the most recent revision."
            },
            {
                title: "Section 8 — Contact",
                content: "For privacy related queries: hello@tilqai.om"
            }
        ],
        back: "← Back to Home"
    },
    ar: {
        title: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث: فبراير 2026",
        sections: [
            {
                title: "القسم 1 — من نحن",
                content: "تلقائي هي وكالة لأتمتة عمليات الأعمال بالذكاء الاصطناعي ومقرها مسقط، عُمان. الموقع الإلكتروني: tilqai.om. للتواصل: hello@tilqai.om"
            },
            {
                title: "القسم 2 — المعلومات التي نجمعها",
                content: "نقوم بجمع المعلومات التي تقدمها طواعية عند حجز تقييم أو التواصل معنا — بما في ذلك اسمك وعنوان بريدك الإلكتروني واسم شركتك والمسمى الوظيفي. نحن لا نجمع بيانات شخصية حساسة."
            },
            {
                title: "القسم 3 — كيف نستخدم معلوماتك",
                content: "تُستخدم المعلومات التي تقدمها فقط للرد على استفسارك وجدولة التقييم الخاص بك. نحن لا نبيع أو نشارك أو نوزع بياناتك لأطراف ثالثة."
            },
            {
                title: "القسم 4 — ملفات تعريف الارتباط (الكوكيز)",
                content: "يستخدم هذا الموقع الحد الأدنى من ملفات تعريف الارتباط للوظائف الأساسية والتحليلات. لا يتم استخدام ملفات تعريف ارتباط للإعلانات أو التتبع."
            },
            {
                title: "القسم 5 — تخزين البيانات",
                content: "يتم تخزين بياناتك بشكل آمن والاحتفاظ بها فقط طوال المدة اللازمة لتحقيق الغرض الذي جُمعت من أجله."
            },
            {
                title: "القسم 6 — حقوقك",
                content: "يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. تواصل معنا على hello@tilqai.om لممارسة هذه الحقوق."
            },
            {
                title: "القسم 7 — التغييرات على هذه السياسة",
                content: "قد نقوم بتحديث هذه السياسة بشكل دوري. يعكس التاريخ الموجود في أعلى هذه الصفحة أحدث مراجعة."
            },
            {
                title: "القسم 8 — التواصل",
                content: "للاستفسارات المتعلقة بالخصوصية: hello@tilqai.om"
            }
        ],
        back: "العودة إلى الصفحة الرئيسية →"
    }
};

export default function Privacy() {
    const { locale, isRtl } = useLanguage();
    const d = dict[locale as keyof typeof dict] || dict.en;

    const fontClass = isRtl ? "font-['Tajawal',sans-serif]" : "";

    return (
        <Layout>
            <div className="py-20 lg:py-24 bg-[#0a1628] min-h-screen border-b border-white/5">
                <div className={`mx-auto max-w-[800px] px-6 sm:px-10 lg:px-12 ${isRtl ? "text-right" : "text-left"}`}>

                    <h1 className={`text-[36px] md:text-[48px] font-bold text-white mb-2 ${fontClass}`}>
                        {d.title}
                    </h1>
                    <p className={`text-[14px] text-muted-foreground mb-12 ${fontClass}`}>
                        {d.lastUpdated}
                    </p>

                    <div className="space-y-10">
                        {d.sections.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                                <h2 className={`text-[12px] text-primary uppercase tracking-[3px] font-bold ${isRtl ? "font-['Tajawal',sans-serif]" : "font-mono"}`}>
                                    {section.title}
                                </h2>
                                <p className={`text-[16px] text-white/80 leading-[1.8] ${fontClass}`}>
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)} className={`text-primary hover:brightness-125 transition-colors font-medium inline-block ${fontClass}`}>
                            {d.back}
                        </Link>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
