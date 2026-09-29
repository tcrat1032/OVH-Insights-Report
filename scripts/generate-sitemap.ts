// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs";
import { resolve } from "path";

// Matches the domain used in public/robots.txt and the index.html canonical tag.
const BASE_URL = "https://wulardata.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Public, indexable routes only. Omit /not-found, /lovable, auth, portal and
// admin (authenticated/internal) routes — these should not be indexed.
// Service pages mirror the pillar/service structure in src/data/services.ts.
const PILLAR_SERVICES: Record<string, string[]> = {
  "data-center-services": [
    "dedicated-servers",
    "vps",
    "colocation",
    "application-hosting",
    "database-hosting",
    "storage-provisioning",
    "backup-and-dr",
    "connectivity-and-cdn",
  ],
  "hosting-services": [
    "domain-registration",
    "web-hosting",
    "app-development",
    "business-email",
  ],
  "it-infrastructure": [
    "it-managed-services",
    "consulting-and-migration",
    "hardware-support",
  ],
};

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  ...Object.entries(PILLAR_SERVICES).flatMap(([pillar, services]) => [
    { path: `/${pillar}`, changefreq: "monthly" as const, priority: "0.9" },
    ...services.map((s) => ({
      path: `/${pillar}/${s}`,
      changefreq: "monthly" as const,
      priority: "0.8",
    })),
  ]),
  { path: "/about", changefreq: "yearly", priority: "0.5" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
