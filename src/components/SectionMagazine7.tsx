import { type TPost } from '@/data/posts'
import HeadingWithSub, { type HeadingWithSubProps } from '@/shared/Heading'
import clsx from 'clsx'
import { type FC } from 'react'
import Card10 from './PostCards/Card10'
import Card10V3 from './PostCards/Card10V3'

type Props = Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> & {
  posts: TPost[]
  className?: string
  heading?: string
}

const SectionMagazine7: FC<Props> = ({ posts, className, heading, subHeading, dimHeading }) => {
  return (
    <div className={clsx('section-magazine-7 relative', className)}>
      <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading}>
        {heading}
      </HeadingWithSub>
      <div className="grid grid-cols-1 gap-6 md:gap-8">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <Card10V3 post={posts[0]} />
          <Card10V3 galleryType={2} post={posts[1]} />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          <Card10 post={posts[2]} />
          <Card10 post={posts[3]} />
          {posts[4] && <Card10 post={posts[4]} />}
          {posts[5] && <Card10 post={posts[5]} />}
        </div>
      </div>
    </div>
  )
}

export default SectionMagazine7
