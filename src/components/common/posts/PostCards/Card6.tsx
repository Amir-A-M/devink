import type { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import type { TPost } from '@/libs/data-layer/posts'

import CategoryBadgeList from '@/components/common/categories/CategoryBadgeList'
import PostCardCommentBtn from '@/components/common/posts/PostCardCommentBtn'
import PostCardLikeBtn from '@/components/common/posts/PostCardLikeBtn'
import PostCardMeta from '@/components/common/posts/PostCardMeta/PostCardMeta'
import PostCardSaveBtn from '@/components/common/posts/PostCardSaveBtn'
import PostTypeFeaturedIcon from '@/components/common/posts/PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
}

const Card6: FC<Props> = ({ className, post }) => {
  const {
    title,
    handle,
    readingTime,
    featuredImage,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
  } = post

  return (
    <div
      className={clsx(
        'group post-card-6 relative flex flex-wrap gap-5 rounded-3xl border border-neutral-200 bg-white p-4 sm:flex-nowrap dark:border-neutral-700 dark:bg-neutral-900',
        className
      )}
    >
      <div className="flex grow flex-col gap-y-2.5">
        <div className="space-y-3">
          <CategoryBadgeList categories={categories} />
          <h2 className="post-card-title block max-w-sm text-sm font-semibold sm:text-base">
            <Link href={`/post/${handle}`} className="line-clamp-1" title={title}>
              {title}
            </Link>
          </h2>
          <PostCardMeta meta={{ ...post }} />
        </div>
        <div className="relative mt-auto flex flex-wrap gap-x-2 gap-y-1">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <PostCardCommentBtn commentCount={commentCount} handle={handle} />
          <PostCardSaveBtn className="ms-auto" readingTime={readingTime} bookmarked={bookmarked} />
        </div>
      </div>

      <Link href={`/post/${handle}`} className="relative block size-40 shrink-0">
        <Image
          sizes="(max-width: 600px) 50vw, 33vw"
          className="size-full rounded-2xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          fill
          src={featuredImage}
          alt={title}
        />
        <span className="absolute start-1 bottom-1">
          <PostTypeFeaturedIcon wrapSize="h-7 w-7" iconSize="h-4 w-4" postType={postType} />
        </span>
      </Link>
    </div>
  )
}

export default Card6
