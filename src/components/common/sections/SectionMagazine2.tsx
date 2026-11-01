import type { FC } from 'react'

import clsx from 'clsx'

import type { TPost } from '@/libs/data-layer/posts'
import type { HeadingWithSubProps } from '@/libs/design/Heading'

import Card11 from '@/components/common/posts/PostCards/Card11'
import Card2 from '@/components/common/posts/PostCards/Card2'
import SectionTabHeader from '@/components/common/sections/SectionTabHeader'

interface Props extends Pick<HeadingWithSubProps, 'dimHeading' | 'subHeading'> {
  posts: TPost[]
  heading?: string
  className?: string
}

const SectionMagazine2: FC<Props> = ({ posts, heading, className, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-2 relative', className)}>
      <SectionTabHeader
        heading={heading}
        subHeading={subHeading}
        dimHeading={dimHeading}
        tabActive="Workplace"
        tabs={['Workplace', 'Design', 'Development', 'Photography']}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="grid gap-6">
          {posts.slice(1, 3).map((post) => {
            return <Card11 ratio="aspect-5/3" key={post.id} post={post} />
          })}
        </div>
        <div className="lg:col-span-2">{posts[0] && <Card2 className="h-full" size="large" post={posts[0]} />}</div>
        <div className="grid grid-cols-1 gap-6 md:col-span-3 md:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          {posts.slice(3, 5).map((post) => {
            return <Card11 className="bg-neutral-50" ratio="aspect-5/3" key={post.id} post={post} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine2
