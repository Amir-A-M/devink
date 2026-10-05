# Changelog — Ncmaz

Written for the person who bought it: what changed on the page, not what changed
in the commit. Newest release on top.

## 2.0.0 — 2026-09-16

A major release. The whole template moves to Next.js 16 and the App Router's
current conventions, and every page was read once more before it shipped.
Re-download this one: the two things most likely to have bothered you — the
article text and the pages doing nothing when you clicked them — are both in it.

### The demo now reads like a magazine

- **Article pages carry written copy.** Every post used to open on the Tailwind
  typography plugin's sample article, word for word, followed by three blocks of
  Lorem ipsum. There are now four full-length article bodies — technology,
  travel, food and culture — chosen by what the headline is about, each one
  exercising the prose styles you bought the template for: nested headings, both
  kinds of list, a pull quote, a captioned figure, a code block.
- **Author biographies are real on every page.** The post page was overwriting
  the author's bio with placeholder Latin, so the same writer read one way on
  `/author/...` and another way under their own article.
- **Placeholder text is gone from the demo.** No page in the build contains
  Lorem ipsum. Previously 111 did.

### Things that did not respond when clicked

- Buttons and links across the demo that led nowhere now go somewhere, including
  the main call to action in the hero on homepage 4.
- Every form in the template — contact, subscribe, login, signup, submit a post
  — now confirms what you did instead of reloading the page and losing it.
- Form labels are wired to the field they name, so clicking a label focuses its
  input. 22 of them pointed at nothing.
- **The "Buy this template" button is gone from the mobile menu.** It pointed at
  our own listing and it shipped inside the package, so if you launched without
  spotting it, your readers were being sent to it too.

### Navigation and media

- **A progress bar during navigation.** Clicking a link used to leave the page
  silent until the next one arrived. A slim bar now appears at the top within
  a frame or two and clears when the route lands.
- **Video previews replay on every hover.** Hovering a video post autoplayed the
  first time and then sat paused on the second and third. It now restarts each
  time you come back to it, and shows a YouTube-style loading sweep while it
  buffers rather than a spinner over a black box.
- The audio player no longer fights you while scrubbing, and no longer writes
  debug output to the browser console.

### Search engines and social cards

- Sitemap, `robots.txt` and a web manifest are generated from your own site URL.
- Every page declares a canonical URL. 152 pages previously served near-identical
  content under different addresses with nothing to tell a crawler which was
  which.
- Open Graph and Twitter card metadata on every page, plus Article, Organization
  and WebSite structured data.
- Set `NEXT_PUBLIC_SITE_URL` before you deploy — all of the above resolves
  against it. `.env.example` and the README say how.

### Speed

- First-load JavaScript is down 110 KB on the homepage and 111 KB on the inner
  pages, mostly by keeping the data layer out of the browser.
- One preloaded image per page instead of five, and image `sizes` that describe
  the box each image actually renders in rather than the whole viewport.
- The homepage video section now renders its posters on the server, so five
  images that used to appear only after JavaScript ran are in the HTML.

### Accessibility

- Every interactive control has a name a screen reader can announce. The
  homepage had 46 that did not.
- One `<h1>` per page, with no heading ranked above it.
- The whole template honours "reduce motion" as a system setting.
- Keyboard focus is visible on menus and dropdowns.

### Under the hood

- Next.js 16.3, React 19.3, Tailwind CSS 4.3, TypeScript 6.
- The post editor moves to Tiptap 3, the video player to react-player 3, and
  Framer Motion to 13.
- `npm audit` reports no vulnerabilities. It previously reported 36, one of them
  high severity.
- `npm run check:links` cross-checks every internal link in the built site
  against the routes that exist — useful the first time you swap the demo data
  for a real CMS.
