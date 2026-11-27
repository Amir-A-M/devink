import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

import { TOKEN_COOKIE } from '@/libs/data-layer/auth/server'
import { tryCatch } from '@/libs/utils/try-catch' // adjust path

import { buildResponse, buildUpstreamHeaders, CLEAR_TOKEN_PATHS, isValidPath, readRequestBody } from './helpers'

const API_URL = process.env.API_URL!

interface Context {
  params: Promise<{ path: string[] }>
}

async function handler(req: NextRequest, { params }: Context) {
  const { path } = await params
  if (!isValidPath(path)) {
    return NextResponse.json({ message: 'Invalid path' }, { status: 400 })
  }

  const joined = path.join('/')
  const { data: upstream, error } = await tryCatch(
    fetch(`${API_URL}/${joined}${req.nextUrl.search}`, {
      method: req.method,
      headers: await buildUpstreamHeaders(req),
      body: await readRequestBody(req),
      cache: 'no-store',
    })
  )

  if (error) {
    return NextResponse.json({ message: 'Upstream request failed' }, { status: 502 })
  }

  const res = await buildResponse(upstream, joined)
  if (CLEAR_TOKEN_PATHS.includes(joined) || upstream.status === 401) {
    res.cookies.delete(TOKEN_COOKIE)
  }
  return res
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT }
