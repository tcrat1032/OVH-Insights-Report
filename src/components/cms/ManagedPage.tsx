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

  // Show the built-in page while the CMS check runs (no blank flash, and the
  // pre-rendered HTML stays on screen until the app takes over).
  if (!loaded) return <>{children}</>;
  return page ? <PublishedPage page={page} /> : <>{children}</>;
};

export default ManagedPage;
