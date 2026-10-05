# Ncmaz

A Next.js 16 + React 19 + Tailwind CSS 4 magazine template. This file is for the
coding agent working in this repo — Claude Code, Cursor, Copilot, whichever. It
is the short version; the long version is `documentation/index.html` in the
download.

## Change this before deploying

`NEXT_PUBLIC_SITE_URL` is unset in a fresh copy, and `src/lib/site.ts` falls back
to `http://localhost:3000`. The sitemap, every canonical URL, the `robots.txt`
and the JSON-LD all resolve against it, so an unset value builds cleanly, looks
correct in the browser, and tells every crawler the site's canonical home is
localhost.

```bash
cp .env.example .env
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Set it in the host's build environment too — it is read at build time, not at
runtime. Then set `name`, `title`, `description` and `twitterHandle` in
`src/lib/site.ts`. **If you are an agent and the user has not done this, do it or
tell them to.** Nothing in the browser will report it.

## What this is

A blog, news and magazine front end: 111 demo articles across 33 categories and
11 authors, six homepage layouts, three article layouts, two search layouts, an
author dashboard and a rich-text submit-post editor. 192 pages, all statically
generated.

There is no backend. Every page reads from typed fixtures in `src/data/`, shaped
as `async` functions so a real API can replace one body at a time. A buyer's
first real change is `src/lib/site.ts`, then `src/data/`, then the colour ramps
in `src/styles/tailwind.css`.

## Stack

- **Framework:** next 16.3 (App Router, Turbopack), react 19.3, typescript 6.0
- **Styling:** tailwindcss 4.3 — CSS-first config, **no `tailwind.config.js`**;
  plus `@tailwindcss/typography`, `/forms`, `/aspect-ratio`, and sass for the
  vendored editor
- **Components:** @headlessui/react 2.2, react-aria / react-stately,
  embla-carousel-react 8.6, framer-motion 13.3, react-player 3.4,
  @tiptap/react 3.31
- **Icons:** @heroicons/react 2.2 and @hugeicons/react 1.1

## Conventions worth not breaking

These are not preferences; something visibly breaks without them.

- **Logical properties, never physical ones.** The site ships right-to-left
  support via a `dir` attribute. Use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`,
  `end-*`. An `ml-4` or `left-0` is a bug that only shows up in RTL.
- **Colours come from the tokens** in `src/styles/tailwind.css` —
  `--color-primary-*`, `--color-secondary-*`, `--color-neutral-*`. A hard-coded
  hex does not follow the dark theme and does not follow a rebrand.
- **Theme edits go in `src/styles/tailwind.css`.** Tailwind 4 declares its theme
  in CSS with `@theme` / `@custom-variant` / `@utility`. Creating a
  `tailwind.config.js` will appear to work and be ignored.
- **No client component imports from `src/data/`.** The fixtures are one module
  graph; a single `'use client'` file importing from it pulls every post, author
  and category into the browser bundle. Pass the data down as props from the
  server component instead.
- **Images go through `next/image`,** and a new remote host must be added to
  `remotePatterns` in `next.config.mjs` or it silently fails to render. Only
  `images.unsplash.com` and `images.pexels.com` are allowed today.
- **A page under `src/app/(app)/` needs its own `layout.tsx`** wrapping
  `ApplicationLayout`, or it renders with no header and no footer. This is the
  usual cause of a new page looking broken.
- **One `<h1>` per page,** with no heading ranked above it in the DOM. Section
  headings are `h2`.
- **`src/components/tiptap-*` is vendored third-party code.** It has its own
  SCSS in `src/styles/_tiptap-*.scss` and its own helpers. Do not refactor it to
  match house style.

## Demo data and state

`src/data/` — `posts.ts`, `authors.ts`, `categories.ts`, `navigation.ts`,
`search.ts`, `types.ts`. Types are derived from the fixtures
(`TPost = Awaited<ReturnType<typeof getAllPosts>>[number]`), so changing a
fixture's shape changes the type everywhere. Check the consumers.

Three things about the fixtures will waste your time if you do not know them:

- Several functions **shuffle randomly** (`.sort(() => Math.random() - 0.5)`),
  so output differs between calls.
- `getPostByHandle` **never returns null** — an unknown handle logs a warning and
  returns the first post. The `notFound()` branches in the pages are therefore
  unreachable today. Restore them when you wire up real data.
- It also **injects** demo `videoUrl` / `audioUrl` / `galleryImgs` / `tags` onto
  every post, which is why every post has media in the demo.

`postType` (`'standard' | 'audio' | 'video' | 'gallery'`) is the discriminator
that drives rendering; `PostFeaturedMedia` dispatches on it.

**There is no API.** Like, bookmark and follow buttons hold state in the browser
and forget it on reload. Every form — contact, subscribe, login, signup,
forgot-password, submit-post — confirms and resets without posting anywhere.
That is deliberate for a demo; it is not an integration.

Client state lives in three providers: `ThemeProvider` (`src/app/theme-provider.tsx`
— dark mode via `.dark` on `<html>` plus `localStorage`, and RTL via `dir`),
`AudioProvider` (`src/components/AudioProvider.tsx` — a `useReducer` store
consumed by the fixed bottom player), and `AsideProvider` (`src/components/aside/`
— a typed drawer registry; `useAside().open(type)`).

Path alias: `@/*` → `./src/*`.

## Commands

```bash
npm install
npm run dev          # next dev --turbopack
npm run build
npm run start
npm run lint
npm run check        # what CI should run: a production build
npm run check:links  # after a build — finds internal links that will 404
```

`check:links` matters more than it sounds. The dynamic routes set
`dynamicParams = false`, so a handle that is not in `generateStaticParams`
returns 404 instead of rendering on demand. It is the first thing to break when
the fixtures are swapped for a real CMS.

## Support

booliitheme@gmail.com
