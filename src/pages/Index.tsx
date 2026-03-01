import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import PipelineSection from "@/components/home/PipelineSection";
import ROISimulator from "@/components/home/ROISimulator";
import { HeroIntroProvider } from "@/hooks/use-hero-intro";
import { useSEO } from "@/hooks/use-seo";
import { useLanguage } from "@/i18n/LanguageContext";

const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Tilqai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tilqai is an AI business process automation agency based in Muscat, Oman. We map, fix, and automate operational workflows for GCC businesses — starting with HR and extending across sales, operations, and compliance. Clients own the system we build."
      }
    },
    {
      "@type": "Question",
      "name": "What does Tilqai mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tilqai (تلقائي) means automatic or by itself in Arabic. The name reflects the core idea — work that runs by itself, without manual intervention."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Tilqai based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tilqai is based in Muscat, Oman and serves businesses across the GCC region."
      }
    },
    {
      "@type": "Question",
      "name": "What services does Tilqai offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tilqai offers HR workflow automation, sales process automation, operations automation, compliance automation, and customer support automation. All systems are built, documented, and handed over to the client."
      }
    },
    {
      "@type": "Question",
      "name": "Does Tilqai support on-premise deployment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Tilqai supports on-premise deployment for organisations where data sovereignty is required, including government entities, financial institutions, and healthcare providers."
      }
    },
    {
      "@type": "Question",
      "name": "How does Tilqai's process work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tilqai follows a three-phase process: Map (document workflows and identify automation opportunities), Build (develop and test the automation), and Launch & Improve (train the team, hand over full ownership, and expand)."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tilqai",
  "description": "AI business process automation agency in Muscat, Oman. Specialising in HR automation, sales automation, and operations automation for GCC businesses.",
  "url": "https://tilqai.om",
  "email": "hello@tilqai.om",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Muscat",
    "addressRegion": "Muscat",
    "addressCountry": "OM"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.5880,
    "longitude": 58.3829
  },
  "areaServed": ["OM", "AE", "SA", "KW", "QA", "BH"],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": ["https://www.linkedin.com/company/tilqai-om/"]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tilqai",
  "url": "https://tilqai.om",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://tilqai.om/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const Index = () => {
  const { locale } = useLanguage();

  useSEO({
    title: locale === "ar"
      ? "تلقائي — أتمتة الأعمال بالذكاء الاصطناعي في عُمان"
      : "Tilqai — AI Business Automation in Oman | HR & Operations Automation GCC",
    description: locale === "ar"
      ? "تلقائي تُساعد الشركات على أتمتة المهام التشغيلية المتكررة — من الموارد البشرية إلى العمليات والامتثال. نبني، ثم نُسلّمك النظام بالكامل."
      : "Tilqai maps, fixes, and automates the manual work slowing your team down. HR automation, operations, and compliance — built for GCC businesses. Based in Muscat, Oman.",
    url: "https://tilqai.om/",
    lang: locale as "en" | "ar",
  });

  return (
    <HeroIntroProvider>
      <Layout>
        <HeroSection />
        <PipelineSection />
        <ROISimulator />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </Layout>
    </HeroIntroProvider>
  );
};

export default Index;
