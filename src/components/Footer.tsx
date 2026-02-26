import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import tilqaiLogo from "@/assets/tilqai-logo-transparent.png";
import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";

const dict = {
    en: {
        tagline: "AI automation for businesses that run on process.",
        explore: "EXPLORE",
        home: "Home",
        services: "Services",
        about: "About",
        bookAssessmentBtn: "Book Free Assessment",
        servicesLabel: "SERVICES",
        hrAuto: "HR Automation",
        salesAuto: "Sales Automation",
        opsAuto: "Operations Automation",
        compAuto: "Compliance Automation",
        supportAuto: "Customer Support Automation",
        getInTouch: "GET IN TOUCH",
        location: "Muscat, Oman",
        bookAsses: "Book Free Assessment →",
        rights: "© 2025 Tilqai. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    },
    ar: {
        tagline: "أتمتة الذكاء الاصطناعي للأعمال التي تعتمد على العمليات التنظيمية.",
        explore: "استكشف",
        home: "الرئيسية",
        services: "الخدمات",
        about: "عن تلقائي",
        bookAssessmentBtn: "احجز تقييماً مجانياً",
        servicesLabel: "الخدمات",
        hrAuto: "أتمتة الموارد البشرية",
        salesAuto: "أتمتة المبيعات",
        opsAuto: "أتمتة العمليات",
        compAuto: "أتمتة الامتثال",
        supportAuto: "أتمتة دعم العملاء",
        getInTouch: "تواصل معنا",
        location: "مسقط، عُمان",
        bookAsses: "احجز تقييماً مجانياً ←",
        rights: "© 2025 تلقائي. جميع الحقوق محفوظة.",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة"
    }
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Tilqai",
    "description": "AI business process automation agency based in Muscat, Oman. Specialising in HR automation, sales automation, compliance automation, and operations automation for GCC businesses.",
    "url": "https://www.tilqai.com",
    "email": "hello@tilqai.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Muscat",
        "addressCountry": "OM"
    },
    "founder": {
        "@type": "Person",
        "name": "Tariq Al Maskari",
        "jobTitle": "Founder & Executive Director",
        "sameAs": "https://www.linkedin.com/in/tariqalmaskari/"
    },
    "areaServed": "GCC",
    "serviceType": [
        "HR Workflow Automation",
        "Sales Process Automation",
        "Compliance Automation",
        "Operations Automation",
        "Customer Support Automation"
    ],
    "knowsAbout": [
        "AI automation",
        "Business process automation",
        "HR automation",
        "GCC business operations",
        "On-premise AI deployment",
        "Workflow optimisation"
    ]
};

export default function Footer() {
    const { locale, isRtl } = useLanguage();
    const d = dict[locale as keyof typeof dict] || dict.en;

    const colClasses = "flex flex-col gap-3";
    const labelClasses = `text-[11px] text-primary uppercase tracking-[3px] font-bold mb-3 ${isRtl ? "font-['Tajawal',sans-serif]" : "font-mono"}`;
    const linkClasses = `text-[14px] text-muted-foreground hover:text-primary transition-colors duration-300 w-fit ${isRtl ? "font-['Tajawal',sans-serif]" : ""}`;
    const tajawalText = isRtl ? "font-['Tajawal',sans-serif]" : "";

    return (
        <footer className="bg-[#0a1628] pt-[60px] pb-[60px] relative z-[1]" dir={isRtl ? "rtl" : "ltr"}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 ${isRtl ? "text-right" : "text-left"}`}>

                    {/* Column 1 - Brand */}
                    <div className={`${colClasses} ${isRtl ? "items-start" : "items-start"} logo-container`} style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none', padding: 0 }}>
                        <img src={tilqaiLogo} alt="tilqai" className="footer-logo mb-2 opacity-90" style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none', padding: 0, borderRadius: 0 }} />
                        <p className={`text-[14px] leading-[1.6] text-muted-foreground max-w-xs ${tajawalText}`}>{d.tagline}</p>
                        <a href="https://www.linkedin.com/in/tariqalmaskari/" target="_blank" rel="noopener noreferrer" className="mt-4 text-primary hover:brightness-125 transition-all duration-300 transform hover:-translate-y-1 w-fit drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]">
                            <Linkedin size={28} strokeWidth={1.5} fill="currentColor" />
                        </a>
                    </div>

                    {/* Column 2 - Explore */}
                    <div className={colClasses}>
                        <div className={labelClasses}>{d.explore}</div>
                        <Link to="/" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.home}</Link>
                        <Link to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.services}</Link>
                        <Link to="/about" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.about}</Link>
                        <button onClick={openCalendly} className={linkClasses.replace("w-fit", "w-fit text-left hover:text-primary")}>{d.bookAssessmentBtn}</button>
                    </div>

                    {/* Column 3 - Services */}
                    <div className={colClasses}>
                        <div className={labelClasses}>{d.servicesLabel}</div>
                        <Link to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.hrAuto}</Link>
                        <Link to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.salesAuto}</Link>
                        <Link to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.opsAuto}</Link>
                        <Link to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.compAuto}</Link>
                        <Link to="/services" className={linkClasses} onClick={() => window.scrollTo(0, 0)}>{d.supportAuto}</Link>
                    </div>

                    {/* Column 4 - Get in Touch */}
                    <div className={colClasses}>
                        <div className={labelClasses}>{d.getInTouch}</div>
                        <a href="mailto:hello@tilqai.com" className={linkClasses}>hello@tilqai.com</a>
                        <span className={`text-[14px] text-muted-foreground ${tajawalText}`}>{d.location}</span>
                        <button onClick={openCalendly} className={`text-[14px] text-primary hover:brightness-125 transition-colors mt-2 font-medium w-fit ${tajawalText}`}>
                            {d.bookAsses}
                        </button>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className={`pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 ${isRtl ? "text-right" : "text-left"}`}>
                    <div className={`text-[12px] text-muted-foreground/60 ${tajawalText}`}>
                        {d.rights}
                    </div>
                    <div className={`flex gap-3 text-[12px] text-muted-foreground/60 ${tajawalText}`}>
                        <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors cursor-pointer w-fit">{d.privacy}</Link>
                        <span>·</span>
                        <Link to="/terms" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors cursor-pointer w-fit">{d.terms}</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
