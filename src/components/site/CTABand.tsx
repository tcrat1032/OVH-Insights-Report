import { Link } from "react-router-dom";
import { useCmsSettings } from "@/lib/cms";

const CTABand = () => {
  const { data } = useCmsSettings();
  const cta = data?.cta;
  const heading = typeof cta?.heading === "string" ? cta.heading : "Ready to scale with WularData?";
  const body = typeof cta?.body === "string" ? cta.body : "Talk to our infrastructure experts and get a tailored proposal for your workload — typically within one business day.";
  const primaryLabel = typeof cta?.primaryLabel === "string" ? cta.primaryLabel : "Request a quote";
  const primaryUrl = typeof cta?.primaryUrl === "string" ? cta.primaryUrl : "/contact";
  const secondaryLabel = typeof cta?.secondaryLabel === "string" ? cta.secondaryLabel : "Call +91 9899313188";
  const secondaryUrl = typeof cta?.secondaryUrl === "string" ? cta.secondaryUrl : "tel:+919899313188";
  return (
  <section className="bg-gradient-hero text-white">
    <div className="container-wd py-14 md:py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{heading}</h2>
      <p className="text-white/80 max-w-2xl mx-auto mb-7">{body}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to={primaryUrl} className="btn-cta">{primaryLabel}</Link>
        <a href={secondaryUrl} className="btn-outline-light">{secondaryLabel}</a>
      </div>
    </div>
  </section>
  );
};

export default CTABand;
