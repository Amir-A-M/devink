import { ApplicationLayout } from '@/app/(app)/application-layout'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <ApplicationLayout headerStyle="header-1" showBanner={true}>
      {children}
    </ApplicationLayout>
  )
}

export default Layout
