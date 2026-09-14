import { useEffect } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import PublicLayout from "@/components/site/PublicLayout";
import { useSeo } from "@/lib/seo";
import ServiceCard from "@/components/site/ServiceCard";
import CTABand from "@/components/site/CTABand";
import { PILLARS } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { useCmsServices } from "@/lib/cms";

const PillarPage = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, "");
  const pillar = PILLARS.find(p => p.slug === slug);
  const { data: cmsServices = [] } = useCmsServices();
  const managedServices = cmsServices.filter(service => service.pillar_slug === slug);

  useSeo({
    title: pillar ? `${pillar.name} — ${pillar.tagline} | WularData` : "WularData",
    description: pillar?.description.slice(0, 155),
    path: `/${slug}`,
  });

  useEffect(() => {
    if (pillar && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pillar]);

  if (!pillar) return <Navigate to="/" replace />;

  const Icon = pillar.icon;

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-hero text-white">
        <div className="container-wd py-16 md:py-24">
          <nav className="text-xs text-white/70 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-[hsl(var(--cyan))]">Home</Link>
            <span>/</span>
            <span>{pillar.name}</span>
          </nav>
          <div className="flex items-start gap-5 max-w-3xl">
            <div className="h-14 w-14 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <Icon className="h-7 w-7 text-[hsl(var(--cyan))]" />
            </div>
            <div>
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">{pillar.tagline}</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{pillar.name}</h1>
              <p className="text-white/85 md:text-lg">{pillar.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* In this section nav */}
      <section className="border-b bg-secondary sticky top-[100px] z-30 hidden md:block">
        <div className="container-wd py-3 flex flex-wrap gap-2">
          {(managedServices.length ? managedServices : pillar.services).map(s => (
            <a key={s.slug} href={`#${s.slug}`} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border hover:border-[hsl(var(--cyan))] hover:text-[hsl(var(--deep-blue))] transition-colors">
              {s.name}
            </a>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="section">
        <div className="container-wd">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managedServices.length ? managedServices.map(service => {
              const fallback = pillar.services.find(item => item.slug === service.slug) || pillar.services[0];
              if (!fallback) return null;
              return <ServiceCard key={service.slug} service={{ ...fallback, name: service.name, shortDesc: service.short_description, longDesc: service.long_description, features: Array.isArray(service.features) ? service.features.filter((item): item is string => typeof item === "string") : [] }} pillarSlug={pillar.slug} />;
            }) : pillar.services.map(s => <ServiceCard key={s.slug} service={s} pillarSlug={pillar.slug} />)}
          </div>
        </div>
      </section>

      {/* Other pillars */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <h2 className="text-2xl font-bold mb-8 text-center">Explore other services</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {PILLARS.filter(p => p.slug !== pillar.slug).map(p => (
              <Link key={p.slug} to={`/${p.slug}`} className="group rounded-lg bg-white p-6 shadow-card hover:shadow-elevated transition-all flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[hsl(var(--deep-blue))] group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </PublicLayout>
  );
};

export default PillarPage;
