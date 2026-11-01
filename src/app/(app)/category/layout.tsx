import type { ReactNode } from 'react'

import BackgroundSection from '@/components/common/general/BackgroundSection'
import SectionSliderNewAuthors from '@/components/common/sections/SectionSliderNewAuthors'
import SectionSubscribe2 from '@/components/common/sections/SectionSubscribe2'
import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { getAuthors } from '@/libs/data-layer/authors'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const authors = await getAuthors()

  return (
    <ApplicationLayout>
      {children}

      <div className="container space-y-20 py-20 lg:space-y-28 lg:py-28">
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Top elite authors"
            subHeading="Discover our elite writers"
            authors={authors.slice(0, 10)}
          />
        </div>
        <SectionSubscribe2 />
      </div>
    </ApplicationLayout>
  )
}

export default Layout
