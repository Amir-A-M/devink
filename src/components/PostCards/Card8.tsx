import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import LocalDate from '../LocalDate'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'

interface Props {
  className?: string
  post: TPost
  ratio?: string
}

const Card8: FC<Props> = ({ className, post, ratio = 'aspect-3/4 sm:aspect-2/1' }) => {
  const {
    title,
    handle,
    featuredImage,
    categories,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    author,
    date,
    readingTime,
  } = post

  const renderMeta = () => {
    return (
      <div className="mt-3 text-neutral-300">
        <div className="relative flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
          <Link href={`/author/${author.handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
          <span className="font-medium text-neutral-200 hover:text-white">{author.name}</span>
          <span className="font-medium">·</span>
          <LocalDate date={date} />
          <span>/</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('group post-card-8 relative overflow-hidden rounded-3xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        <Image
          className="rounded-xl object-cover"
          src={featuredImage}
          alt={title}
          fill
          sizes="(max-width: 600px) 480px, 800px"
        />

        <Link
          href={`/post/${handle}`}
          className="absolute inset-x-0 top-1/3 bottom-0 bg-linear-to-t from-black opacity-60 transition-opacity duration-300 group-hover:top-0 group-hover:opacity-70"
        />

        <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap gap-x-2 gap-y-1 p-4 sm:px-5">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <PostCardCommentBtn commentCount={commentCount} handle={handle} />
          <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col p-4 sm:p-6">
        <Link href={`/post/${handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
        <CategoryBadgeList categories={categories} />
        <h2 className="mt-4 block text-lg font-semibold text-neutral-50 sm:text-2xl">
          <p className="line-clamp-2" title={title}>
            {title}
          </p>
        </h2>

        {renderMeta()}
      </div>
    </div>
  )
}

export default Card8
