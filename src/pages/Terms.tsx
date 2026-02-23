import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
    en: {
        title: "Terms of Service",
        lastUpdated: "Last updated: February 2026",
        sections: [
            {
                title: "Section 1 — Acceptance of Terms",
                content: "By accessing tilqai.om you agree to these terms. If you do not agree, please do not use this website."
            },
            {
                title: "Section 2 — Website Use",
                content: "This website is for informational purposes. You may not use it for unlawful purposes or in ways that could damage or impair its operation."
            },
            {
                title: "Section 3 — Intellectual Property",
                content: "All content on this website — including text, design, and brand identity — is the property of Tilqai and may not be reproduced without written permission."
            },
            {
                title: "Section 4 — Services",
                content: "The information on this website does not constitute a binding offer. All engagements are subject to a separate written agreement between Tilqai and the client."
            },
            {
                title: "Section 5 — Limitation of Liability",
                content: "Tilqai is not liable for any indirect or consequential loss arising from use of this website or reliance on its content."
            },
            {
                title: "Section 6 — Governing Law",
                content: "These terms are governed by the laws of the Sultanate of Oman."
            },
            {
                title: "Section 7 — Changes to Terms",
                content: "We reserve the right to update these terms at any time. Continued use of the website constitutes acceptance of the updated terms."
            },
            {
                title: "Section 8 — Contact",
                content: "For terms related queries: hello@tilqai.om"
            }
        ],
        back: "← Back to Home"
    },
    ar: {
        title: "شروط الخدمة",
        lastUpdated: "آخر تحديث: فبراير 2026",
        sections: [
            {
                title: "القسم 1 — قبول الشروط",
                content: "بوصولك إلى موقع tilqai.om فإنك توافق على هذه الشروط. إذا كنت لا توافق، يُرجى عدم استخدام هذا الموقع."
            },
            {
                title: "القسم 2 — استخدام الموقع",
                content: "هذا الموقع مخصص للأغراض المعلوماتية. لا يجوز لك استخدامه لأغراض غير قانونية أو بطرق قد تلحق الضرر أو تعطل تشغيله."
            },
            {
                title: "القسم 3 — الملكية الفكرية",
                content: "جميع المحتويات الموجودة على هذا الموقع — بما في ذلك النصوص والتصميم والهوية التجارية — هي ملكية خاصة لشركة تلقائي ولا يجوز إعادة إنتاجها دون إذن كتابي."
            },
            {
                title: "القسم 4 — الخدمات",
                content: "لا تشكل المعلومات الواردة في هذا الموقع عرضاً ملزماً. تخضع جميع الارتباطات والمشاريع لاتفاقية كتابية منفصلة بين تلقائي والعميل."
            },
            {
                title: "القسم 5 — تحديد المسؤولية",
                content: "شركة تلقائي غير مسؤولة عن أي خسارة غير مباشرة أو تبعية تنشأ عن استخدام هذا الموقع أو الاعتماد على محتواه."
            },
            {
                title: "القسم 6 — القانون الحاكم",
                content: "تخضع هذه الشروط لقوانين سلطنة عُمان."
            },
            {
                title: "القسم 7 — التغييرات على الشروط",
                content: "نحتفظ بالحق في تحديث هذه الشروط في أي وقت. استمرارك في استخدام الموقع يشكل قبولاً للشروط المحدثة."
            },
            {
                title: "القسم 8 — التواصل",
                content: "للاستفسارات المتعلقة بالشروط: hello@tilqai.om"
            }
        ],
        back: "العودة إلى الصفحة الرئيسية →"
    }
};

export default function Terms() {
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
