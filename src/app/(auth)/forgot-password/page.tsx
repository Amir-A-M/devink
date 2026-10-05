import ButtonPrimary from '@/shared/ButtonPrimary'
import DemoForm from '@/shared/DemoForm'
import { Field, Label } from '@/shared/fieldset'
import Input from '@/shared/Input'
import Logo from '@/shared/Logo'
import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password',
}

const Page = () => {
  return (
    <div className="container">
      <h1 className="sr-only">Reset your Ncmaz password</h1>
      <div className="my-16 flex justify-center">
        <Logo />
      </div>

      <div className="mx-auto max-w-md space-y-6">
        {/* FORM */}
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

        {/* ==== */}
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
