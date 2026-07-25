# Sabbir Engineering Portfolio — Version 3

React + Vite engineering portfolio and knowledge hub.

## Features
- Premium engineering portfolio
- Product filtering
- Engineering Journal with search and categories
- Individual article views
- Article images, galleries and YouTube embeds
- Technical manual, training and skills sections
- Built-in Post Composer at `#studio`
- Responsive layout

## Local development
```bash
npm install
npm run dev
```

## Cloudflare deployment
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

## Add a blog post
1. Open the live website and navigate to `#studio`.
2. Create the post and copy the generated JSON.
3. Open `src/content/posts.js`.
4. Paste the post object into the `posts` array, separated by a comma.
5. Add local images to `public/assets/`, or use hosted image URLs.
6. Commit and push with GitHub Desktop. Cloudflare redeploys automatically.

For video, use a YouTube embed URL such as:
`https://www.youtube.com/embed/VIDEO_ID`
