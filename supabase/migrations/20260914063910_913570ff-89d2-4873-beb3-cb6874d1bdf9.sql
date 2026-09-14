CREATE TYPE public.cms_publication_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  seo_title text NOT NULL,
  seo_description text NOT NULL DEFAULT '',
  template text NOT NULL DEFAULT 'standard',
  status public.cms_publication_status NOT NULL DEFAULT 'draft',
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_system boolean NOT NULL DEFAULT false,
  show_in_navigation boolean NOT NULL DEFAULT false,
  navigation_label text,
  navigation_order integer NOT NULL DEFAULT 0,
  created_by uuid,
  updated_by uuid,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cms_pages_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT cms_pages_sections_array CHECK (jsonb_typeof(sections) = 'array'),
  CONSTRAINT cms_pages_reserved_slug CHECK (slug NOT IN ('admin', 'auth', 'portal', 'reset-password', 'home', 'index'))
);
GRANT SELECT ON public.cms_pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_pages TO authenticated;
GRANT ALL ON public.cms_pages TO service_role;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published pages are public" ON public.cms_pages FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create pages" ON public.cms_pages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update pages" ON public.cms_pages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete custom pages" ON public.cms_pages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin') AND NOT is_system);
CREATE TRIGGER cms_pages_updated BEFORE UPDATE ON public.cms_pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  description text NOT NULL DEFAULT '',
  is_public boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_settings TO authenticated;
GRANT ALL ON public.cms_settings TO service_role;
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public settings are readable" ON public.cms_settings FOR SELECT TO anon, authenticated USING (is_public OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create settings" ON public.cms_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update settings" ON public.cms_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete settings" ON public.cms_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_settings_updated BEFORE UPDATE ON public.cms_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pillar_slug text NOT NULL,
  slug text NOT NULL,
  name text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  icon_key text NOT NULL DEFAULT 'server',
  status public.cms_publication_status NOT NULL DEFAULT 'published',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (pillar_slug, slug),
  CONSTRAINT cms_services_features_array CHECK (jsonb_typeof(features) = 'array'),
  CONSTRAINT cms_services_slug_format CHECK (pillar_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' AND slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);
GRANT SELECT ON public.cms_services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_services TO authenticated;
GRANT ALL ON public.cms_services TO service_role;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published services are public" ON public.cms_services FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create services" ON public.cms_services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update services" ON public.cms_services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete services" ON public.cms_services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_services_updated BEFORE UPDATE ON public.cms_services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid NOT NULL REFERENCES public.cms_services(id) ON DELETE CASCADE,
  name text NOT NULL,
  price_amount numeric(14,2),
  price_label text,
  currency_code text NOT NULL DEFAULT 'INR',
  currency_symbol text NOT NULL DEFAULT '₹',
  billing_period text NOT NULL DEFAULT 'month',
  specifications jsonb NOT NULL DEFAULT '[]'::jsonb,
  featured_label text,
  status public.cms_publication_status NOT NULL DEFAULT 'published',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cms_plans_specs_array CHECK (jsonb_typeof(specifications) = 'array'),
  CONSTRAINT cms_plans_currency_code CHECK (currency_code ~ '^[A-Z]{3}$'),
  CONSTRAINT cms_plans_price_nonnegative CHECK (price_amount IS NULL OR price_amount >= 0)
);
GRANT SELECT ON public.cms_plans TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_plans TO authenticated;
GRANT ALL ON public.cms_plans TO service_role;
ALTER TABLE public.cms_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published plans are public" ON public.cms_plans FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create plans" ON public.cms_plans FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update plans" ON public.cms_plans FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete plans" ON public.cms_plans FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_plans_updated BEFORE UPDATE ON public.cms_plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cms_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL UNIQUE,
  file_name text NOT NULL,
  alt_text text NOT NULL DEFAULT '',
  mime_type text NOT NULL,
  size_bytes bigint NOT NULL,
  uploaded_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cms_media_image_type CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp', 'image/gif')),
  CONSTRAINT cms_media_size CHECK (size_bytes > 0 AND size_bytes <= 10485760)
);
GRANT SELECT ON public.cms_media TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.cms_media TO authenticated;
GRANT ALL ON public.cms_media TO service_role;
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Media metadata is public" ON public.cms_media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins create media metadata" ON public.cms_media FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND uploaded_by = auth.uid());
CREATE POLICY "Admins update media metadata" ON public.cms_media FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media metadata" ON public.cms_media FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_media_updated BEFORE UPDATE ON public.cms_media FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX cms_pages_status_order_idx ON public.cms_pages(status, navigation_order);
CREATE INDEX cms_services_pillar_order_idx ON public.cms_services(pillar_slug, display_order);
CREATE INDEX cms_plans_service_order_idx ON public.cms_plans(service_id, display_order);

CREATE POLICY "CMS images are readable" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'cms-media');
CREATE POLICY "Admins upload CMS images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin') AND owner_id = auth.uid()::text);
CREATE POLICY "Admins update CMS images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete CMS images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'cms-media' AND public.has_role(auth.uid(), 'admin'));