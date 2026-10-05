import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import '@/styles/_tiptap-keyframe-animations.scss'
import '@/styles/_tiptap-variables.scss'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit an article',
  description: 'Pitch a story, write it in the editor, and send it to our desk for review.',
  alternates: { canonical: '/submission' },
}

const Page = () => {
  return (
    <>
      <h1 className="sr-only">Submit an article to Ncmaz</h1>
      <SimpleEditor />
    </>
  )
}

export default Page
