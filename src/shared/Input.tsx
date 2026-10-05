import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string
  fontClass?: string
  rounded?: string
}

// Rendered through Headless.Input so that a surrounding <Field> can hand it the
// id its <Label> points at. A bare <input> here leaves every label's `for`
// dangling, and clicking the label focuses nothing.
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'sm:text-sm font-normal',
      rounded = 'rounded-full',
      type = 'text',
      ...args
    },
    ref
  ) => {
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
)

Input.displayName = 'Input'

export default Input
