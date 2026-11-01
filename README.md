# Devink — Next.js blog, news & magazine template

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build     # production build
pnpm start     # serve the production build
pnpm lint      # ESLint
```

## Before you deploy

Set your public origin. Every canonical URL, social-card image and sitemap entry
is resolved against it, so leaving it unset publishes `localhost` links.

```bash
cp .env.example .env
# then edit NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Site name, description and social handle live in `src/config/site.ts`.

## Where things are

| Path                      | What it holds                                                            |
| ------------------------- | ------------------------------------------------------------------------ |
| `src/app/(app)`           | The public site — home layouts, posts, categories, tags, authors, search |
| `src/app/(auth)`          | Login, sign-up, password reset                                           |
| `src/app/dashboard`       | Author dashboard                                                         |
| `src/libs/data-layer`     | **All demo content.** Swap these for your API — see below                |
| `src/app`                 | Routes, layouts, page implementations, and metadata                      |
| `src/components/common`   | Shared page sections, post cards, and composed UI                        |
| `src/components/layout`   | Site header, footer, and application layout                              |
| `src/components/ui`       | Tiptap UI controls and primitives                                        |
| `src/messages`            | Shared user-facing copy                                                  |
| `src/config`              | Application and site configuration                                       |
| `src/assets`              | Images and other static assets                                           |
| `src/libs/design`         | Buttons, inputs, dialogs and other primitives                            |
| `src/styles/tailwind.css` | Theme tokens, custom utilities, dark mode                                |

## Connecting your own content

`src/libs/data-layer/` holds the fixture-backed data access functions. Every getter is an
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
- `src/libs/utils/image-loader.ts` decides how image URLs are built. It currently calls
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
- Formatting is Prettier with the Tailwind class-sorting plugin: `pnpm exec prettier --write .`

## Code quality

Use pnpm (the version is pinned in `package.json`). Run `pnpm quality:check`
for ESLint, formatting, spelling, and TypeScript checks; `pnpm check` builds
production pages, followed by `pnpm check:links` to validate internal routes.
`pnpm lint:fix` and `pnpm format` apply fixes. Pre-commit runs lint-staged
on staged files through Husky. Vendored Tiptap UI is excluded from cleanup.

The FullstacksJS baseline introduces stricter rules. Existing violations are
reported without suppressing them; resolve them before enforcing the aggregate
check in CI. The spelling dictionary is `.cspell/project-words.txt` and the
shared spelling exclusions are `.cspellignore`.
