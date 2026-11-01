import { useState } from 'react'

import type { PlayerAPI } from '@/libs/providers/AudioProvider'

const playbackRates = [{ value: 1 }, { value: 1.5 }, { value: 2 }]

export function PlaybackRateButton({ player }: { player: PlayerAPI }) {
  const [playbackRate, setPlaybackRate] = useState(playbackRates[0])

  return (
    <button
      type="button"
      className="relative flex size-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:ring-2 focus:ring-slate-500 focus-visible:outline-hidden dark:hover:bg-neutral-800 dark:hover:text-slate-400"
      onClick={() => {
        setPlaybackRate((rate) => {
          const existingIdx = playbackRates.indexOf(rate)
          const idx = (existingIdx + 1) % playbackRates.length
          const next = playbackRates[idx]

          player.playbackRate(next.value)

          return next
        })
      }}
      aria-label={`Playback rate: ${playbackRate.value} times`}
    >
      <div className="absolute -inset-1 md:hidden" />
      <span aria-hidden="true" className="text-xs font-semibold">
        {playbackRate.value}×
      </span>
    </button>
  )
}
