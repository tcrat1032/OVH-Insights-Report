import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Phone, HelpCircle, Globe, ChevronDown, Menu, X, User } from "lucide-react";
import { PILLARS } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";
import type { User as AuthUser } from "@supabase/supabase-js";
import Logo from "@/components/site/Logo";

const Header = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Utility strip */}
      <div className="bg-[hsl(var(--deep-blue))] text-white text-xs">
        <div className="container-wd flex h-9 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> India (English)</span>
            <a href="tel:+919899313188" className="hidden md:inline-flex items-center gap-1.5 hover:text-[hsl(var(--cyan))]"><Phone className="h-3.5 w-3.5" /> +91 9899313188</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden md:inline-flex items-center gap-1.5 hover:text-[hsl(var(--cyan))]"><HelpCircle className="h-3.5 w-3.5" /> Help</Link>
            {user ? (
              <Link to="/portal" className="inline-flex items-center gap-1.5 hover:text-[hsl(var(--cyan))]"><User className="h-3.5 w-3.5" /> Customer Portal</Link>
            ) : (
              <Link to="/auth" className="inline-flex items-center gap-1.5 hover:text-[hsl(var(--cyan))]"><User className="h-3.5 w-3.5" /> Sign in</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-wd flex h-16 items-center justify-between" onMouseLeave={() => setOpenMenu(null)}>
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) => `rounded px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'text-[hsl(var(--deep-blue))]' : 'text-foreground hover:text-[hsl(var(--deep-blue))]'}`}
            end
          >
            Home
          </NavLink>
          {PILLARS.map(p => (
            <div key={p.slug} className="relative" onMouseEnter={() => setOpenMenu(p.slug)}>
              <NavLink
                to={`/${p.slug}`}
                className={({ isActive }) => `flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'text-[hsl(var(--deep-blue))]' : 'text-foreground hover:text-[hsl(var(--deep-blue))]'}`}
              >
                {p.name} <ChevronDown className="h-3.5 w-3.5" />
              </NavLink>
              {openMenu === p.slug && (
                <div className="absolute left-0 top-full pt-2 animate-fade-in">
                  <div className="w-[420px] rounded-lg border bg-white p-3 shadow-elevated">
                    <p className="px-3 pb-2 eyebrow">{p.tagline}</p>
                    <ul className="grid gap-1">
                      {p.services.map(s => {
                        const to = `/${p.slug}/${s.slug}`;
                        return (
                          <li key={s.slug}>
                            <Link to={to} className="flex items-start gap-3 rounded-md px-3 py-2 hover:bg-secondary" onClick={() => setOpenMenu(null)}>
                              <s.icon className="h-5 w-5 text-[hsl(var(--primary-mid))] shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{s.shortDesc}</p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
          <NavLink to="/about" className="rounded px-3 py-2 text-sm font-semibold hover:text-[hsl(var(--deep-blue))]">About</NavLink>
          <NavLink to="/contact" className="rounded px-3 py-2 text-sm font-semibold hover:text-[hsl(var(--deep-blue))]">Contact</NavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/contact" className="btn-primary-solid !py-2 !text-xs">Get a quote</Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container-wd py-4 space-y-2">
            {PILLARS.map(p => (
              <details key={p.slug} className="group">
                <summary className="flex cursor-pointer items-center justify-between py-2 text-sm font-semibold">
                  {p.name} <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                </summary>
                <ul className="pl-4 pb-2 space-y-1">
                  {p.services.map(s => {
                    const to = `/${p.slug}/${s.slug}`;
                    return (
                      <li key={s.slug}>
                        <Link to={to} onClick={() => setMobileOpen(false)} className="block py-1 text-sm text-muted-foreground">{s.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            ))}
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold">Home</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-semibold">Contact</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-primary-solid w-full !py-2.5">Get a quote</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
