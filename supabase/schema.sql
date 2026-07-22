-- Tech Visions — Admin Panel Phase 1 schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  segment text,
  status text not null default 'active', -- active | inactive | prospect
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  name text not null,
  stage text not null default 'planning', -- planning | in_progress | review | done | on_hold
  start_date date,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  assignee_id uuid references auth.users(id),
  due_date date,
  status text not null default 'todo', -- todo | in_progress | done
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text,
  source text not null default 'site', -- site | manual | referral | ads
  stage text not null default 'new',   -- new | contacted | qualified | won | lost
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_client_id_idx on projects(client_id);
create index if not exists tasks_project_id_idx on tasks(project_id);

-- Keep updated_at accurate on every mutation
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clients_set_updated_at before update on clients
  for each row execute function set_updated_at();
create trigger projects_set_updated_at before update on projects
  for each row execute function set_updated_at();
create trigger tasks_set_updated_at before update on tasks
  for each row execute function set_updated_at();
create trigger leads_set_updated_at before update on leads
  for each row execute function set_updated_at();

-- Row Level Security: internal-only tool, no multi-tenant concept.
-- Any authenticated (team) user gets full access; no anonymous access at all.
alter table clients enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table leads enable row level security;

create policy "authenticated_full_access" on clients
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on projects
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on tasks
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on leads
  for all to authenticated using (true) with check (true);

-- Table-level grants: required because "Automatically expose new tables" is
-- disabled for this project (access is controlled manually via RLS above).
-- Without this, Postgres rejects requests before RLS is ever evaluated.
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.clients, public.projects, public.tasks, public.leads to authenticated;
