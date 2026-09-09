import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import CTABand from "@/components/site/CTABand";
import { APP_HOSTING_PRODUCTS, APP_HOSTING_CATEGORIES, type AppHostingCategory } from "@/data/applicationHosting";
import { Rocket, ShieldCheck, Globe2, Zap, Layers, Workflow, ArrowRight, Check, Search, Star } from "lucide-react";

const CAPABILITIES = [
  { icon: Rocket, title: "Deploy in minutes", desc: "Git-push or CLI deploys with zero-downtime rollouts and instant rollbacks." },
  { icon: Zap, title: "Auto-scaling", desc: "Scale horizontally on CPU, memory or custom metrics — pay only for what you use." },
  { icon: ShieldCheck, title: "Secure by default", desc: "Free TLS, network isolation, secrets vault and built-in DDoS protection." },
  { icon: Layers, title: "Open standards", desc: "OCI containers, S3 storage, Kubernetes and Postgres — no proprietary lock-in." },
  { icon: Workflow, title: "Integrated CI/CD", desc: "Build, test and deploy pipelines wired to your Git provider out of the box." },
  { icon: Globe2, title: "India-hosted", desc: "Mumbai-region data centers with optional multi-region replication." },
];

const USE_CASES = [
  { t: "SaaS & web apps", d: "Multi-tenant SaaS, internal tools and public web apps with autoscaling and managed databases." },
  { t: "APIs & microservices", d: "Run REST/gRPC APIs and event-driven microservices on managed Kubernetes or runtime." },
  { t: "Data & AI workloads", d: "Host inference endpoints, ETL pipelines and analytics stores close to your data." },
  { t: "E-commerce & content", d: "High-traffic storefronts and headless CMS with CDN, object storage and managed Postgres." },
];

const FAQS = [
  { q: "What is Application Hosting?", a: "It's a managed cloud platform for running modern applications — bundling compute, containers, databases, storage, networking and AI services so your team can deploy and scale without managing servers." },
  { q: "How is this different from a VPS or dedicated server?", a: "VPS and dedicated servers give you raw machines you manage yourself. Application Hosting adds the platform layer — runtimes, databases, autoscaling, CI/CD and monitoring — so you focus on code, not infrastructure." },
  { q: "Can I bring my own container images?", a: "Yes. You can deploy any OCI-compliant container image from our private registry, Docker Hub or your own registry." },
  { q: "Do you support Kubernetes?", a: "Yes — we offer a CNCF-certified Managed Kubernetes service with a free control plane, auto-upgrades and integrated load balancing and storage." },
  { q: "How is billing handled?", a: "Most services bill monthly with hourly metering. Object storage and AI endpoints are usage-based (per GB or per token). Detailed invoices are available in your customer portal." },
  { q: "Is there an SLA?", a: "Compute and database services come with a 99.95% SLA. Object storage offers 99.9% availability and 11×9s durability." },
  { q: "Can I migrate from AWS / GCP / Azure?", a: "Yes. Our migration team helps you lift-and-shift containers, databases and object storage with minimal downtime. Talk to us for a free assessment." },
];

