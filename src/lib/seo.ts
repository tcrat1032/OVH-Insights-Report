import { useEffect } from "react";

const SITE_URL = "https://wulardata.com";

function setMeta(selector: string, create: () => HTMLElement, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  if (el.tagName === "LINK") el.setAttribute("href", value);
  else el.setAttribute("content", value);
}

/** Sets per-route title, description and self-referencing canonical / og:url. */
export function useSeo({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    document.title = title;

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (robots) robots.setAttribute("content", "noindex, follow");
      else {
        const m = document.createElement("meta");
        m.setAttribute("name", "robots");
        m.setAttribute("content", "noindex, follow");
        document.head.appendChild(m);
      }
    } else if (robots?.getAttribute("content")?.includes("noindex")) {
      robots.setAttribute("content", "index, follow");
    }

    setMeta('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    }, title);

    setMeta('meta[name="twitter:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:title");
      return m;
    }, title);

    if (description) {
      setMeta('meta[name="twitter:description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "twitter:description");
        return m;
      }, description);
      setMeta('meta[name="description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      }, description);
      setMeta('meta[property="og:description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      }, description);
    }

    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    setMeta('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    }, url);
    setMeta('meta[property="og:url"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:url");
      return m;
    }, url);
  }, [title, description, path, noindex]);
}
