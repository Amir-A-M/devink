# Ncmaz — Next.js blog, news & magazine template

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # ESLint
```

## Before you deploy

Set your public origin. Every canonical URL, social-card image and sitemap entry
is resolved against it, so leaving it unset publishes `localhost` links.

```bash
cp .env.example .env
# then edit NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Site name, description and social handle live in `src/lib/site.ts`.

## Where things are

| Path                      | What it holds                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `src/app/(app)`           | The public site — home layouts, posts, categories, tags, authors, search             |
| `src/app/(auth)`          | Login, sign-up, password reset                                                       |
| `src/app/dashboard`       | Author dashboard                                                                     |
| `src/data`                | **All demo content.** Swap these for your API — see below                            |
| `src/components`          | Page sections (`SectionMagazine*`, `SectionHero*`) and post cards (`Card2`…`Card20`) |
| `src/shared`              | Buttons, inputs, dialogs and other primitives                                        |
| `src/styles/tailwind.css` | Theme tokens, custom utilities, dark mode                                            |

## Connecting your own content

`src/data/` is the only place the template reads content from. Every getter is an
`async` function over a hardcoded array, and every page `await`s it exactly as it
would a real API — so replacing the body of a function is all that is needed:

```ts
export async function getAllPosts() {
  const res = await fetch('https://your-cms.example/posts')
  return res.json()
}
```

Keep the shape the fixtures use and nothing else has to change. The types are
derived from these functions, so your editor will flag anything that drifts.

Two more integration points:

- `src/app/(app)/post/TheContent.tsx` renders demo article bodies. It already
  receives the post's `content` — the file's header comment shows the one-line
  change to render it instead.
- `src/lib/image-loader.ts` decides how image URLs are built. It currently calls
  Unsplash and Pexels directly; point it at your own CDN, or delete
  `images.loader` from `next.config.mjs` to use Next's built-in optimizer.

## What ships

Six home layouts, three post layouts, two search layouts, two headers, dark mode,
RTL support, an audio player with a persistent bottom bar, hover video previews,
a rich-text editor for post submission, and a full SEO surface (sitemap, robots,
manifest, Open Graph, canonicals, Article structured data).

## Notes

- Images use logical properties (`ms-*`, `pe-*`, `start-*`) throughout so the RTL
  layout works without a second stylesheet.
- Remote image hosts are allow-listed in `next.config.mjs`. Add yours before
  pointing the data layer at your own CDN, or builds will fail on unknown hosts.
- Formatting is Prettier with the Tailwind class-sorting plugin: `npx prettier --write .`
