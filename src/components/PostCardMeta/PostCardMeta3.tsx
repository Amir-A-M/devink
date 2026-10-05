import { type TPost } from '@/data/posts'
import Avatar from '@/shared/Avatar'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import { type FC } from 'react'
import LocalDate from '../LocalDate'

interface Props {
  className?: string
  date?: string
  author: TPost['author']
  readingTime?: number
}

const PostCardMeta3: FC<Props> = ({ className, author, readingTime, date }) => {
  const { name, handle, avatar } = author
  return (
    <div className={clsx('post-card-meta-3 relative flex items-center text-xs/5', className)}>
      <Link href={`/author/${handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />

      <Avatar className="size-10" src={avatar.src} alt="" width={40} height={40} sizes="40px" />
      <div className="ms-3">
        <p className="font-semibold text-neutral-900 dark:text-neutral-200">{name}</p>
        <p className="flex flex-wrap items-center text-neutral-500 dark:text-neutral-400">
          <span>
            <LocalDate date={date ?? ''} />
          </span>
          {readingTime && (
            <>
              <span className="mx-1">·</span>
              <span>{readingTime} min read</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default PostCardMeta3
