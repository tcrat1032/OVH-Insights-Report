import PublicLayout from "@/components/site/PublicLayout";
import { useSeo } from "@/lib/seo";
import CTABand from "@/components/site/CTABand";
import HeroSlider from "@/components/site/HeroSlider";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Server, Globe, Wrench, Cpu, HardDrive, Mail, CheckCircle2 } from "lucide-react";
import { PILLARS, ALL_SERVICES } from "@/data/services";
import dataCenterCardImg from "@/assets/data-center-card.png";
import hostingServicesCardImg from "@/assets/hosting-services-card.png";
import itInfrastructureCardImg from "@/assets/it-infrastructure-card.png";
import { formatCmsPrice, useCmsPlans, useCmsServices } from "@/lib/cms";

const FEATURED_SLUGS = ["dedicated-servers", "vps", "web-hosting", "domain-registration"];

const Index = () => {
  useSeo({
    title: "WularData | VPS | Dedicated Servers | Cloud Hosting | IT Support | India",
    description: "WularData provides dedicated servers, VPS, cloud hosting, managed databases, storage, backup/DR and managed IT services from Indian data centers.",
    path: "/",
  });
  const featured = ALL_SERVICES.filter(s => FEATURED_SLUGS.includes(s.slug));
  const { data: cmsServices = [] } = useCmsServices();
  const { data: cmsPlans = [] } = useCmsPlans();

  return (
    <PublicLayout>
      {/* Hero slideshow */}
      <HeroSlider />

      {/* Homepage H1 introduction */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-[hsl(var(--deep-blue))]">
              Cloud Hosting, Colocation and Managed IT Services in India
            </h1>
            <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-foreground">
              <p>
                WularData, India's leading Indian cloud solutions provider, delivers a wide spectrum of services, including public and private cloud solutions, business analytics, custom applications, shared hosting, and dedicated servers, serving customers worldwide. Our offerings also include AI-powered chatbots, domain registration, and telephony services, empowering clients to enhance their digital capabilities.
              </p>
              <p>
                Based in Noida, WularData is an enterprise IT infrastructure provider serving businesses across India with VMware management, VPS hosting, and Data Center Services. Backed by expert IT operations support, we help companies build and maintain infrastructure that's reliable, secure, and built to scale — no matter where in the country they operate.
              </p>
              <p>
                Our services go beyond hosting, including data center services, IT infrastructure, app development, managed databases, cloud storage, backup and disaster recovery, bare metal servers, and VPS solutions. We also provide web hosting, system monitoring, cloud telephony, and VPN cloud solutions to support growing businesses.
              </p>
              <p>
                Our Indian data centres offer dedicated servers, VPS, colocation, backup, and disaster recovery solutions, helping businesses keep workloads and customer data in India while supporting compliance with the DPDP Act, 2023. We also provide domain registration, website and email hosting, and IT operations for businesses that need reliable technology support.
              </p>
              <p>
                Discover how WularData can power your infrastructure — today and as you grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b bg-white">
        <div className="container-wd grid grid-cols-2 md:grid-cols-4 divide-x">
            {[
              { v: "ISO 27001", l: "Certified ISMS" },
              { v: "3+", l: "Indian data centre locations" },
              { v: "2021", l: "Operating since" },
              { v: "24×7", l: "NOC and support" },
            ].map(s => (
            <div key={s.l} className="px-4 py-4 text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-[hsl(var(--deep-blue))]">{s.v}</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three pillars */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-24 bg-secondary">
        <div className="container-wd">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">What we do</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Three pillars. One partner.</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">From bare-metal infrastructure to domains and managed services — everything your business needs to run online.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map(p => {
              const Icon = p.icon;
              const words = p.name.split(" ");
              const firstWord = words[0];
              const restWords = words.slice(1).join(" ");
              return (
                <Link
                  key={p.slug}
                  to={`/${p.slug}`}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[hsl(var(--deep-blue))] via-[hsl(var(--royal))] to-[hsl(var(--deep-blue))] p-8 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all border border-white/10"
                >
                  {/* Subtle glow accents */}
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[hsl(140_70%_55%/0.18)] blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[hsl(var(--cyan)/0.15)] blur-3xl pointer-events-none" />

                  <div className="relative">
                    <div className="h-14 w-14 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-5 overflow-hidden">
                      {p.slug === "data-center-services" ? (
                        <img src={dataCenterCardImg} alt="Data center building" className="h-full w-full object-cover" />
                      ) : p.slug === "hosting-services" ? (
                        <img src={hostingServicesCardImg} alt="Hosting services illustration" className="h-full w-full object-cover" />
                      ) : p.slug === "it-infrastructure" ? (
                        <img src={itInfrastructureCardImg} alt="IT infrastructure illustration" className="h-full w-full object-cover" />
                      ) : (
                        <Icon className="h-6 w-6 text-[hsl(140_70%_60%)]" />
                      )}
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 mb-2">
                      What we offer
                    </p>
                    <h3 className="text-2xl font-extrabold leading-tight mb-3">
                      <span className="text-[hsl(140_70%_60%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                        {firstWord}
                      </span>
                      {restWords && (
                        <>
                          {" "}
                          <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                            {restWords}
                          </span>
                        </>
                      )}
                    </h3>
                    <p className="text-sm text-white/85 mb-5 leading-relaxed">{p.description}</p>

                    <ul className="space-y-1.5 mb-6">
                      {p.services.slice(0, 4).map(s => (
                        <li key={s.slug} className="text-xs font-medium text-white/90 flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(140_70%_60%)] shrink-0" />
                          {s.name}
                        </li>
                      ))}
                      {p.services.length > 4 && (
                        <li className="text-xs text-white/60">+ {p.services.length - 4} more</li>
                      )}
                    </ul>

                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(140_70%_65%)] group-hover:gap-2.5 transition-all">
                      Explore <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured services with pricing */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-24">
        <div className="container-wd">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="eyebrow mb-2">Featured services</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                <span className="text-[hsl(140_70%_40%)]">Explore</span>{" "}
                <span className="text-[hsl(var(--deep-blue))]">Popular Plans</span>
              </h2>
            </div>
            <Link to="/contact" className="text-sm font-semibold text-[hsl(var(--deep-blue))] hover:underline">Need something custom? Talk to sales →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map(s => {
              const Icon = s.icon;
              const managedService = cmsServices.find(item => item.slug === s.slug);
              const managedPlan = managedService ? cmsPlans.find(plan => plan.service_id === managedService.id) : undefined;
              const displayName = managedService?.name || s.name;
              const description = managedService?.short_description || s.shortDesc;
              const displayPrice = managedPlan ? formatCmsPrice(managedPlan) : s.startingPrice;
              return (
                <div key={s.slug} className="rounded-lg border bg-card p-6 hover:border-[hsl(var(--cyan))] hover:shadow-elevated transition-all">
                  <Icon className="h-8 w-8 text-[hsl(var(--deep-blue))] mb-3" />
                   <h3 className="font-bold mb-1">{displayName}</h3>
                   <p className="text-xs text-muted-foreground mb-4">{description}</p>
                   <p className="text-2xl font-extrabold text-[hsl(var(--deep-blue))]">{displayPrice}<span className="text-xs font-normal text-muted-foreground">{managedPlan ? `/${managedPlan.billing_period}` : s.slug === "domain-registration" ? "" : "/mo"}</span></p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">Starting price</p>
                   <Link to={`/contact?service=${encodeURIComponent(displayName)}`} className="text-sm font-semibold text-[hsl(var(--deep-blue))] hover:underline">Configure →</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why onshore */}
      <section className="section bg-gradient-hero text-white">
        <div className="container-wd">
          <div className="text-center mb-12">
            <p className="eyebrow text-[hsl(var(--cyan))] mb-2">WHY ONSHORE</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Why Indian businesses are moving workloads back onshore</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { h: "The DPDP Act changed the default", b: "The Digital Personal Data Protection Act, 2023 puts the obligation on you — the data fiduciary — to know where personal data sits and who can reach it. Hosting inside India removes an entire category of questions from that answer. We host every workload in Indian data centres, and we will tell you the specific facility in writing." },
              { h: "Jurisdiction is not a technical detail", b: "Data held on foreign-owned infrastructure can be subject to foreign legal process regardless of where the servers physically sit. For BFSI, healthcare, government and any business handling Indian citizens' personal data, the operating entity's jurisdiction matters as much as the rack's postcode. WularData is an Indian company operating Indian infrastructure under Indian law." },
              { h: "Cost predictability in rupees", b: "Hyperscaler bills are denominated in dollars, priced per-gigabyte of egress, and move with the exchange rate. Our pricing is in rupees, bandwidth is unmetered on dedicated servers, and the invoice at the end of the month is the number you agreed at the start of it." },
            ].map(item => (
              <div key={item.h} className="rounded-lg bg-white/5 border border-white/15 p-6 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-3 text-[hsl(140_70%_60%)]">{item.h}</h3>
                <p className="text-sm text-white/85 leading-relaxed">{item.b}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/contact" className="hero-ghost-button">Talk to us about migrating off a hyperscaler →</Link>
          </div>
        </div>
      </section>

      {/* Why WularData */}
      <section className="section bg-secondary">
        <div className="container-wd">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Why WularData</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Built for performance, run by experts</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, t: "Indian DC presence", d: "Your workloads run from Indian data centres in Delhi NCR and Chandigarh Tricity, with data residency documented in writing for auditors and compliance teams. Low-latency delivery for Indian users comes as standard, not as an add-on." },
              { icon: ShieldCheck, t: "Security first", d: "We layer DDoS mitigation, TLS in transit, encryption at rest, and documented access controls around every workload. You get named-facility disclosure, audit logs, and a single accountable provider rather than a chain of third-party sub-processors." },
              { icon: Wrench, t: "24×7 NOC", d: "Our network operations centre is staffed by engineers who know the hardware, not just a chatbot. They monitor, patch, troubleshoot and escalate around the clock so issues are caught before they become incidents." },
              { icon: Cpu, t: "Scalable by design", d: "Start with a VPS, scale to dedicated servers, or reserve a full cage without re-architecting. Vertical and horizontal growth happens on the same contract and the same support team, so you never outgrow the relationship." },
              { icon: Wrench, t: "Engineer-led support", d: "When you open a ticket, it is routed to a Linux, Windows, network or cloud engineer with hands-on experience in Indian data centre environments. No scripted front-line queues — just people who can read a log and fix the issue." },
              { icon: HardDrive, t: "No lock-in", d: "Your virtual machines, databases and backups are stored in standard formats and can be exported at any time. We do not charge egress penalties or force proprietary control panels, so leaving is as straightforward as signing up." },
            ].map(b => (
              <div key={b.t} className="rounded-lg bg-white p-6 shadow-card">
                <b.icon className="h-7 w-7 text-[hsl(var(--cyan))] mb-3" />
                <h3 className="font-bold mb-2">{b.t}</h3>
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section">
        <div className="container-wd">
          <p className="eyebrow text-center mb-2">Solutions by industry</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">Trusted across sectors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "BFSI", desc: "RBI data localisation, segregated environments, audit trails and DR within India. We support the documentation your auditors ask for, including named facility disclosure and access logs." },
              { name: "E-commerce", desc: "Traffic that triples on sale days and dies at 3am. Bare metal for the database tier, scalable VPS for the front end, and CDN in front of both — sized for your peak, not your average." },
              { name: "SaaS", desc: "SaaS companies need predictable infrastructure costs, fast release cycles and clear data residency for enterprise customers. We provide CI/CD-ready compute, managed databases and backup with contracts and SLAs that pass procurement." },
              { name: "Media", desc: "Media and streaming workloads demand high-throughput storage, low-latency CDN and burst-ready compute. Our Indian edge delivery and unmetered bandwidth options keep playback smooth while keeping content and logs inside the country." },
              { name: "Healthcare", desc: "Patient data protection requires Indian residency, access logging and encrypted storage. We help hospitals, clinics and health-tech firms host PII inside India with named-facility documentation and DR plans that satisfy clinical and regulatory reviewers." },
              { name: "Education", desc: "Universities and ed-tech platforms need reliable LMS hosting, secure assessment portals and scalable video delivery during admissions. Our infrastructure supports peak loads at the start of a semester without long-term over-provisioning." },
            ].map(i => (
              <div key={i.name} className="rounded-lg border bg-card p-5 text-left hover:border-[hsl(var(--cyan))] transition-colors">
                <p className="font-semibold text-sm mb-2">{i.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </PublicLayout>
  );
};

export default Index;
