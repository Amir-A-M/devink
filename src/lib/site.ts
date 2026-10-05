/**
 * One place for everything that depends on where the site is deployed.
 *
 * `NEXT_PUBLIC_SITE_URL` is read at build time. Set it in `.env` (or in your
 * host's environment) to your own domain — every canonical, social image and
 * sitemap entry is resolved against it. The localhost default keeps `npm run
 * dev` working without any configuration.
 */
export const siteConfig = {
  name: 'Ncmaz',
  title: 'Ncmaz - Blog, News, Magazine template',
  description:
    'A magazine for people who read past the headline: long-form reporting, interviews, audio and video, across technology, travel, food and culture.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'en_US',
  twitterHandle: '@ncmaz',
} as const

/** Absolute URL for a site-relative path, e.g. `/post/hello`. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString()
}
