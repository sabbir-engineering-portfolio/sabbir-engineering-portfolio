# Sabbir Engineering Portfolio

Premium responsive portfolio website for Sabbir Ahmmed Shehab.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The build output will be in `dist/`.

## Cloudflare Pages settings

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20 or later

## Updating content

Most website content is stored in `src/main.jsx`:
- `products` array for engineering products
- `training` array for training locations
- `skills` object for technical capabilities

Images and the CV are stored under `public/`.
