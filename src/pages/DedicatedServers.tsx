import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import CTABand from "@/components/site/CTABand";
import { DEDICATED_SERVERS, SERVER_RANGES, type ServerRange } from "@/data/dedicatedServers";
import { Server, Cpu, HardDrive, Network, ShieldCheck, Zap, Globe2, Check, ArrowRight, Filter } from "lucide-react";

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const FAQS = [
  { q: "Where are your dedicated servers hosted?", a: "Our dedicated servers are hosted in Tier-III+ data centers in Mumbai, India, with optional DR sites in Singapore and Frankfurt." },
  { q: "How fast is server delivery?", a: "Most standard configurations from the Advance and Scale ranges are provisioned within 2 business hours. Custom builds typically deliver within 24–48 hours." },
  { q: "Do you offer DDoS protection?", a: "Yes. Always-on, multi-layer DDoS protection is included with every dedicated server at no extra cost." },
  { q: "Can I get IPMI / remote KVM access?", a: "Every server includes out-of-band IPMI / KVM access so you have full control even when the OS is unreachable." },
  { q: "Is there an SLA?", a: "All dedicated servers come with a 99.99% network and power uptime SLA, with service credits if we miss it." },
];

const FEATURES = [
  { icon: Zap, title: "Provisioned in minutes", desc: "Standard configurations are deployed automatically — no waiting weeks for hardware." },
  { icon: ShieldCheck, title: "Anti-DDoS included", desc: "Always-on, multi-layer DDoS mitigation protects every server at no extra cost." },
  { icon: Network, title: "Unmetered bandwidth", desc: "From 1 Gbps to 25 Gbps unmetered public bandwidth on Indian backbone." },
  { icon: HardDrive, title: "Enterprise NVMe", desc: "Latest-gen NVMe and SAS drives in hardware or software RAID configurations." },
  { icon: Cpu, title: "Latest Intel & AMD", desc: "Choose from Xeon Scalable, EPYC Genoa and high-frequency gaming-grade CPUs." },
  { icon: Globe2, title: "Global reach", desc: "Pair with our CDN, private interconnects and DR sites across regions." },
];

