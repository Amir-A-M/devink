import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { type TextareaHTMLAttributes } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// See Input.tsx: Headless.Textarea picks up the id that a surrounding <Field>
// generates, so the <Label> beside it actually points at this element.
const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(({ className, children, ...args }, ref) => {
  return (
    <Headless.Textarea
      ref={ref}
      data-slot="control"
      className={clsx(
        'block w-full rounded-2xl border-neutral-200 bg-white focus:border-primary-300 focus:ring-3 focus:ring-primary-200/50 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-600/25',
        className
      )}
      rows={4}
      {...args}
    >
      {children}
    </Headless.Textarea>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
