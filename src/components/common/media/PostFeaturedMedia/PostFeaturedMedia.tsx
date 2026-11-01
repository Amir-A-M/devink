import type { FC } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import type { TPost } from '@/libs/data-layer/posts'

import GallerySlider from '@/components/common/media/PostFeaturedMedia/GallerySlider'
import MediaAudio from '@/components/common/media/PostFeaturedMedia/MediaAudio'
import MediaVideo from '@/components/common/media/PostFeaturedMedia/MediaVideo'
import PostTypeFeaturedIcon from '@/components/common/posts/PostTypeFeaturedIcon'

interface Props {
  className?: string
  post: TPost
  isHover?: boolean
}

const PostFeaturedMedia: FC<Props> = ({ className, post, isHover = false }) => {
  const { featuredImage, postType, videoUrl, galleryImgs, audioUrl, handle, title } = post

  const renderImage = () => {
    return (
      <Link href={`/post/${handle}`}>
        <Image
          alt={title}
          fill
          className="object-cover"
          src={featuredImage}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
    )
  }
  const renderPostGallery = () => {
    if (!galleryImgs) {
      return renderImage()
    }

    return <GallerySlider handle={handle} galleryImgs={galleryImgs} />
  }

  const renderPostVideo = () => {
    if (!videoUrl) {
      return (
        <>
          {renderImage()}
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        </>
      )
    }

    return (
      <>
        {renderImage()}
        {!isHover && (
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        )}
        <MediaVideo isHover={isHover} videoUrl={videoUrl} handle={handle} />
      </>
    )
  }

  const renderPostAudio = () => {
    return (
      <>
        {renderImage()}
        {audioUrl && <MediaAudio post={post} />}
        {!audioUrl && (
          <PostTypeFeaturedIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            postType={postType}
          />
        )}
      </>
    )
  }

  return (
    <div className={clsx('relative size-full overflow-hidden', className)}>
      {postType === 'gallery' && renderPostGallery()}
      {postType === 'video' && renderPostVideo()}
      {postType === 'audio' && renderPostAudio()}
      {postType !== 'audio' && postType !== 'video' && postType !== 'gallery' && renderImage()}
    </div>
  )
}

export default PostFeaturedMedia
