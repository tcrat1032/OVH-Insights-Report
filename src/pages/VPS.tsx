import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import FaqAccordion from "@/components/site/FaqAccordion";
import CTABand from "@/components/site/CTABand";
import { VPS_PLANS, VPS_CATEGORIES, type VpsCategory } from "@/data/vpsPlans";
import { Cpu, HardDrive, Network, ShieldCheck, Zap, Globe2, Check, ArrowRight, Filter, Server, MonitorCog } from "lucide-react";

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const FAQS = [
  { q: "What is a VPS?", a: "A Virtual Private Server (VPS) is a virtualised slice of a physical server with dedicated CPU, RAM and NVMe storage — giving you the isolation of a dedicated server at a fraction of the cost." },
  { q: "How fast is VPS provisioning?", a: "Most VPS plans are provisioned automatically within 2–5 minutes after order confirmation." },
  { q: "Can I choose my operating system?", a: "Yes. Pick from popular Linux distributions (Ubuntu, Debian, AlmaLinux, Rocky, CentOS) or licensed Windows Server images." },
  { q: "Do you offer DDoS protection?", a: "Always-on, multi-layer DDoS protection is included with every VPS at no extra cost." },
  { q: "Can I scale my VPS later?", a: "Yes — you can resize CPU, RAM and storage vertically with a brief reboot. Snapshots make migrations safe and reversible." },
  { q: "Is there an SLA?", a: "All VPS plans come with a 99.9% network and power uptime SLA, with service credits if we miss it." },
];

const FEATURES = [
  { icon: Zap, title: "Deploy in minutes", desc: "Spin up Linux or Windows VPS instances in under 5 minutes from our control panel." },
  { icon: ShieldCheck, title: "Anti-DDoS included", desc: "Always-on, multi-layer DDoS mitigation protects every VPS at no extra cost." },
  { icon: Network, title: "Unmetered bandwidth", desc: "Generous unmetered traffic on Indian backbone — no surprise overage bills." },
  { icon: HardDrive, title: "100% NVMe SSD", desc: "Every plan ships with high-IOPS NVMe SSD storage for snappy I/O." },
  { icon: MonitorCog, title: "Snapshots & backups", desc: "On-demand snapshots and scheduled backups keep your data safe and recoverable." },
  { icon: Globe2, title: "India-hosted", desc: "Mumbai data centers with low-latency routes across South Asia." },
];

