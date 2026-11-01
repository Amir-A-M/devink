import type { Metadata } from 'next'

import { getCategories, getCategoryByHandle } from '@/libs/data-layer/categories'

import PageContent from './_components/PageContent'

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({ handle: category.handle }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)

  if (!category) {
    return {
      title: 'Category not found',
      description: 'Category not found',
    }
  }

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${handle}` },
    openGraph: {
      type: 'website',
      title: category.name,
      description: category.description,
      url: `/category/${handle}`,
    },
  }
}

export default PageContent
