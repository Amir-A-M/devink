'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useSWR from 'swr'

import { getProfile, logout } from '@/libs/data-layer/auth/client'
import { swrKeys } from '@/libs/data-layer/cacheKeys'
import { tryCatch } from '@/libs/utils/try-catch'

export function useAuth() {
  const router = useRouter()
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR(swrKeys.user, getProfile, {
    shouldRetryOnError: false,
  })

  const signOut = async () => {
    const { error } = await tryCatch(logout())

    if (error) {
      toast.error('Failed to sign out. Please try again.')
      return
    }
    await mutate(undefined, { revalidate: false })
    toast.success('Logged out successfully', {
      description: 'Redirecting you to login page...',
    })
    router.replace('/login')
    router.refresh()
  }

  return { user, isLoading, isAuthenticated: !!user, signOut }
}
