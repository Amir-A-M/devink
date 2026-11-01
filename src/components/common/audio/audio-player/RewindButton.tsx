import { RotateCcw } from 'lucide-react'

import type { PlayerAPI } from '@/libs/providers/AudioProvider'

export function RewindButton({ player, amount = 10 }: { player: PlayerAPI; amount?: number }) {
  return (
    <button
      type="button"
      className="group relative rounded-full focus:outline-none"
      onClick={() => player.seekBy(-amount)}
      aria-label={`Rewind ${amount} seconds`}
    >
      <div className="absolute -inset-4 -right-2 md:hidden" />
      <RotateCcw
        aria-hidden="true"
        className="h-6 w-6 stroke-slate-500 group-hover:stroke-slate-700 dark:stroke-slate-400 dark:group-hover:stroke-slate-300"
      />
    </button>
  )
}
