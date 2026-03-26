import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { useFadeUp } from "@/hooks/use-scroll-animations";
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
  const { ref: rolesRef, visible: rolesVisible } = useFadeUp();
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

  const tajawalText = isRtl ? "font-['Tajawal',sans-serif]" : "";

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const role = (data.get("role") as string)?.trim();
    const problem = (data.get("problem") as string)?.trim();
    if (!name || !role || !problem) return;

    setFormStatus("sending");

    try {
      const payload: Record<string, unknown> = {
        name,
        role,
        link: (data.get("link") as string)?.trim() || "",
        problem,
      };

      const file = data.get("attachment") as File | null;
      if (file && file.size > 0) {
        payload.cv = { filename: file.name, content: await fileToBase64(file) };
      }

      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
          <blockquote
            ref={rolesRef}
            className={`mb-16 fade-up ${rolesVisible ? "visible" : ""} ${tajawalText}`}
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
              borderLeft: isRtl ? "none" : "3px solid hsl(var(--primary))",
              borderRight: isRtl ? "3px solid hsl(var(--primary))" : "none",
              paddingLeft: isRtl ? 0 : 24,
              paddingRight: isRtl ? 24 : 0,
              textAlign: isRtl ? "right" : undefined,
            }}
          >
            {t("careers.roles.body")}
          </blockquote>

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

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 max-w-xl"
            >
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
