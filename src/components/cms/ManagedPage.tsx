import { useEffect, useState, type ReactNode } from "react";
import PublicLayout from "@/components/site/PublicLayout";
import DynamicSections from "@/components/cms/DynamicSections";
import { supabase } from "@/integrations/supabase/client";
import { parseSections, type CmsPage } from "@/lib/cms";
import { useSeo } from "@/lib/seo";

const PublishedPage = ({ page }: { page: CmsPage }) => {
  useSeo({ title: page.seo_title, description: page.seo_description, path: page.slug === "home" ? "/" : `/${page.slug}` });
  return <PublicLayout><DynamicSections sections={parseSections(page.sections)} /></PublicLayout>;
};

const ManagedPage = ({ slug, children }: { slug: string; children: ReactNode }) => {
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase.from("cms_pages").select("*").eq("slug", slug).eq("status", "published").maybeSingle()
      .then(({ data }) => { setPage(data); setLoaded(true); });
  }, [slug]);

  if (!loaded) return <div className="min-h-screen bg-background" />;
  return page ? <PublishedPage page={page} /> : <>{children}</>;
};

export default ManagedPage;