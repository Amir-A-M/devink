'use client'
import { type TPost } from '@/data/posts'
import clsx from 'clsx'
import Link from 'next/link'
import { type FC, useState } from 'react'
import CategoryBadgeList from '../CategoryBadgeList'
import NcImage from '../NcImage/NcImage'
import PostCardMeta3 from '../PostCardMeta/PostCardMeta3'
import PostCardSaveBtn from '../PostCardSaveBtn'
import PostFeaturedMedia from '../PostFeaturedMedia/PostFeaturedMedia'

interface Props {
  className?: string
  post: TPost
  galleryType?: 1 | 2
}

const Card10V3: FC<Props> = ({ className, post, galleryType = 1 }) => {
  const { title, handle, categories, postType, galleryImgs, author, date, readingTime, bookmarked } = post
  const [isHover, setIsHover] = useState(false)

  const renderGallery2 = () => {
    if (!galleryImgs) return null
    return (
      <div className="grid size-full grid-rows-2 gap-2">
        <div className="grid grid-cols-3 gap-2">
          <NcImage
            alt="gallery 1"
            fill
            containerClassName="relative col-span-2"
            src={galleryImgs[0]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
          <NcImage
            alt="gallery 2"
            fill
            src={galleryImgs[1]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <NcImage
            alt="gallery 3"
            fill
            src={galleryImgs[2]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
          <NcImage
            alt="gallery 4"
            fill
            containerClassName="relative col-span-2"
            src={galleryImgs[3]}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="size-full object-cover"
          />
        </div>
      </div>
    )
  }

  const renderGallery = () => {
    if (!galleryImgs) return null
    return (
      <div className="grid size-full grid-cols-3 gap-2">
        <div className="grid">
          <NcImage
            alt={`${title} — gallery image 1`}
            fill
            src={galleryImgs[0]}
            sizes="(max-width: 1024px) 33vw, 17vw"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          <NcImage
            alt={`${title} — gallery image 2`}
            fill
            src={galleryImgs[1]}
            sizes="(max-width: 1024px) 33vw, 17vw"
          />
          <NcImage
            alt={`${title} — gallery image 3`}
            fill
            src={galleryImgs[2]}
            sizes="(max-width: 1024px) 33vw, 17vw"
          />
        </div>
        <div className="grid">
          <NcImage
            alt={`${title} — gallery image 4`}
            fill
            src={galleryImgs[3]}
            sizes="(max-width: 1024px) 33vw, 17vw"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={clsx('group post-card-10-v3 relative flex flex-col', className)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-16/9">
        {postType !== 'gallery' || !galleryImgs?.length ? (
          <PostFeaturedMedia post={post} isHover={isHover} />
        ) : galleryType === 1 ? (
          renderGallery()
        ) : (
          renderGallery2()
        )}

        {postType === 'gallery' && galleryImgs?.length && (
          <Link
            href={`/post/${handle}`}
            className="absolute inset-0 bg-neutral-900/20 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
      </div>

      <div className="absolute inset-x-3 top-3 flex items-start justify-between space-x-4">
        <CategoryBadgeList categories={categories} />
        <PostCardSaveBtn bookmarked={bookmarked} />
      </div>

      <div className="mt-4 space-y-4 px-4">
        <h2 className="block font-semibold text-neutral-900 sm:text-lg dark:text-neutral-100">
          <Link href={`/post/${handle}`} title={title}>
            {title}
          </Link>
        </h2>
        <PostCardMeta3 author={author} date={date} readingTime={readingTime} />
      </div>
    </div>
  )
}

export default Card10V3
