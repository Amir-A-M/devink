import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Signed-in surfaces and the search endpoint have nothing to index.
        disallow: ['/dashboard/', '/login', '/signup', '/forgot-password', '/search', '/search-2'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
