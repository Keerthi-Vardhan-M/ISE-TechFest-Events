-- Supabase Postgres schema & race-safe seat-cap registration function
-- Run this in Supabase SQL Editor before deploying.

create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event text not null check (event in ('automate', 'quant')),
  team_name text not null,
  leader_name text not null,
  email text not null,
  phone text not null,
  college text not null,
  department_year text not null default '',
  members jsonb not null default '[]'::jsonb,
  txn_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique (event, email),
  unique (event, team_name)
);

-- Enable Row Level Security with NO public read/write policies.
-- Only the server-side service_role key can access this table.
alter table public.registrations enable row level security;

-- Index for fast seat counts per event
create index if not exists idx_registrations_event_status
  on public.registrations (event, status);

-- Race-safe registration function using Postgres transaction-level advisory lock
create or replace function public.register_team_safe(
  p_event text,
  p_seat_cap integer,
  p_team_name text,
  p_leader_name text,
  p_email text,
  p_phone text,
  p_college text,
  p_department_year text,
  p_members jsonb,
  p_txn_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lock_key bigint;
  v_count integer;
  v_inserted_id uuid;
begin
  if p_event not in ('automate', 'quant') then
    return jsonb_build_object('status', 'INVALID_EVENT');
  end if;

  -- Deterministic advisory lock key per event
  v_lock_key := case when p_event = 'automate' then 1001 else 1002 end;
  perform pg_advisory_xact_lock(v_lock_key);

  -- Check duplicates explicitly for clean error codes
  if exists (
    select 1 from public.registrations
    where event = p_event and lower(email) = lower(p_email)
  ) then
    return jsonb_build_object('status', 'DUPLICATE_EMAIL');
  end if;

  if exists (
    select 1 from public.registrations
    where event = p_event and lower(team_name) = lower(p_team_name)
  ) then
    return jsonb_build_object('status', 'DUPLICATE_TEAM');
  end if;

  -- Count active registrations against seat cap
  select count(*) into v_count
  from public.registrations
  where event = p_event and status <> 'cancelled';

  if v_count >= p_seat_cap then
    return jsonb_build_object(
      'status', 'FULL',
      'seats_taken', v_count,
      'seat_cap', p_seat_cap
    );
  end if;

  insert into public.registrations (
    event,
    team_name,
    leader_name,
    email,
    phone,
    college,
    department_year,
    members,
    txn_id,
    status
  )
  values (
    p_event,
    trim(p_team_name),
    trim(p_leader_name),
    lower(trim(p_email)),
    trim(p_phone),
    trim(p_college),
    trim(p_department_year),
    coalesce(p_members, '[]'::jsonb),
    nullif(trim(coalesce(p_txn_id, '')), ''),
    'confirmed'
  )
  returning id into v_inserted_id;

  return jsonb_build_object(
    'status', 'OK',
    'id', v_inserted_id,
    'seats_taken', v_count + 1,
    'seat_cap', p_seat_cap
  );
exception
  when unique_violation then
    return jsonb_build_object('status', 'DUPLICATE');
end;
$$;

-- Helper function to read seat counts without exposing PII
create or replace function public.get_event_seat_counts()
returns table(event text, seats_taken bigint)
language sql
security definer
set search_path = public
as $$
  select event, count(*)::bigint as seats_taken
  from public.registrations
  where status <> 'cancelled'
  group by event;
$$;

