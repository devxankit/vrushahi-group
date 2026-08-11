import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ScrollToTop from './ScrollToTop'

// Home is eager: it is the landing page and the LCP target, so it must not wait
// on a second network round-trip.
import Home from '@/pages/Home'

/**
 * Every other route is code-split.
 *
 * This keeps the initial bundle to the shell plus the home page. The form
 * pages in particular pull in react-hook-form, zod and the resolver, none of
 * which the other 20 routes need — bundling them together cost every visitor
 * a meaningful chunk of JavaScript on first paint (PRD B7 performance).
 */
const AboutIndex = lazy(() => import('@/pages/about/AboutIndex'))
const CompanyProfile = lazy(() => import('@/pages/about/CompanyProfile'))
const VisionMission = lazy(() => import('@/pages/about/VisionMission'))
const Values = lazy(() => import('@/pages/about/Values'))
const CorporateStrategies = lazy(() => import('@/pages/about/CorporateStrategies'))
const Foundation = lazy(() => import('@/pages/about/Foundation'))

const GroupIndex = lazy(() => import('@/pages/group/GroupIndex'))
const BusinessUnitPage = lazy(() => import('@/pages/group/BusinessUnitPage'))
const ContractFarming = lazy(() => import('@/pages/group/ContractFarming'))

const Career = lazy(() => import('@/pages/Career'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/**
 * Route table — PRD B3.
 *
 * 22 routes replace the legacy site's 29 physical HTML files: the dead orphans,
 * unused OS-Templates demo pages and the duplicated .html/.php contact and
 * career split are all gone, and all 15 business-unit pages share one component
 * driven by the slug.
 *
 * /group/agriculture/contract-farming is the one addition beyond B3 — the
 * Agri1.html article, which the client asked to keep as its own page (B11.6).
 * It has three path segments so it can never be shadowed by /group/:slug.
 */
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<AboutIndex />} />
          <Route path="/about/company-profile" element={<CompanyProfile />} />
          <Route path="/about/vision-mission" element={<VisionMission />} />
          <Route path="/about/values" element={<Values />} />
          <Route path="/about/corporate-strategies" element={<CorporateStrategies />} />
          <Route path="/about/foundation" element={<Foundation />} />

          <Route path="/group" element={<GroupIndex />} />
          <Route
            path="/group/agriculture/contract-farming"
            element={<ContractFarming />}
          />
          <Route path="/group/:slug" element={<BusinessUnitPage />} />

          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
