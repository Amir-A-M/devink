import { getAuthors } from '@/data/authors'
import { getCategories, getTags } from '@/data/categories'
import { getAllPosts } from '@/data/posts'
import { siteConfig } from '@/lib/site'
import type { MetadataRoute } from 'next'

/**
 * Only canonical URLs are listed. The template ships alternate designs of the
 * same content — five extra home layouts, two extra post layouts, two extra
 * category layouts — and those all point their canonical at the primary route,
 * so listing them here would ask search engines to index duplicates.
 */
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
