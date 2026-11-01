'use client'

import type React from 'react'

import * as Headless from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/libs/design/Button'
import { Link } from '@/libs/design/link'

export function Dropdown(props: Headless.MenuProps) {
  return <Headless.Menu {...props} />
}

export function DropdownButton<T extends React.ElementType = typeof Button>({
  as = Button,
  ...props
}: Omit<Headless.MenuButtonProps<T>, 'className'> & { className?: string }) {
  return <Headless.MenuButton as={as} {...props} />
}

export function DropdownMenu({
  anchor = 'bottom',
  className,
  ...props
}: Omit<Headless.MenuItemsProps, 'as' | 'className'> & { className?: string }) {
  return (
    <Headless.MenuItems
      {...props}
      transition
      anchor={anchor}
      className={clsx(
        className,
        '[--anchor-gap:--spacing(3)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]',
        'isolate w-max rounded-xl p-2',
        'outline outline-transparent focus:outline-hidden',
        'overflow-y-auto',
        'bg-white dark:bg-neutral-800',
        'shadow-lg ring-1 ring-neutral-950/10 dark:ring-white/10 dark:ring-inset',
        'supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]',
        'transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0'
      )}
    />
  )
}

export function DropdownItem({
  className,
  ...props
}: { className?: string } & (
  | Omit<Headless.MenuItemProps<'button'>, 'as' | 'className'>
  | Omit<Headless.MenuItemProps<typeof Link>, 'as' | 'className'>
)) {
  const classes = clsx(
    className,
    'group cursor-default rounded-lg px-3 py-2 focus:outline-hidden sm:py-1.5',
    'text-left text-base/6 text-neutral-950 sm:text-sm/6 rtl:text-right dark:text-white forced-colors:text-[CanvasText]',
    'data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700',
    'data-disabled:opacity-50',
    'forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText] forced-colors:data-focus:*:data-[slot=icon]:text-[HighlightText]',
    'col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid',
    '*:data-[slot=icon]:col-start-1 *:data-[slot=icon]:row-start-1 *:data-[slot=icon]:-ms-0.5 *:data-[slot=icon]:me-3 *:data-[slot=icon]:size-5',
    '*:data-[slot=avatar]:-ms-1 *:data-[slot=avatar]:me-2.5 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:me-2 sm:*:data-[slot=avatar]:size-5'
  )

  return 'href' in props ? (
    <Headless.MenuItem as={Link} {...props} className={classes} />
  ) : (
    <Headless.MenuItem as="button" type="button" {...props} className={classes} />
  )
}

export function DropdownHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={clsx(className, 'col-span-5 px-3.5 pt-2.5 pb-1 sm:px-3')} />
}

export function DropdownSection({
  className,
  ...props
}: Omit<Headless.MenuSectionProps, 'as' | 'className'> & { className?: string }) {
  return (
    <Headless.MenuSection
      {...props}
      className={clsx(
        className,
        'col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]'
      )}
    />
  )
}

export function DropdownHeading({
  className,
  ...props
}: Omit<Headless.MenuHeadingProps, 'as' | 'className'> & { className?: string }) {
  return (
    <Headless.MenuHeading
      {...props}
      className={clsx(
        className,
        'col-span-full grid grid-cols-[1fr_auto] gap-x-12 px-3.5 pt-2 pb-1 text-sm/5 font-medium text-neutral-500 sm:px-3 sm:text-xs/5 dark:text-neutral-400'
      )}
    />
  )
}

export function DropdownDivider({
  className,
  ...props
}: Omit<Headless.MenuSeparatorProps, 'as' | 'className'> & { className?: string }) {
  return (
    <Headless.MenuSeparator
      {...props}
      className={clsx(
        className,
        'col-span-full mx-3.5 my-1 h-px border-0 bg-neutral-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]'
      )}
    />
  )
}

export function DropdownLabel({
  className,
  ...props
}: Omit<Headless.LabelProps, 'as' | 'className'> & { className?: string }) {
  return (
    <Headless.Label {...props} data-slot="label" className={clsx(className, 'col-start-2 row-start-1')} {...props} />
  )
}

export function DropdownDescription({
  className,
  ...props
}: Omit<Headless.DescriptionProps, 'as' | 'className'> & { className?: string }) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={clsx(
        className,
        'col-span-2 col-start-2 row-start-2 text-sm/5 text-neutral-500 group-data-focus:text-white sm:text-xs/5 dark:text-neutral-400 forced-colors:group-data-focus:text-[HighlightText]'
      )}
    />
  )
}

export function DropdownShortcut({
  keys,
  className,
  ...props
}: Omit<Headless.DescriptionProps<'kbd'>, 'as' | 'className'> & { keys: string | string[]; className?: string }) {
  return (
    <Headless.Description
      as="kbd"
      {...props}
      className={clsx(className, 'col-start-5 row-start-1 flex justify-self-end')}
    >
      {(Array.isArray(keys) ? keys : keys.split('')).map((char, index) => (
        <kbd
          key={index}
          className={clsx([
            'min-w-[2ch] text-center font-sans text-neutral-400 capitalize group-data-focus:text-white forced-colors:group-data-focus:text-[HighlightText]',
            index > 0 && char.length > 1 && 'pl-1',
          ])}
        >
          {char}
        </kbd>
      ))}
    </Headless.Description>
  )
}
