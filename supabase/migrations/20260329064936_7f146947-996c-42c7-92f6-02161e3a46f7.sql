ALTER TABLE public.buyers DROP CONSTRAINT buyers_plan_check;
UPDATE public.buyers SET plan = 'crm' WHERE plan = 'basic';
UPDATE public.buyers SET plan = 'bundle' WHERE plan = 'enterprise';
UPDATE public.buyers SET plan = 'leadgen' WHERE plan NOT IN ('crm', 'leadgen', 'bundle');
ALTER TABLE public.buyers ADD CONSTRAINT buyers_plan_check CHECK (plan = ANY (ARRAY['crm'::text, 'leadgen'::text, 'bundle'::text]));