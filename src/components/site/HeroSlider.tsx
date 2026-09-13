import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import dcImg from "@/assets/hero-datacenter.jpg";
import hostImg from "@/assets/hero-hosting.jpg";
import itImg from "@/assets/hero-itinfra.jpg";

type Slide = {
  title: string;
  titleHighlight: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    title: "Colocation & Cloud Hosting in India",
    titleHighlight: "Colocation",
    eyebrow: "DATA CENTER & COLOCATION",
    description: "Rack space, Dedicated Servers, Virtual Private Servers, Cloud Compute, Storage, Backup and DR connectivity from our PAN India Data centers — engineered for uptime, low latency and DPDP Act data residency.",
    bullets: ["Rack & Cage Colocation", "Cloud & VPS Hosting", "Backup & Disaster Recovery"],
    href: "/data-center-services",
    ctaLabel: "Explore Colocation & Cloud",
    image: dcImg,
  },
  {
    title: "Domain Registration & Web Hosting",
    titleHighlight: "Domain Registration",
    eyebrow: "WEB HOSTING & DOMAINS",
    description: "Domain registration, Business web hosting, Reseller Hosting, Professional email and custom web application development — hosted on our own Indian infrastructure, managed end-to-end.",
    bullets: ["Domain Registration", "Web Hosting & Business Email", "Web & App Development"],
    href: "/hosting-services",
    ctaLabel: "Explore Web Hosting & Domains",
    image: hostImg,
  },
  {
    title: "Managed IT Support & Consulting",
    titleHighlight: "Managed IT",
    eyebrow: "MANAGED IT SERVICES",
    description: "Network Design, Servers & Virtualization Management, AMC and 24×7 monitoring — a single accountable IT Partner for businesses across India.",
    bullets: ["Managed IT & AMC", "Network & Virtualization", "24×7 Monitoring & Support"],
    href: "/it-infrastructure",
    ctaLabel: "Explore Managed IT Services",
    image: itImg,
  },
];

const AUTO_MS = 6000;

const HeroSlider = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIdx((n + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setIdx(i => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_MS);
    return () => clearInterval(t);
  }, [next, paused, idx]);

  return (
    <section
      className="relative overflow-hidden bg-[hsl(var(--deep-blue))]"
      aria-roledescription="carousel"
      aria-label="WularData services"
    >
      <div className="relative h-[720px] sm:h-[680px] md:h-[640px]">
        {SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            aria-hidden={i !== idx}
          >
            {/* Background image */}
            <img
              src={s.image}
              alt=""
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              className={`hero-slide-image absolute inset-0 h-full w-full object-cover ${i === idx ? "hero-slide-image-active" : ""}`}
            />
            {/* Overlays for legibility */}
            <div className="hero-directional-scrim absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="container-wd relative flex h-full items-start pb-24 pt-10 sm:items-center sm:pb-24 sm:pt-0 md:pb-20">
              <div className={`hero-slide-copy max-w-2xl text-white ${i === idx ? "hero-slide-copy-active" : ""}`}>
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-white/80 mb-4">
                  {s.eyebrow}
                </p>
                <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                  <span className="text-[hsl(140_70%_55%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {s.titleHighlight}
                  </span>{" "}
                  <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {s.title.slice(s.titleHighlight.length).trim()}
                  </span>
                </h2>
                <p className="text-base md:text-lg text-white/90 mb-6 max-w-xl">
                  {s.description}
                </p>
                <ul className="flex flex-wrap gap-2 mb-8">
                  {s.bullets.map(b => (
                    <li key={b} className="hero-service-chip text-xs md:text-sm font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link to={s.href} className="btn-cta">
                    {s.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="hero-ghost-button">Get a quote</Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots + labels */}
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="container-wd flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 md:gap-3">
              {SLIDES.map((s, i) => (
                <Button
                  key={s.title}
                  type="button"
                  variant="ghost"
                  onClick={() => go(i)}
                  aria-label={`Go to ${s.title}`}
                  aria-current={i === idx ? "true" : undefined}
                  className={`group relative h-10 min-w-10 overflow-hidden rounded-full border p-0 backdrop-blur-sm transition-all md:h-auto md:w-auto md:px-4 md:py-1.5 ${
                    i === idx
                      ? "border-[hsl(140_70%_55%)] bg-white/15 hover:bg-white/15"
                      : "border-white/30 bg-white/5 hover:border-white/60 hover:bg-white/10"
                  }`}
                >
                  <span className={`text-xs font-semibold tracking-wide ${i === idx ? "text-[hsl(140_70%_60%)]" : "text-white/85"}`}>
                    <span className="md:hidden">0{i + 1}</span>
                    <span className="hidden md:inline">0{i + 1} · {s.title}</span>
                  </span>
                  {i === idx && !paused && (
                    <span
                      key={idx}
                      className="absolute bottom-0 left-0 h-0.5 bg-[hsl(140_70%_55%)] animate-[heroProgress_6s_linear_forwards]"
                    />
                  )}
                </Button>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setPaused(current => !current)}
              aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
              aria-pressed={paused}
              title={paused ? "Resume slideshow" : "Pause slideshow"}
              className="shrink-0 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/20 hover:text-white"
            >
              {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
