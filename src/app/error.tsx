'use client'

import { Button } from '@/libs/design/Button'
import ButtonPrimary from '@/libs/design/ButtonPrimary'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="nc-PageError">
      <div className="relative container py-16 lg:py-20">
        <header className="mx-auto max-w-2xl space-y-7 text-center">
          <p aria-hidden="true" className="text-7xl md:text-8xl">
            🛠️
          </p>
          <h1 className="text-5xl font-semibold tracking-widest md:text-7xl">Oops</h1>
          <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
            {`SOMETHING BROKE ON THIS PAGE. IT'S NOT YOU.`}
          </span>
          {error.digest && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Reference: <code className="font-mono">{error.digest}</code>
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <ButtonPrimary onClick={reset}>Try again</ButtonPrimary>
            <Button href="/" outline>
              Return home page
            </Button>
          </div>
        </header>
      </div>
    </div>
  )
}
