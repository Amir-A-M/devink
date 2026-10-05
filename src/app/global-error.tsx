'use client'

/**
 * Last resort: a throw in the root layout, where no chrome and no stylesheet
 * from the app is available. It has to render its own <html> and <body>, so the
 * styling here is deliberately self-contained.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          background: '#ffffff',
          color: '#171717',
        }}
      >
        <main style={{ maxWidth: '32rem', padding: '2rem', textAlign: 'center' }}>
          <p aria-hidden="true" style={{ fontSize: '3.5rem', margin: 0 }}>
            🛠️
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '0.05em', margin: '1rem 0 0.5rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#525252', margin: '0 0 1.5rem' }}>
            The application failed to start. Reloading usually clears it.
          </p>
          {error.digest && (
            <p style={{ fontSize: '0.75rem', color: '#737373' }}>
              Reference: <code>{error.digest}</code>
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: 'pointer',
              borderRadius: '9999px',
              border: 0,
              background: '#171717',
              color: '#ffffff',
              padding: '0.7rem 1.6rem',
              fontSize: '0.95rem',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
