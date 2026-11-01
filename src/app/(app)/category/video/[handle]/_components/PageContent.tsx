import { notFound } from 'next/navigation'

import PageHeader from '@/app/(app)/category/page-header'
import ModalCategories from '@/components/common/categories/ModalCategories'
import ModalTags from '@/components/common/categories/ModalTags'
import ArchiveSortByListBox from '@/components/common/navigation/ArchiveSortByListBox'
import PaginationWrapper from '@/components/common/navigation/PaginationWrapper'
import Card10V2 from '@/components/common/posts/PostCards/Card10V2'
import { getCategories, getCategoryByHandle, getTags } from '@/libs/data-layer/categories'
import { getPostsVideo } from '@/libs/data-layer/posts'

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params
  const category = await getCategoryByHandle(handle)
  const posts = await getPostsVideo()
  const categories = await getCategories()
  const tags = await getTags()

  if (!category) {
    return notFound()
  }

  const filterOptions = [
    { name: 'Most recent', value: 'most-recent' },
    { name: 'Curated by admin', value: 'curated-by-admin' },
    { name: 'Most appreciated', value: 'most-appreciated' },
    { name: 'Most discussed', value: 'most-discussed' },
    { name: 'Most viewed', value: 'most-viewed' },
  ]

  return (
    <div className={`page-category-${handle}`}>
      <PageHeader category={category} type="video" />

      <div className="container pt-10 lg:pt-20">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ModalCategories categories={categories} />
          <ModalTags tags={tags} />
          <div className="ms-auto">
            <ArchiveSortByListBox filterOptions={filterOptions} />
          </div>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:mt-10 lg:grid-cols-3">
          {posts.map((post) => (
            <Card10V2 ratio="aspect-square sm:aspect-16/9" key={post.id} post={post} />
          ))}
        </div>
        <PaginationWrapper className="mt-20" />
      </div>
    </div>
  )
}

export default Page
