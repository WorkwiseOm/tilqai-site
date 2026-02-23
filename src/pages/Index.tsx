import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import PipelineSection from "@/components/home/PipelineSection";
import ROISimulator from "@/components/home/ROISimulator";
import { HeroIntroProvider } from "@/hooks/use-hero-intro";

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
        "text": "Tilqai follows a four-phase process: Map (document workflows and identify automation opportunities), Build (develop and test the automation), Control (set access rules and audit trails), and Own (train the team and hand over full ownership)."
      }
    }
  ]
};

const Index = () => {
  return (
    <HeroIntroProvider>
      <Layout>
        <HeroSection />
        <PipelineSection />
        <ROISimulator />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      </Layout>
    </HeroIntroProvider>
  );
};

export default Index;
