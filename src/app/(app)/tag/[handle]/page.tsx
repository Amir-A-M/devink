import PageHeader from '@/app/(app)/tag/page-header'
import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import ModalCategories from '@/components/ModalCategories'
import ModalTags from '@/components/ModalTags'
import PaginationWrapper from '@/components/PaginationWrapper'
import Card11 from '@/components/PostCards/Card11'
import { getCategories, getTagByHandle, getTags } from '@/data/categories'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

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

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const tag = await getTagByHandle(handle)

  if (!tag) {
    return notFound()
  }

  const posts = tag.posts || []
  const [categories, tags] = await Promise.all([getCategories(), getTags()])

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-tag-${handle}`}>
      {/* HEADER */}
      <PageHeader tag={tag} />

      <div className="container pt-10 lg:pt-16">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ModalCategories categories={categories} />
          <ModalTags tags={tags} />
          <div className="ms-auto">
            <ArchiveSortByListBox filterOptions={filterOptions} />
          </div>
        </div>

        {/* LOOP ITEMS */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Card11 key={post.id} post={post} />
          ))}
        </div>

        {/* PAGINATIONS */}
        <PaginationWrapper className="mt-20" />
      </div>
    </div>
  )
}

export default Page
