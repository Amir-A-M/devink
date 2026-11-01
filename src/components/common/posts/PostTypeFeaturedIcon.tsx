import type { FC } from 'react'

import clsx from 'clsx'
import { Images, Music2, Play } from 'lucide-react'

import type { TPost } from '@/libs/data-layer/posts'

interface Props {
  className?: string
  postType?: TPost['postType']
  wrapSize?: string
  iconSize?: string
  onClick?: () => void
}

const PostTypeFeaturedIcon: FC<Props> = ({
  className,
  postType = 'standard',
  onClick,
  wrapSize = 'size-11',
  iconSize = 'size-6',
}) => {
  const renderMediaIcon = () => {
    if (postType === 'video') {
      return <Play className={iconSize} aria-hidden="true" />
    }

    if (postType === 'audio') {
      return <Music2 className={iconSize} aria-hidden="true" />
    }

    if (postType === 'gallery') {
      return <Images className={iconSize} aria-hidden="true" />
    }

    return null
  }

  return (
    <div className={clsx(className)}>
      {!!postType && postType !== 'standard' ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Play ${postType}`}
          className={clsx(
            'flex items-center justify-center rounded-full border border-white bg-neutral-900/60 text-xl text-white rtl:rotate-180',
            wrapSize
          )}
        >
          {renderMediaIcon()}
        </button>
      ) : null}
    </div>
  )
}

export default PostTypeFeaturedIcon
