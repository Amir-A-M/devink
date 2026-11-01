import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'
import { getAuthors } from '@/libs/data-layer/authors'
import { getCategories, getTags } from '@/libs/data-layer/categories'
import { getAllPosts } from '@/libs/data-layer/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, tags, authors] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getTags(),
    getAuthors(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: 'daily', priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteConfig.url}/subscription`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteConfig.url}/submission`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${siteConfig.url}/post/${post.handle}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...categories.map((category) => ({
      url: `${siteConfig.url}/category/${category.handle}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: `${siteConfig.url}/tag/${tag.handle}`,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...authors.map((author) => ({
      url: `${siteConfig.url}/author/${author.handle}`,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]
}
