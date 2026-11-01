import { notFound } from 'next/navigation'

import PageHeader from '@/app/(app)/category/page-header'
import ModalCategories from '@/components/common/categories/ModalCategories'
import ModalTags from '@/components/common/categories/ModalTags'
import ArchiveSortByListBox from '@/components/common/navigation/ArchiveSortByListBox'
import PaginationWrapper from '@/components/common/navigation/PaginationWrapper'
import Card11 from '@/components/common/posts/PostCards/Card11'
import { getCategories, getCategoryByHandle, getTags } from '@/libs/data-layer/categories'

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)

  if (!category) {
    return notFound()
  }

  const posts = category.posts || []
  const [categories, tags] = await Promise.all([getCategories(), getTags()])

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-category-${handle}`}>
      <PageHeader category={category} />

      <div className="container pt-10 lg:pt-20">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ModalCategories categories={categories} />
          <ModalTags tags={tags} />
          <div className="ms-auto">
            <ArchiveSortByListBox filterOptions={filterOptions} />
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Card11 key={post.id} post={post} />
          ))}
        </div>
        <PaginationWrapper className="mt-20" />
      </div>
    </div>
  )
}

export default Page
