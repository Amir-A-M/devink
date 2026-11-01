import type { Metadata } from 'next'

import PageContent from './_components/PageContent'

export const metadata: Metadata = {
  title: 'About',
  description: 'Who runs the magazine, what we publish, and the people behind the bylines.',
  alternates: { canonical: '/about' },
}

export default PageContent
