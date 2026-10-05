'use client'
import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import { type FC, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardMeta2 from '../PostCardMeta/PostCardMeta2'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  ratio?: string
}

const Card10V2: FC<Props> = ({ className, post, ratio = 'aspect-square sm:aspect-11/12' }) => {
  const { handle, categories, bookmarked } = post
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={clsx('group post-card-10-v2 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative w-full shrink-0 overflow-hidden rounded-3xl', ratio)}>
        <PostFeaturedMedia post={post} isHover={isHover} />
      </div>
      <div className="absolute inset-x-3 top-3 flex items-start gap-2">
        <CategoryBadgeList categories={categories} />
        <PostCardSaveBtn bookmarked={bookmarked} className="ms-auto" />
      </div>

      <PostCardMeta2 meta={post} className="mt-4" />
    </div>
  )
}

export default Card10V2
