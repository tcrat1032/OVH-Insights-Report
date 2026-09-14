import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

export type CmsPage = Database["public"]["Tables"]["cms_pages"]["Row"];
export type CmsService = Database["public"]["Tables"]["cms_services"]["Row"];
export type CmsPlan = Database["public"]["Tables"]["cms_plans"]["Row"];
export type CmsMedia = Database["public"]["Tables"]["cms_media"]["Row"];
export type CmsStatus = Database["public"]["Enums"]["cms_publication_status"];

export type CmsSection = {
  id: string;
  type: "hero" | "text" | "image" | "cta";
  heading?: string;
  body?: string;
  imagePath?: string;
  imageAlt?: string;
  buttonLabel?: string;
  buttonUrl?: string;
};

export const emptySection = (type: CmsSection["type"]): CmsSection => ({
  id: crypto.randomUUID(),
  type,
  heading: type === "hero" ? "New page" : "New section",
  body: "",
  buttonLabel: type === "cta" ? "Contact us" : undefined,
  buttonUrl: type === "cta" ? "/contact" : undefined,
});

export function parseSections(value: Json): CmsSection[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is CmsSection => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    return typeof item.id === "string" && ["hero", "text", "image", "cta"].includes(String(item.type));
  });
}

export function formatCmsPrice(plan: CmsPlan) {
  if (plan.price_label) return plan.price_label;
  if (plan.price_amount === null) return "Quoted";
  return `${plan.currency_symbol}${Number(plan.price_amount).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const { data } = await supabase.from("cms_settings").select("value").eq("key", key).maybeSingle();
  return (data?.value as T | undefined) ?? fallback;
}

export async function getMediaUrl(path: string) {
  const { data, error } = await supabase.storage.from("cms-media").createSignedUrl(path, 3600);
  if (error) return "";
  return data.signedUrl;
}

export function useCmsSettings() {
  return useQuery({
    queryKey: ["cms-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cms_settings").select("key,value");
      if (error) throw error;
      return Object.fromEntries((data || []).map(item => [item.key, item.value as Record<string, unknown>])) as Record<string, Record<string, unknown>>;
    },
    staleTime: 60_000,
  });
}

export function useCmsServices() {
  return useQuery({
    queryKey: ["cms-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cms_services").select("*").eq("status", "published").order("display_order");
      if (error) throw error;
      return data || [];
    },
    staleTime: 60_000,
  });
}

export function useCmsPlans() {
  return useQuery({
    queryKey: ["cms-plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cms_plans").select("*").eq("status", "published").order("display_order");
      if (error) throw error;
      return data || [];
    },
    staleTime: 60_000,
  });
}

export function useCmsNavigationPages() {
  return useQuery({
    queryKey: ["cms-navigation-pages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cms_pages").select("slug,title,navigation_label,navigation_order").eq("status", "published").eq("show_in_navigation", true).order("navigation_order");
      if (error) throw error;
      return data || [];
    },
    staleTime: 60_000,
  });
}