# Project Journal Backend Setup — Supabase Free Tier

The Journal works immediately in demo mode. To enable real project publishing, image upload, comments, and moderation, connect a free Supabase project.

## 1. Create a Supabase project

Create a project at https://supabase.com and keep the project URL plus the publishable/anon key.

## 2. Run this SQL in Supabase SQL Editor

```sql
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  year text,
  summary text not null,
  description text,
  technologies text[] not null default '{}',
  image_urls text[] not null default '{}',
  video_url text,
  project_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  author_name text not null,
  author_email text,
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.comments enable row level security;

create policy "Public can read projects"
on public.projects for select
to anon, authenticated
using (true);

create policy "Authenticated admin can insert projects"
on public.projects for insert
to authenticated
with check (true);

create policy "Authenticated admin can update projects"
on public.projects for update
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can delete projects"
on public.projects for delete
to authenticated
using (true);

create policy "Public can read approved comments"
on public.comments for select
to anon
using (approved = true);

create policy "Authenticated admin can read all comments"
on public.comments for select
to authenticated
using (true);

create policy "Public can submit comments for moderation"
on public.comments for insert
to anon, authenticated
with check (approved = false);

create policy "Authenticated admin can update comments"
on public.comments for update
to authenticated
using (true)
with check (true);

create policy "Authenticated admin can delete comments"
on public.comments for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = true;

create policy "Authenticated admin can upload project media"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-media');

create policy "Authenticated admin can update project media"
on storage.objects for update
to authenticated
using (bucket_id = 'project-media')
with check (bucket_id = 'project-media');

create policy "Authenticated admin can delete project media"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-media');
```

If Supabase says a policy already exists, skip that duplicate line/policy and continue.

## 3. Create your admin login

In Supabase Dashboard → Authentication → Users, create your own user with email and password.

For this simple personal portfolio, keep public user sign-ups disabled so the authenticated role is effectively your admin role.

## 4. Add Cloudflare environment variables

In Cloudflare Workers & Pages → your project → Settings → Variables and Secrets, add:

- `VITE_SUPABASE_URL` = your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` = your Supabase publishable/anon key

These are browser-side public configuration values. Security comes from the Row Level Security policies above — never place a Supabase service-role/secret key in the frontend.

After adding the variables, redeploy the project.

## 5. Use the Journal

Open your site and click **Journal** in the main navigation.

- Visitors can browse projects.
- Visitors can submit comments; they remain hidden until approved.
- Click **Admin** → sign in with your Supabase email/password.
- The button becomes **Project Studio**.
- Upload a project with multiple images, title, category, technologies, story, video URL and related link.
- Open a project while signed in to approve/delete pending comments.

## 6. Video recommendation

For videos, upload to YouTube and paste the YouTube URL into Project Studio. This keeps the portfolio fast and avoids large storage usage.

For images, Supabase Storage uploads are supported directly from Project Studio.
