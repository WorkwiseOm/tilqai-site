import { useScrollReveal } from "@/hooks/use-animations";

const testimonials = [
  { company: "Meridian Finance", metric: "73% cost reduction", quote: "Automated invoice processing across 12 departments in under 6 weeks." },
  { company: "NovaCare Health", metric: "340% ROI in Year 1", quote: "Patient onboarding time dropped from 45 minutes to 8 minutes." },
  { company: "Atlas Logistics", metric: "12,000 hrs saved/yr", quote: "Route optimization and dispatch automation running at 99.7% accuracy." },
  { company: "Vertex Manufacturing", metric: "52% efficiency gain", quote: "Quality control reporting fully automated with real-time dashboards." },
];

const SocialProof = () => {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-divider mb-12" />
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-6">Deployment Records</div>
        <div ref={ref} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {testimonials.map((t) => (
            <div key={t.company} className="content-card rounded-md p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{t.company}</span>
                <span className="text-xs font-mono text-primary">{t.metric}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
