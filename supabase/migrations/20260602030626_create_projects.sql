create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  summary     text,
  impact      text,
  tech_stack  jsonb not null default '[]'::jsonb,
  repo_url    text,
  live_url    text,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Published projects are readable by everyone"
  on public.projects
  for select
  using (published = true);

create policy "Authenticated users can manage projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);
