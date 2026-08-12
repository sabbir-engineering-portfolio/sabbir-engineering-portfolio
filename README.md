# Sabbir Ahmmed Shehab — Engineering Portfolio v2.4

Premium React/Vite engineering portfolio with a built-in Project Journal.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Journal

The Journal is routed inside the same SPA at `#journal`, avoiding separate-page routing issues on the current Cloudflare Workers setup.

It works in demo mode without a backend. For live project uploads, images, comments and moderation, follow `SUPABASE_SETUP.md`.

## Cloudflare

Use the same deployment settings as the working Version 2 project. Add the optional `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables after creating a Supabase project.
