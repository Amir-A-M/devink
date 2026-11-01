import type { ReactNode } from 'react'

import BackgroundSection from '@/components/common/general/BackgroundSection'
import SectionGridCategoryBox from '@/components/common/sections/SectionGridCategoryBox'
import SectionSliderNewAuthors from '@/components/common/sections/SectionSliderNewAuthors'
import SectionSubscribe2 from '@/components/common/sections/SectionSubscribe2'
import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { getAuthors } from '@/libs/data-layer/authors'
import { getCategories } from '@/libs/data-layer/categories'
import ButtonPrimary from '@/libs/design/ButtonPrimary'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const categories = await getCategories()
  const authors = await getAuthors()
  return (
    <ApplicationLayout>
      {children}

      <div className="container space-y-16 py-16 lg:space-y-28 lg:pt-20 lg:pb-28">
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SectionGridCategoryBox categories={categories.slice(0, 10)} />
          <div className="mx-auto mt-10 text-center md:mt-16">
            <ButtonPrimary href="/search">Show me more</ButtonPrimary>
          </div>
        </div>

        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={authors.slice(0, 10)}
        />

        <SectionSubscribe2 />
      </div>
    </ApplicationLayout>
  )
}

export default Layout
