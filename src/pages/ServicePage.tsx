import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import PublicLayout from "@/components/site/PublicLayout";
import CTABand from "@/components/site/CTABand";
import { PILLARS } from "@/data/services";
import { useSeo } from "@/lib/seo";
import { ArrowRight, Check, Clock } from "lucide-react";

/**
 * Generic SEO-friendly page for any service that does not (yet) have a
 * hand-built page. Route: /:pillarSlug/:serviceSlug
 */
const ServicePage = () => {
  const { pillarSlug, serviceSlug } = useParams();
  const pillar = PILLARS.find((p) => p.slug === pillarSlug);
  const service = pillar?.services.find((s) => s.slug === serviceSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pillarSlug, serviceSlug]);

  useSeo({
    title: service ? `${service.name} | ${pillar!.name} | WularData` : "Page not found | WularData",
    description: service ? service.longDesc.slice(0, 155) : undefined,
    path: `/${pillarSlug}/${serviceSlug}`,
  });

  if (!pillar || !service) return <NotFound />;

  const Icon = service.icon;

  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-white">
        <div className="container-wd py-16 md:py-20">
          <nav className="text-xs text-white/70 mb-4 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-[hsl(var(--cyan))]">Home</Link>
            <span>/</span>
            <Link to={`/${pillar.slug}`} className="hover:text-[hsl(var(--cyan))]">{pillar.name}</Link>
            <span>/</span>
            <span>{service.name}</span>
          </nav>
          <div className="flex items-start gap-5 max-w-3xl">
            <div className="h-14 w-14 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <Icon className="h-7 w-7 text-[hsl(var(--cyan))]" />
            </div>
            <div>
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">{pillar.name}</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{service.name}</h1>
              <p className="text-white/85 md:text-lg">{service.longDesc}</p>
              {service.startingPrice && (
                <p className="mt-4 text-sm text-white/80">
                  Starting at <span className="text-xl font-bold text-[hsl(var(--cyan))]">{service.startingPrice}</span>/mo
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wd grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {detail && (
              <div className="mb-10 space-y-4 max-w-3xl">
                {detail.overview.map((p) => (
                  <p key={p.slice(0, 24)} className="text-muted-foreground">{p}</p>
                ))}
              </div>
            )}
            <h2 className="text-2xl font-bold mb-6">What's included</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-lg border bg-card p-4 text-sm">
                  <Check className="h-4 w-4 text-[hsl(var(--cyan))] shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-lg border bg-secondary p-6 h-fit">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-[hsl(var(--deep-blue))]" />
              <h2 className="text-lg font-bold">Talk to an engineer</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Tell us what you are running today and we will send a tailored proposal for {service.name},
              priced in rupees with no per-request surprises.
            </p>
            <Link
              to={`/contact?service=${encodeURIComponent(service.name)}&category=${encodeURIComponent(pillar.slug)}`}
              className="btn-primary-solid inline-flex items-center gap-2 !py-2.5"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      {detail?.plans && (
        <section className="section bg-secondary">
          <div className="container-wd">
            <h2 className="text-2xl font-bold mb-2">{detail.plans.heading}</h2>
            {detail.plans.note && (
              <p className="text-sm text-muted-foreground mb-8 max-w-3xl">{detail.plans.note}</p>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              {detail.plans.items.map((plan) => (
                <div key={plan.name} className="rounded-lg bg-white p-6 shadow-card flex flex-col">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="mt-2">
                    <span className="text-2xl font-extrabold text-[hsl(var(--deep-blue))]">{plan.price}</span>{" "}
                    <span className="text-xs text-muted-foreground">{plan.billing}</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {plan.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[hsl(var(--cyan))] shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.useCases && (
        <section className="section">
          <div className="container-wd">
            <h2 className="text-2xl font-bold mb-8">Where this fits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {detail.useCases.map((u) => (
                <div key={u.heading} className="rounded-lg border bg-card p-6">
                  <h3 className="font-bold mb-2">{u.heading}</h3>
                  <p className="text-sm text-muted-foreground">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail?.faqs && (
        <section className="section bg-secondary">
          <div className="container-wd max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
            <FaqAccordion faqs={detail.faqs} />
          </div>
        </section>
      )}


      <section className="section bg-secondary">
        <div className="container-wd">
          <h2 className="text-2xl font-bold mb-8 text-center">Other {pillar.name.toLowerCase()}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillar.services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                to={`/${pillar.slug}/${s.slug}`}
                className="group rounded-lg bg-white p-5 shadow-card hover:shadow-elevated transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.shortDesc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-[hsl(var(--deep-blue))] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </PublicLayout>
  );
};

export default ServicePage;
