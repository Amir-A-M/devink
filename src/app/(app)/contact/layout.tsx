import { ApplicationLayout } from '@/app/(app)/application-layout'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <ApplicationLayout headerHasBorder>{children}</ApplicationLayout>
}

export default Layout
