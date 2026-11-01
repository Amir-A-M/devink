'use client'

import type { ReactNode, SubmitEvent } from 'react'

import clsx from 'clsx'
import { useState } from 'react'

interface DemoFormProps {
  children: ReactNode
  className?: string
  successMessage?: string
  resetLabel?: string
}

export default function DemoForm({
  children,
  className,
  successMessage = 'Thanks — we have your details. This demo does not send them anywhere.',
  resetLabel = 'Send another',
}: DemoFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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
