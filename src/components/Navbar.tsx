import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { openCalendly } from "@/lib/calendly";
import tilqaiLogo from "@/assets/tilqai-logo-transparent.png";
import { useNavbarScroll } from "@/hooks/use-scroll-animations";
import { useLanguage } from "@/i18n/LanguageContext";
import { useHeroIntro } from "@/hooks/use-hero-intro";

const Navbar = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { locale, isRtl, setLocale, t } = useLanguage();
  const { introComplete } = useHeroIntro();

  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useNavbarScroll(50);

  const navLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.about"), path: "/about" },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (path === location.pathname) return;

    const wrapper = document.getElementById("page-wrapper");
    if (wrapper) wrapper.classList.add("fade-out");

    setTimeout(() => {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      if (wrapper) wrapper.classList.remove("fade-out");
    }, 250);
  };

  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");

  return (
    <nav
      className={`navbar-premium ${scrolled ? "scrolled" : ""} transition-all duration-700 ease-out ${introComplete
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-[60px] pointer-events-none"
        }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="flex h-14 items-center justify-between">
          <Link to="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center logo-hover relative group" style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none' }}>
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src={tilqaiLogo}
              alt="tilqai"
              className={`navbar-logo transition-none logo-entrance opacity-90${logoLoaded ? " logo-visible" : ""}`}
              style={{ background: 'transparent', border: 'none', boxShadow: 'none', outline: 'none', padding: 0 }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`px-3 py-1.5 text-[15px] transition-colors relative ${location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-primary" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 text-[13px] font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border/50 hover:border-primary/40"
            >
              <span className={locale === "en" ? "text-foreground font-semibold" : ""}>EN</span>
              <span className="text-border">|</span>
              <span className={locale === "ar" ? "text-foreground font-semibold" : ""}>عربي</span>
            </button>

            <button
              onClick={openCalendly}
              className="btn-primary-hover bg-primary text-primary-foreground text-[15px] font-medium px-4 py-1.5 rounded-md"
            >
              {t("nav.bookAssessment")}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-muted-foreground p-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border" style={{ background: "rgba(10, 15, 25, 0.95)" }}>
          <div className={`px-4 py-4 space-y-1 ${isRtl ? "text-right" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => { handleNavClick(e, link.path); setMobileOpen(false); }}
                className={`block px-3 py-2 text-sm rounded-md ${location.pathname === link.path
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-border flex flex-col gap-2">
              <button
                onClick={toggleLocale}
                className="flex items-center justify-center gap-1 text-[13px] font-mono text-muted-foreground px-2 py-2 rounded border border-border/50"
              >
                <span className={locale === "en" ? "text-foreground font-semibold" : ""}>EN</span>
                <span className="text-border">|</span>
                <span className={locale === "ar" ? "text-foreground font-semibold" : ""}>عربي</span>
              </button>
              <button
                onClick={() => { openCalendly(); setMobileOpen(false); }}
                className="w-full btn-primary-hover bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md"
              >
                {t("nav.bookAssessment")}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
