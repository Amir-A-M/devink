import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  ratio?: string
  titleClass?: string
  post: TPost
}

const Card18: FC<Props> = ({ className, titleClass = 'text-lg ', ratio = 'aspect-4/3', post }) => {
  const { title, handle, featuredImage, categories, postType, likeCount, liked, commentCount, bookmarked } = post

  return (
    <div className={clsx('group post-card-18 relative flex flex-col overflow-hidden rounded-xl', className)}>
      <div className={clsx('relative size-full', ratio)}>
        {postType === 'audio' ? (
          <PostFeaturedMedia post={post} />
        ) : (
          <>
            <Image
              sizes="(max-width: 1024px) 100vw, 33vw"
              alt={title}
              className="size-full rounded-xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
              src={featuredImage}
              fill
            />
            <PostTypeFeaturedIcon
              className="absolute end-3.5 top-3.5 group-hover:hidden"
              postType={postType}
              wrapSize="size-7"
              iconSize="size-4"
            />
            <Link href={`/post/${handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1}></Link>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 top-0 flex flex-wrap gap-x-2 gap-y-1 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <PostCardLikeBtn likeCount={likeCount} liked={liked} />
        <PostCardCommentBtn commentCount={commentCount} handle={handle} />
        <PostCardSaveBtn className="ms-auto" bookmarked={bookmarked} />
      </div>

      <Link
        href={`/post/${handle}`}
        className="absolute inset-x-0 bottom-0 block h-1/2 bg-linear-to-t from-black opacity-80"
      />

      <div className="absolute inset-x-0 bottom-0 flex grow flex-col p-6">
        <Link href={`/post/${handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1} />
        <CategoryBadgeList categories={categories} />
        <h2 className={clsx('mt-3 leading-snug font-semibold text-white', titleClass)}>{title}</h2>
      </div>
    </div>
  )
}

export default Card18
