import type { Metadata } from 'next'

import PageContent from './_components/PageContent'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const s = (await searchParams)['s']
  const query = Array.isArray(s) ? s[0] : s

  if (!query) {
    return {
      title: 'Search',
      description: 'Search articles, categories, tags and authors across the magazine.',
      robots: { index: false, follow: true },
    }
  }

  return {
    title: `Search results for ${query}`,
    description: `Articles, categories, tags and authors matching ${query}.`,
    robots: { index: false, follow: true },
  }
}

export default PageContent
