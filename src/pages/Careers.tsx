import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Cog, ClipboardList, Search } from "lucide-react";
import { useFadeUp, useStaggerReveal } from "@/hooks/use-scroll-animations";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSEO } from "@/hooks/use-seo";

const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Careers at Tilqai",
  "description":
    "Join Tilqai — an AI automation agency in Muscat, Oman. We build automation systems, hand them over, and move on. Express interest in future roles.",
  "url": "https://tilqai.om/careers",
  "publisher": {
    "@type": "Organization",
    "name": "Tilqai",
    "url": "https://tilqai.om",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Muscat",
      "addressCountry": "OM",
    },
  },
};

type FormStatus = "idle" | "sending" | "sent" | "error";

const Careers = () => {
  const { t, isRtl, locale } = useLanguage();
  const { ref: heroRef, visible: heroVisible } = useFadeUp();
  const { ref: workRef, visible: workVisible } = useFadeUp();
  const { ref: rolesRef, visibleItems: rolesVisible } = useStaggerReveal(3, 150);
  const { ref: ctaRef, visible: ctaVisible } = useFadeUp();

  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useSEO({
    title:
      locale === "ar"
        ? "انضم إلينا — تلقائي | وظائف أتمتة الأعمال في مسقط، عُمان"
        : "Careers — Join Tilqai | AI Automation Agency in Muscat, Oman",
    description:
      locale === "ar"
        ? "انضم إلى تلقائي — وكالة أتمتة الأعمال في مسقط، عُمان. نبني أنظمة أتمتة واقعية ونسلّمها بالكامل."
        : "Join Tilqai — an AI automation agency in Muscat, Oman. We build automation systems that work, hand them over, and move on to the next problem.",
    url: "https://tilqai.om/careers",
    lang: locale as "en" | "ar",
  });

  const workItems = [
    {
      title: t("careers.work.item1.title"),
      desc: t("careers.work.item1.desc"),
    },
    {
      title: t("careers.work.item2.title"),
      desc: t("careers.work.item2.desc"),
    },
    {
      title: t("careers.work.item3.title"),
      desc: t("careers.work.item3.desc"),
    },
    {
      title: t("careers.work.item4.title"),
      desc: t("careers.work.item4.desc"),
    },
  ];

  const roles = [
    {
      icon: Cog,
      title: t("careers.roles.r1.title"),
      desc: t("careers.roles.r1.desc"),
    },
    {
      icon: ClipboardList,
      title: t("careers.roles.r2.title"),
      desc: t("careers.roles.r2.desc"),
    },
    {
      icon: Search,
      title: t("careers.roles.r3.title"),
      desc: t("careers.roles.r3.desc"),
    },
  ];

  const tajawalText = isRtl ? "font-['Tajawal',sans-serif]" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (
      !(data.get("name") as string)?.trim() ||
      !(data.get("role") as string)?.trim() ||
      !(data.get("problem") as string)?.trim()
    )
      return;

    setFormStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/hello@tilqai.com", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          {/* ── Hero ────────────────────────────────────────────── */}
          <div
            ref={heroRef}
            className={`depth-panel rounded-md p-8 md:p-12 mb-12 fade-up ${heroVisible ? "visible" : ""} ${isRtl ? "text-right" : ""}`}
          >
            <h1
              className={`text-[32px] md:text-[44px] font-bold text-foreground leading-[1.15] mb-3 ${tajawalText}`}
            >
              {t("careers.hero.headline")}
            </h1>
            <p
              className={`text-[20px] md:text-[24px] font-semibold text-primary mb-6 leading-[1.4] ${tajawalText}`}
            >
              {t("careers.hero.subheadline")}
            </p>
            <div className="space-y-4 max-w-3xl">
              <p
                className={`text-[16px] md:text-[18px] text-muted-foreground leading-[1.8] ${tajawalText}`}
              >
                {t("careers.hero.p1")}
              </p>
              <p
                className={`text-[16px] md:text-[18px] text-muted-foreground leading-[1.8] ${tajawalText}`}
              >
                {t("careers.hero.p2")}
              </p>
              <p
                className={`text-[16px] md:text-[18px] text-muted-foreground leading-[1.8] font-medium ${tajawalText}`}
              >
                {t("careers.hero.p3")}
              </p>
            </div>
          </div>

          {/* ── What the Work Is Actually Like ──────────────────── */}
          <div className="section-divider mb-12" />
          <div className={`section-label mb-6 ${tajawalText}`}>
            {t("careers.work.sectionLabel")}
          </div>
          <div
            ref={workRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 fade-up ${workVisible ? "visible" : ""}`}
          >
            {workItems.map((item) => (
              <div
                key={item.title}
                className={`content-card rounded-md p-6 ${isRtl ? "text-right" : ""}`}
              >
                <h3
                  className={`text-[17px] font-bold text-foreground mb-2 ${tajawalText}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-[15px] text-muted-foreground leading-[1.7] ${tajawalText}`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── Who Thrives Here ────────────────────────────────── */}
          <div className="section-divider mb-12" />
          <div className={`section-label mb-6 ${tajawalText}`}>
            {t("careers.roles.sectionLabel")}
          </div>
          <div className={`mb-8 max-w-3xl ${isRtl ? "text-right" : ""}`}>
            <p
              className={`text-[16px] text-muted-foreground leading-[1.8] mb-2 ${tajawalText}`}
            >
              {t("careers.roles.intro")}
            </p>
            <p
              className={`text-[16px] text-muted-foreground leading-[1.8] font-medium ${tajawalText}`}
            >
              {t("careers.roles.subIntro")}
            </p>
          </div>

          <div
            ref={rolesRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16"
          >
            {roles.map((role, i) => (
              <div
                key={role.title}
                className={`card-hover content-card rounded-md p-6 fade-up ${rolesVisible[i] ? "visible" : ""} ${isRtl ? "text-right" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-md bg-secondary flex items-center justify-center mb-4 ${isRtl ? "ml-auto" : ""}`}
                >
                  <role.icon className="w-5 h-5 text-primary" />
                </div>
                <h3
                  className={`text-[20px] font-bold text-foreground mb-2 ${tajawalText}`}
                >
                  {role.title}
                </h3>
                <p
                  className={`text-[15px] text-muted-foreground leading-[1.7] ${tajawalText}`}
                >
                  {role.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── Express Interest CTA + Form ────────────────────── */}
          <div className="section-divider mb-12" />
          <div
            ref={ctaRef}
            className={`depth-panel rounded-md p-8 md:p-12 fade-up ${ctaVisible ? "visible" : ""} ${isRtl ? "text-right" : ""}`}
          >
            <h2
              className={`text-[28px] md:text-[36px] font-bold text-foreground mb-3 leading-[1.2] ${tajawalText}`}
            >
              {t("careers.cta.headline")}
            </h2>
            <p
              className={`text-[16px] text-muted-foreground mb-1 leading-[1.6] ${tajawalText}`}
            >
              {t("careers.cta.body")}
            </p>
            <p
              className={`text-[16px] text-muted-foreground mb-8 leading-[1.6] ${tajawalText}`}
            >
              {t("careers.cta.subtext")}
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 max-w-xl"
            >
              {/* FormSubmit config */}
              <input type="hidden" name="_subject" value="Career Interest — tilqai.om/careers" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="text"
                name="name"
                required
                placeholder={t("careers.form.name")}
                className={`w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors ${tajawalText}`}
              />
              <input
                type="text"
                name="role"
                required
                placeholder={t("careers.form.role")}
                className={`w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors ${tajawalText}`}
              />
              <input
                type="url"
                name="link"
                placeholder={t("careers.form.link")}
                className={`w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors ${tajawalText}`}
              />
              <textarea
                name="problem"
                required
                rows={4}
                placeholder={t("careers.form.problem")}
                className={`w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none ${tajawalText}`}
              />
              <div>
                <label
                  className={`block text-[13px] text-muted-foreground/60 mb-1.5 ${tajawalText}`}
                >
                  {t("careers.form.cv")}
                </label>
                <input
                  type="file"
                  name="attachment"
                  accept=".pdf"
                  className="text-[14px] text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-[13px] file:text-foreground file:cursor-pointer hover:file:bg-secondary/80 transition-colors"
                />
              </div>

              {formStatus === "sent" && (
                <p className={`text-[14px] text-primary ${tajawalText}`}>
                  {t("careers.form.sent")}
                </p>
              )}
              {formStatus === "error" && (
                <p className={`text-[14px] text-red-400 ${tajawalText}`}>
                  {t("careers.form.error")}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className={`btn-primary-hover bg-primary text-primary-foreground text-[15px] font-medium px-6 py-2.5 rounded-md disabled:opacity-50 ${tajawalText}`}
              >
                {formStatus === "sending"
                  ? t("careers.form.sending")
                  : t("careers.cta.button")}
              </button>
            </form>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
    </Layout>
  );
};

export default Careers;
