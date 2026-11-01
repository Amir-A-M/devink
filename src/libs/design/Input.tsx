import type { InputHTMLAttributes } from 'react'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string
  fontClass?: string
  rounded?: string
}

const Input = ({
  ref,
  className,
  sizeClass = 'h-11 px-4 py-3',
  fontClass = 'sm:text-sm font-normal',
  rounded = 'rounded-full',
  type = 'text',
  ...args
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  return (
    <Headless.Input
      ref={ref}
      type={type}
      data-slot="control"
      className={clsx(
        'block w-full border-neutral-200 bg-white focus:border-primary-300 focus:ring-3 focus:ring-primary-200/50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-600/25',
        rounded,
        fontClass,
        sizeClass,
        className
      )}
      {...args}
    />
  )
}

Input.displayName = 'Input'

export default Input
