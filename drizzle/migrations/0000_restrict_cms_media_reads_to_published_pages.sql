DROP POLICY IF EXISTS "CMS images are readable" ON storage.objects;

CREATE POLICY "Published CMS images are readable"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'cms-media'
  AND (
    public.has_role((SELECT auth.uid()), 'admin'::public.app_role)
    OR EXISTS (
      SELECT 1
      FROM public.cms_pages AS page
      CROSS JOIN LATERAL jsonb_array_elements(page.sections) AS section
      WHERE page.status = 'published'::public.cms_publication_status
        AND section->>'imagePath' = storage.objects.name
    )
  )
);