import clsx from 'clsx'
import { Play } from 'lucide-react'
import Image from 'next/image'

import type { TPost } from '@/libs/data-layer/posts'

import playingIcon from '@/assets/icon-playing.gif'
import ButtonPlayMusicPlayer from '@/components/common/media/ButtonPlayMusicPlayer'

const AudioPlayerButton = ({ post }: { post: TPost }) => {
  const { featuredImage, title } = post

  const renderIcon = (playing: boolean) => {
    if (playing) {
      return <Image className="w-7" src={playingIcon} alt="" sizes="30px" />
    }

    return <Play className="ms-0.5 size-11 rtl:rotate-180" fill="currentColor" aria-hidden="true" />
  }

  const renderButtonPlay = (playing: boolean) => {
    return (
      <div className="group relative size-full cursor-pointer">
        <Image
          className={clsx(
            'nc-animation-spin rounded-full object-cover shadow-2xl brightness-50 transition-transform',
            playing && 'playing'
          )}
          src={featuredImage}
          sizes="300px"
          alt={title}
          fill
          preload
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-20 items-center justify-center rounded-full border-2 border-white bg-black/50 text-white bg-blend-multiply transition-transform duration-300 group-hover:scale-110">
            {renderIcon(playing)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <ButtonPlayMusicPlayer
      className="size-full"
      customPlaying={renderButtonPlay(true)}
      customPaused={renderButtonPlay(false)}
      post={post}
    />
  )
}

export default AudioPlayerButton
