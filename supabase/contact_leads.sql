CREATE TABLE IF NOT EXISTS public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  solution_interest TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at
  ON public.contact_leads (created_at DESC);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts to contact_leads"
  ON public.contact_leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads of contact_leads"
  ON public.contact_leads
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
