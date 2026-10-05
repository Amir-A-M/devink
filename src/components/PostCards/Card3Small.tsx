import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'

interface Props {
  className?: string
  post: TPost
}

const Card3Small: FC<Props> = ({ className, post }) => {
  const { title, handle, featuredImage } = post

  return (
    <div className={clsx('post-card-3-small group relative flex items-center justify-between gap-4', className)}>
      <div className="relative grow space-y-3">
        <PostCardMeta meta={{ ...post }} />
        <h2 className="nc-card-title block text-sm font-medium sm:text-base sm:font-semibold">
          <p className="line-clamp-1" title={title}>
            {title}
          </p>
        </h2>
      </div>

      <div className="relative aspect-square w-20 shrink-0">
        <Image
          alt={title}
          sizes="100px"
          className="rounded-lg object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          src={featuredImage}
          fill
          title={title}
        />
      </div>

      <Link href={`/post/${handle}`} className="absolute inset-0" title={title} aria-hidden="true" tabIndex={-1}></Link>
    </div>
  )
}

export default Card3Small
