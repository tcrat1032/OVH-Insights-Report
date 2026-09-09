import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "@/components/site/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    document.title = "Set a new password | WularData";
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) setReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => { if (session) setReady(true); });
    return () => subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { toast.error("Use at least 8 characters"); return; }
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated. You're signed in.");
    navigate("/portal", { replace: true });
  };

  return (
    <PublicLayout>
      <section className="bg-secondary py-16 min-h-[70vh] flex items-center">
        <div className="container-wd max-w-md">
          <div className="rounded-lg bg-white border shadow-card p-8">
            <h1 className="text-2xl font-extrabold mb-1">Set a new password</h1>
            <p className="text-sm text-muted-foreground mb-6">
              {ready
                ? "Choose a new password for your WularData account."
                : "Open this page from the reset link in your email to continue."}
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input required type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              <input required type="password" placeholder="Confirm new password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              <button disabled={loading || !ready} className="btn-primary-solid w-full disabled:opacity-50">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Update password
              </button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-5">
              <Link to="/auth" className="font-semibold text-[hsl(var(--deep-blue))] hover:underline">Back to sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ResetPassword;