const VPS = () => {
  useSeo({ title: 'VPS Hosting India — Linux & Windows Virtual Servers | WularData', description: 'KVM-based VPS hosting with guaranteed resources, snapshot backups, Indian IPs and hourly resizing. Deploy in minutes.' });
  const [category, setCategory] = useState<VpsCategory | "All">("All");
  const [os, setOs] = useState<"All" | "Linux" | "Windows">("All");
  const [minRam, setMinRam] = useState<number>(0);
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "ram-desc">("price-asc");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    let list = VPS_PLANS.filter(p =>
      (category === "All" || p.category === category) &&
      (os === "All" || p.os.includes(os)) &&
      p.memoryGB >= minRam
    );
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceMonthly - b.priceMonthly;
      if (sort === "price-desc") return b.priceMonthly - a.priceMonthly;
      return b.memoryGB - a.memoryGB;
    });
    return list;
  }, [category, os, minRam, sort]);

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
            <span>VPS</span>
          </nav>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WularData Virtual Private Servers</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">VPS — flexible virtual servers, deployed in minutes</h1>
              <p className="text-white/85 md:text-lg mb-6">
                Linux and Windows VPS instances with dedicated vCores, NVMe SSD storage, unmetered bandwidth and anti-DDoS — hosted in our Indian data centers and ready to scale with you.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#plans" className="btn-primary-solid !py-2.5">Compare plans</a>
                <Link to="/contact?service=VPS&category=data-center-services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                  Talk to an expert <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="h-6 w-6 text-[hsl(var(--cyan))]" />
                  <h2 className="font-bold text-lg">Starting at</h2>
                </div>
                <p className="text-4xl font-extrabold">₹499<span className="text-base font-normal text-white/70">/month</span></p>
                <p className="text-sm text-white/75 mt-2">1 vCore · 2 GB RAM · 40 GB NVMe SSD · 250 Mbps unmetered</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {["Anti-DDoS", "Snapshots", "99.9% SLA", "24×7 support"].map(t => (
                    <div key={t} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[hsl(var(--cyan))]" /> {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section id="plans" className="border-b bg-secondary">
        <div className="container-wd py-4 flex flex-wrap gap-2">
          {(["All", ...VPS_CATEGORIES.map(c => c.key)] as const).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${category === c ? "bg-[hsl(var(--deep-blue))] text-white border-[hsl(var(--deep-blue))]" : "bg-white hover:border-[hsl(var(--cyan))]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Category descriptions */}
      <section className="section">
        <div className="container-wd">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {VPS_CATEGORIES.map(c => (
              <button key={c.key} onClick={() => setCategory(c.key)} className={`text-left rounded-lg border bg-card p-4 shadow-card hover:shadow-elevated hover:border-[hsl(var(--cyan))] transition-all ${category === c.key ? "border-[hsl(var(--deep-blue))]" : ""}`}>
                <h3 className="font-bold text-sm text-[hsl(var(--deep-blue))] mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.desc}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="rounded-lg border bg-card p-4 mb-6 flex flex-wrap items-end gap-4 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--deep-blue))]">
              <Filter className="h-4 w-4" /> Filter
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Operating system</label>
              <select value={os} onChange={e => setOs(e.target.value as any)} className="rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value="All">All</option>
                <option value="Linux">Linux</option>
                <option value="Windows">Windows</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Min memory</label>
              <select value={minRam} onChange={e => setMinRam(Number(e.target.value))} className="rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value={0}>Any</option>
                <option value={4}>4 GB+</option>
                <option value={8}>8 GB+</option>
                <option value={16}>16 GB+</option>
                <option value={32}>32 GB+</option>
                <option value={64}>64 GB+</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Sort by</label>
              <select value={sort} onChange={e => setSort(e.target.value as any)} className="rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="ram-desc">Memory: high to low</option>
              </select>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">{filtered.length} plan{filtered.length !== 1 ? "s" : ""} matching</div>
          </div>

          {/* Plan table (desktop) */}
          <div className="hidden lg:block overflow-x-auto rounded-lg border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">vCores</th>
                  <th className="px-4 py-3">Memory</th>
                  <th className="px-4 py-3">Storage</th>
                  <th className="px-4 py-3">Bandwidth</th>
                  <th className="px-4 py-3">OS</th>
                  <th className="px-4 py-3 text-right">From</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-t hover:bg-secondary/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[hsl(var(--deep-blue))]">{p.name}</span>
                        {p.highlight && <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[hsl(var(--cyan))]/15 text-[hsl(var(--deep-blue))] px-2 py-0.5">{p.highlight}</span>}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{p.category}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{p.vCores} vCore{p.vCores > 1 ? "s" : ""}</div>
                      <div className="text-[11px] text-muted-foreground">{p.cpu}</div>
                    </td>
                    <td className="px-4 py-4">{p.memoryGB} GB</td>
                    <td className="px-4 py-4">
                      <div>{p.storageGB} GB</div>
                      <div className="text-[11px] text-muted-foreground">{p.storageType}</div>
                    </td>
                    <td className="px-4 py-4">{p.bandwidth}</td>
                    <td className="px-4 py-4 text-muted-foreground">{p.os.join(" / ")}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="font-bold text-[hsl(var(--deep-blue))]">{formatINR(p.priceMonthly)}</div>
                      <div className="text-[11px] text-muted-foreground">/month ex GST</div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link to={`/contact?service=VPS%20${encodeURIComponent(p.name)}&category=data-center-services`} className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--deep-blue))] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[hsl(var(--royal))]">
                        Order <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-muted-foreground text-sm">No plans match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Plan cards (mobile / tablet) */}
          <div className="grid md:grid-cols-2 gap-4 lg:hidden">
            {filtered.map(p => (
              <article key={p.id} className="rounded-lg border bg-card p-5 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[hsl(var(--deep-blue))]">{p.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{p.category} · {p.os.join(" / ")}</p>
                  </div>
                  {p.highlight && <span className="text-[10px] font-semibold uppercase rounded-full bg-[hsl(var(--cyan))]/15 text-[hsl(var(--deep-blue))] px-2 py-0.5">{p.highlight}</span>}
                </div>
                <ul className="text-xs space-y-1.5 mb-4">
                  <li className="flex gap-2"><Cpu className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {p.vCores} vCore{p.vCores > 1 ? "s" : ""} · {p.cpu}</li>
                  <li className="flex gap-2"><Server className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {p.memoryGB} GB RAM</li>
                  <li className="flex gap-2"><HardDrive className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {p.storageGB} GB {p.storageType}</li>
                  <li className="flex gap-2"><Network className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {p.bandwidth}</li>
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                    <p className="font-bold text-[hsl(var(--deep-blue))]">{formatINR(p.priceMonthly)}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  </div>
                  <Link to={`/contact?service=VPS%20${encodeURIComponent(p.name)}&category=data-center-services`} className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--deep-blue))] px-3 py-1.5 text-xs font-semibold text-white">
                    Order <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Why WularData VPS</p>
            <h2 className="text-2xl md:text-3xl font-bold">Performance and flexibility, without the bare-metal price tag</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-lg bg-card p-6 shadow-card">
                <div className="h-10 w-10 rounded-md bg-[hsl(var(--deep-blue))]/5 flex items-center justify-center mb-3">
                  <f.icon className="h-5 w-5 text-[hsl(var(--deep-blue))]" />
                </div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section">
        <div className="container-wd grid md:grid-cols-3 gap-6">
          {[
            { t: "Websites & e-commerce", d: "Reliable hosting for WordPress, Magento, Shopify storefronts and custom CMS platforms." },
            { t: "Dev, test & staging", d: "Spin up isolated environments for CI/CD, QA and demos — destroy when you're done." },
            { t: "Apps, APIs & databases", d: "Run Node, Python, Java, .NET stacks and small databases with predictable performance." },
          ].map(u => (
            <div key={u.t} className="rounded-lg border bg-card p-6 shadow-card">
              <h3 className="font-bold mb-2">{u.t}</h3>
              <p className="text-sm text-muted-foreground">{u.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-secondary">
        <div className="container-wd max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently asked questions</h2>
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      <CTABand />
    </PublicLayout>
  );
};

export default VPS;
