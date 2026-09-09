import { useSeo } from "@/lib/seo";
import PublicLayout from "@/components/site/PublicLayout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { ALL_SERVICES, PILLARS } from "@/data/services";

const schema = z.object({
  contact_name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  service_category: z.string().min(1, "Select a category"),
  service_name: z.string().min(1, "Select a service"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const Contact = () => {
  useSeo({ title: 'Contact WularData — Request a Quote or Talk to Sales', description: "Talk to WularData's infrastructure experts. Request a tailored quote for servers, hosting, storage or managed IT services." });
  const [params] = useSearchParams();
  const initialService = params.get("service") || "";
  const initialCategory = params.get("category") || "";
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    contact_name: "", email: "", phone: "", company: "",
    service_category: initialCategory || PILLARS[0].slug,
    service_name: initialService || "",
    message: "",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const servicesForCategory = PILLARS.find(p => p.slug === form.service_category)?.services || [];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("quote_requests").insert({
      contact_name: result.data.contact_name,
      email: result.data.email,
      service_category: result.data.service_category,
      service_name: result.data.service_name,
      user_id: user?.id ?? null,
      phone: result.data.phone || null,
      company: result.data.company || null,
      message: result.data.message || null,
    } as any);
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    toast.success("Thank you! Our team will reach out shortly.");
    setForm({ ...form, contact_name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <PublicLayout>
      <section className="bg-gradient-hero text-white">
        <div className="container-wd py-16">
          <p className="eyebrow text-[hsl(var(--cyan))] mb-2">Contact us</p>
          <h1 className="text-4xl md:text-5xl font-extrabold">Talk to our experts</h1>
          <p className="text-white/85 mt-3 max-w-2xl">Tell us about your workload and we'll respond with a tailored proposal — typically within one business day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-wd grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 rounded-lg border bg-card p-6 md:p-8 shadow-card">
            <h2 className="text-xl font-bold mb-6">Request a quote</h2>
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name *</label>
                <input required value={form.contact_name} onChange={e => setForm({ ...form, contact_name: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Work email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</label>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category *</label>
                <select value={form.service_category} onChange={e => setForm({ ...form, service_category: e.target.value, service_name: "" })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[hsl(var(--deep-blue))]">
                  {PILLARS.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service *</label>
                <select required value={form.service_name} onChange={e => setForm({ ...form, service_name: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[hsl(var(--deep-blue))]">
                  <option value="">Select service…</option>
                  {servicesForCategory.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tell us about your requirement</label>
                <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:border-[hsl(var(--deep-blue))]" />
              </div>
              <div className="sm:col-span-2">
                <button disabled={submitting} className="btn-primary-solid w-full sm:w-auto disabled:opacity-50">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Submitting…" : "Submit enquiry"}
                </button>
              </div>
            </form>
          </div>

          <aside className="space-y-5">
            <div className="rounded-lg bg-[hsl(var(--deep-blue))] text-white p-6">
              <h3 className="font-bold mb-4">Reach us directly</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><Phone className="h-4 w-4 mt-0.5 text-[hsl(var(--cyan))]" /> <a href="tel:+919899313188" className="hover:underline">+91 9899313188</a></li>
                <li className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-[hsl(var(--cyan))]" /> <a href="mailto:reachus@wulardata.com" className="hover:underline">reachus@wulardata.com</a></li>
                <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-[hsl(var(--cyan))]" /> <span>Wular Data Lake Private Limited<br/>Regd. Office: B-8, Sector 2, Noida, UP - 201301</span></li>
              </ul>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="font-bold mb-2 text-sm">Existing customer?</h3>
              <p className="text-xs text-muted-foreground mb-3">Sign in to open a support ticket or view your quotes.</p>
              <a href="/portal" className="text-sm font-semibold text-[hsl(var(--deep-blue))] hover:underline">Open Customer Portal →</a>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Contact;
