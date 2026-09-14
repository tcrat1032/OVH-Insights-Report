import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, FileText, LifeBuoy, User, LogOut, Shield, Loader2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PortalLayout = ({ children, requireAdmin = false }: { children: ReactNode; requireAdmin?: boolean }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth", { replace: true }); return; }
      setEmail(session.user.email || "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      const admin = !!roles?.some(r => r.role === "admin");
      setIsAdmin(admin);
      if (requireAdmin && !admin) { toast.error("Admin access required"); navigate("/portal", { replace: true }); return; }
      setLoading(false);
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate, requireAdmin]);

  const signOut = async () => { await supabase.auth.signOut(); navigate("/", { replace: true }); };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  const items = [
    { to: "/portal", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/portal/quotes", icon: FileText, label: "My quotes" },
    { to: "/portal/tickets", icon: LifeBuoy, label: "Support tickets" },
    { to: "/portal/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-secondary flex">
      <Button variant="outline" size="icon" className="fixed left-3 top-3 z-50 bg-background lg:hidden" onClick={() => setMobileOpen(current => !current)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>{mobileOpen ? <X /> : <Menu />}</Button>
      {mobileOpen && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r flex flex-col transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Link to="/" className="flex items-center gap-2 p-5 border-b">
          <div className="h-7 w-7 rounded bg-[hsl(var(--deep-blue))] flex items-center justify-center"><div className="h-2.5 w-2.5 rounded-sm bg-[hsl(var(--cyan))]" /></div>
          <span className="font-extrabold text-[hsl(var(--deep-blue))]">WularData</span>
        </Link>
        <nav className="p-3 space-y-1 flex-1">
          {items.map(it => (
            <NavLink key={it.to} to={it.to} end={it.end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-[hsl(var(--deep-blue))] text-white' : 'text-foreground hover:bg-secondary'}`}>
              <it.icon className="h-4 w-4" /> {it.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-[hsl(var(--deep-blue))] text-white' : 'text-foreground hover:bg-secondary'}`}>
              <Shield className="h-4 w-4" /> Admin
            </NavLink>
          )}
        </nav>
        <div className="p-3 border-t">
          <p className="text-xs text-muted-foreground truncate mb-2">{email}</p>
          <button onClick={signOut} className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--deep-blue))]"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto px-4 pb-8 pt-16 sm:px-6 lg:p-8">{children}</main>
    </div>
  );
};

export default PortalLayout;
