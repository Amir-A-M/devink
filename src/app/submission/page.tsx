import type { Metadata } from 'next'

import PageContent from './_components/PageContent'

import '@/styles/_tiptap-keyframe-animations.scss'
import '@/styles/_tiptap-variables.scss'

export const metadata: Metadata = {
  title: 'Submit an article',
  description: 'Pitch a story, write it in the editor, and send it to our desk for review.',
  alternates: { canonical: '/submission' },
}

export default PageContent
