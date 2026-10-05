'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const routeKey = (pathname: string, search: string) => `${pathname}?${new URLSearchParams(search)}`

/**
 * A slim bar across the top of the viewport while a route transition is in
 * flight.
 *
 * Next's `loading.tsx` convention cannot do this job here: one placed above the
 * chrome replaces the header and footer along with the page, and one at the root
 * does not render at all for client-side navigation between sibling routes.
 * Without either, clicking a link produces no feedback until the new page swaps
 * in — which reads as the page freezing and then jumping.
 *
 * One delegated listener rather than `useLinkStatus` per link: half the links in
 * the template come from `next/link` directly and half from the shared wrapper,
 * so a per-link hook would cover only some of them.
 */
export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = `${pathname}?${searchParams}`

  // The route we were on when the link was clicked; null means nothing is in
  // flight. Comparing it against the current route during render is what ends
  // the bar, so a navigation costs no extra commit.
  const [leavingFrom, setLeavingFrom] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [finishing, setFinishing] = useState(false)

  // Bumped per navigation so that creep timers left over from an abandoned one
  // cannot move the bar for the navigation that replaced it.
  const navId = useRef(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  if (leavingFrom !== null && leavingFrom !== route) {
    setLeavingFrom(null)
    setProgress(100)
    setFinishing(true)
  }

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let the browser have anything that is not a plain left-click.
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || anchor.hasAttribute('download') || anchor.target === '_blank') return

      const url = new URL(anchor.href, location.href)
      // Another origin, or the same page: no route transition follows.
      if (url.origin !== location.origin) return
      if (url.pathname === location.pathname && url.search === location.search) return

      const id = ++navId.current
      timers.current.forEach(clearTimeout)
      timers.current = []

      setLeavingFrom(routeKey(location.pathname, location.search))
      setFinishing(false)
      setProgress(8)

      // Creep toward, but never reach, the end: the real duration is unknown.
      const creep = (to: number, after: number) =>
        timers.current.push(
          setTimeout(() => {
            if (navId.current === id) setProgress(to)
          }, after)
        )
      creep(45, 90)
      creep(72, 320)
      creep(88, 900)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  // Retire the bar once it has filled. A timer rather than `transitionend`:
  // under prefers-reduced-motion there is no transition to end, and the bar
  // would stay mounted at zero opacity forever.
  useEffect(() => {
    if (!finishing) return

    // Kill the creep timers first: the route has landed, and one firing now
    // would walk the width backwards while the bar fades.
    timers.current.forEach(clearTimeout)
    timers.current = []

    const id = setTimeout(() => {
      setFinishing(false)
      setProgress(0)
    }, 280)

    return () => clearTimeout(id)
  }, [finishing])

  if (leavingFrom === null && !finishing) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-primary-600 transition-[width,opacity] duration-200 ease-out motion-reduce:transition-none dark:bg-primary-500"
        style={{ width: `${progress}%`, opacity: finishing ? 0 : 1 }}
      />
    </div>
  )
}
