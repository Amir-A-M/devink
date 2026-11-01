import type { Metadata } from 'next'

import { getAuthorByHandle, getAuthors } from '@/libs/data-layer/authors'

import PageContent from './_components/PageContent'

export async function generateStaticParams() {
  return (await getAuthors()).map((author) => ({ handle: author.handle }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const author = await getAuthorByHandle(handle)
  if (!author?.id) {
    return {
      title: 'Author not found',
      description: 'Author not found',
    }
  }
  return {
    title: author.name,
    description: author.description,
    alternates: { canonical: `/author/${handle}` },
    openGraph: {
      type: 'profile',
      title: author.name,
      description: author.description,
      url: `/author/${handle}`,
      images: author.avatar?.src ? [{ url: author.avatar.src, alt: author.name }] : undefined,
    },
  }
}

export default PageContent
