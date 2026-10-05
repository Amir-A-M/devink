import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False while the server renders and during the first client render, true after
 * hydration. Use it to gate a subtree that cannot be server-rendered — a media
 * player, anything reading `window` — instead of flipping a state flag from an
 * effect, which costs an extra render pass.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
