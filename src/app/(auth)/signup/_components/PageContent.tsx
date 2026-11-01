import type { JSX } from 'react'

import { Facebook01Icon, GithubIcon, NewTwitterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import DemoForm from '@/components/common/general/DemoForm'
import Logo from '@/components/common/site/Logo'
import ButtonPrimary from '@/libs/design/ButtonPrimary'
import { Field, Label } from '@/libs/design/fieldset'
import Input from '@/libs/design/Input'

const socials: {
  name: string
  href: string
  icon: (props: { className?: string }) => JSX.Element
}[] = [
  {
    name: 'Continue with Facebook',
    href: '#',
    icon: (props) => <HugeiconsIcon icon={Facebook01Icon} {...props} />,
  },
  {
    name: 'Continue with X',
    href: '#',
    icon: (props) => <HugeiconsIcon icon={NewTwitterIcon} {...props} />,
  },
  {
    name: 'Continue with GitHub',
    href: '#',
    icon: (props) => <HugeiconsIcon icon={GithubIcon} {...props} />,
  },
]

const Page = () => {
  return (
    <div className="container">
      <h1 className="sr-only">Create your Devink account</h1>
      <div className="my-16 flex justify-center">
        <Logo />
      </div>

      <div className="mx-auto max-w-md space-y-6">
        <div className="grid gap-3">
          {socials.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex w-full rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-0.5 dark:bg-neutral-800"
            >
              <item.icon className="size-5 shrink-0" />
              <h3 className="grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="relative text-center">
          <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
            OR
          </span>
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
        </div>
        <DemoForm
          className="grid grid-cols-1 gap-6"
          successMessage="Account created — in the demo. Point this form at your auth provider to make it real."
          resetLabel="Back to the form"
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
          <Field className="block">
            <Label className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">Password</Label>
            <Input type="password" name="password" autoComplete="new-password" required className="mt-1" />
          </Field>
          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </DemoForm>

        <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
          <Link href="/login" className="font-medium underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
