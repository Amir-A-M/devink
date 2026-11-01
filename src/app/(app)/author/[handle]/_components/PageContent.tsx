import { AllBookmarkIcon, FolderFavouriteIcon, LicenseIcon } from '@hugeicons/core-free-icons'
import { notFound } from 'next/navigation'

import PageHeader from '@/app/(app)/author/page-header'
import ArchiveSortByListBox from '@/components/common/navigation/ArchiveSortByListBox'
import ArchiveTabs from '@/components/common/navigation/ArchiveTabs'
import PaginationWrapper from '@/components/common/navigation/PaginationWrapper'
import Card11 from '@/components/common/posts/PostCards/Card11'
import { getAuthorByHandle } from '@/libs/data-layer/authors'
import { getAllPosts } from '@/libs/data-layer/posts'

const sortByOptions = [
  { name: 'Most recent', value: 'most-recent' },
  { name: 'Curated by admin', value: 'curated-by-admin' },
  { name: 'Most appreciated', value: 'most-appreciated' },
  { name: 'Most discussed', value: 'most-discussed' },
  { name: 'Most viewed', value: 'most-viewed' },
  { name: 'Most liked', value: 'most-liked' },
]
const filterTabs = [
  {
    name: 'Articles',
    value: 'articles',
    icon: LicenseIcon,
  },
  { name: 'Favorites', value: 'favorites', icon: FolderFavouriteIcon },
  { name: 'Saved', value: 'saved', icon: AllBookmarkIcon },
]

const Page = async ({ params }: { params: Promise<{ handle: string }> }) => {
  const { handle } = await params

  const author = await getAuthorByHandle(handle)
  const posts = (await getAllPosts()).slice(0, 12)

  if (!author?.id) {
    return notFound()
  }

  return (
    <div className={`page-author`}>
      <PageHeader author={author} />

      <div className="container pt-16 lg:pt-20">
        <div className="flex flex-wrap items-center gap-4">
          <ArchiveTabs tabs={filterTabs} />
          <ArchiveSortByListBox className="ms-auto shrink-0" filterOptions={sortByOptions} />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-8 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Card11 key={post.id} post={post} />
          ))}
        </div>
        <PaginationWrapper className="mt-20" totalPages={10} />
      </div>
    </div>
  )
}

export default Page
