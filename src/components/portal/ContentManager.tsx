import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Copy, FilePlus2, ImagePlus, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { emptySection, formatCmsPrice, parseSections, type CmsMedia, type CmsPage, type CmsPlan, type CmsSection, type CmsService, type CmsStatus } from "@/lib/cms";
import type { Json } from "@/integrations/supabase/types";

type Setting = { key: string; value: Json; description: string };
const statuses: CmsStatus[] = ["draft", "published", "archived"];
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const text = (value: unknown) => typeof value === "string" ? value : "";

const ContentManager = () => {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [services, setServices] = useState<CmsService[]>([]);
  const [plans, setPlans] = useState<CmsPlan[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [media, setMedia] = useState<CmsMedia[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [pageDraft, setPageDraft] = useState<CmsPage | null>(null);
  const [settingsDraft, setSettingsDraft] = useState<Record<string, Record<string, unknown>>>({});
  const [busy, setBusy] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "page" | "media" | "service" | "plan"; id: string; label: string } | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    const [p, s, pl, st, m] = await Promise.all([
      supabase.from("cms_pages").select("*").order("navigation_order"),
      supabase.from("cms_services").select("*").order("pillar_slug").order("display_order"),
      supabase.from("cms_plans").select("*").order("display_order"),
      supabase.from("cms_settings").select("key,value,description").order("key"),
      supabase.from("cms_media").select("*").order("created_at", { ascending: false }),
    ]);
    const firstError = p.error || s.error || pl.error || st.error || m.error;
    if (firstError) toast.error(firstError.message);
    setPages(p.data || []); setServices(s.data || []); setPlans(pl.data || []); setSettings(st.data || []); setMedia(m.data || []);
    setSettingsDraft(Object.fromEntries((st.data || []).map(item => [item.key, item.value as Record<string, unknown>])));
    setBusy(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const found = pages.find(page => page.id === selectedPageId) || null;
    setPageDraft(found ? { ...found } : null);
  }, [pages, selectedPageId]);

  const selectedSections = useMemo(() => pageDraft ? parseSections(pageDraft.sections) : [], [pageDraft]);

  const createPage = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const base = `new-page-${Date.now().toString().slice(-6)}`;
    const { data, error } = await supabase.from("cms_pages").insert({ slug: base, title: "New page", seo_title: "New page | WularData", seo_description: "", status: "draft", sections: [emptySection("hero"), emptySection("text")] as unknown as Json, created_by: user.id, updated_by: user.id }).select().single();
    if (error) return toast.error(error.message);
    await load(); setSelectedPageId(data.id); toast.success("Draft page created");
  };

  const duplicatePage = async () => {
    if (!pageDraft) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const slug = `${pageDraft.slug}-copy-${Date.now().toString().slice(-4)}`;
    const { data, error } = await supabase.from("cms_pages").insert({ slug, title: `${pageDraft.title} copy`, seo_title: pageDraft.seo_title, seo_description: pageDraft.seo_description, template: pageDraft.template, status: "draft", sections: pageDraft.sections, created_by: user.id, updated_by: user.id }).select().single();
    if (error) return toast.error(error.message);
    await load(); setSelectedPageId(data.id); toast.success("Page duplicated as a draft");
  };

  const savePage = async () => {
    if (!pageDraft) return;
    const slug = slugify(pageDraft.slug);
    if (!slug) return toast.error("Enter a valid page URL");
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("cms_pages").update({ slug, title: pageDraft.title.trim(), seo_title: pageDraft.seo_title.trim(), seo_description: pageDraft.seo_description.trim(), status: pageDraft.status, show_in_navigation: pageDraft.show_in_navigation, navigation_label: pageDraft.navigation_label, navigation_order: pageDraft.navigation_order, sections: pageDraft.sections, updated_by: user?.id, published_at: pageDraft.status === "published" ? new Date().toISOString() : null }).eq("id", pageDraft.id);
    if (error) return toast.error(error.message);
    toast.success("Page saved"); await load(); setSelectedPageId(pageDraft.id);
  };

  const setSections = (sections: CmsSection[]) => pageDraft && setPageDraft({ ...pageDraft, sections: sections as unknown as Json });
  const updateSection = (id: string, patch: Partial<CmsSection>) => setSections(selectedSections.map(section => section.id === id ? { ...section, ...patch } : section));
  const moveSection = (index: number, direction: -1 | 1) => {
    const next = [...selectedSections]; const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]]; setSections(next);
  };

  const saveSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const results = await Promise.all(Object.entries(settingsDraft).map(([key, value]) => supabase.from("cms_settings").update({ value: value as Json, updated_by: user?.id }).eq("key", key)));
    const error = results.find(result => result.error)?.error;
    if (error) return toast.error(error.message);
    toast.success("Header, footer and website settings saved"); await load();
  };

  const patchSetting = (key: string, field: string, value: string) => setSettingsDraft(current => ({ ...current, [key]: { ...(current[key] || {}), [field]: value } }));

  const saveService = async (service: CmsService) => {
    const { error } = await supabase.from("cms_services").update({ pillar_slug: service.pillar_slug, slug: slugify(service.slug), name: service.name, short_description: service.short_description, long_description: service.long_description, features: service.features, status: service.status, display_order: service.display_order }).eq("id", service.id);
    if (error) return toast.error(error.message); toast.success("Service saved"); await load();
  };

  const addService = async () => {
    const suffix = Date.now().toString().slice(-6);
    const { error } = await supabase.from("cms_services").insert({ pillar_slug: "data-center-services", slug: `new-service-${suffix}`, name: "New service", short_description: "", long_description: "", features: [], status: "draft" });
    if (error) return toast.error(error.message);
    toast.success("Draft service created"); await load();
  };

  const savePlan = async (plan: CmsPlan) => {
    const { error } = await supabase.from("cms_plans").update({ name: plan.name, price_amount: plan.price_amount, price_label: plan.price_label, currency_code: plan.currency_code.toUpperCase(), currency_symbol: plan.currency_symbol, billing_period: plan.billing_period, specifications: plan.specifications, featured_label: plan.featured_label, status: plan.status, display_order: plan.display_order }).eq("id", plan.id);
    if (error) return toast.error(error.message); toast.success("Pricing saved"); await load();
  };

  const addPlan = async (serviceId: string) => {
    const { error } = await supabase.from("cms_plans").insert({ service_id: serviceId, name: "New plan", price_label: "Quoted", specifications: [] });
    if (error) return toast.error(error.message); await load();
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 10 * 1024 * 1024) return toast.error("Use JPG, PNG, WebP or GIF files up to 10 MB");
    const { data: { user } } = await supabase.auth.getUser(); if (!user) return;
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
    const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;
    const uploaded = await supabase.storage.from("cms-media").upload(path, file, { contentType: file.type });
    if (uploaded.error) return toast.error(uploaded.error.message);
    const { error } = await supabase.from("cms_media").insert({ storage_path: path, file_name: file.name, alt_text: file.name.replace(/\.[^.]+$/, ""), mime_type: file.type, size_bytes: file.size, uploaded_by: user.id });
    if (error) { await supabase.storage.from("cms-media").remove([path]); return toast.error(error.message); }
    toast.success("Image uploaded"); event.target.value = ""; await load();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    let error: { message: string } | null = null;
    if (deleteTarget.type === "page") ({ error } = await supabase.from("cms_pages").delete().eq("id", deleteTarget.id));
    if (deleteTarget.type === "service") ({ error } = await supabase.from("cms_services").delete().eq("id", deleteTarget.id));
    if (deleteTarget.type === "plan") ({ error } = await supabase.from("cms_plans").delete().eq("id", deleteTarget.id));
    if (deleteTarget.type === "media") {
      const item = media.find(image => image.id === deleteTarget.id);
      if (item) {
        const removed = await supabase.storage.from("cms-media").remove([item.storage_path]); error = removed.error;
        if (!error) ({ error } = await supabase.from("cms_media").delete().eq("id", item.id));
      }
    }
    if (error) toast.error(error.message); else { toast.success(`${deleteTarget.label} deleted`); setSelectedPageId(null); await load(); }
    setDeleteTarget(null);
  };

  if (busy) return <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading website content…</div>;

  return <div className="space-y-5">
    <Tabs defaultValue="pages">
      <TabsList className="h-auto flex-wrap justify-start">
        <TabsTrigger value="pages">Pages</TabsTrigger><TabsTrigger value="services">Services & pricing</TabsTrigger><TabsTrigger value="settings">Header & footer</TabsTrigger><TabsTrigger value="media">Images</TabsTrigger>
      </TabsList>

      <TabsContent value="pages" className="mt-5">
        <div className="mb-4 flex justify-end"><Button onClick={createPage}><FilePlus2 className="mr-2 h-4 w-4" /> Add page</Button></div>
        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-md border bg-card p-2">
            {pages.map(page => <Button key={page.id} variant={selectedPageId === page.id ? "secondary" : "ghost"} className="h-auto w-full justify-start py-3 text-left" onClick={() => setSelectedPageId(page.id)}><span className="min-w-0"><span className="block truncate font-semibold">{page.title}</span><span className="block truncate text-xs font-normal text-muted-foreground">/{page.slug} · {page.status}</span></span></Button>)}
            {!pages.length && <p className="p-4 text-sm text-muted-foreground">No managed pages yet. Existing pages remain live until you add one.</p>}
          </div>
          {pageDraft ? <div className="space-y-5 rounded-md border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold">Edit page</h3><p className="text-xs text-muted-foreground">Changes become public when status is Published.</p></div><div className="flex gap-2"><Button variant="outline" size="sm" onClick={duplicatePage}><Copy className="mr-2 h-4 w-4" /> Duplicate</Button>{!pageDraft.is_system && <Button variant="destructive" size="sm" onClick={() => setDeleteTarget({ type: "page", id: pageDraft.id, label: pageDraft.title })}><Trash2 className="h-4 w-4" /></Button>}<Button size="sm" onClick={savePage}><Save className="mr-2 h-4 w-4" /> Save</Button></div></div>
            <div className="grid gap-4 md:grid-cols-2"><div><Label>Page title</Label><Input value={pageDraft.title} onChange={e => setPageDraft({ ...pageDraft, title: e.target.value })} /></div><div><Label>URL</Label><Input value={pageDraft.slug} disabled={pageDraft.is_system} onChange={e => setPageDraft({ ...pageDraft, slug: slugify(e.target.value) })} /></div><div><Label>Search title</Label><Input maxLength={60} value={pageDraft.seo_title} onChange={e => setPageDraft({ ...pageDraft, seo_title: e.target.value })} /></div><div><Label>Status</Label><select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={pageDraft.status} onChange={e => setPageDraft({ ...pageDraft, status: e.target.value as CmsStatus })}>{statuses.map(status => <option key={status}>{status}</option>)}</select></div></div>
            <div><Label>Search description</Label><Textarea maxLength={160} value={pageDraft.seo_description} onChange={e => setPageDraft({ ...pageDraft, seo_description: e.target.value })} /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={pageDraft.show_in_navigation} onChange={e => setPageDraft({ ...pageDraft, show_in_navigation: e.target.checked })} /> Show in header navigation</label>
            {pageDraft.show_in_navigation && <div className="grid gap-4 md:grid-cols-2"><div><Label>Navigation label</Label><Input value={pageDraft.navigation_label || ""} onChange={e => setPageDraft({ ...pageDraft, navigation_label: e.target.value })} /></div><div><Label>Navigation order</Label><Input type="number" value={pageDraft.navigation_order} onChange={e => setPageDraft({ ...pageDraft, navigation_order: Number(e.target.value) })} /></div></div>}
            <div className="border-t pt-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold">Page sections</h3><div className="flex flex-wrap gap-2">{(["hero", "text", "image", "cta"] as const).map(type => <Button key={type} variant="outline" size="sm" onClick={() => setSections([...selectedSections, emptySection(type)])}><Plus className="mr-1 h-3 w-3" /> {type}</Button>)}</div></div>
              <div className="space-y-3">{selectedSections.map((section, index) => <div key={section.id} className="rounded-md border p-4"><div className="mb-3 flex items-center justify-between"><span className="text-xs font-bold uppercase text-muted-foreground">{section.type}</span><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => moveSection(index, -1)} aria-label="Move section up"><ArrowUp className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => moveSection(index, 1)} aria-label="Move section down"><ArrowDown className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => setSections(selectedSections.filter(item => item.id !== section.id))} aria-label="Delete section"><Trash2 className="h-4 w-4" /></Button></div></div><div className="space-y-3"><Input placeholder="Heading" value={section.heading || ""} onChange={e => updateSection(section.id, { heading: e.target.value })} /><Textarea placeholder="Text" rows={4} value={section.body || ""} onChange={e => updateSection(section.id, { body: e.target.value })} />{section.type === "image" && <><select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={section.imagePath || ""} onChange={e => updateSection(section.id, { imagePath: e.target.value })}><option value="">Choose an uploaded image</option>{media.map(image => <option key={image.id} value={image.storage_path}>{image.file_name}</option>)}</select><Input placeholder="Image description" value={section.imageAlt || ""} onChange={e => updateSection(section.id, { imageAlt: e.target.value })} /></>}{section.type === "cta" && <div className="grid gap-3 md:grid-cols-2"><Input placeholder="Button label" value={section.buttonLabel || ""} onChange={e => updateSection(section.id, { buttonLabel: e.target.value })} /><Input placeholder="Button link" value={section.buttonUrl || ""} onChange={e => updateSection(section.id, { buttonUrl: e.target.value })} /></div>}</div></div>)}</div>
            </div>
          </div> : <div className="flex min-h-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">Choose a page or add a new one.</div>}
        </div>
      </TabsContent>

      <TabsContent value="services" className="mt-5 space-y-4">
        <div className="flex justify-end"><Button onClick={addService}><Plus className="mr-2 h-4 w-4" /> Add service</Button></div>
        {services.map((service, serviceIndex) => <div key={service.id} className="rounded-md border bg-card p-5"><div className="grid gap-3 md:grid-cols-[1fr_160px_auto]"><Input value={service.name} onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, name: e.target.value } : item))} /><select className="h-10 rounded-md border bg-background px-3 text-sm" value={service.status} onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, status: e.target.value as CmsStatus } : item))}>{statuses.map(status => <option key={status}>{status}</option>)}</select><div className="flex gap-2"><Button size="sm" onClick={() => saveService(service)}><Save className="mr-2 h-4 w-4" /> Save</Button><Button size="icon" variant="destructive" onClick={() => setDeleteTarget({ type: "service", id: service.id, label: service.name })}><Trash2 className="h-4 w-4" /></Button></div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div><Label>Section</Label><select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={service.pillar_slug} onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, pillar_slug: e.target.value } : item))}><option value="data-center-services">Data Center & Colocation</option><option value="hosting-services">Domain & Web Management</option><option value="it-infrastructure">IT Support & Consulting</option></select></div><div><Label>URL name</Label><Input value={service.slug} onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, slug: slugify(e.target.value) } : item))} /></div></div><Textarea className="mt-3" value={service.short_description} onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, short_description: e.target.value } : item))} /><Textarea className="mt-3" rows={3} value={service.long_description} onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, long_description: e.target.value } : item))} /><Textarea className="mt-3" rows={3} value={Array.isArray(service.features) ? service.features.join("\n") : ""} placeholder="Features, one per line" onChange={e => setServices(current => current.map((item, index) => index === serviceIndex ? { ...item, features: e.target.value.split("\n").filter(Boolean) as Json } : item))} /><div className="mt-4 border-t pt-4"><div className="mb-3 flex items-center justify-between"><h4 className="text-sm font-bold">Plans and pricing</h4><Button variant="outline" size="sm" onClick={() => addPlan(service.id)}><Plus className="mr-1 h-3 w-3" /> Add plan</Button></div><div className="space-y-3">{plans.filter(plan => plan.service_id === service.id).map(plan => <PlanEditor key={plan.id} plan={plan} onChange={patch => setPlans(current => current.map(item => item.id === plan.id ? { ...item, ...patch } : item))} onSave={() => savePlan(plan)} onDelete={() => setDeleteTarget({ type: "plan", id: plan.id, label: plan.name })} />)}</div></div></div>)}
      </TabsContent>

      <TabsContent value="settings" className="mt-5"><div className="space-y-5 rounded-md border bg-card p-5">{settings.map(setting => <div key={setting.key} className="border-b pb-5 last:border-0"><h3 className="font-bold capitalize">{setting.key}</h3><p className="mb-3 text-xs text-muted-foreground">{setting.description}</p><div className="grid gap-3 md:grid-cols-2">{Object.entries(settingsDraft[setting.key] || {}).filter(([, value]) => typeof value === "string").map(([field, value]) => <div key={field}><Label className="capitalize">{field.replace(/([A-Z])/g, " $1")}</Label><Input value={text(value)} onChange={e => patchSetting(setting.key, field, e.target.value)} /></div>)}</div></div>)}<Button onClick={saveSettings}><Save className="mr-2 h-4 w-4" /> Save settings</Button></div></TabsContent>

      <TabsContent value="media" className="mt-5"><div className="mb-4"><Label htmlFor="cms-upload" className="inline-flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"><ImagePlus className="mr-2 h-4 w-4" /> Upload image</Label><Input id="cms-upload" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} /></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{media.map((image, index) => <div key={image.id} className="rounded-md border bg-card p-4"><div className="aspect-video rounded bg-muted p-4 text-center text-xs text-muted-foreground">Image {index + 1}<br />{image.file_name}</div><Input className="mt-3" value={image.alt_text} onChange={e => setMedia(current => current.map(item => item.id === image.id ? { ...item, alt_text: e.target.value } : item))} placeholder="Image description" /><div className="mt-3 flex justify-between"><Button variant="outline" size="sm" onClick={async () => { const { error } = await supabase.from("cms_media").update({ alt_text: image.alt_text }).eq("id", image.id); error ? toast.error(error.message) : toast.success("Image description saved"); }}><Save className="mr-2 h-3 w-3" /> Save</Button><Button variant="destructive" size="icon" onClick={() => setDeleteTarget({ type: "media", id: image.id, label: image.file_name })}><Trash2 className="h-4 w-4" /></Button></div></div>)}{!media.length && <p className="text-sm text-muted-foreground">No images uploaded yet.</p>}</div></TabsContent>
    </Tabs>

    <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {deleteTarget?.label}?</AlertDialogTitle><AlertDialogDescription>This removes it permanently. Published pages may change immediately.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={confirmDelete}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;
};

