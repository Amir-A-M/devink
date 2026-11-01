import type { ReactNode } from 'react'

import { ApplicationLayout } from '@/app/(app)/application-layout'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <ApplicationLayout headerHasBorder>{children}</ApplicationLayout>
}

export default Layout
