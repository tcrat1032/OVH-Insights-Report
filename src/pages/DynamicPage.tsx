import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "@/components/site/PublicLayout";
import DynamicSections from "@/components/cms/DynamicSections";
import NotFound from "./NotFound";
import { supabase } from "@/integrations/supabase/client";
import { parseSections, type CmsPage } from "@/lib/cms";
import { useSeo } from "@/lib/seo";

const DynamicPage = () => {
  const { pageSlug } = useParams();
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.from("cms_pages").select("*").eq("slug", pageSlug || "").eq("status", "published").maybeSingle()
      .then(({ data }) => { setPage(data); setLoading(false); });
  }, [pageSlug]);

  useSeo({
    title: page?.seo_title || "WularData",
    description: page?.seo_description,
    path: `/${pageSlug || ""}`,
    noindex: loading || !page,
  });

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!page) return <NotFound />;
  return <PublicLayout><DynamicSections sections={parseSections(page.sections)} /></PublicLayout>;
};

export default DynamicPage;