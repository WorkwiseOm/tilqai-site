import { openCalendly } from "@/lib/calendly";
import { useLanguage } from "@/i18n/LanguageContext";

const FooterCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="section-divider mb-12" />
        <div className="depth-panel rounded-md p-10 text-center">
          <p className="text-lg text-foreground mb-4">{t("footerCta.heading")}</p>
          <button
            onClick={openCalendly}
            className="btn-primary-hover inline-block bg-primary text-primary-foreground text-sm font-medium px-6 py-2.5 rounded-md"
          >
            {t("footerCta.button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
