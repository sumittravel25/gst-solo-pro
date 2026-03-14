
-- Drop the overly permissive policy since access is already controlled via GRANT/REVOKE
DROP POLICY "Service role can manage buyers" ON public.buyers;
