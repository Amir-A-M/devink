import { Link } from '@/shared/link'
import { Comment01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { type FC } from 'react'

interface Props {
  className?: string
  commentCount: number
  handle: string
}

// Contrast: the hover state measures 3.52:1 (teal-600 on teal-50) while the
// resting state measures ~17:1 — hover lowers contrast rather than raising it.
// Recorded, not changed: it is the card's established hover language.
const PostCardCommentBtn: FC<Props> = ({ className, commentCount, handle }) => {
  return (
    <Link
      href={`/post/${handle}#comments`}
      className={clsx(
        'post-card-comment-btn flex h-8 min-w-16 items-center rounded-full bg-neutral-50 ps-2 pe-3 text-xs transition-colors hover:bg-teal-50 hover:text-teal-600 dark:bg-white/10 dark:hover:bg-white/10 dark:hover:text-teal-500',
        className
      )}
      aria-label={`${commentCount} comments on this article`}
    >
      <HugeiconsIcon icon={Comment01Icon} size={18} aria-hidden="true" />
      <span className="ms-2">{commentCount}</span>
    </Link>
  )
}

export default PostCardCommentBtn
