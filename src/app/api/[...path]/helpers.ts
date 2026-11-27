import type { NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { COOKIE_OPTIONS, TOKEN_COOKIE } from '@/libs/data-layer/auth/server'
import { tryCatch } from '@/libs/utils/try-catch'

const SET_TOKEN_PATHS = ['accounts/auth/login', 'accounts/auth/register']
export const CLEAR_TOKEN_PATHS = ['accounts/auth/logout']
const EMPTY_BODY_STATUSES = [204, 205, 304]

export const isValidPath = (path: string[]) => !path.some((segment) => segment === '..' || segment === '.')

export async function buildUpstreamHeaders(req: NextRequest) {
  const headers = new Headers({ Accept: 'application/json' })
  const contentType = req.headers.get('content-type')
  const token = (await cookies()).get(TOKEN_COOKIE)?.value

  if (contentType) headers.set('Content-Type', contentType)
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return headers
}

export async function readRequestBody(req: NextRequest) {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined
  const buf = await req.arrayBuffer()
  return buf.byteLength > 0 ? buf : undefined
}

export async function buildResponse(upstream: Response, path: string) {
  if (EMPTY_BODY_STATUSES.includes(upstream.status)) {
    return new NextResponse(null, { status: upstream.status })
  }

  const contentType = upstream.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return new NextResponse(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: contentType ? { 'Content-Type': contentType } : undefined,
    })
  }

  const { data: json, error } = await tryCatch(upstream.json())
  if (error) {
    return NextResponse.json({ message: 'Invalid JSON from upstream' }, { status: 502 })
  }

  if (SET_TOKEN_PATHS.includes(path) && upstream.ok && json?.token) {
    const { token, ...rest } = json
    const res = NextResponse.json(rest, { status: upstream.status })
    res.cookies.set(TOKEN_COOKIE, token, COOKIE_OPTIONS)
    return res
  }

  return NextResponse.json(json, { status: upstream.status })
}
