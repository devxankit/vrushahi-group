/**
 * Suspense fallback shown while a lazily-loaded route chunk downloads.
 *
 * Deliberately minimal and roughly page-height, so the header and footer don't
 * jump while a chunk lands. Marked aria-hidden — the route transition is
 * already announced by the page's own heading once it renders.
 */
export default function PageLoader() {
  return (
    <div aria-hidden="true" className="flex min-h-[60vh] items-center justify-center">
      <span className="h-9 w-9 animate-spin rounded-full border-3 border-ink-200 border-t-brand-500" />
    </div>
  )
}