const PlanEditor = ({ plan, onChange, onSave, onDelete }: { plan: CmsPlan; onChange: (patch: Partial<CmsPlan>) => void; onSave: () => void; onDelete: () => void }) => <div className="rounded-md bg-secondary p-3"><div className="grid gap-2 md:grid-cols-[1.3fr_100px_80px_100px_120px_auto]"><Input value={plan.name} onChange={e => onChange({ name: e.target.value })} /><Input type="number" min="0" step="0.01" value={plan.price_amount ?? ""} placeholder="Price" onChange={e => onChange({ price_amount: e.target.value === "" ? null : Number(e.target.value), price_label: null })} /><Input value={plan.currency_symbol} placeholder="₹" onChange={e => onChange({ currency_symbol: e.target.value })} /><Input maxLength={3} value={plan.currency_code} placeholder="INR" onChange={e => onChange({ currency_code: e.target.value.toUpperCase() })} /><Input value={plan.billing_period} placeholder="month" onChange={e => onChange({ billing_period: e.target.value })} /><div className="flex gap-1"><Button size="icon" onClick={onSave} aria-label={`Save ${plan.name}`}><Save className="h-4 w-4" /></Button><Button size="icon" variant="destructive" onClick={onDelete} aria-label={`Delete ${plan.name}`}><Trash2 className="h-4 w-4" /></Button></div></div><Textarea className="mt-2" rows={2} value={Array.isArray(plan.specifications) ? plan.specifications.join("\n") : ""} placeholder="Specifications, one per line" onChange={e => onChange({ specifications: e.target.value.split("\n").filter(Boolean) as Json })} /><p className="mt-2 text-xs text-muted-foreground">Preview: {formatCmsPrice(plan)} / {plan.billing_period}</p></div>;

export default ContentManager;