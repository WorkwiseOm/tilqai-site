import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/use-seo";

const dict = {
    en: {
        title: "Privacy Policy",
        lastUpdated: "Last updated: November 2026",
        sections: [
            {
                title: "Section 1 — Who We Are",
                content: "Tilqai is an AI business process automation agency based in Muscat, Oman. Website: tilqai.om. Contact: hello@tilqai.om"
            },
            {
                title: "Section 2 — Information We Collect",
                content: "We only collect information you choose to give us:\n• When you book an assessment: your name, email address, company and any notes you add, through our Calendly booking form.\n• When you register interest on our Join Us page: your name, role or specialisation, an optional LinkedIn link, a short description of your work, and an optional CV.\n• When you email us: whatever you choose to include.\nWe do not ask for sensitive personal data."
            },
            {
                title: "Section 3 — Website Analytics",
                content: "We use Vercel Web Analytics to understand how the site is used: the number of visits, pages viewed, the website that referred you, your country, and your device and browser type. It does not use cookies and does not store information that identifies you; visits are counted with a temporary anonymous identifier that is discarded within 24 hours."
            },
            {
                title: "Section 4 — Cookies and Browser Storage",
                content: "Our website does not set cookies. We save your language choice (English or Arabic) in your browser's local storage so the site remembers it. The booking calendar (Calendly) loads only when you click \"Book Free Assessment\"; once it opens, Calendly may use its own cookies under its privacy policy."
            },
            {
                title: "Section 5 — Service Providers",
                content: "We use trusted providers to run this website: Vercel (hosting and analytics), Calendly (appointment scheduling), Resend (delivering Join Us submissions to our inbox), Google Workspace (our email) and Google Fonts (font files, which your browser downloads from Google, so Google receives your IP address). Some of these providers may process data outside Oman. We do not sell your data or use it for advertising."
            },
            {
                title: "Section 6 — How We Use Your Information",
                content: "We use your information to reply to your enquiries, schedule and deliver assessments, consider applications, and meet our legal obligations."
            },
            {
                title: "Section 7 — Data Retention",
                content: "We keep information only for as long as it is needed for the purpose it was collected for, and then delete it. You can ask us to delete your CV or any other data at any time."
            },
            {
                title: "Section 8 — Your Rights",
                content: "Under Oman's Personal Data Protection Law (Royal Decree 6/2022), you can ask to access, correct or delete your personal data, or withdraw your consent to its processing. Email hello@tilqai.om to exercise these rights."
            },
            {
                title: "Section 9 — Changes to This Policy",
                content: "We may update this policy from time to time. The date at the top of this page shows the latest revision."
            },
            {
                title: "Section 10 — Contact",
                content: "For privacy-related questions: hello@tilqai.om"
            }
        ],
        back: "← Back to Home"
    },
    ar: {
        title: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث: نوفمبر 2026",
        sections: [
            {
                title: "القسم 1 — من نحن",
                content: "تلقائي هي وكالة لأتمتة عمليات الأعمال بالذكاء الاصطناعي ومقرها مسقط، عُمان. الموقع الإلكتروني: tilqai.om. للتواصل: hello@tilqai.om"
            },
            {
                title: "القسم 2 — المعلومات التي نجمعها",
                content: "نجمع فقط المعلومات التي تختار تقديمها لنا:\n• عند حجز تقييم: اسمك وبريدك الإلكتروني واسم شركتك وأي ملاحظات تضيفها، عبر نموذج الحجز في Calendly.\n• عند إبداء اهتمامك بالعمل معنا من صفحة \"انضم إلينا\": اسمك وتخصصك ورابط LinkedIn (اختياري) ونبذة عن عملك وسيرتك الذاتية (اختيارية).\n• عند مراسلتنا بالبريد الإلكتروني: ما تختار إرساله.\nلا نطلب أي بيانات شخصية حساسة."
            },
            {
                title: "القسم 3 — تحليلات الموقع",
                content: "نستخدم Vercel Web Analytics لفهم طريقة استخدام الموقع: عدد الزيارات، والصفحات التي تمت مشاهدتها، والموقع الذي أحالك إلينا، والدولة، ونوع الجهاز والمتصفح. لا تستخدم هذه الأداة ملفات تعريف الارتباط ولا تحفظ معلومات تعرّف بك؛ إذ تُحتسب الزيارات بمعرّف مجهول مؤقت يُحذف خلال 24 ساعة."
            },
            {
                title: "القسم 4 — ملفات تعريف الارتباط والتخزين في المتصفح",
                content: "لا يضع موقعنا أي ملفات تعريف ارتباط. نحفظ اختيارك للغة (العربية أو الإنجليزية) في التخزين المحلي لمتصفحك حتى يتذكره الموقع. لا يُحمَّل تقويم الحجز (Calendly) إلا عند الضغط على زر \"احجز تقييماً مجانياً\"، وعندها قد يستخدم Calendly ملفات تعريف ارتباط خاصة به وفق سياسة الخصوصية لديه."
            },
            {
                title: "القسم 5 — مزوّدو الخدمات",
                content: "نعتمد على مزوّدين موثوقين لتشغيل هذا الموقع: Vercel (الاستضافة والتحليلات)، وCalendly (جدولة المواعيد)، وResend (إيصال طلبات صفحة \"انضم إلينا\" إلى بريدنا)، وGoogle Workspace (بريدنا الإلكتروني)، وGoogle Fonts (ملفات الخطوط التي يحمّلها متصفحك من Google، فيطّلع Google على عنوان IP الخاص بك). قد يعالج بعض هؤلاء المزوّدين البيانات خارج سلطنة عُمان. لا نبيع بياناتك ولا نستخدمها لأغراض إعلانية."
            },
            {
                title: "القسم 6 — كيف نستخدم معلوماتك",
                content: "نستخدم معلوماتك للرد على استفساراتك، وجدولة التقييمات وتقديمها، ودراسة طلبات العمل، والوفاء بالتزاماتنا القانونية."
            },
            {
                title: "القسم 7 — الاحتفاظ بالبيانات",
                content: "نحتفظ بالمعلومات فقط للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله، ثم نحذفها. يمكنك أن تطلب حذف سيرتك الذاتية أو أي بيانات أخرى في أي وقت."
            },
            {
                title: "القسم 8 — حقوقك",
                content: "وفقاً لقانون حماية البيانات الشخصية في سلطنة عُمان (المرسوم السلطاني رقم 6/2022)، يحق لك طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها، أو سحب موافقتك على معالجتها. راسلنا على hello@tilqai.om لممارسة هذه الحقوق."
            },
            {
                title: "القسم 9 — التغييرات على هذه السياسة",
                content: "قد نحدّث هذه السياسة من وقت لآخر. يوضّح التاريخ في أعلى هذه الصفحة آخر مراجعة."
            },
            {
                title: "القسم 10 — التواصل",
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

    useSEO({
        title: locale === "ar" ? "سياسة الخصوصية — تلقائي" : "Privacy Policy — Tilqai",
        description: locale === "ar"
            ? "سياسة الخصوصية لموقع تلقائي — كيف نجمع معلوماتك ونستخدمها ونحميها."
            : "Tilqai's privacy policy — how we collect, use, and protect your information.",
        url: "https://tilqai.om/privacy",
        lang: locale as "en" | "ar",
    });

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
                                <p className={`text-[16px] text-white/80 leading-[1.8] whitespace-pre-line ${fontClass}`}>
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
