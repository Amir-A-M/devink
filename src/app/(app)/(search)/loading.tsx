/**
 * The two search routes are the only ones rendered per request, so they are the
 * only place a route-level pending state earns its keep. It sits beside
 * `(search)/layout.tsx`, which means the header and footer stay on screen and
 * only the results area is replaced.
 */
export default function Loading() {
  return (
    <div className="container py-16 lg:py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading search results…</span>
      <div className="mx-auto h-10 w-64 animate-pulse rounded-full bg-neutral-200 motion-reduce:animate-none dark:bg-neutral-800" />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-4/3 w-full animate-pulse rounded-2xl bg-neutral-200 motion-reduce:animate-none dark:bg-neutral-800" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-neutral-200 motion-reduce:animate-none dark:bg-neutral-800" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-neutral-200 motion-reduce:animate-none dark:bg-neutral-800" />
          </div>
        ))}
      </div>
    </div>
  )
}
