import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import { type FC } from 'react'
import Card3Small from './PostCards/Card3Small'
import WidgetHeading from './WidgetHeading'

interface Props {
  className?: string
  posts: TPost[]
}

const WidgetPosts: FC<Props> = ({ className = 'bg-neutral-100 dark:bg-neutral-800', posts }) => {
  return (
    <div className={clsx('widget-posts overflow-hidden rounded-3xl', className)}>
      <WidgetHeading title="Popular posts" viewAll={{ label: 'View all', href: '/#' }} />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {posts?.map((post) => (
          <Card3Small
            className="p-4 hover:bg-neutral-200 xl:px-5 xl:py-6 dark:hover:bg-neutral-700"
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

export default WidgetPosts
