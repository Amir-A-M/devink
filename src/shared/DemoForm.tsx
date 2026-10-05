'use client'

import clsx from 'clsx'
import { type FormEvent, type ReactNode, useState } from 'react'

interface DemoFormProps {
  children: ReactNode
  className?: string
  /** Confirmation shown in place of the form once it is submitted. */
  successMessage?: string
  /** Label of the control that returns the form to its editable state. */
  resetLabel?: string
}

/**
 * The template ships no backend, so a form here answers locally instead of
 * posting: it blocks the native submit that would reload the page and swaps in
 * a confirmation. Wire a real endpoint by replacing `handleSubmit` with a
 * server action passed to the `action` prop of the <form> below.
 */
export default function DemoForm({
  children,
  className,
  successMessage = 'Thanks — we have your details. This demo does not send them anywhere.',
  resetLabel = 'Send another',
}: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={clsx('flex flex-col items-start gap-4', className)}>
        <p
          role="status"
          className="rounded-2xl bg-primary-50 px-5 py-4 text-sm/6 text-primary-900 dark:bg-primary-900/30 dark:text-primary-100"
        >
          {successMessage}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm/6 font-medium text-primary-600 underline underline-offset-4 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {resetLabel}
        </button>
      </div>
    )
  }

  return (
    <form className={className} onSubmit={handleSubmit} noValidate={false}>
      {children}
    </form>
  )
}
