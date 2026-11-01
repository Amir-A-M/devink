'use client'

import type { FC } from 'react'

import clsx from 'clsx'
import { useState } from 'react'

import type { TPost } from '@/libs/data-layer/posts'

import CategoryBadgeList from '@/components/common/categories/CategoryBadgeList'
import PostFeaturedMedia from '@/components/common/media/PostFeaturedMedia/PostFeaturedMedia'
import PostCardMeta2 from '@/components/common/posts/PostCardMeta/PostCardMeta2'
import PostCardSaveBtn from '@/components/common/posts/PostCardSaveBtn'

interface Props {
  className?: string
  post: TPost
  ratio?: string
}

const Card10: FC<Props> = ({ className, post, ratio = 'aspect-square sm:aspect-11/12' }) => {
  const [isHover, setIsHover] = useState(false)
  const { categories, bookmarked } = post

  return (
    <div
      className={clsx('group post-card-10 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={clsx('relative z-0 w-full shrink-0 overflow-hidden rounded-3xl', ratio)}>
        <PostFeaturedMedia post={post} isHover={isHover} />
      </div>
      <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-x-4">
        <CategoryBadgeList categories={categories} />
        <PostCardSaveBtn bookmarked={bookmarked} />
      </div>

      <PostCardMeta2 meta={post} className="mt-4" />
    </div>
  )
}

export default Card10
