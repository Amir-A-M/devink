'use client'

import CommentCard from '@/components/CommentCard/CommentCard'
import PostCardCommentBtn from '@/components/PostCardCommentBtn'
import PostCardLikeBtn from '@/components/PostCardLikeBtn'
import SingleCommentForm from '@/components/SingleCommentForm'
import { type TComment, type TPostDetail } from '@/data/posts'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import SocialsList from '@/shared/SocialsList'
import Tag from '@/shared/Tag'
import { Link } from '@/shared/link'
import { ArrowUp02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { type FC, useEffect, useRef, useState } from 'react'
import { ShareDropdown } from './SingleMetaAction'
import TheContent from './TheContent'

interface Props {
  post: TPostDetail
  comments: TComment[]
  className?: string
}

const SingleContentContainer: FC<Props> = ({ post, comments, className }) => {
  const endedAnchorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLButtonElement>(null)
  //
  const [isShowScrollToTop, setIsShowScrollToTop] = useState<boolean>(false)
  //

  const { tags, author, content, likeCount, commentCount, liked, handle } = post

  const endedAnchorEntry = useIntersectionObserver(endedAnchorRef, {
    threshold: 0,
    root: null,
    rootMargin: '0%',
    freezeOnceVisible: false,
  })

  useEffect(() => {
    const handleProgressIndicator = () => {
      const entryContent = contentRef.current
      const progressBarContent = progressRef.current

      if (!entryContent || !progressBarContent) {
        return
      }

      const winScroll = window.scrollY || document.documentElement.scrollTop
      const entryContentRect = entryContent.getBoundingClientRect()
      const entryContentTop = entryContentRect.top
      const entryContentHeight = entryContentRect.height

      const totalEntryH = entryContentTop + window.scrollY + entryContentHeight
      const scrolled = (winScroll / totalEntryH) * 100

      progressBarContent.innerText = scrolled.toFixed(0) + '%'

      if (scrolled >= 100) {
        setIsShowScrollToTop(true)
      } else {
        setIsShowScrollToTop(false)
      }
    }

    const handleProgressIndicatorHeadeEvent = () => {
      window?.requestAnimationFrame(handleProgressIndicator)
    }
    handleProgressIndicator()
    window?.addEventListener('scroll', handleProgressIndicatorHeadeEvent)
    return () => {
      window?.removeEventListener('scroll', handleProgressIndicatorHeadeEvent)
    }
  }, [])

  const showLikeAndCommentSticky =
    !endedAnchorEntry?.intersectionRatio && (endedAnchorEntry?.boundingClientRect.top || 0) > 0

  return (
    <div className={`relative ${className}`}>
      <div className="single-content space-y-10">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="mx-auto prose max-w-(--breakpoint-md)! lg:prose-lg dark:prose-invert"
          ref={contentRef}
        >
          <TheContent content={content} title={post.title} categoryHandle={post.categories?.[0]?.handle} />
        </div>

        {/* TAGS */}
        <div className="mx-auto flex max-w-(--breakpoint-md) flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag.id} className="me-2 mb-2" href={`/tag/${tag.handle}`}>
              {tag.name}
            </Tag>
          ))}
        </div>

        {/* AUTHOR */}
        <div className="mx-auto max-w-(--breakpoint-md) border-t border-b border-neutral-100 dark:border-neutral-700"></div>
        <div className="mx-auto flex max-w-(--breakpoint-md)" id="author">
          <Link href={`/author/${author.handle}`}>
            <Avatar src={author.avatar.src} alt={author.name} className="size-12 sm:size-24" />
          </Link>
          <div className="ms-3 flex max-w-lg flex-col gap-y-1 sm:ms-5">
            <p className="text-xs tracking-wider text-neutral-500 uppercase">WRITTEN BY</p>
            <Link className="text-lg font-semibold" href={`/author/${author.handle}`}>
              {author.name}
            </Link>
            <p className="text-sm/relaxed dark:text-neutral-300">
              {author.description}
              <Link className="ms-1 underline" href={`/author/${author.handle}`}>
                Read more
              </Link>
            </p>
            <SocialsList className="mt-2" />
          </div>
        </div>

        {/* COMMENT FORM */}
        <div id="comments" className="mx-auto max-w-(--breakpoint-md) scroll-mt-20 pt-5">
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Responses ({commentCount})</h3>
          <SingleCommentForm />
        </div>

        {/* COMMENTS LIST */}
        <div className="mx-auto max-w-(--breakpoint-md)">
          <ul className="single-comment-lists space-y-5">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
            <ButtonPrimary className="mt-10 w-full">View all {commentCount} comments</ButtonPrimary>
          </ul>
          <div ref={endedAnchorRef}></div>
        </div>
      </div>

      {/* LIKE AND COMMENT STICKY */}
      <div className={`sticky bottom-8 z-11 mt-8 justify-center ${showLikeAndCommentSticky ? 'flex' : 'hidden'}`}>
        <div className="flex items-center justify-center gap-x-2 rounded-full bg-white p-1.5 text-xs shadow-lg ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/20">
          <PostCardLikeBtn likeCount={likeCount} liked={liked} />
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
          <PostCardCommentBtn commentCount={commentCount} handle={handle} />
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>
          <ShareDropdown handle={handle} />
          <div className="h-4 border-s border-neutral-200 dark:border-neutral-700"></div>

          <button
            className={`size-8.5 items-center justify-center rounded-full bg-neutral-50 hover:bg-neutral-100 dark:bg-white/10 dark:hover:bg-white/20 ${
              isShowScrollToTop ? 'flex' : 'hidden'
            }`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            title="Go to top"
          >
            <HugeiconsIcon icon={ArrowUp02Icon} size={18} strokeWidth={1.75} />
          </button>

          <button
            ref={progressRef}
            className={`size-8.5 items-center justify-center ${isShowScrollToTop ? 'hidden' : 'flex'}`}
            title="Go to top"
          >
            %
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleContentContainer
