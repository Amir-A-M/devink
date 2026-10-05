import { type TPost } from '@/data/posts'
import { absoluteUrl, siteConfig } from '@/lib/site'
import { type Metadata } from 'next'

/**
 * Shared by all three post layouts. The canonical always names `/post/<handle>`
 * — `page-style-2` and `page-style-3` render the same article with different
 * chrome, and without this a buyer's site competes with itself for every post.
 */
export function buildPostMetadata(post: TPost): Metadata {
  const canonical = `/post/${post.handle}`
  const image = post.featuredImage?.src
  const images = image ? [{ url: image, alt: post.featuredImage?.alt || post.title }] : undefined

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images,
      publishedTime: post.date,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images,
    },
  }
}

/**
 * Article structured data for a post page. Rendered as a JSON-LD script so the
 * fields the layout already shows — headline, image, author, date — are
 * machine-readable too.
 */
export function buildArticleJsonLd(post: TPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.src ? [post.featuredImage.src] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: post.author?.name
      ? {
          '@type': 'Person',
          name: post.author.name,
          url: post.author.handle ? absoluteUrl(`/author/${post.author.handle}`) : undefined,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/post/${post.handle}`),
    },
  }
}
