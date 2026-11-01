import type { FC } from 'react'

import clsx from 'clsx'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import Card2 from '@/components/common/posts/PostCards/Card2'
import Card6 from '@/components/common/posts/PostCards/Card6'
import SectionTabHeader from '@/components/common/sections/SectionTabHeader'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  posts: TPost[]
  heading?: string
  className?: string
  subHeading?: string
}

const SectionMagazine1: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-1', className)}>
      <SectionTabHeader
        subHeading={subHeading}
        dimHeading={dimHeading}
        heading={heading}
        tabActive="Workplace"
        tabs={['Workplace', 'Design', 'Development', 'Photography']}
      />
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid gap-6 md:gap-8">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card6 key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine1
