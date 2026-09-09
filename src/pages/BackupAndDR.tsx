import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import CTABand from "@/components/site/CTABand";
import { BACKUP_PRODUCTS, BACKUP_CATEGORIES, type BackupCategory } from "@/data/backupProducts";
import { ShieldCheck, Globe2, Zap, Layers, ArrowRight, Check, Search, Star, Clock, GitBranch, Lock, RefreshCw, Archive } from "lucide-react";

const CAPABILITIES = [
  { icon: Lock, title: "Immutable backups", desc: "Object-lock and WORM-protected copies that ransomware and rogue admins cannot delete or alter." },
  { icon: RefreshCw, title: "Tested DR runbooks", desc: "Quarterly failover drills with documented runbooks — your DR plan is verified, not assumed." },
  { icon: Clock, title: "Aggressive RPO / RTO", desc: "RPO from 15 minutes (and seconds with CDP) and RTO from minutes for tier-1 workloads." },
  { icon: ShieldCheck, title: "App-aware protection", desc: "Application-consistent backups for SQL Server, Oracle, Exchange, AD and SharePoint." },
  { icon: Globe2, title: "India-hosted offsite", desc: "Replicated copies in a geographically separate Indian data center for true offsite protection." },
  { icon: Zap, title: "Self-service portal", desc: "Browse, restore and report on backups from a single portal — no tickets, no waiting." },
];

const PROTECTED_WORKLOADS = [
  { t: "VMware & Hyper-V", d: "Agentless, image-level backup with instant VM recovery and SureBackup verification." },
  { t: "Physical servers", d: "Bare-metal Windows and Linux backup with full system restore to dissimilar hardware." },
  { t: "Microsoft 365", d: "Mailboxes, OneDrive, SharePoint and Teams — protected daily with granular restore." },
  { t: "Databases", d: "App-aware backup for SQL Server, Oracle, PostgreSQL, MySQL and MongoDB with PITR." },
  { t: "NAS & file shares", d: "Scheduled backup of NFS / SMB shares with retention and offsite copies." },
  { t: "Endpoints", d: "Continuous file-level backup for Windows and macOS laptops and workstations." },
];

const HOW_IT_WORKS = [
  { n: "01", t: "Discover & design", d: "We assess your workloads, RPO/RTO targets and compliance needs, then design a backup + DR architecture." },
  { n: "02", t: "Deploy & onboard", d: "Veeam / Acronis agents are installed, jobs configured and first backups seeded — often via direct upload to avoid bandwidth bottlenecks." },
  { n: "03", t: "Replicate offsite", d: "Backups are replicated to our geographically separate data center as immutable, encrypted copies." },
  { n: "04", t: "Test & report", d: "Quarterly DR drills, monthly success-rate reports and 24×7 alerting on any failed job." },
];

const FAQS = [
  { q: "What is Backup & DR?", a: "Backup-as-a-Service protects your data with policy-driven backups stored offsite. Disaster Recovery goes further: it replicates entire workloads so you can fail over to our cloud within minutes if your primary site goes down." },
  { q: "Which platforms do you protect?", a: "VMware, Hyper-V, physical Windows / Linux servers, Microsoft 365 (Exchange, OneDrive, SharePoint, Teams), Google Workspace, SQL Server, Oracle, PostgreSQL, MySQL, MongoDB, NAS shares and Windows / macOS endpoints." },
  { q: "Are backups immutable / ransomware-proof?", a: "Yes. We store backup copies on object-lock (WORM) storage so they cannot be modified or deleted — even by an attacker with admin credentials — for the duration of the retention policy." },
  { q: "What RPO and RTO can you achieve?", a: "Standard backup jobs offer RPO from 15 minutes and RTO from 1 hour. Continuous Data Protection (CDP) options reduce RPO to seconds and RTO to minutes for tier-1 workloads." },
  { q: "Do you test DR?", a: "Yes — we run quarterly non-disruptive DR drills using isolated test networks, validate application boot order and provide a written report you can share with auditors." },
  { q: "Where are backups stored?", a: "Backups stay in India, in a data center geographically separate from your primary site, with encryption at rest and in transit." },
  { q: "Can you backup our existing on-prem infrastructure?", a: "Yes. You can keep workloads on-prem and use us purely as the offsite backup / DR target — no migration required." },
  { q: "How is billing handled?", a: "Backup is billed per workload (per VM, per user or per database) plus protected storage. DR is billed per protected workload with a clear, predictable monthly fee." },
];

