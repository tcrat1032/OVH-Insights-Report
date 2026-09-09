import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import PublicLayout from "@/components/site/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const safeNext = (value: string | null) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : null;


const signInSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});
const signUpSchema = signInSchema.extend({
  full_name: z.string().trim().min(2, "Name is required").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
});

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", company: "" });

  useEffect(() => {
    document.title = "Sign in | WularData";
    const go = () => {
      if (next) window.location.replace(next);
      else navigate("/portal", { replace: true });
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) go();
    });
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) go(); });
    return () => subscription.unsubscribe();
  }, [navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const r = signInSchema.safeParse(form);
      if (!r.success) { toast.error(r.error.errors[0].message); setLoading(false); return; }
      const { error } = await supabase.auth.signInWithPassword({ email: r.data.email, password: r.data.password });
      if (error) toast.error(error.message); else toast.success("Welcome back!");
    } else {
      const r = signUpSchema.safeParse(form);
      if (!r.success) { toast.error(r.error.errors[0].message); setLoading(false); return; }
      const { error } = await supabase.auth.signUp({
        email: r.data.email,
        password: r.data.password,
        options: {
          emailRedirectTo: next ? `${window.location.origin}${next}` : `${window.location.origin}/portal`,
          data: { full_name: r.data.full_name, company: r.data.company },
        },
      });
      if (error) toast.error(error.message); else toast.success("Account created. Welcome!");
    }
    setLoading(false);
  };

  const forgotPassword = async () => {
    const email = form.email.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Enter your email address first, then click reset");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent. Check your inbox.");
  };

  const google = async () => {
    const redirect_uri = next
      ? `${window.location.origin}/auth?next=${encodeURIComponent(next)}`
      : `${window.location.origin}/portal`;
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri });
    if (result.error) toast.error("Google sign-in failed");
  };


  return (
    <PublicLayout>
      <section className="bg-secondary py-16 min-h-[70vh] flex items-center">
        <div className="container-wd max-w-md">
          <div className="rounded-lg bg-white border shadow-card p-8">
            <h1 className="text-2xl font-extrabold mb-1">{mode === "signin" ? "Sign in" : "Create your account"}</h1>
            <p className="text-sm text-muted-foreground mb-6">{mode === "signin" ? "Access your WularData customer portal." : "Manage quotes, tickets and your profile."}</p>

            <button onClick={google} className="w-full mb-4 inline-flex items-center justify-center gap-2 rounded-md border bg-white px-4 py-2.5 text-sm font-semibold hover:bg-secondary transition-colors">
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <div className="relative my-4 text-center text-xs text-muted-foreground">
              <span className="bg-white px-2 relative z-10">or with email</span>
              <div className="absolute inset-x-0 top-1/2 border-t" />
            </div>

            <form onSubmit={submit} className="space-y-3">
              {mode === "signup" && (
                <>
                  <input required placeholder="Full name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
                  <input placeholder="Company (optional)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
                </>
              )}
              <input required type="email" placeholder="Work email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              <input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              <button disabled={loading} className="btn-primary-solid w-full disabled:opacity-50">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            {mode === "signin" && (
              <p className="text-center text-sm mt-3">
                <button type="button" onClick={forgotPassword} className="text-muted-foreground hover:underline">
                  Forgot password? Email me a reset link
                </button>
              </p>
            )}

            <p className="text-center text-sm text-muted-foreground mt-5">
              {mode === "signin" ? "New to WularData?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-[hsl(var(--deep-blue))] hover:underline">
                {mode === "signin" ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4"><Link to="/" className="hover:underline">← Back to wulardata.com</Link></p>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Auth;
