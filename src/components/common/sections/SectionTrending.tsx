import type { FC } from 'react'

import clsx from 'clsx'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import Card5 from '@/components/common/posts/PostCards/Card5'
import HeadingWithSub from '@/libs/design/Heading'

type Props = Pick<HeadingWithSubProps, 'dimHeading' | 'isCenter' | 'subHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
}

const SectionTrending: FC<Props> = ({ posts, heading, subHeading, isCenter, className }) => {
  return (
    <div className={clsx('section-trending relative', className)}>
      {!!heading && (
        <HeadingWithSub subHeading={subHeading} isCenter={isCenter}>
          {heading}
        </HeadingWithSub>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:md:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => {
          return <Card5 key={post.id} post={post} />
        })}
      </div>
    </div>
  )
}

export default SectionTrending
