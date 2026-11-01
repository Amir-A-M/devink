import type { ReactNode } from 'react'

import { ApplicationLayout } from '@/components/layout/ApplicationLayout'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ApplicationLayout headerStyle="header-1" headerHasBorder>
      {children}
    </ApplicationLayout>
  )
}
export default Layout
