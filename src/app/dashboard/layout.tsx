import type { ReactNode } from 'react'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { requireUser } from '@/libs/data-layer/auth/server'

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await requireUser()

  return (
    <DashboardLayout
      user={{
        name: user.full_name,
        email: user.username,
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }}
    >
      {children}
    </DashboardLayout>
  )
}
