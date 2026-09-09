import PortalLayout from "@/components/portal/PortalLayout";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FileText, LifeBuoy, Users, ShieldCheck, Loader2, Send } from "lucide-react";

const QUOTE_STATUSES = ["new", "in_review", "quoted", "closed"] as const;
const TICKET_STATUSES = ["open", "pending", "resolved", "closed"] as const;
const TICKET_PRIORITIES = ["low", "normal", "high", "urgent"] as const;

type Tab = "overview" | "quotes" | "tickets" | "customers";

const Admin = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<string>("all");
  const [openQuote, setOpenQuote] = useState<string | null>(null);
  const [openTicket, setOpenTicket] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [me, setMe] = useState<string>("");

  const load = async () => {
    const [{ data: q }, { data: t }, { data: u }, { data: session }] = await Promise.all([
      supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("support_tickets").select("*").order("created_at", { ascending: false }),
      supabase.rpc("admin_list_users"),
      supabase.auth.getSession(),
    ]);
    setQuotes(q || []);
    setTickets(t || []);
    setUsers((u as any[]) || []);
    setMe(session?.session?.user.id || "");
    setLoading(false);
  };

  useEffect(() => { document.title = "Site administration | WularData"; load(); }, []);

  const updateQuote = async (id: string, patch: Record<string, unknown>) => {
    const { error } = await supabase.from("quote_requests").update(patch as any).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Enquiry updated"); load(); }
  };
  const updateTicket = async (id: string, patch: Record<string, unknown>) => {
    const { error } = await supabase.from("support_tickets").update(patch as any).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Ticket updated"); load(); }
  };

  const openThread = async (id: string) => {
    if (openTicket === id) { setOpenTicket(null); setMessages([]); return; }
    setOpenTicket(id);
    const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", id).order("created_at");
    setMessages(data || []);
  };

  const sendReply = async () => {
    if (!openTicket || !reply.trim()) return;
    const { error } = await supabase.from("ticket_messages").insert({ ticket_id: openTicket, sender_id: me, body: reply.trim() });
    if (error) { toast.error(error.message); return; }
    setReply("");
    toast.success("Reply sent");
    const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", openTicket).order("created_at");
    setMessages(data || []);
  };

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (userId === me) { toast.error("You cannot change your own admin access"); return; }
    const { error } = isAdmin
      ? await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin")
      : await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (error) toast.error(error.message); else { toast.success(isAdmin ? "Admin access removed" : "Admin access granted"); load(); }
  };

  const filteredQuotes = useMemo(() => {
    const s = search.trim().toLowerCase();
    return quotes.filter(q =>
      (quoteStatus === "all" || q.status === quoteStatus) &&
      (!s || [q.contact_name, q.email, q.company, q.service_name, q.phone].some((v: string) => (v || "").toLowerCase().includes(s)))
    );
  }, [quotes, search, quoteStatus]);

  const stats = [
    { label: "Total enquiries", value: quotes.length, sub: `${quotes.filter(q => q.status === "new").length} new`, icon: FileText },
    { label: "Support tickets", value: tickets.length, sub: `${tickets.filter(t => t.status === "open").length} open`, icon: LifeBuoy },
    { label: "Registered customers", value: users.length, sub: `${users.filter(u => u.is_admin).length} admins`, icon: Users },
    { label: "Closed enquiries", value: quotes.filter(q => q.status === "closed").length, sub: "resolved", icon: ShieldCheck },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "quotes", label: `Enquiries (${quotes.length})` },
    { id: "tickets", label: `Tickets (${tickets.length})` },
    { id: "customers", label: `Customers (${users.length})` },
  ];

  return (
    <PortalLayout requireAdmin>
      <h1 className="text-2xl font-extrabold mb-1">Site administration</h1>
      <p className="text-muted-foreground text-sm mb-6">Manage enquiries, support tickets, customers and admin access.</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-md text-sm font-semibold ${tab === t.id ? "bg-[hsl(var(--deep-blue))] text-white" : "bg-white border"}`}>{t.label}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading data…</div>
      ) : tab === "overview" ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="rounded-lg bg-white shadow-card p-5">
                <s.icon className="h-5 w-5 text-[hsl(var(--deep-blue))] mb-3" />
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white shadow-card p-5">
            <h2 className="font-bold mb-3">Latest enquiries</h2>
            {quotes.slice(0, 5).map(q => (
              <div key={q.id} className="flex items-center justify-between border-t py-2 text-sm first:border-t-0">
                <span className="font-medium">{q.contact_name}<span className="text-muted-foreground"> · {q.service_name}</span></span>
                <span className="text-xs text-muted-foreground">{new Date(q.created_at).toLocaleDateString()} · {q.status}</span>
              </div>
            ))}
            {quotes.length === 0 && <p className="text-sm text-muted-foreground">No enquiries yet.</p>}
          </div>
        </div>
      ) : tab === "quotes" ? (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, company, service…" className="flex-1 min-w-[220px] rounded-md border px-3 py-2 text-sm" />
            <select value={quoteStatus} onChange={e => setQuoteStatus(e.target.value)} className="rounded-md border bg-white px-3 py-2 text-sm">
              <option value="all">All statuses</option>
              {QUOTE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="rounded-lg bg-white shadow-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Contact</th><th className="p-3 text-left">Service</th><th className="p-3 text-left">Submitted</th><th className="p-3 text-left">Status</th></tr>
              </thead>
              <tbody>
                {filteredQuotes.map(q => (
                  <>
                    <tr key={q.id} className="border-t cursor-pointer hover:bg-secondary/50" onClick={() => setOpenQuote(openQuote === q.id ? null : q.id)}>
                      <td className="p-3 font-medium">{q.contact_name}<div className="text-xs text-muted-foreground">{q.company || "—"}</div></td>
                      <td className="p-3 text-muted-foreground">{q.email}<div className="text-xs">{q.phone || ""}</div></td>
                      <td className="p-3">{q.service_name}<div className="text-xs text-muted-foreground">{q.service_category}</div></td>
                      <td className="p-3 text-muted-foreground text-xs">{new Date(q.created_at).toLocaleString()}</td>
                      <td className="p-3" onClick={e => e.stopPropagation()}>
                        <select value={q.status} onChange={e => updateQuote(q.id, { status: e.target.value })} className="rounded border bg-white px-2 py-1 text-xs">
                          {QUOTE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                    {openQuote === q.id && (
                      <tr key={`${q.id}-detail`} className="border-t bg-secondary/40">
                        <td colSpan={5} className="p-4 text-sm">
                          <p className="font-semibold mb-1">Requirement</p>
                          <p className="text-muted-foreground whitespace-pre-line">{q.message || "No details provided."}</p>
                          <a href={`mailto:${q.email}`} className="inline-block mt-3 text-xs font-semibold text-[hsl(var(--deep-blue))] hover:underline">Reply by email →</a>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {filteredQuotes.length === 0 && <tr><td colSpan={5} className="p-4 text-sm text-muted-foreground">No enquiries match your filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      ) : tab === "tickets" ? (
        <div className="rounded-lg bg-white shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="p-3 text-left">Subject</th><th className="p-3 text-left">Service</th><th className="p-3 text-left">Priority</th><th className="p-3 text-left">Created</th><th className="p-3 text-left">Status</th></tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <>
                  <tr key={t.id} className="border-t cursor-pointer hover:bg-secondary/50" onClick={() => openThread(t.id)}>
                    <td className="p-3 font-medium">{t.subject}</td>
                    <td className="p-3 text-muted-foreground">{t.service || "—"}</td>
                    <td className="p-3" onClick={e => e.stopPropagation()}>
                      <select value={t.priority} onChange={e => updateTicket(t.id, { priority: e.target.value })} className="rounded border bg-white px-2 py-1 text-xs">
                        {TICKET_PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </td>
                    <td className="p-3 text-muted-foreground text-xs">{new Date(t.created_at).toLocaleString()}</td>
                    <td className="p-3" onClick={e => e.stopPropagation()}>
                      <select value={t.status} onChange={e => updateTicket(t.id, { status: e.target.value })} className="rounded border bg-white px-2 py-1 text-xs">
                        {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                  {openTicket === t.id && (
                    <tr key={`${t.id}-thread`} className="border-t bg-secondary/40">
                      <td colSpan={5} className="p-4">
                        <div className="space-y-2 mb-3">
                          {messages.map(m => (
                            <div key={m.id} className="rounded-md bg-white border p-3 text-sm">
                              <p className="whitespace-pre-line">{m.body}</p>
                              <p className="text-xs text-muted-foreground mt-1">{m.sender_id === me ? "You (admin)" : "Customer"} · {new Date(m.created_at).toLocaleString()}</p>
                            </div>
                          ))}
                          {messages.length === 0 && <p className="text-sm text-muted-foreground">No messages on this ticket yet.</p>}
                        </div>
                        <div className="flex gap-2">
                          <input value={reply} onChange={e => setReply(e.target.value)} placeholder="Write a reply to the customer…" className="flex-1 rounded-md border px-3 py-2 text-sm" />
                          <button onClick={sendReply} className="btn-primary-solid px-4"><Send className="h-4 w-4" /> Send</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {tickets.length === 0 && <tr><td colSpan={5} className="p-4 text-sm text-muted-foreground">No support tickets yet.</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg bg-white shadow-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Joined</th><th className="p-3 text-left">Access</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-3 font-medium">{u.full_name || "—"}<div className="text-xs text-muted-foreground">{u.company || "—"}</div></td>
                  <td className="p-3 text-muted-foreground">{u.email}</td>
                  <td className="p-3 text-muted-foreground">{u.phone || "—"}</td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button onClick={() => toggleAdmin(u.id, u.is_admin)} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${u.is_admin ? "bg-[hsl(var(--deep-blue))] text-white" : "border bg-white"}`}>
                      {u.is_admin ? "Administrator" : "Make administrator"}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan={5} className="p-4 text-sm text-muted-foreground">No customers registered yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </PortalLayout>
  );
};

export default Admin;
