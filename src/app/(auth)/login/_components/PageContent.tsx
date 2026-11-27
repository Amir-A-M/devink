import type { JSX } from 'react'

import { Facebook01Icon, GithubIcon, NewTwitterIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'

import LoginForm from '@/components/auth/LoginForm'
import Logo from '@/components/common/site/Logo'

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
      <h1 className="sr-only">Log in to Devink</h1>
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
              <p className="grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">{item.name}</p>
            </Link>
          ))}
        </div>
        <div className="relative text-center">
          <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
            OR
          </span>
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
        </div>

        <LoginForm />

        <div className="block text-center text-sm text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <Link href="/signup" className="font-medium underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
