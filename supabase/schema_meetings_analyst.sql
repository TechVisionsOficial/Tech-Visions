-- Tech Visions — add "Analista" (Felipe Falcão / Richard Pereira) to meetings
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Safe to run whether or not you already ran an earlier version of this file.

alter table meetings
  add column if not exists analyst text not null default 'felipe';

-- Normalize any rows saved under the old placeholder value.
update meetings set analyst = 'felipe' where analyst = 'eu';

alter table meetings drop constraint if exists meetings_analyst_check;
alter table meetings
  add constraint meetings_analyst_check check (analyst in ('felipe', 'richard'));
alter table meetings alter column analyst set default 'felipe';
