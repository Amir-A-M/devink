'use client'

import type React from 'react'

import clsx from 'clsx'
import { createContext, use, useMemo, useState } from 'react'

import { Link } from '@/libs/design/link'

const TableContext = createContext<{ bleed: boolean; dense: boolean; grid: boolean; striped: boolean }>({
  bleed: false,
  dense: false,
  grid: false,
  striped: false,
})

TableContext.displayName = 'TableContext'

export function Table({
  bleed = false,
  dense = false,
  grid = false,
  striped = false,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { bleed?: boolean; dense?: boolean; grid?: boolean; striped?: boolean }) {
  const TableContextValue = useMemo(() => ({ bleed, dense, grid, striped }), [bleed, dense, grid, striped])

  return (
    <TableContext value={TableContextValue}>
      <div className="flow-root">
        <div {...props} className={clsx(className, '-mx-(--gutter) overflow-x-auto whitespace-nowrap')}>
          <div className={clsx('inline-block min-w-full align-middle', !bleed && 'sm:px-(--gutter)')}>
            <table className="min-w-full text-left text-base/6 text-neutral-950 rtl:text-right dark:text-white">
              {children}
            </table>
          </div>
        </div>
      </div>
    </TableContext>
  )
}

export function TableHead({ className, ...props }: React.ComponentPropsWithoutRef<'thead'>) {
  return <thead {...props} className={clsx(className, 'text-neutral-500 dark:text-neutral-400')} />
}

export function TableBody(props: React.ComponentPropsWithoutRef<'tbody'>) {
  return <tbody {...props} />
}

const TableRowContext = createContext<{ href?: string; target?: string; title?: string }>({
  href: undefined,
  target: undefined,
  title: undefined,
})

TableRowContext.displayName = 'TableRowContext'

export function TableRow({
  href,
  target,
  title,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'tr'> & { href?: string; target?: string; title?: string }) {
  const { striped } = use(TableContext)

  const TableRowContextValue = useMemo(() => ({ href, target, title }), [href, target, title])

  return (
    <TableRowContext value={TableRowContextValue}>
      <tr
        {...props}
        className={clsx(
          className,
          href &&
            'has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/[2.5%]',
          striped && 'even:bg-neutral-950/[2.5%] dark:even:bg-white/[2.5%]',
          href && striped && 'hover:bg-neutral-950/5 dark:hover:bg-white/5',
          href && !striped && 'hover:bg-neutral-950/[2.5%] dark:hover:bg-white/[2.5%]'
        )}
      />
    </TableRowContext>
  )
}

export function TableHeader({ className, ...props }: React.ComponentPropsWithoutRef<'th'>) {
  const { bleed, grid } = use(TableContext)

  return (
    <th
      {...props}
      className={clsx(
        className,
        'border-b border-b-neutral-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10',
        grid && 'border-l border-l-neutral-950/5 first:border-l-0 dark:border-l-white/5',
        !bleed && 'sm:first:pl-1 sm:last:pr-1'
      )}
    />
  )
}

export function TableCell({ className, children, ...props }: React.ComponentPropsWithoutRef<'td'>) {
  const { bleed, dense, grid, striped } = use(TableContext)
  const { href, target, title } = use(TableRowContext)
  const [cellRef, setCellRef] = useState<HTMLElement | null>(null)

  return (
    <td
      ref={href ? setCellRef : undefined}
      {...props}
      className={clsx(
        className,
        'relative px-4 first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2))',
        !striped && 'border-b border-neutral-950/5 dark:border-white/5',
        grid && 'border-l border-l-neutral-950/5 first:border-l-0 dark:border-l-white/5',
        dense ? 'py-2.5' : 'py-4',
        !bleed && 'sm:first:pl-1 sm:last:pr-1'
      )}
    >
      {href && (
        <Link
          data-row-link
          href={href}
          target={target}
          aria-label={title}
          tabIndex={cellRef?.previousElementSibling === null ? 0 : -1}
          className="absolute inset-0 focus:outline-hidden"
        />
      )}
      {children}
    </td>
  )
}
