'use client'

import type { ImageLoaderProps } from 'next/image'

// Unsplash (imgix) and Pexels are already full image CDNs: they resize and
// convert format from query params. Point the browser straight at them rather
// than paying the host to fetch a 3800px original and optimise it again.
const SOURCE_CDNS: Record<string, string> = {
  'images.unsplash.com': 'format', // imgix: auto=format
  'images.pexels.com': 'compress', // pexels: auto=compress
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  // Local images: return the path untouched. Do NOT route through /_next/image
  // — `loader: 'custom'` disables that endpoint, so a request to it 404s.
  // The files under src/images are pre-converted to WebP to compensate.
  if (!src.startsWith('http')) {
    return src
  }

  const q = quality || 75
  const url = new URL(src)
  const auto = SOURCE_CDNS[url.hostname]

  // Unknown host: hand back the URL as-is and let the browser fetch it direct.
  if (!auto) {
    return src
  }

  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(q))
  url.searchParams.set('auto', auto)

  // `w` has to decide the size on its own. An `h` or `dpr` left over from the
  // source URL overrides it: a `w=128` candidate carrying `h=750&dpr=2` comes
  // back as a distorted 128x750 box, and the `w=2048` fallback as a real
  // 4096px file.
  url.searchParams.delete('h')
  url.searchParams.delete('dpr')

  return url.toString()
}
