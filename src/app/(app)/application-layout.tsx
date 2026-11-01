import type { ReactNode } from 'react'

import React from 'react'

import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Header2 from '@/components/Header/Header2'
import Banner from '@/shared/banner'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
  headerStyle?: 'header-1' | 'header-2'
  showBanner?: boolean
}

const ApplicationLayout: React.FC<Props> = ({
  children,
  headerHasBorder,
  headerStyle = 'header-1',
  showBanner = false,
}) => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-neutral-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-neutral-900"
      >
        Skip to content
      </a>

      {showBanner && <Banner />}
      {headerStyle === 'header-2' && <Header2 bottomBorder={headerHasBorder} />}
      {headerStyle === 'header-1' && <Header bottomBorder={headerHasBorder} />}

      <main id="main-content">{children}</main>

      <Footer />
      <AsideSidebarNavigation />
    </>
  )
}

export { ApplicationLayout }
