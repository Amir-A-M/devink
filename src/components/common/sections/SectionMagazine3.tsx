import type { FC } from 'react'

import clsx from 'clsx'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import Card2 from '@/components/common/posts/PostCards/Card2'
import Card9 from '@/components/common/posts/PostCards/Card9'
import SectionTabHeader from '@/components/common/sections/SectionTabHeader'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  posts: TPost[]
  heading?: string
  className?: string
}

const SectionMagazine3: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-3 relative', className)}>
      <SectionTabHeader
        heading={heading}
        subHeading={subHeading}
        dimHeading={dimHeading}
        tabActive="development"
        tabs={['development', 'design', 'illustration', 'photography']}
      />

      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {posts[0] && <Card2 size="large" post={posts[0]} />}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {posts
            .filter((_, i) => i < 5 && i >= 1)
            .map((item, index) => (
              <Card9 ratio="aspect-square" key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine3
