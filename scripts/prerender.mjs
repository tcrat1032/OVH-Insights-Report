// scripts/prerender.mjs
// Runs after `vite build`. Opens every public page (from dist/sitemap.xml) in a
// headless browser, waits for it to finish rendering, and saves the finished
// HTML to dist/_prerender/<path>/index.html. It then writes dist/_redirects so
// Netlify serves each page's own HTML instead of the one shared index.html.
//
// Why: crawlers that don't run JavaScript (LinkedIn/WhatsApp/Facebook
// previews, AI crawlers, some search engines) otherwise see the same empty
// page with the homepage's title and canonical on every URL.
//
// Fail-safe: if anything goes wrong, the build still succeeds and the site
// behaves exactly as before (single index.html for every route).

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const DIST = path.resolve("dist");
const OUT = path.join(DIST, "_prerender");
const SITE = "https://wulardata.com";
const DEFAULT_TITLE = "India Cloud Hosting, Colocation & Dedicated Servers | WularData";

const log = (...a) => console.log("[prerender]", ...a);

function routesFromSitemap() {
  const xml = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1].trim()).pathname.replace(/\/+$/, "") || "/");
}

// Tiny static server over dist/ with SPA fallback (same as production).
function startServer() {
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
    ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon",
    ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml", ".txt": "text/plain" };
  const shell = fs.readFileSync(path.join(DIST, "index.html"));
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = path.join(DIST, p);
    if (file.startsWith(DIST) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      return fs.createReadStream(file).pipe(res);
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(shell);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

async function launchBrowser() {
  const puppeteer = (await import("puppeteer")).default;
  const opts = { headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"] };
  if (process.env.PRERENDER_CHROME_PATH) opts.executablePath = process.env.PRERENDER_CHROME_PATH;
  try {
    return await puppeteer.launch(opts);
  } catch (e) {
    // Some package managers skip puppeteer's postinstall download. Fetch Chrome and retry once.
    log("Chrome not found, downloading it…", e.message.split("\n")[0]);
    execSync("npx --yes puppeteer browsers install chrome", { stdio: "inherit" });
    return await puppeteer.launch(opts);
  }
}

async function renderRoute(browser, origin, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1366, height: 900 });
    await page.setRequestInterception(true);
    page.on("request", (r) => {
      // Don't run analytics during the build (no fake visits, no injected tags).
      if (/googletagmanager\.com|google-analytics\.com|doubleclick\.net/.test(r.url())) return r.abort();
      r.continue();
    });
    await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 45000 });
    const expected = SITE + (route === "/" ? "/" : route);
    await page.waitForFunction(
      (exp) => {
        const c = document.querySelector('link[rel="canonical"]');
        const root = document.getElementById("root");
        return c && c.href === exp && root && root.innerText.trim().length > 200 && document.querySelector("h1");
      },
      { timeout: 20000 },
      expected,
    );
    const html = await page.evaluate(() => {
      // Remove anything the analytics snippet may have injected, keep everything else.
      document.querySelectorAll('script[src*="googletagmanager.com/gtag/js?id="]').forEach((s, i) => { if (i > 0) s.remove(); });
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });
    const title = await page.title();
    if (route !== "/" && title === DEFAULT_TITLE) throw new Error("page kept the default homepage title");
    return { html, title };
  } finally {
    await page.close();
  }
}

async function main() {
  if (process.env.SKIP_PRERENDER === "1") return log("SKIP_PRERENDER=1, skipping.");
  const routes = routesFromSitemap();
  log(`Rendering ${routes.length} pages…`);
  const server = await startServer();
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchBrowser();
  const done = [];
  try {
    for (const route of routes) {
      try {
        const { html, title } = await renderRoute(browser, origin, route);
        const dir = path.join(OUT, route === "/" ? "" : route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
        done.push(route);
        log(`  ok  ${route}  —  ${title}`);
      } catch (e) {
        log(`  SKIP ${route}  (${e.message.split("\n")[0]}) — will use the normal app shell`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  if (!done.length) throw new Error("no pages rendered");

  // _redirects is processed by Netlify BEFORE netlify.toml, so the domain
  // redirects must be repeated here first, then one rewrite per rendered page.
  const lines = [
    "# Generated by scripts/prerender.mjs — do not edit by hand.",
    "https://wulardata.in/*      https://wulardata.com/:splat  301!",
    "https://www.wulardata.in/*  https://wulardata.com/:splat  301!",
    "/home  /  301!",
    ...done.map((r) => `${r}  /_prerender${r === "/" ? "" : r}/index.html  200!`),
  ];
  fs.writeFileSync(path.join(DIST, "_redirects"), lines.join("\n") + "\n");
  log(`Done: ${done.length}/${routes.length} pages pre-rendered.`);
}

main().catch((e) => {
  // Never fail the deploy because of pre-rendering; the site still works as a normal SPA.
  console.warn("[prerender] FAILED, deploying without pre-rendered pages:", e);
  try { fs.rmSync(OUT, { recursive: true, force: true }); fs.rmSync(path.join(DIST, "_redirects"), { force: true }); } catch {}
  process.exit(0);
});
