import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PHONE = "919899313188";
const SESSION_KEY = "wd_wa_greeting_shown";
const HIDDEN_PREFIXES = ["/auth", "/reset-password", "/portal", "/admin"];

function isHidden(path: string) {
  return HIDDEN_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

function routeName(path: string) {
  const last = path.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildMessage(path: string) {
  if (path === "/" || path === "") return "Hi WularData, I have a query about your services.";
  const h1 = document.querySelector("main h1, h1")?.textContent?.trim();
  const name = h1?.split(/\s+[—–|:]\s+/)[0] || routeName(path);
  return `Hi WularData, I have a query about ${name} (wulardata.com${path}).`;
}

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const [bubble, setBubble] = useState(false);
  const [lift, setLift] = useState(0);

  // Show greeting once per session, 6s after load.
  useEffect(() => {
    let shown = false;
    try { shown = sessionStorage.getItem(SESSION_KEY) === "1"; } catch { /* ignore */ }
    if (shown) return;
    const t = window.setTimeout(() => {
      setBubble(true);
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  // Lift above cookie banner / mobile sticky CTA if present.
  useEffect(() => {
    const measure = () => {
      let h = 0;
      document.querySelectorAll<HTMLElement>("[data-cookie-banner], [data-mobile-sticky-cta]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.top < window.innerHeight) h = Math.max(h, window.innerHeight - r.top);
      });
      setLift(h);
    };
    measure();
    const mo = new MutationObserver(measure);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class", "hidden"] });
    window.addEventListener("resize", measure);
    return () => { mo.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  if (isHidden(pathname)) return null;

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(buildMessage(pathname))}`;
    e.currentTarget.href = url;
    setBubble(false);
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof g === "function") g("event", "whatsapp_click", { page_path: pathname });
  };

  return (
    <div
      className="wa-float fixed z-40 flex items-end gap-3 right-4 sm:right-5"
      style={{ bottom: `calc(${lift}px + var(--wa-offset))` }}
    >
      {bubble && (
        <div className="wa-bubble relative mb-2 max-w-[220px] rounded-lg bg-background text-foreground border shadow-lg px-3 py-2 pr-7 text-sm">
          Questions? Chat with an engineer on WhatsApp
          <button
            type="button"
            aria-label="Close message"
            onClick={() => setBubble(false)}
            className="absolute top-1 right-1.5 text-muted-foreground hover:text-foreground leading-none text-base"
          >
            ×
          </button>
        </div>
      )}
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with WularData on WhatsApp"
        onClick={onClick}
        className="wa-btn flex shrink-0 items-center justify-center rounded-full shadow-lg motion-safe:transition-transform motion-safe:hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" fill="#fff">
          <path d="M16.04 3C9 3 3.3 8.7 3.3 15.73c0 2.25.59 4.45 1.71 6.39L3.2 29l7.06-1.85a12.7 12.7 0 0 0 5.78 1.39h.01c7.03 0 12.74-5.7 12.74-12.74C28.79 8.7 23.08 3 16.04 3zm0 23.3h-.01a10.57 10.57 0 0 1-5.39-1.48l-.39-.23-4.19 1.1 1.12-4.08-.25-.42a10.55 10.55 0 0 1-1.62-5.62c0-5.84 4.75-10.59 10.6-10.59 2.83 0 5.49 1.1 7.49 3.1a10.52 10.52 0 0 1 3.1 7.49c0 5.84-4.76 10.59-10.59 10.59zm5.81-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </a>
    </div>
  );
}
