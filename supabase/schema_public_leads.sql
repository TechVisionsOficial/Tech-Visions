-- Tech Visions — allow the public contact form to create leads directly
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
--
-- Insert-only, no read/update/delete for anon — spam risk is inherent to any
-- public form and is an accepted trade-off here; this does not weaken access
-- to any other table or allow reading/editing existing leads.

create policy "public_can_insert_leads" on leads
  for insert to anon with check (true);

grant insert on public.leads to anon;
