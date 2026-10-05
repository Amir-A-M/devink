'use client'

import convertNumbThousand from '@/utils/convertNumbThousand'
import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { type FC, useState } from 'react'

interface Props {
  className?: string
  likeCount: number
  liked?: boolean
}

const PostCardLikeBtn: FC<Props> = ({ className, likeCount = 0, liked }) => {
  const [isLiked, setisLiked] = useState(liked)

  return (
    <button
      className={clsx(
        'post-card-like-btn group flex h-8 items-center rounded-full ps-2 pe-3 text-xs leading-none transition-colors',
        className,
        isLiked
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-100'
          : 'bg-neutral-50 hover:bg-rose-50 hover:text-rose-600 dark:bg-white/10 dark:hover:bg-white/10 dark:hover:text-rose-400'
      )}
      onClick={() => setisLiked(!isLiked)}
      type="button"
      aria-pressed={!!isLiked}
      aria-label={isLiked ? 'Unlike this article' : 'Like this article'}
    >
      <HeartIcon className="size-5" fill={isLiked ? 'currentColor' : 'none'} aria-hidden="true" />

      <span className={clsx('ms-1', isLiked && 'text-rose-600')}>
        {convertNumbThousand(isLiked ? likeCount + 1 : likeCount)}
      </span>
    </button>
  )
}

export default PostCardLikeBtn
