import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import dcImg from "@/assets/hero-datacenter.jpg";
import hostImg from "@/assets/hero-hosting.jpg";
import itImg from "@/assets/hero-itinfra.jpg";

type Slide = {
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  href: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    title: "Data Center & Co Location",
    eyebrow: "Enterprise infrastructure",
    description: "Production-ready compute, storage, backup and connectivity hosted in Indian data centers — engineered for performance and resilience.",
    bullets: ["Dedicated Servers & VPS", "Database & App Hosting", "Backup, DR & CDN"],
    href: "/data-center-services",
    image: dcImg,
  },
  {
    title: "Hosting Services",
    eyebrow: "Launch online, fast",
    description: "Domains, web hosting, business email and custom app development — a complete digital starter kit for businesses of any size.",
    bullets: ["Domain Registration", "Web Hosting & Email", "App Development"],
    href: "/hosting-services",
    image: hostImg,
  },
  {
    title: "IT Support & Consulting",
    eyebrow: "Run, modernise, support",
    description: "24×7 managed services, expert migration consulting and pan-India hardware support — operate your IT with confidence.",
    bullets: ["IT Managed Services", "Consulting & Migration", "Hardware Support"],
    href: "/it-infrastructure",
    image: itImg,
  },
];

const AUTO_MS = 6000;

const HeroSlider = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIdx((n + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setIdx(i => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIdx(i => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_MS);
    return () => clearInterval(t);
  }, [next, paused, idx]);

  return (
    <section
      className="relative overflow-hidden bg-[hsl(var(--deep-blue))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="WularData services"
    >
      <div className="relative h-[560px] md:h-[640px]">
        {SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            aria-hidden={i !== idx}
          >
            {/* Background image */}
            <img
              src={s.image}
              alt=""
              width={1920}
              height={1080}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${i === idx ? "scale-110" : "scale-100"}`}
            />
            {/* Overlays for legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(234_100%_10%/0.92)] via-[hsl(234_100%_15%/0.78)] to-[hsl(234_100%_15%/0.35)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="container-wd relative h-full flex items-center">
              <div className={`max-w-2xl text-white transition-all duration-700 ${i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-white/80 mb-4">
                  {s.eyebrow}
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                  <span className="text-[hsl(140_70%_55%)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {s.title.split(" ")[0]}
                  </span>{" "}
                  <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {s.title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-white/90 mb-6 max-w-xl">
                  {s.description}
                </p>
                <ul className="flex flex-wrap gap-2 mb-8">
                  {s.bullets.map(b => (
                    <li key={b} className="text-xs md:text-sm font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link to={s.href} className="btn-cta">
                    Explore {s.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="btn-outline-light">Get a quote</Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white flex items-center justify-center transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots + labels */}
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="container-wd flex flex-wrap items-center gap-2 md:gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                onClick={() => go(i)}
                aria-label={`Go to ${s.title}`}
                aria-current={i === idx}
                className={`group relative overflow-hidden rounded-full border transition-all ${
                  i === idx
                    ? "border-[hsl(140_70%_55%)] bg-white/15"
                    : "border-white/30 hover:border-white/60 bg-white/5"
                } px-3 md:px-4 py-1.5 backdrop-blur-sm`}
              >
                <span className={`text-[11px] md:text-xs font-semibold tracking-wide ${i === idx ? "text-[hsl(140_70%_60%)]" : "text-white/85"}`}>
                  0{i + 1} · {s.title}
                </span>
                {i === idx && !paused && (
                  <span
                    key={idx}
                    className="absolute bottom-0 left-0 h-0.5 bg-[hsl(140_70%_55%)] animate-[heroProgress_6s_linear_forwards]"
                  />
                )}
              </button>
            ))}
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
