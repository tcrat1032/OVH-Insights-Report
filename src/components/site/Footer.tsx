import { Link } from "react-router-dom";
import { Mail, Linkedin, Twitter, Facebook, Youtube, Instagram } from "lucide-react";
import { PILLARS } from "@/data/services";
import { useCmsNavigationPages, useCmsSettings } from "@/lib/cms";

const Footer = () => {
  const { data: settings } = useCmsSettings();
  const { data: customPages = [] } = useCmsNavigationPages();
  const footer = settings?.footer;
  const newsletterTitle = typeof footer?.newsletterTitle === "string" ? footer.newsletterTitle : "Keep in touch";
  const newsletterText = typeof footer?.newsletterText === "string" ? footer.newsletterText : "Subscribe for product news and offers.";
  const copyright = typeof footer?.copyright === "string" ? footer.copyright : "WularData. All rights reserved.";
  const domain = typeof footer?.domain === "string" ? footer.domain : "wulardata.com";
  const cols = [
    {
      title: "Data Center & Colocation",
      links: PILLARS[0].services.map(s => ({ name: s.name, to: `/data-center-services/${s.slug}` })),
    },
    {
      title: "Domain & Web Management",
      links: PILLARS[1].services.map(s => ({ name: s.name, to: `/hosting-services/${s.slug}` })),
    },
    {
      title: "IT Support & Consulting",
      links: PILLARS[2].services.map(s => ({ name: s.name, to: `/it-infrastructure/${s.slug}` })),
    },
    {
      title: "Company",
      links: [
        { name: "About WularData", to: "/about" },
        { name: "Contact", to: "/contact" },
        { name: "Get a quote", to: "/contact" },
        { name: "Customer Portal", to: "/portal" },
        ...customPages.map(page => ({ name: page.navigation_label || page.title, to: `/${page.slug}` })),
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", to: "/contact" },
        { name: "Open a ticket", to: "/portal/tickets" },
        { name: "Service status", to: "/contact" },
        { name: "Documentation", to: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-fg))]">
      <div className="container-wd py-14">
        <div className="grid gap-10 lg:grid-cols-6">
          {cols.map(c => (
            <div key={c.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map(l => (
                  <li key={l.name}>
                    <Link to={l.to} className="text-sm hover:text-[hsl(var(--cyan))] transition-colors">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">{newsletterTitle}</h4>
            <p className="text-sm mb-3">{newsletterText}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" required placeholder="you@company.com" className="flex-1 rounded-md bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-[hsl(var(--cyan))]" />
              <button type="submit" className="rounded-md bg-[hsl(var(--cyan))] p-2 text-[hsl(var(--deep-blue))] hover:brightness-110" aria-label="Subscribe">
                <Mail className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn", href: "https://in.linkedin.com/company/wular-data" },
                { Icon: Twitter, label: "Twitter", href: "#" },
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-full bg-white/10 p-2 hover:bg-[hsl(var(--cyan))] hover:text-[hsl(var(--deep-blue))] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wd flex flex-col md:flex-row gap-3 items-center justify-between py-5 text-xs">
          <p>© {new Date().getFullYear()} {copyright}</p>
          <div className="flex gap-5">
            <Link to="/contact" className="hover:text-[hsl(var(--cyan))]">Privacy</Link>
            <Link to="/contact" className="hover:text-[hsl(var(--cyan))]">Terms</Link>
            <Link to="/contact" className="hover:text-[hsl(var(--cyan))]">Cookies</Link>
            <span>{domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
