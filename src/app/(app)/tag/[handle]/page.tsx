import type { Metadata } from 'next'

import { getTagByHandle, getTags } from '@/libs/data-layer/categories'

import PageContent from './_components/PageContent'

export async function generateStaticParams() {
  return (await getTags()).map((tag) => ({ handle: tag.handle }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const tag = await getTagByHandle(handle)

  if (!tag) {
    return {
      title: 'Tag not found',
      description: 'Tag not found',
    }
  }

  return {
    title: tag.name,
    description: tag.description,
    alternates: { canonical: `/tag/${handle}` },
    openGraph: {
      type: 'website',
      title: tag.name,
      description: tag.description,
      url: `/tag/${handle}`,
    },
  }
}

export default PageContent
