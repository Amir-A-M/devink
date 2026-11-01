'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const routeKey = (pathname: string, search: string) => `${pathname}?${new URLSearchParams(search)}`

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

function navigationTarget(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return null
  if (isModifiedClick(event)) return null

  const anchor = (event.target as Element | null)?.closest?.('a')
  if (!anchor) return null

  const href = anchor.getAttribute('href')
  if (!href || anchor.hasAttribute('download') || anchor.target === '_blank') return null

  const url = new URL(anchor.href, location.href)
  if (url.origin !== location.origin) return null
  if (url.pathname === location.pathname && url.search === location.search) return null

  return url
}

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = `${pathname}?${searchParams}`

  const [leavingFrom, setLeavingFrom] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [finishing, setFinishing] = useState(false)

  const navId = useRef(0)
  const firstTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const secondTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const thirdTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  if (leavingFrom !== null && leavingFrom !== route) {
    setLeavingFrom(null)
    setProgress(100)
    setFinishing(true)
  }

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!navigationTarget(event)) return

      const id = ++navId.current
      clearTimeout(firstTimer.current)
      clearTimeout(secondTimer.current)
      clearTimeout(thirdTimer.current)

      setLeavingFrom(routeKey(location.pathname, location.search))
      setFinishing(false)
      setProgress(8)

      firstTimer.current = setTimeout(() => {
        if (navId.current === id) setProgress(45)
      }, 90)
      secondTimer.current = setTimeout(() => {
        if (navId.current === id) setProgress(72)
      }, 320)
      thirdTimer.current = setTimeout(() => {
        if (navId.current === id) setProgress(88)
      }, 900)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      clearTimeout(firstTimer.current)
      clearTimeout(secondTimer.current)
      clearTimeout(thirdTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!finishing) return

    clearTimeout(firstTimer.current)
    clearTimeout(secondTimer.current)
    clearTimeout(thirdTimer.current)

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