const ApplicationHosting = () => {
  useSeo({ title: 'Application Hosting — Managed Cloud Platform | WularData', description: 'Managed application hosting for Node, Java, .NET and Python with auto-scaling, zero-downtime deploys and monitoring.' });
  const [category, setCategory] = useState<AppHostingCategory | "All">("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return APP_HOSTING_PRODUCTS.filter(p =>
      (category === "All" || p.category === category) &&
      (query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()))
    );
  }, [category, query]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-hero text-white">
        <div className="container-wd py-16 md:py-24">
          <nav className="text-xs text-white/70 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-[hsl(var(--cyan))]">Home</Link>
            <span>/</span>
            <Link to="/data-center-services" className="hover:text-[hsl(var(--cyan))]">Data Center &amp; Co Location</Link>
            <span>/</span>
            <span>Application Hosting</span>
          </nav>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WularData Application Hosting</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">A complete cloud platform to build, run and scale your applications</h1>
              <p className="text-white/85 md:text-lg mb-6">
                Compute, containers, managed databases, storage, networking and AI — a unified platform built on open standards and hosted in our Indian data centers. Deploy faster, scale safer and pay only for what you use.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#catalog" className="btn-primary-solid !py-2.5">Explore services</a>
                <Link to="/contact?service=Application%20Hosting&category=data-center-services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                  Talk to an expert <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="h-6 w-6 text-[hsl(var(--cyan))]" />
                  <h2 className="font-bold text-lg">Get started from</h2>
                </div>
                <p className="text-4xl font-extrabold">₹1,999<span className="text-base font-normal text-white/70">/month</span></p>
                <p className="text-sm text-white/75 mt-2">Managed runtime · auto-scaling · free SSL · zero-downtime deploys</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {["Open standards", "99.95% SLA", "India-hosted", "24×7 support"].map(t => (
                    <div key={t} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[hsl(var(--cyan))]" /> {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter strip */}
      <section id="catalog" className="border-b bg-secondary sticky top-16 z-20">
        <div className="container-wd py-3 flex flex-wrap items-center gap-2">
          {(["All", ...APP_HOSTING_CATEGORIES] as const).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${category === c ? "bg-[hsl(var(--deep-blue))] text-white border-[hsl(var(--deep-blue))]" : "bg-white hover:border-[hsl(var(--cyan))]"}`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto relative">
            <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search services…"
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border bg-background w-56 focus:outline-none focus:border-[hsl(var(--cyan))]"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="section">
        <div className="container-wd">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Service catalogue</p>
            <h2 className="text-2xl md:text-3xl font-bold">Everything you need to ship modern applications</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">Pick the building blocks that fit your stack — combine compute, data and networking services into a production-grade platform.</p>
          </div>

          <div className="text-xs text-muted-foreground mb-4">{filtered.length} service{filtered.length !== 1 ? "s" : ""} {category !== "All" && <>in <span className="font-semibold text-[hsl(var(--deep-blue))]">{category}</span></>}</div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => (
              <article key={p.id} className="group relative rounded-lg border bg-card p-6 shadow-card hover:shadow-elevated hover:border-[hsl(var(--cyan))] transition-all">
                {p.popular && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[hsl(var(--cyan))]/15 text-[hsl(var(--deep-blue))] px-2 py-0.5">
                    <Star className="h-3 w-3" /> Popular
                  </span>
                )}
                <div className="h-10 w-10 rounded-md bg-[hsl(var(--deep-blue))]/5 flex items-center justify-center mb-3">
                  <p.icon className="h-5 w-5 text-[hsl(var(--deep-blue))]" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{p.category}</p>
                <h3 className="font-bold text-[hsl(var(--deep-blue))] text-lg mb-1">{p.name}</h3>
                <p className="text-sm font-medium text-[hsl(var(--royal))] mb-2">{p.tagline}</p>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {p.features.map(f => (
                    <li key={f} className="text-xs flex items-start gap-2 text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between pt-3 border-t">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                    <p className="font-bold text-[hsl(var(--deep-blue))]">{p.startingPrice}</p>
                  </div>
                  <Link
                    to={`/contact?service=${encodeURIComponent(p.name)}&category=data-center-services`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--deep-blue))] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[hsl(var(--royal))]"
                  >
                    Get started <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 text-muted-foreground text-sm">No services match your filters.</div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Why WularData Application Hosting</p>
            <h2 className="text-2xl md:text-3xl font-bold">An open, reversible cloud — engineered for production</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map(c => (
              <div key={c.title} className="rounded-lg bg-card p-6 shadow-card">
                <div className="h-10 w-10 rounded-md bg-[hsl(var(--deep-blue))]/5 flex items-center justify-center mb-3">
                  <c.icon className="h-5 w-5 text-[hsl(var(--deep-blue))]" />
                </div>
                <h3 className="font-bold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section">
        <div className="container-wd">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Use cases</p>
            <h2 className="text-2xl md:text-3xl font-bold">Built for modern workloads</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map(u => (
              <div key={u.t} className="rounded-lg border bg-card p-6 shadow-card">
                <h3 className="font-bold mb-2 text-[hsl(var(--deep-blue))]">{u.t}</h3>
                <p className="text-sm text-muted-foreground">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-secondary">
        <div className="container-wd max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(f => (
              <details key={f.q} className="group rounded-lg border bg-card p-5 shadow-card">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-[hsl(var(--deep-blue))]">
                  {f.q}
                  <span className="ml-4 text-[hsl(var(--cyan))] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </PublicLayout>
  );
};

export default ApplicationHosting;
