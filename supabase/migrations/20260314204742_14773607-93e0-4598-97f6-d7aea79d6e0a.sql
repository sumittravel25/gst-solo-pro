
-- Create buyers table to store purchase information
CREATE TABLE public.buyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('basic', 'business', 'enterprise')),
  amount INTEGER NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;

-- Allow edge functions (service role) to insert/update, no public read
CREATE POLICY "Service role can manage buyers"
  ON public.buyers
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Restrict to service_role only via RLS (anon/authenticated cannot access)
ALTER TABLE public.buyers FORCE ROW LEVEL SECURITY;

-- Revoke direct access from anon and authenticated
REVOKE ALL ON public.buyers FROM anon, authenticated;
GRANT ALL ON public.buyers TO service_role;

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_buyers_updated_at
  BEFORE UPDATE ON public.buyers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
