import rightImg from '@/images/SVG-subcribe2.webp'
import { Badge } from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import DemoForm from '@/shared/DemoForm'
import Input from '@/shared/Input'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

interface Props {
  className?: string
}

const SectionSubscribe2: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('section-subscribe-2 relative flex flex-col items-center lg:flex-row', className)}>
      <div className="mb-14 shrink-0 lg:me-10 lg:mb-0 lg:w-2/5">
        <h2 className="text-4xl font-semibold">Join our newsletter 🎉</h2>
        <span className="mt-6 block text-neutral-500 dark:text-neutral-400">
          Read and share new perspectives on just about any topic. Everyone&apos;s welcome.
        </span>
        <ul className="mt-10 space-y-5">
          <li className="flex items-center gap-x-4">
            <Badge color="blue">01</Badge>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Get more discount</span>
          </li>
          <li className="flex items-center gap-x-4">
            <Badge color="red">02</Badge>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Get premium magazines</span>
          </li>
        </ul>
        <DemoForm
          className="relative mt-10 max-w-sm"
          successMessage="You are on the list. This demo stores nothing — connect your mailing provider to make it stick."
          resetLabel="Use a different address"
        >
          <Input
            required
            placeholder="Enter your email"
            type="email"
            name="email"
            autoComplete="email"
            aria-label="Email address"
          />
          <div className="absolute end-1 top-1/2 -translate-y-1/2">
            <ButtonCircle color="dark/white" type="submit" aria-label="Subscribe">
              <ArrowRightIcon className="size-5 rtl:rotate-180" aria-hidden="true" />
            </ButtonCircle>
          </div>
        </DemoForm>
      </div>
      <div className="grow">
        <Image alt="" sizes="(max-width: 768px) 100vw, 50vw" src={rightImg} />
      </div>
    </div>
  )
}

export default SectionSubscribe2
