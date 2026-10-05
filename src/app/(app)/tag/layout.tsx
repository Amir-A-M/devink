import { ApplicationLayout } from '@/app/(app)/application-layout'
import BackgroundSection from '@/components/BackgroundSection'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { getAuthors } from '@/data/authors'
import { type ReactNode } from 'react'

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

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </ApplicationLayout>
  )
}

export default Layout
