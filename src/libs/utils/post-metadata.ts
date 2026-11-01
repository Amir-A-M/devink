import type { Metadata } from 'next'

import type { TPost } from '@/libs/data-layer/posts'

import { absoluteUrl, siteConfig } from '@/config/site'

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
