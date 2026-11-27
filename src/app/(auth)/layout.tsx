import type { FC } from 'react'

import { redirect } from 'next/navigation'

import { getUser } from '@/libs/data-layer/auth/server'

interface Props {
  children?: React.ReactNode
}

const Layout: FC<Props> = async ({ children }) => {
  const { data: user, error } = await getUser()

  if (user) redirect('/dashboard')
  if (error) throw error

  return children
}

export default Layout
