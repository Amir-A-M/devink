'use client'

import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { type FC, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardMeta from '../PostCardMeta/PostCardMeta'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  ratio?: string
  hiddenAuthor?: boolean
}

const Card11: FC<Props> = ({ className, post, hiddenAuthor = false, ratio = 'aspect-4/3' }) => {
  const { title, handle, categories, date, likeCount, liked, commentCount, readingTime, bookmarked } = post

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={clsx('group post-card-11 relative flex flex-col rounded-3xl bg-white dark:bg-white/5', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative w-full shrink-0 overflow-hidden rounded-t-3xl', ratio)}>
        <PostFeaturedMedia post={post} isHover={isHover} />
      </div>
      <div className="absolute inset-x-3 top-3">
        <CategoryBadgeList categories={categories} />
      </div>

      <div className="flex grow flex-col gap-y-3 rounded-b-3xl border p-4">
        {!hiddenAuthor ? <PostCardMeta meta={post} /> : <span className="text-xs text-neutral-500">{date}</span>}
        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={`/post/${post.handle}`} className="line-clamp-2" title={title}>
            {title}
          </Link>
        </h3>

        <div className="mt-auto flex flex-wrap gap-x-2 gap-y-1">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <PostCardCommentBtn commentCount={commentCount} handle={handle} />
          <PostCardSaveBtn className="ms-auto" readingTime={readingTime} bookmarked={bookmarked} />
        </div>
      </div>
    </div>
  )
}

export default Card11
