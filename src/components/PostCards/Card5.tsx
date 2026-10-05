import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { type FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardMeta3 from '../PostCardMeta/PostCardMeta3'

interface Props {
  className?: string
  post: TPost
}

const Card5: FC<Props> = ({ className, post }) => {
  const { author, title, handle, date, categories, readingTime } = post
  return (
    <div
      className={clsx(
        'group post-card-5 relative rounded-3xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900',
        className
      )}
    >
      <Link href={`/post/${handle}`} className="absolute inset-0 rounded-lg" aria-hidden="true" tabIndex={-1}></Link>

      <div className="flex flex-col">
        <CategoryBadgeList categories={categories} />
        <h2 className="my-4 block text-base font-semibold text-neutral-800 dark:text-neutral-300" title={title}>
          <Link href={`/post/${handle}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h2>
        <PostCardMeta3 className="relative mt-auto" readingTime={readingTime} author={author} date={date} />
      </div>
    </div>
  )
}

export default Card5
