import { siteMessages } from '@/messages/site'

export const siteConfig = {
  name: siteMessages.name,
  title: siteMessages.title,
  description: siteMessages.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'en_US',
  twitterHandle: '@Devink',
} as const

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString()
}
