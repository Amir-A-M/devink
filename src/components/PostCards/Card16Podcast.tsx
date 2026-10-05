import { type TPost } from '@/data/posts'
import musicWave from '@/images/musicWave.webp'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { type FC } from 'react'
import ButtonPlayMusicPlayer from '../ButtonPlayMusicPlayer'
import CategoryBadgeList from '../CategoryBadgeList'
import PostCardCommentBtn from '../PostCardCommentBtn'
import PostCardLikeBtn from '../PostCardLikeBtn'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostTypeFeaturedIcon from '../PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
  ratio?: string
}

const Card16Podcast: FC<Props> = ({ className, post, ratio = 'aspect-4/3' }) => {
  const {
    title,
    handle,
    categories,
    excerpt,
    featuredImage,
    postType,
    likeCount,
    liked,
    commentCount,
    bookmarked,
    readingTime,
  } = post

  return (
    <div className={clsx('group post-card-16-podcast relative flex flex-col', className)}>
      <div className={`relative w-full shrink-0 ${ratio}`}>
        <Image
          fill
          alt={title}
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={featuredImage}
          className="rounded-3xl object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
        />
      </div>

      {/* ABSOLUTE */}
      <Link href={`/post/${handle}`} className="absolute inset-0" aria-hidden="true" tabIndex={-1}></Link>

      <CategoryBadgeList className="absolute inset-x-3 top-3" categories={categories} />

      {/* MAIN CONTENT */}
      <div className="relative -mt-32 w-11/12">
        {postType !== 'audio' && (
          <PostTypeFeaturedIcon
            wrapSize="size-8"
            iconSize="size-4"
            className="absolute start-3 top-6"
            postType={postType}
          />
        )}

        <div className={clsx('flex items-center gap-x-4 px-5', postType !== 'audio' && 'invisible opacity-0')}>
          <div className="grow">
            <Image src={musicWave} alt="" />
          </div>
          <ButtonPlayMusicPlayer post={post} />
        </div>
        <div className="mt-5 flex grow flex-col rounded-3xl rounded-ss-none bg-white p-5 shadow-xl dark:bg-neutral-900 dark:shadow-2xl">
          <h2 className="nc-card-title block font-semibold text-neutral-900 sm:text-lg/snug dark:text-neutral-100">
            <Link href={`/post/${handle}`} title={title}>
              {title}
            </Link>
          </h2>
          <p className="mt-3 mb-5 block text-sm/6 text-neutral-600 dark:text-neutral-400">
            <span className="line-clamp-2">{excerpt}</span>
          </p>
          <div className="relative mt-auto flex flex-wrap gap-x-2 gap-y-1">
            <PostCardLikeBtn likeCount={likeCount} liked={liked} />
            <PostCardCommentBtn commentCount={commentCount} handle={handle} />
            <PostCardSaveBtn className="ms-auto" readingTime={readingTime} bookmarked={bookmarked} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card16Podcast
