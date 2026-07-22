-- Tech Visions — Admin Panel Phase 2 schema (Financeiro / Contratos / Orçamentos / Mensalidades)
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Assumes Phase 1 schema.sql has already been applied (set_updated_at() function must exist).

create table if not exists contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  title text not null,
  value numeric(12,2) not null,
  start_date date,
  end_date date,
  status text not null default 'draft', -- draft | active | cancelled
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  title text not null,
  value numeric(12,2) not null,
  status text not null default 'draft', -- draft | sent | approved | rejected
  valid_until date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete restrict,
  amount numeric(12,2) not null,
  due_day int not null check (due_day between 1 and 28),
  status text not null default 'active', -- active | paused | cancelled
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists charges (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions(id) on delete restrict,
  client_id uuid not null references clients(id) on delete restrict,
  amount numeric(12,2) not null,
  due_date date not null,
  status text not null default 'pending', -- pending | paid | cancelled
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint charges_subscription_due_date_unique unique (subscription_id, due_date)
);

create index if not exists contracts_client_id_idx on contracts(client_id);
create index if not exists quotes_client_id_idx on quotes(client_id);
create index if not exists subscriptions_client_id_idx on subscriptions(client_id);
create index if not exists charges_subscription_id_idx on charges(subscription_id);
create index if not exists charges_status_due_date_idx on charges(status, due_date);

create trigger contracts_set_updated_at before update on contracts
  for each row execute function set_updated_at();
create trigger quotes_set_updated_at before update on quotes
  for each row execute function set_updated_at();
create trigger subscriptions_set_updated_at before update on subscriptions
  for each row execute function set_updated_at();
create trigger charges_set_updated_at before update on charges
  for each row execute function set_updated_at();

alter table contracts enable row level security;
alter table quotes enable row level security;
alter table subscriptions enable row level security;
alter table charges enable row level security;

create policy "authenticated_full_access" on contracts
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on quotes
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on subscriptions
  for all to authenticated using (true) with check (true);
create policy "authenticated_full_access" on charges
  for all to authenticated using (true) with check (true);

-- Table-level grants (same reason as Phase 1: "Automatically expose new tables"
-- is disabled for this project). `charges` is the easiest one to forget here,
-- since it's the only table with no create/edit form of its own.
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.contracts, public.quotes, public.subscriptions, public.charges to authenticated;
