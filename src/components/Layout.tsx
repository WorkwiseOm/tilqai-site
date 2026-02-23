import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isRtl } = useLanguage();

  return (
    <div className="noise-bg tech-grid min-h-screen flex flex-col" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar />
      <main id="page-wrapper" className="relative z-10 pt-14 page-transition flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