const DedicatedServers = () => {
  useSeo({ title: 'Dedicated Servers in India — Bare Metal Pricing | WularData', description: 'Single-tenant Intel Xeon and AMD EPYC dedicated servers in Indian data centers with NVMe storage, unmetered bandwidth and 99.99% SLA.' });
  const [range, setRange] = useState<ServerRange | "All">("All");
  const [brand, setBrand] = useState<"All" | "Intel" | "AMD">("All");
  const [minRam, setMinRam] = useState<number>(0);
  const [sort, setSort] = useState<"price-asc" | "price-desc" | "ram-desc">("price-asc");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // JSON-LD structured data (ItemList of Products, BreadcrumbList, FAQPage)
  useEffect(() => {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "WularData Dedicated Servers",
      itemListElement: DEDICATED_SERVERS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: `${s.name} Dedicated Server`,
          sku: s.name,
          description: `${s.cpu} · ${s.memory} · ${s.storage} · ${s.bandwidth}`,
          brand: { "@type": "Brand", name: "WularData" },
          category: "Dedicated Server Hosting",
          offers: {
            "@type": "Offer",
            url: `https://wulardata.com/data-center-services/dedicated-servers#${s.name}`,
            priceCurrency: "INR",
            price: s.priceMonthly,
            priceValidUntil: "2027-03-31",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "WularData" },
          },
        },
      })),
    };

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://wulardata.com/" },
        { "@type": "ListItem", position: 2, name: "Data Center & Colocation", item: "https://wulardata.com/data-center-services" },
        { "@type": "ListItem", position: 3, name: "Dedicated Servers", item: "https://wulardata.com/data-center-services/dedicated-servers" },
      ],
    };

    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    const scripts = [itemList, breadcrumb, faqPage].map(data => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-wd-jsonld", "dedicated-servers");
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });

    return () => { scripts.forEach(el => el.remove()); };
  }, []);

  const filtered = useMemo(() => {
    let list = DEDICATED_SERVERS.filter(s =>
      (range === "All" || s.range === range) &&
      (brand === "All" || s.cpuBrand === brand) &&
      s.memoryGB >= minRam
    );
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceMonthly - b.priceMonthly;
      if (sort === "price-desc") return b.priceMonthly - a.priceMonthly;
      return b.memoryGB - a.memoryGB;
    });
    return list;
  }, [range, brand, minRam, sort]);

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
            <span>Dedicated Servers</span>
          </nav>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WularData Bare Metal</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Dedicated Servers — full bare-metal range</h1>
              <p className="text-white/85 md:text-lg mb-6">
                Single-tenant Intel and AMD servers with NVMe storage, unmetered bandwidth, anti-DDoS and 24×7 NOC support — provisioned in minutes from our Indian data centers.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#range" className="btn-primary-solid !py-2.5">Compare servers</a>
                <Link to="/contact?service=Dedicated%20Servers&category=data-center-services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
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
                <p className="text-4xl font-extrabold">₹6,499<span className="text-base font-normal text-white/70">/month</span></p>
                <p className="text-sm text-white/75 mt-2">6c/12t Xeon-E · 32 GB ECC · 2 × 512 GB NVMe · 1 Gbps unmetered</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {["Anti-DDoS", "IPMI / KVM", "99.99% SLA", "24×7 support"].map(t => (
                    <div key={t} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[hsl(var(--cyan))]" /> {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Range tabs */}
      <section id="range" className="border-b bg-secondary">
        <div className="container-wd py-4 flex flex-wrap gap-2">
          {(["All", ...SERVER_RANGES.map(r => r.key)] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${range === r ? "bg-[hsl(var(--deep-blue))] text-white border-[hsl(var(--deep-blue))]" : "bg-white hover:border-[hsl(var(--cyan))]"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      {/* Range descriptions */}
      <section className="section">
        <div className="container-wd">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {SERVER_RANGES.map(r => (
              <button key={r.key} onClick={() => setRange(r.key)} className={`text-left rounded-lg border bg-card p-4 shadow-card hover:shadow-elevated hover:border-[hsl(var(--cyan))] transition-all ${range === r.key ? "border-[hsl(var(--deep-blue))]" : ""}`}>
                <h3 className="font-bold text-sm text-[hsl(var(--deep-blue))] mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="rounded-lg border bg-card p-4 mb-6 flex flex-wrap items-end gap-4 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--deep-blue))]">
              <Filter className="h-4 w-4" /> Filter
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">CPU brand</label>
              <select value={brand} onChange={e => setBrand(e.target.value as any)} className="rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value="All">All</option>
                <option value="Intel">Intel</option>
                <option value="AMD">AMD</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Min memory</label>
              <select value={minRam} onChange={e => setMinRam(Number(e.target.value))} className="rounded-md border bg-background px-3 py-1.5 text-sm">
                <option value={0}>Any</option>
                <option value={32}>32 GB+</option>
                <option value={64}>64 GB+</option>
                <option value={128}>128 GB+</option>
                <option value={256}>256 GB+</option>
                <option value={512}>512 GB+</option>
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
            <div className="ml-auto text-xs text-muted-foreground">{filtered.length} server{filtered.length !== 1 ? "s" : ""} matching</div>
          </div>

          {/* Server table (desktop) */}
          <div className="hidden lg:block overflow-x-auto rounded-lg border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Server</th>
                  <th className="px-4 py-3">CPU</th>
                  <th className="px-4 py-3">Memory</th>
                  <th className="px-4 py-3">Storage</th>
                  <th className="px-4 py-3">Bandwidth</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3 text-right">From</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-t hover:bg-secondary/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[hsl(var(--deep-blue))]">{s.name}</span>
                        {s.highlight && <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[hsl(var(--cyan))]/15 text-[hsl(var(--deep-blue))] px-2 py-0.5">{s.highlight}</span>}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{s.range}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{s.cpu}</div>
                      <div className="text-[11px] text-muted-foreground">{s.cores}c / {s.threads}t · {s.frequency}</div>
                    </td>
                    <td className="px-4 py-4">{s.memory}</td>
                    <td className="px-4 py-4">
                      <div>{s.storage}</div>
                      <div className="text-[11px] text-muted-foreground">{s.storageType}</div>
                    </td>
                    <td className="px-4 py-4">{s.bandwidth}</td>
                    <td className="px-4 py-4 text-muted-foreground">{s.region}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="font-bold text-[hsl(var(--deep-blue))]">{formatINR(s.priceMonthly)}</div>
                      <div className="text-[11px] text-muted-foreground">/month ex GST</div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link to={`/contact?service=Dedicated%20Server%20${encodeURIComponent(s.name)}&category=data-center-services`} className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--deep-blue))] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[hsl(var(--royal))]">
                        Order <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-muted-foreground text-sm">No servers match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Server cards (mobile / tablet) */}
          <div className="grid md:grid-cols-2 gap-4 lg:hidden">
            {filtered.map(s => (
              <article key={s.id} className="rounded-lg border bg-card p-5 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[hsl(var(--deep-blue))]">{s.name}</h3>
                    <p className="text-[11px] text-muted-foreground">{s.range} · {s.region}</p>
                  </div>
                  {s.highlight && <span className="text-[10px] font-semibold uppercase rounded-full bg-[hsl(var(--cyan))]/15 text-[hsl(var(--deep-blue))] px-2 py-0.5">{s.highlight}</span>}
                </div>
                <ul className="text-xs space-y-1.5 mb-4">
                  <li className="flex gap-2"><Cpu className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {s.cpu} · {s.cores}c/{s.threads}t · {s.frequency}</li>
                  <li className="flex gap-2"><Server className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {s.memory}</li>
                  <li className="flex gap-2"><HardDrive className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {s.storage}</li>
                  <li className="flex gap-2"><Network className="h-3.5 w-3.5 text-[hsl(var(--cyan))] mt-0.5" /> {s.bandwidth}</li>
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">From</p>
                    <p className="font-bold text-[hsl(var(--deep-blue))]">{formatINR(s.priceMonthly)}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  </div>
                  <Link to={`/contact?service=Dedicated%20Server%20${encodeURIComponent(s.name)}&category=data-center-services`} className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--deep-blue))] px-3 py-1.5 text-xs font-semibold text-white">
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
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Why WularData bare metal</p>
            <h2 className="text-2xl md:text-3xl font-bold">Built for performance, security and uptime</h2>
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
            { t: "Web & application hosting", d: "Predictable performance for high-traffic sites, SaaS platforms and APIs." },
            { t: "Virtualisation & private cloud", d: "Run VMware, Proxmox or OpenStack on dedicated hardware you fully control." },
            { t: "Databases & analytics", d: "NVMe-backed servers tuned for PostgreSQL, MySQL, MongoDB and analytics." },
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

export default DedicatedServers;
