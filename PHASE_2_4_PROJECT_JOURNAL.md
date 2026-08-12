# Version 2.4 — Project Journal

This version fixes the Cloudflare routing issue by keeping the Journal inside the same React/Vite application.

## Route

`#journal`

No separate `journal.html` is required, so it works with the existing Cloudflare Workers deployment.

## New features

- Separate full-screen Engineering Project Journal
- Search and category filters
- Project cards and detailed project viewer
- Multiple project images
- Optional YouTube/video embed
- Technologies/tags
- Public project comments
- Comment moderation
- Admin login
- Project Studio for publishing projects
- Multiple image upload through Supabase Storage
- Demo mode when Supabase is not connected
- Existing Version 2 portfolio and professional mouse effects preserved

See `SUPABASE_SETUP.md` for the free backend setup.
