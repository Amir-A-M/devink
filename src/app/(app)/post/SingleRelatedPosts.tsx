import type { FC } from 'react'

import type { TPost } from '@/data/posts'

import SectionSliderPosts from '@/components/SectionSliderPosts'

interface Props {
  relatedPosts: TPost[]
  moreFromAuthorPosts: TPost[]
}

const SingleRelatedPosts: FC<Props> = ({ relatedPosts, moreFromAuthorPosts }) => {
  return (
    <div className="relative mt-16 bg-neutral-50 py-16 lg:mt-28 lg:py-24 dark:bg-neutral-800">
      <div className="container space-y-16 lg:space-y-28">
        <SectionSliderPosts posts={relatedPosts} heading="Don't miss these" postCardName="card7" />
        <SectionSliderPosts posts={moreFromAuthorPosts} heading="More from author" />
      </div>
    </div>
  )
}

export default SingleRelatedPosts
