import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import 'server-only'

import { serverApi } from '@/libs/api/server'
import { tryCatch } from '@/libs/utils/try-catch'

import type { ProfileResponse } from './types'

export const TOKEN_COOKIE = 'token'
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
} as const

export const getUser = cache(async () => {
  const { data, error } = await tryCatch(
    serverApi.get('/accounts/profile/private', { cache: 'no-store' }).json<ProfileResponse>()
  )

  if (error instanceof HTTPError && error.response.status === 401) {
    return { data: null, error: null }
  }

  return { data, error }
})

export async function requireUser() {
  const { data: user, error } = await getUser()

  if (error) throw error
  if (!user) redirect('/login')

  return user
}
