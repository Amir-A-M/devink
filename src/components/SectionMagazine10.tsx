import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import { type FC } from 'react'
import Card18 from './PostCards/Card18'
import Card19 from './PostCards/Card19'

interface Props {
  posts: TPost[]
  className?: string
}

const SectionMagazine10: FC<Props> = ({ posts, className }) => {
  return (
    <div className={clsx('section-magazine-10 relative', className)}>
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-5">
          {posts
            .filter((_, i) => i < 3 && i >= 1)
            .map((item, index) => (
              <Card18 className="col-span-1 sm:row-span-3" key={index} post={item} />
            ))}

          {posts[3] && (
            <Card19
              ratio="aspect-4/3 sm:aspect-16/1"
              className="sm:col-span-2 sm:row-span-2"
              titleClass="text-xl sm:text-2xl xl:text-2xl"
              post={posts[3]}
            />
          )}
        </div>

        {posts[0] && <Card19 post={posts[0]} priority />}
      </div>
    </div>
  )
}

export default SectionMagazine10
