import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

const Select = ({
  ref,
  className,
  multiple,
  ...props
}: Omit<Headless.SelectProps, 'as' | 'className'> & { className?: string } & {
  ref?: React.ForwardedRef<HTMLSelectElement>
}) => {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        'group relative block w-full',
        'dark:before:hidden',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset has-data-focus:after:ring-2 has-data-focus:after:ring-blue-500',
        'has-data-disabled:opacity-50 has-data-disabled:before:bg-neutral-950/5 has-data-disabled:before:shadow-none',
      ])}
    >
      <Headless.Select
        ref={ref}
        multiple={multiple}
        {...props}
        className={clsx([
          'relative block w-full appearance-none rounded-full px-3.5 py-2',
          multiple
            ? 'px-[calc(--spacing(3.5)-1px)] sm:px-[calc(--spacing(3)-1px)]'
            : 'pr-[calc(--spacing(10)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(9)-1px)] sm:pl-[calc(--spacing(3)-1px)]',
          '[&_optgroup]:font-semibold',
          'text-base/6 text-neutral-950 placeholder:text-neutral-500 sm:text-sm/6 dark:text-white dark:*:text-white',
          'border border-neutral-300 data-hover:border-neutral-400 dark:border-white/10 dark:data-hover:border-white/20',
          'bg-transparent dark:bg-white/5 dark:*:bg-neutral-800',
          'focus:outline-hidden',
          'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600',
          'data-disabled:border-neutral-950/20 data-disabled:opacity-100 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15',
        ])}
      />
    </span>
  )
}

export default Select
