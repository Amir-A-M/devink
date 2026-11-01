'use client'

import type { ImageLoaderProps } from 'next/image'

const SOURCE_CDNS: Record<string, string> = {
  'images.unsplash.com': 'format', // imgix: auto=format
  'images.pexels.com': 'compress', // pexels: auto=compress
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith('http')) {
    return src
  }

  const q = quality || 75
  const url = new URL(src)
  const auto = SOURCE_CDNS[url.hostname]

  if (!auto) {
    return src
  }

  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(q))
  url.searchParams.set('auto', auto)

  url.searchParams.delete('h')
  url.searchParams.delete('dpr')

  return url.toString()
}