const BackupAndDR = () => {
  useSeo({ title: 'Backup & Disaster Recovery — Veeam & Acronis BaaS | WularData', description: 'Policy-driven backup with immutable copies, offsite replication and orchestrated disaster recovery failover.' });
  const [category, setCategory] = useState<BackupCategory | "All">("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return BACKUP_PRODUCTS.filter(p =>
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
            <span>Backup &amp; DR</span>
          </nav>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WularData Backup &amp; Disaster Recovery</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Immutable backup and tested DR — for every workload</h1>
              <p className="text-white/85 md:text-lg mb-6">
                Veeam &amp; Acronis-powered Backup-as-a-Service with offsite, ransomware-proof copies and orchestrated Disaster Recovery to our Indian data centers. RPO from 15 minutes, RTO from minutes — backed by quarterly DR drills.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#catalog" className="btn-primary-solid !py-2.5">Explore plans</a>
                <Link to="/contact?service=Backup%20%26%20DR&category=data-center-services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                  Talk to a DR architect <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-[hsl(var(--cyan))]" />
                  <h2 className="font-bold text-lg">Get started from</h2>
                </div>
                <p className="text-4xl font-extrabold">₹4,999<span className="text-base font-normal text-white/70">/month</span></p>
                <p className="text-sm text-white/75 mt-2">Veeam BaaS · immutable copies · offsite replication · 24×7 monitoring</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {["RPO from 15 min", "Immutable / WORM", "Tested DR drills", "India-hosted offsite"].map(t => (
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
          {(["All", ...BACKUP_CATEGORIES] as const).map(c => (
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
              placeholder="Search plans…"
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border bg-background w-56 focus:outline-none focus:border-[hsl(var(--cyan))]"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="section">
        <div className="container-wd">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Plan catalogue</p>
            <h2 className="text-2xl md:text-3xl font-bold">Pick the protection level that fits your workload</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">From per-VM backup to continuous data protection and orchestrated DR — combine plans to meet your RPO, RTO and compliance targets.</p>
          </div>

          <div className="text-xs text-muted-foreground mb-4">{filtered.length} plan{filtered.length !== 1 ? "s" : ""} {category !== "All" && <>in <span className="font-semibold text-[hsl(var(--deep-blue))]">{category}</span></>}</div>

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
                <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
                  <div className="rounded bg-secondary px-2 py-1.5">
                    <p className="uppercase tracking-wider text-[9px] text-muted-foreground">RPO</p>
                    <p className="font-semibold text-[hsl(var(--deep-blue))]">{p.rpo}</p>
                  </div>
                  <div className="rounded bg-secondary px-2 py-1.5">
                    <p className="uppercase tracking-wider text-[9px] text-muted-foreground">RTO</p>
                    <p className="font-semibold text-[hsl(var(--deep-blue))]">{p.rto}</p>
                  </div>
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
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 text-muted-foreground text-sm">No plans match your filters.</div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Why WularData Backup &amp; DR</p>
            <h2 className="text-2xl md:text-3xl font-bold">Backups that survive ransomware — DR plans that actually work</h2>
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

      {/* Protected workloads */}
      <section className="section">
        <div className="container-wd">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Protected workloads</p>
            <h2 className="text-2xl md:text-3xl font-bold">One platform — every workload</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROTECTED_WORKLOADS.map(u => (
              <div key={u.t} className="rounded-lg border bg-card p-6 shadow-card">
                <h3 className="font-bold mb-2 text-[hsl(var(--deep-blue))]">{u.t}</h3>
                <p className="text-sm text-muted-foreground">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">How it works</p>
            <h2 className="text-2xl md:text-3xl font-bold">From first backup to a tested DR plan</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map(s => (
              <div key={s.n} className="rounded-lg bg-card p-6 shadow-card">
                <p className="text-3xl font-extrabold text-[hsl(var(--cyan))] mb-2">{s.n}</p>
                <h3 className="font-bold mb-1 text-[hsl(var(--deep-blue))]">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration / consultation band */}
      <section className="section">
        <div className="container-wd">
          <div className="rounded-xl border bg-card p-8 md:p-10 shadow-card grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-5 w-5 text-[hsl(var(--cyan))]" />
                <p className="eyebrow text-[hsl(var(--royal))]">Free DR assessment</p>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--deep-blue))] mb-2">Not sure what you need? Start with a free DR assessment.</h3>
              <p className="text-sm text-muted-foreground">Our architects review your workloads, current backup setup and compliance posture, then deliver a written backup + DR plan with RPO/RTO targets and pricing — at no cost.</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link to="/contact?service=DR%20Assessment&category=data-center-services" className="btn-primary-solid !py-2.5 inline-flex items-center gap-2">
                Request assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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

export default BackupAndDR;
