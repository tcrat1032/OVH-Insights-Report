import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import CTABand from "@/components/site/CTABand";
import { Building2, Target, Users, MapPin } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useSeo({ title: 'About WularData — Indian Cloud & IT Support Partner', description: 'WularData is an Indian-owned provider of cloud, hosting, IT support and consulting with local data residency and 24x7 support.' });
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-white">
        <div className="container-wd py-20">
          <p className="eyebrow text-[hsl(var(--cyan))] mb-3">About WularData</p>
          <h1 className="text-4xl md:text-5xl font-extrabold max-w-3xl">An Indian infrastructure partner you can build a business on.</h1>
        </div>
      </section>
      <section className="section">
        <div className="container-wd grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our mission</h2>
            <p className="text-muted-foreground mb-4">WularData was founded to give Indian businesses world-class cloud, hosting and managed IT — without the complexity, hidden costs or distant support of overseas providers.</p>
            <p className="text-muted-foreground">From dedicated servers and managed databases to domain registration and on-site hardware support, we are the single partner that runs and scales your digital infrastructure.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Building2, t: "Indian-owned", d: "Headquartered and operated in India." },
              { icon: MapPin, t: "Local data residency", d: "Workloads stay in Indian data centers." },
              { icon: Users, t: "Customer-first", d: "Dedicated TAMs for enterprise customers." },
              { icon: Target, t: "Outcome-focused", d: "SLAs aligned to your business KPIs." },
            ].map(b => (
              <div key={b.t} className="rounded-lg border bg-card p-5">
                <b.icon className="h-6 w-6 text-[hsl(var(--cyan))] mb-2" />
                <h4 className="font-bold text-sm mb-1">{b.t}</h4>
                <p className="text-xs text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </PublicLayout>
  );
};
export default About;
