import Link from 'next/link'

import DemoForm from '@/components/common/general/DemoForm'
import Logo from '@/components/common/site/Logo'
import ButtonPrimary from '@/libs/design/ButtonPrimary'
import { Field, Label } from '@/libs/design/fieldset'
import Input from '@/libs/design/Input'

const Page = () => {
  return (
    <div className="container">
      <h1 className="sr-only">Reset your Devink password</h1>
      <div className="my-16 flex justify-center">
        <Logo />
      </div>

      <div className="mx-auto max-w-md space-y-6">
        <DemoForm
          className="grid grid-cols-1 gap-6"
          successMessage="If that address has an account, a reset link is on its way. This demo sends nothing."
          resetLabel="Try another address"
        >
          <Field className="block">
            <Label className="text-neutral-800 dark:text-neutral-200">Email address</Label>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="example@example.com"
              className="mt-1"
            />
          </Field>
          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </DemoForm>

        <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <Link href="/signup" className="font-medium underline">
            Create an account
          </Link>
          {`  or  `}
          <Link href="/login" className="font-medium underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
