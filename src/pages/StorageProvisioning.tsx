import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import CTABand from "@/components/site/CTABand";
import { STORAGE_PRODUCTS, STORAGE_CATEGORIES, type StorageCategory } from "@/data/storageProducts";
import { HardDrive, ShieldCheck, Globe2, Zap, Layers, ArrowRight, Check, Search, Star, Clock, GitBranch } from "lucide-react";

const CAPABILITIES = [
  { icon: Zap, title: "Provisioned in seconds", desc: "Create buckets, volumes or shares from the portal or API and attach them to your workloads instantly." },
  { icon: ShieldCheck, title: "Encrypted & isolated", desc: "Encryption at rest and in transit, IP allow-lists, fine-grained ACLs and private network attach by default." },
  { icon: Layers, title: "11×9s durability", desc: "Object data is replicated across multiple availability zones for industry-leading durability." },
  { icon: Clock, title: "Lifecycle & tiering", desc: "Automatically transition cold data to cheaper tiers with lifecycle policies — pay less for what you don't touch." },
  { icon: Globe2, title: "India-hosted", desc: "Data residency in our Indian data centers with optional cross-region replication for DR." },
  { icon: GitBranch, title: "S3 & open standards", desc: "S3-compatible object API, NFS / SMB file shares and standard block volumes — no proprietary lock-in." },
];

const USE_CASES = [
  { t: "Backup & DR", d: "Immutable, offsite backups for servers, VMs and databases with policy-driven retention." },
  { t: "Media & content", d: "Store and deliver images, video and static assets with CDN integration." },
  { t: "AI & analytics", d: "High-throughput object storage for training datasets, lakehouses and ML pipelines." },
  { t: "Application data", d: "Persistent block volumes and shared file storage for stateful apps and Kubernetes." },
];

const FAQS = [
  { q: "What types of storage do you offer?", a: "Object storage (S3-compatible) in standard, cold and high-performance tiers, NVMe and capacity block volumes, NFS and SMB file shares, plus managed backup, deep archive and snapshot storage." },
  { q: "Is the object storage S3-compatible?", a: "Yes. Our object storage exposes the standard S3 API, so existing tools and SDKs (AWS CLI, boto3, rclone, MinIO clients, Veeam, etc.) work without code changes." },
  { q: "How is data secured?", a: "All storage is encrypted at rest by default and connections use TLS. You can scope access with fine-grained ACLs / IAM policies, restrict by IP and attach to private networks." },
  { q: "How durable is my data?", a: "Object storage is designed for 11×9s (99.999999999%) durability, with data replicated across multiple availability zones in the region." },
  { q: "Can I move cold data to a cheaper tier automatically?", a: "Yes. Lifecycle policies can transition objects between standard, cold and deep archive tiers based on age or last-access time." },
  { q: "How is billing handled?", a: "Storage is billed per GB per month with no minimum commitment. Egress and operations are metered separately and shown on your monthly invoice." },
  { q: "Do you help with migration?", a: "Yes. Our team helps you migrate from AWS S3, Azure Blob, GCS or on-prem NAS using rclone, AzCopy, DataSync-style jobs or physical seeding for very large datasets." },
];

const StorageProvisioning = () => {
  useSeo({ title: 'Storage Provisioning — Object, Block & File Storage | WularData', description: 'Scalable S3-compatible object storage, high-IOPS NVMe block storage and NFS file shares billed per GB.' });
  const [category, setCategory] = useState<StorageCategory | "All">("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return STORAGE_PRODUCTS.filter(p =>
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
            <span>Storage Provisioning</span>
          </nav>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WularData Storage</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Object, block, file and backup storage — on demand</h1>
              <p className="text-white/85 md:text-lg mb-6">
                Scalable, durable storage for every workload — S3-compatible object buckets, NVMe block volumes, NFS / SMB shares, backups and deep archive. Pay per GB, hosted in our Indian data centers.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#catalog" className="btn-primary-solid !py-2.5">Explore storage</a>
                <Link to="/contact?service=Storage%20Provisioning&category=data-center-services" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10">
                  Talk to an expert <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-6 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="h-6 w-6 text-[hsl(var(--cyan))]" />
                  <h2 className="font-bold text-lg">Get started from</h2>
                </div>
                <p className="text-4xl font-extrabold">₹0.4<span className="text-base font-normal text-white/70">/GB/month</span></p>
                <p className="text-sm text-white/75 mt-2">Deep archive · S3 API · 11×9s durability · pay per GB</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {["S3-compatible", "11×9s durability", "Encrypted by default", "India-hosted"].map(t => (
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
          {(["All", ...STORAGE_CATEGORIES] as const).map(c => (
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
              placeholder="Search storage…"
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border bg-background w-56 focus:outline-none focus:border-[hsl(var(--cyan))]"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="section">
        <div className="container-wd">
          <div className="max-w-2xl mb-8">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Storage catalogue</p>
            <h2 className="text-2xl md:text-3xl font-bold">Pick the right storage for your workload</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">From hot S3 buckets and NVMe block volumes to deep archive and managed backup — combine tiers to optimise cost and performance.</p>
          </div>

          <div className="text-xs text-muted-foreground mb-4">{filtered.length} option{filtered.length !== 1 ? "s" : ""} {category !== "All" && <>in <span className="font-semibold text-[hsl(var(--deep-blue))]">{category}</span></>}</div>

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
              <div className="md:col-span-2 lg:col-span-3 text-center py-16 text-muted-foreground text-sm">No storage options match your filters.</div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-[hsl(var(--royal))] mb-2">Why WularData Storage</p>
            <h2 className="text-2xl md:text-3xl font-bold">Durable, secure storage — without surprise bills</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold">Storage for every workload</h2>
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
              <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--deep-blue))] mb-2">Move terabytes — or petabytes — with confidence</h3>
              <p className="text-sm text-muted-foreground">Our team helps you migrate from AWS S3, Azure Blob, GCS or on-prem NAS using rclone, parallel sync jobs or physical seeding for very large datasets.</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link to="/contact?service=Storage%20Migration&category=data-center-services" className="btn-primary-solid !py-2.5 inline-flex items-center gap-2">
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

export default StorageProvisioning;
