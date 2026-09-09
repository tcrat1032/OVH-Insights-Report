CREATE OR REPLACE FUNCTION public.admin_list_users_internal()
RETURNS TABLE(id uuid, email text, full_name text, company text, phone text, created_at timestamp with time zone, is_admin boolean)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT u.id,
         u.email::text,
         p.full_name,
         p.company,
         p.phone,
         u.created_at,
         EXISTS (SELECT 1 FROM public.user_roles r2 WHERE r2.user_id = u.id AND r2.role = 'admin')
  FROM auth.users u
  LEFT JOIN public.profiles p ON p.id = u.id
  ORDER BY u.created_at DESC;
END;
$function$;

REVOKE ALL ON FUNCTION public.admin_list_users_internal() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_users_internal() TO service_role;

DROP FUNCTION IF EXISTS public.admin_list_users();