import { Link } from "react-router-dom";

const CTABand = () => (
  <section className="bg-gradient-hero text-white">
    <div className="container-wd py-14 md:py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to scale with WularData?</h2>
      <p className="text-white/80 max-w-2xl mx-auto mb-7">Talk to our infrastructure experts and get a tailored proposal for your workload — typically within one business day.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/contact" className="btn-cta">Request a quote</Link>
        <a href="tel:+919899313188" className="btn-outline-light">Call +91 9899313188</a>
      </div>
    </div>
  </section>
);

export default CTABand;
