import { ImagePlus } from 'lucide-react'

import DemoForm from '@/components/common/general/DemoForm'
import ButtonPrimary from '@/libs/design/ButtonPrimary'
import { Field, Fieldset, Label } from '@/libs/design/fieldset'
import Input from '@/libs/design/Input'
import Select from '@/libs/design/Select'
import Textarea from '@/libs/design/Textarea'

const Page = () => {
  return (
    <DemoForm
      className="max-w-5xl rounded-xl md:border md:p-6"
      successMessage="Post submitted for review — in the demo. Connect this form to your CMS to publish for real."
      resetLabel="Write another post"
    >
      <Fieldset className="grid gap-6 md:grid-cols-2">
        <Field className="block md:col-span-2">
          <Label>Post Title *</Label>

          <Input type="text" name="title" required className="mt-1" />
        </Field>
        <Field className="block md:col-span-2">
          <Label>Post Excerpt</Label>

          <Textarea className="mt-1" rows={4} name="excerpt" />
          <p className="mt-1 text-sm text-neutral-500">Brief description for your article. URLs are hyperlinked.</p>
        </Field>
        <Field className="block">
          <Label>Category</Label>

          <Select className="mt-1" name="category">
            <option value="-1">– select –</option>
            <option value="ha'apai">Category 1</option>
            <option value="tongatapu">Category 2</option>
            <option value="vava'u">Category 3</option>
          </Select>
        </Field>
        <Field className="block">
          <Label>Tags</Label>

          <Input type="text" name="tags" className="mt-1" />
        </Field>

        <div className="block md:col-span-2">
          <p className="text-sm/6 font-medium text-neutral-950 dark:text-white">Featured Image</p>

          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pt-5 pb-6 dark:border-neutral-700">
            <div className="space-y-1 text-center">
              <ImagePlus className="mx-auto size-12 text-neutral-400" aria-hidden="true" />
              <div className="flex flex-col text-sm text-neutral-600 sm:flex-row">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-600 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-primary-800"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="ps-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
            </div>
          </div>
        </div>
        <Field className="block md:col-span-2">
          <Label>Post Content</Label>

          <Textarea className="mt-1" rows={16} name="content" required />
        </Field>

        <div className="md:col-span-2">
          <ButtonPrimary type="submit">Submit post</ButtonPrimary>
        </div>
      </Fieldset>
    </DemoForm>
  )
}

export default Page
