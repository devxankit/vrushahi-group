import { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import PageLoader from '@/components/ui/PageLoader'
import PageTransition from '@/components/motion/PageTransition'

/**
 * The shared chrome every page renders inside.
 *
 * The legacy site duplicated this header/footer markup across 29 physical HTML
 * files (~140 lines each), which is how the nav and footer drifted out of sync.
 * Here it exists exactly once.
 *
 * Page transitions live here rather than in AppRoutes so the header and footer
 * stay mounted and unanimated while the page body cross-fades. Note the use of
 * useOutlet() instead of <Outlet />: <Outlet /> reads the *current* route from
 * context, so the outgoing page would re-render as the incoming one mid-exit.
 * useOutlet() hands back a concrete element that AnimatePresence can hold onto
 * while it animates out.
 */
export default function MainLayout() {
  const outlet = useOutlet()
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Keyboard users can jump the nav — the legacy site had no skip link. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <TopBar />
      <Header />

      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            {/* Inside the transition, so a lazily-loaded route's chunk can land
                without interrupting the outgoing page's exit animation. */}
            <Suspense fallback={<PageLoader />}>{outlet}</Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
