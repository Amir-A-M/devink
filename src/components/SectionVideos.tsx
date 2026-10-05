'use client'

import { useIsHydrated } from '@/hooks/use-is-hydrated'
import HeadingWithSub from '@/shared/Heading'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC, useState } from 'react'
import ReactPlayer from 'react-player'
import NcPlayIcon2 from './NcPlayIcon2'

interface VideoType {
  id: string
  title?: string
  thumbnail: string
  video: string
}

interface SectionVideosProps {
  videos?: VideoType[]
  className?: string
  heading?: string
  subHeading?: string
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: 'x_x-JAAKSvU',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',
    video: 'https://www.youtube.com/watch?v=7Rz3m0QtFMs',
  },
  {
    id: 'zXiVw1jZybA',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    video: ' https://www.youtube.com/watch?v=vHBodN0Mirs',
  },
  {
    id: 'ZlJU3ZuOrf8',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.unsplash.com/photo-1551946581-f7a62cd2f00b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=330&q=80',
    video: 'https://www.youtube.com/watch?v=ZlJU3ZuOrf8',
  },
  {
    id: 'stnSRel03e8',
    title: 'Magical Scotland - 4K Scenic Relaxation Film with Calming Music',
    thumbnail:
      'https://images.unsplash.com/photo-1487875961445-47a00398c267?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
    video: 'https://www.youtube.com/watch?v=stnSRel03e8',
  },
]

// The player mounts on load, so YouTube is contacted before anyone presses play
// — three requests and third-party cookies on every visit. `light={thumbnail}`
// would defer all of it to the first click, at the cost of showing the fixture's
// own poster instead of YouTube's. Measured and kept as-is.
const SectionVideos: FC<SectionVideosProps> = ({ videos = VIDEOS_DEMO, className, heading, subHeading }) => {
  const [isPlay, setIsPlay] = useState(false)
  const [currentVideo, setCurrentVideo] = useState('')
  const renderedVideo = useIsHydrated()

  const renderMainVideo = () => {
    const video = videos.find((video) => video.id === currentVideo) || videos[0]

    return (
      <div
        className="group aspect-w-16 z-0 overflow-hidden rounded-3xl border-4 border-white bg-neutral-800 aspect-h-16 sm:rounded-[3rem] sm:border-10 sm:aspect-h-9 dark:border-neutral-900"
        title={video.title}
      >
        {/* Rendered on the server so the section arrives at its real size with a
            picture in it. Gating the whole block on hydration left a hole the
            height of the section that filled in a frame later. */}
        <Image
          src={video.thumbnail}
          alt={video.title || 'Video thumbnail'}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {renderedVideo ? (
          <ReactPlayer
            src={video.video}
            playing={isPlay}
            onPlay={() => {
              setIsPlay(true)
              setCurrentVideo(video.id)
            }}
            onPause={() => setIsPlay(false)}
            onStart={() => setIsPlay(true)}
            onEnded={() => {
              setIsPlay(false)
            }}
            controls
            width="100%"
            height="100%"
          />
        ) : null}
      </div>
    )
  }

  const renderSubVideo = (video: VideoType) => {
    return (
      <div
        className="group aspect-w-16 relative z-0 cursor-pointer overflow-hidden rounded-2xl aspect-h-16 sm:rounded-3xl sm:aspect-h-12 lg:aspect-h-9"
        onClick={() => {
          if (isPlay && currentVideo === video.id) {
            setIsPlay(false)
          } else {
            setIsPlay(true)
            setCurrentVideo(video.id)
          }
        }}
        title={video.title}
        key={video.id}
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <NcPlayIcon2 playing={isPlay && currentVideo === video.id} />
        </div>
        <Image
          sizes="(max-width: 600px) 25vw, 25vw"
          className="object-cover brightness-100 transition-[filter] duration-300 group-hover:brightness-75"
          src={video.thumbnail}
          fill
          title={video.title || ''}
          alt={video.title || 'Video thumbnail'}
        />
      </div>
    )
  }

  return (
    <div className={clsx('section-videos relative', className)}>
      {heading && <HeadingWithSub subHeading={subHeading}>{heading}</HeadingWithSub>}

      <div className="relative flex flex-col sm:py-4 sm:pr-4 md:py-6 md:pr-6 lg:flex-row xl:py-14 xl:pr-14">
        <div className="absolute -top-4 -right-4 -bottom-4 z-0 w-2/3 rounded-3xl bg-primary-100/40 sm:rounded-[50px] md:top-0 md:right-0 md:bottom-0 xl:w-1/2 dark:bg-neutral-800/40"></div>
        <div className="relative grow pb-2 sm:pb-4 lg:pr-5 lg:pb-0 xl:pr-6">{renderMainVideo()}</div>
        <div className="grid shrink-0 grid-cols-4 gap-2 sm:gap-6 lg:w-36 lg:grid-cols-1 xl:w-40">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  )
}

export default SectionVideos
