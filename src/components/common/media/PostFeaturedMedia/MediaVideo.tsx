'use client'

import type { FC } from 'react'

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

import { Link } from '@/libs/design/link'

interface Props {
  videoUrl: string
  isHover: boolean
  handle: string
}

const MediaVideo: FC<Props> = ({ videoUrl, isHover, handle }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [showUnmuteHint, setShowUnmuteHint] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const playerRef = useRef<HTMLVideoElement | null>(null)

  if (isHover && !isMounted) {
    setIsMounted(true)
  }

  useEffect(() => {
    if (isHover) return

    const el = playerRef.current
    if (!el) return

    try {
      el.currentTime = 0
    } catch {
      // Some media providers reject seeks before loading.
    }
  }, [isHover])

  useEffect(() => {
    return () => {
      if (hintTimer.current) {
        clearTimeout(hintTimer.current)
      }
    }
  }, [])

  const handlePlaying = () => {
    setIsPlaying(true)
    if (hintTimer.current) {
      clearTimeout(hintTimer.current)
    }
    hintTimer.current = setTimeout(() => setShowUnmuteHint(false), 2500)
  }

  const isReady = isHover && isPlaying

  return (
    <div className={clsx('absolute inset-0', isHover ? 'opacity-100' : 'opacity-0')}>
      {isMounted ? (
        <ReactPlayer
          ref={playerRef}
          src={videoUrl}
          muted={isMuted}
          playsInline
          playing={isHover}
          style={{ opacity: isReady ? 1 : 0 }}
          className="absolute inset-0 bg-neutral-900 transition-opacity"
          width="100%"
          height="100%"
          onPlaying={handlePlaying}
          onWaiting={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
        />
      ) : null}

      <Link
        href={`/post/${handle}`}
        className={clsx('absolute inset-0', isReady ? 'opacity-0' : 'opacity-100')}
        aria-label="Open this article"
      />

      {isHover && !isReady ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-white/25"
        >
          <div className="h-full w-full animate-indeterminate origin-left bg-primary-500 motion-reduce:animate-none motion-reduce:opacity-60" />
        </div>
      ) : null}

      {isReady && (
        <MuteButton isMuted={isMuted} showUnmuteHint={showUnmuteHint} onToggle={() => setIsMuted((muted) => !muted)} />
      )}
    </div>
  )
}

export default MediaVideo

function MuteButton({
  isMuted,
  showUnmuteHint,
  onToggle,
}: {
  isMuted: boolean
  showUnmuteHint: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!isMuted}
      aria-label={isMuted ? 'Unmute preview' : 'Mute preview'}
      className={clsx(
        'absolute start-2 bottom-2 z-10 flex h-6 items-center justify-center rounded-full bg-black/70 text-sm text-white transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        showUnmuteHint ? 'ps-1.5 pe-2' : 'w-6 hover:scale-125'
      )}
    >
      {isMuted ? (
        <>
          <SpeakerXMarkIcon className="size-3.5" aria-hidden="true" />
          {showUnmuteHint ? <span className="ms-1 inline-block text-[9px]">Click here to unmute</span> : null}
        </>
      ) : (
        <SpeakerWaveIcon className="size-3.5" aria-hidden="true" />
      )}
    </button>
  )
}
