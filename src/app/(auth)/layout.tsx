import type { FC } from 'react'

import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default Layout
