# Phase 2 — Engineering Journal

This release preserves the Version 2 portfolio and adds a separate `/journal.html` page.

## Added
- Engineering Journal second page
- Search and category filtering
- Featured article and article cards
- Individual article view through `?post=slug`
- Image gallery support
- Tags and reading time
- Data-driven posts in `src/content/journalPosts.js`
- Professional cursor aura + subtle pointer spotlight on desktop
- Journal link in desktop/mobile portfolio navigation

## Add a new post
Edit `src/content/journalPosts.js` and copy an existing post object. Put images in `public/assets/`.

## Later CMS phase
This content structure is intentionally data-driven so it can later be connected to a free Git-based CMS without redesigning the homepage.
