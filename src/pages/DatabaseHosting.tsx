import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import FaqAccordion from "@/components/site/FaqAccordion";
import CTABand from "@/components/site/CTABand";
import { DB_ENGINES, DB_CATEGORIES, type DBEngineCategory } from "@/data/databaseHosting";
import { Database, ShieldCheck, Globe2, Zap, Layers, Workflow, ArrowRight, Check, Search, Star, Clock, GitBranch } from "lucide-react";

const CAPABILITIES = [
  { icon: Zap, title: "Provisioned in minutes", desc: "Spin up production-grade clusters with one click — no manual installs, tuning or HA setup." },
  { icon: ShieldCheck, title: "Encrypted & isolated", desc: "TLS in transit, encryption at rest, IP allow-lists and private network attach by default." },
  { icon: Clock, title: "Backups & PITR", desc: "Automated daily backups with point-in-time recovery up to 30 days — restore in a few clicks." },
  { icon: Layers, title: "High availability", desc: "Multi-node clusters with automatic failover and zero-downtime version upgrades." },
  { icon: Workflow, title: "Read replicas & scaling", desc: "Add read replicas, resize vertically or scale storage online without downtime." },
  { icon: Globe2, title: "India-hosted", desc: "Mumbai-region data residency with optional multi-region replication for DR." },
];

const USE_CASES = [
  { t: "SaaS & web apps", d: "Reliable transactional databases for multi-tenant SaaS, CRMs and internal tools." },
  { t: "Analytics & BI", d: "ClickHouse and OpenSearch clusters for sub-second analytics over billions of rows." },
  { t: "Caching & sessions", d: "Redis and Valkey for low-latency caching, rate limiting and session stores." },
  { t: "Event streaming", d: "Kafka and RabbitMQ for event-driven architectures and real-time pipelines." },
];

const FAQS = [
  { q: "What is Database Hosting?", a: "It's a fully managed database service that takes care of provisioning, patching, backups, monitoring, HA and scaling — so your team can focus on queries instead of operations." },
  { q: "Which engines do you support?", a: "PostgreSQL, MySQL, MariaDB, MongoDB, Cassandra, Redis, Valkey, Elasticsearch, OpenSearch, ClickHouse, Kafka and RabbitMQ. Multiple major versions are available for each." },
  { q: "How are backups handled?", a: "All clusters get automated daily backups with retention up to 30 days. Most engines support point-in-time recovery, and you can take on-demand snapshots from the portal at any time." },
  { q: "Is data encrypted?", a: "Yes. All connections use TLS, and storage volumes are encrypted at rest by default. You can also restrict access by IP and attach clusters to your private network." },
  { q: "Can I scale up or down?", a: "Yes. You can resize CPU, memory and storage online with zero downtime, and add read replicas or shards for horizontal scaling." },
  { q: "What's the SLA?", a: "Single-node plans come with a 99.9% SLA; HA multi-node clusters come with a 99.95% SLA. Backups and DR are tested quarterly by our team." },
  { q: "Can I migrate an existing database?", a: "Yes. Our team helps you migrate from on-prem, AWS RDS, GCP Cloud SQL or Azure Database with minimal downtime using logical replication or dump/restore." },
];

const DatabaseHosting = () => {
  useSeo({ title: 'Database Hosting — Managed PostgreSQL, MySQL, MongoDB | WularData', description: 'Managed database hosting with automated backups, point-in-time recovery, read replicas and 24x7 expert support.' });
  const [category, setCategory] = useState<DBEngineCategory | "All">("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return DB_ENGINES.filter(p =>
      (category === "All" || p.category === category) &&
      (query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.engine.toLowerCase().includes(query.toLowerCase()) ||
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
            <Link to="/data-center-services" className="hover:text-[hsl(var(--cyan))]">Data Center &amp; Colocation</Link>
            <span>/</span>
            <span>Database Hosting</span>
          </nav>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WularData Database Hosting</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Managed databases — high availability, secure and ready to scale</h1>
              <p className="text-white/85 md:text-lg mb-6">
                Production-grade PostgreSQL, MySQL, MongoDB, Redis and more — fully managed with automated backups, point-in-time recovery, HA failover and 24×7 expert support. Hosted in our Indian data centers.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#catalog" className="btn-primary-solid !py-2.5">Browse engines</a>
                <Link to="/contact?service=Database%20Hosting&category=data-center-services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                  Talk to a DBA <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-[hsl(var(--cyan))]" />
                  <h2 className="font-bold text-lg">Get started from</h2>
                </div>
                <p className="text-4xl font-extrabold">₹999<span className="text-base font-normal text-white/70">/month</span></p>
                <p className="text-sm text-white/75 mt-2">Managed cluster · automated backups · TLS · 24×7 monitoring</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {["12+ engines", "PITR up to 30d", "HA failover", "India-hosted"].map(t => (
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
          {(["All", ...DB_CATEGORIES] as const).map(c => (
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
              placeholder="Search engines…"
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border bg-background w-56 focus:outline-none focus:border-[hsl(var(--cyan))]"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="section">
        <div className="container-wd">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Database catalogue</p>
            <h2 className="text-2xl md:text-3xl font-bold">Pick the right engine for your workload</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">From transactional SQL to document, key-value, search and streaming — all fully managed and production-ready.</p>
          </div>

          <div className="text-xs text-muted-foreground mb-4">{filtered.length} engine{filtered.length !== 1 ? "s" : ""} {category !== "All" && <>in <span className="font-semibold text-[hsl(var(--deep-blue))]">{category}</span></>}</div>

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
                <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.versions.map(v => (
                    <span key={v} className="text-[10px] font-semibold rounded bg-secondary px-2 py-0.5 text-foreground/70">v{v}</span>
                  ))}
                </div>
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
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 text-muted-foreground text-sm">No engines match your filters.</div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Why WularData Database Hosting</p>
            <h2 className="text-2xl md:text-3xl font-bold">Production-grade data, without the ops overhead</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold">A database for every workload</h2>
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

      {/* Migration band */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="rounded-xl border bg-card p-8 md:p-10 shadow-card grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-5 w-5 text-[hsl(var(--cyan))]" />
                <p className="eyebrow text-[hsl(var(--royal))]">Migration assistance</p>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--deep-blue))] mb-2">Move your databases with zero data loss</h3>
              <p className="text-sm text-muted-foreground">Our DBAs help you migrate from on-prem, AWS RDS, GCP Cloud SQL or Azure Database — using logical replication, CDC or dump/restore — with minimal downtime and a tested cutover plan.</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link to="/contact?service=Database%20Migration&category=data-center-services" className="btn-primary-solid !py-2.5 inline-flex items-center gap-2">
                Request migration plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-wd max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently asked questions</h2>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      <CTABand />
    </PublicLayout>
  );
};

export default DatabaseHosting;
