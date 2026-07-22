-- Tech Visions — Admin Panel Phase 3 schema (Agenda / Documentos / Histórico)
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Assumes Phase 1/2 schema has already been applied (set_updated_at() function must exist).

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete restrict,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  file_name text not null,
  storage_path text not null,
  size_bytes bigint,
  content_type text,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_email text,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  entity_label text not null,
  created_at timestamptz not null default now()
);

create index if not exists activity_log_created_at_idx on activity_log(created_at desc);
create index if not exists activity_log_entity_idx on activity_log(entity_type, entity_id, created_at desc);

create trigger meetings_set_updated_at before update on meetings
  for each row execute function set_updated_at();

alter table meetings enable row level security;
alter table documents enable row level security;
alter table activity_log enable row level security;

create policy "authenticated_full_access" on meetings
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on documents
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on activity_log
  for all to authenticated using (true) with check (true);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.meetings, public.documents, public.activity_log to authenticated;

-- Storage: one private bucket for client documents. Size/type limits enforced
-- at the bucket level too (independent of the Server Action's own 10MB
-- bodySizeLimit) — a second gate that also protects any future upload path.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documents',
  'documents',
  false,
  10485760,
  array[
    'application/pdf',
    'image/png',
    'image/jpeg',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

-- Storage RLS lives on a SEPARATE subsystem (the Storage API, not PostgREST).
-- Confirmed against Supabase's own docs: storage.objects needs ONLY an RLS
-- policy, no GRANT — do NOT apply the public-schema GRANT reflex here. If
-- uploads ever fail, check the Storage logs in the dashboard, not GRANTs.
create policy "authenticated_full_access_documents_bucket" on storage.objects
  for all to authenticated
  using (bucket_id = 'documents')
  with check (bucket_id = 'documents');
