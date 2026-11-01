import { Volume2, VolumeX } from 'lucide-react'

import type { PlayerAPI } from '@/libs/providers/AudioProvider'

export function MuteButton({ player }: { player: PlayerAPI }) {
  return (
    <button
      type="button"
      className="group relative flex items-center justify-center rounded-md hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:outline-none focus-visible:outline-hidden md:order-none dark:hover:bg-neutral-800"
      onClick={() => player.toggleMute()}
      aria-label={player.muted ? 'Unmute' : 'Mute'}
    >
      <div className="absolute -inset-1 md:hidden" />
      {player.muted ? (
        <VolumeX className="size-6 text-neutral-500" aria-hidden="true" />
      ) : (
        <Volume2 className="size-6 text-neutral-500" aria-hidden="true" />
      )}
    </button>
  )
}
