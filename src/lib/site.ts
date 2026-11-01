export const siteConfig = {
  name: 'Devink',
  title: 'Devink - Stories, ideas and perspectives',
  description:
    'A magazine for people who read past the headline: long-form reporting, interviews, audio and video, across technology, travel, food and culture.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'en_US',
  twitterHandle: '@Devink',
} as const

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString()
}
