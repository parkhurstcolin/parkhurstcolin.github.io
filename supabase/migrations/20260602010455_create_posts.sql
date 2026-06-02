create table public.posts (
  id              uuid primary key default gen_random_uuid(),
  author_id       uuid references auth.users(id),
  slug            text unique not null,
  title           text not null,
  content         jsonb not null,
  excerpt         text,
  cover_image_url text,
  published       boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.posts enable row level security;

create policy "Published posts are readable by everyone"
  on public.posts
  for select
  using (published = true);

create policy "Authenticated users can manage posts"
  on public.posts
  for all
  to authenticated
  using (true)
  with check (true);
