import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import '@/styles/_tiptap-keyframe-animations.scss'
import '@/styles/_tiptap-variables.scss'

const Page = () => {
  return (
    <>
      <h1 className="sr-only">Submit an article to Devink</h1>
      <SimpleEditor />
    </>
  )
}

export default Page
