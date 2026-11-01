import type { FC } from 'react'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import Card8 from '@/components/common/posts/PostCards/Card8'
import Card9 from '@/components/common/posts/PostCards/Card9'
import SectionTabHeader from '@/components/common/sections/SectionTabHeader'
import ButtonPrimary from '@/libs/design/ButtonPrimary'

type Props = Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
}

const SectionMagazine4: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-4 relative', className)}>
      <SectionTabHeader
        heading={heading}
        subHeading={subHeading}
        dimHeading={dimHeading}
        tabActive="Development"
        tabs={['Development', 'Design', 'Illustration', 'Photography']}
      />

      {!posts?.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4">
        {posts[0] && <Card8 className="sm:col-span-2" post={posts[0]} />}
        {posts.slice(1, 3).map((item, index) => (
          <Card9 key={index} post={item} />
        ))}
        {posts.slice(3, 5).map((item, index) => (
          <Card9 key={index} post={item} />
        ))}
        {posts[5] && <Card8 className="sm:col-span-2" post={posts[5]} />}
      </div>

      <div className="mt-20 flex justify-center">
        <ButtonPrimary href="/search">
          Show me more
          <ArrowRightIcon className="size-4" aria-hidden="true" />
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionMagazine4
