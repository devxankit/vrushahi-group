import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute'
import { AuthProvider } from '@/context/AuthContext'
import PageLoader from '@/components/ui/PageLoader'
import ScrollToTop from './ScrollToTop'

// Eager imports
import Home from '@/pages/Home'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminDivisions from '@/pages/admin/AdminDivisions'
import AdminDivisionEdit from '@/pages/admin/AdminDivisionEdit'
import AdminContactSubmissions from '@/pages/admin/AdminContactSubmissions'
import AdminCareerApplications from '@/pages/admin/AdminCareerApplications'
import AdminSiteSettings from '@/pages/admin/AdminSiteSettings'
import AdminProfile from '@/pages/admin/AdminProfile'

// Lazy imports for public pages
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
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('@/pages/TermsConditions'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Main Website Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<AboutIndex />} />
            <Route path="/about/company-profile" element={<CompanyProfile />} />
            <Route path="/about/vision-mission" element={<VisionMission />} />
            <Route path="/about/values" element={<Values />} />
            <Route path="/about/corporate-strategies" element={<CorporateStrategies />} />
            <Route path="/about/foundation" element={<Foundation />} />

            <Route path="/group" element={<GroupIndex />} />
            <Route path="/group/agriculture/contract-farming" element={<ContractFarming />} />
            <Route path="/group/:slug" element={<BusinessUnitPage />} />

            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes - Private / Restricted */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/divisions" element={<AdminDivisions />} />
              <Route path="/admin/divisions/edit/:slug" element={<AdminDivisionEdit />} />
              <Route path="/admin/contact-submissions" element={<AdminContactSubmissions />} />
              <Route path="/admin/career-applications" element={<AdminCareerApplications />} />
              <Route path="/admin/settings" element={<AdminSiteSettings />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
