import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchUnits, fetchSubmissionsAdmin } from '@/services/api'
import Icon from '@/components/ui/Icon'
import PageLoader from '@/components/ui/PageLoader'

export default function AdminDashboard() {
  const [units, setUnits] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const unitsData = await fetchUnits()
        setUnits(unitsData || [])

        try {
          const subsData = await fetchSubmissionsAdmin()
          setSubmissions(subsData.submissions || [])
          setUnreadCount(subsData.unreadCount || 0)
        } catch (err) {
          console.warn('Submissions fetch warning:', err.message)
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) return <PageLoader />

  const contactSubmissions = submissions.filter((s) => s.type === 'contact')
  const careerSubmissions = submissions.filter((s) => s.type === 'career')
  const completeUnitsCount = units.filter((u) => u.contentStatus === 'complete').length

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-brand-950 via-ink-900 to-ink-950 p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
            <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
            Live Database Connected
          </span>
          <h1 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Welcome to Vrushahi Control Center
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-300">
            Manage all 15 business divisions, review inbound user inquiries & job applications, and update site content dynamically in real-time.
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Business Units */}
        <div className="rounded-2xl border border-white/10 bg-ink-900/80 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-ink-400 uppercase">
              Total Divisions
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
              <Icon name="building" size={20} />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">{units.length}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-brand-300">
            <span>{completeUnitsCount} complete copy</span>
            <span>•</span>
            <span>{units.length - completeUnitsCount} pending</span>
          </div>
        </div>

        {/* Card 2: Contact Inquiries */}
        <div className="rounded-2xl border border-white/10 bg-ink-900/80 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-ink-400 uppercase">
              Contact Inquiries
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
              <Icon name="mail" size={20} />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">
            {contactSubmissions.length}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs text-blue-300">
            <span className="font-semibold text-amber-400">{unreadCount} unread</span>
            <span>inbox messages</span>
          </div>
        </div>

        {/* Card 3: Career Applications */}
        <div className="rounded-2xl border border-white/10 bg-ink-900/80 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-ink-400 uppercase">
              Job Applications
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Icon name="userCheck" size={20} />
            </span>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-white">
            {careerSubmissions.length}
          </p>
          <div className="mt-2 text-xs text-emerald-300">Resumes & applicant profiles</div>
        </div>

        {/* Card 4: Quick Action */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-900/40 to-amber-brand-900/30 p-5 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-amber-brand-300 uppercase">
              Quick Management
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
              <Icon name="settings" size={18} />
            </span>
          </div>
          <Link
            to="/admin/divisions"
            className="mt-4 inline-flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-all"
          >
            <span>Manage Divisions</span>
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Link
          to="/admin/divisions"
          className="group rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-all hover:border-brand-500/50 hover:bg-ink-900"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
              <Icon name="building" size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-base">
                Divisions Manager
              </h3>
              <p className="text-xs text-ink-400">Edit titles, photos & text for all 15 units</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/contact-submissions"
          className="group rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-all hover:border-brand-500/50 hover:bg-ink-900"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Icon name="mail" size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-base">
                Inquiries Inbox
              </h3>
              <p className="text-xs text-ink-400">Review messages from site visitors</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="group rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-all hover:border-brand-500/50 hover:bg-ink-900"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-brand-500/20 text-amber-brand-400 group-hover:bg-amber-brand-500 group-hover:text-white transition-all">
              <Icon name="settings" size={22} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-base">
                Content & Policies
              </h3>
              <p className="text-xs text-ink-400">Manage About content & legal terms</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Submissions Table */}
      <div className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-white">Recent Form Submissions</h2>
            <p className="text-xs text-ink-400">Latest contact form messages & applicant entries</p>
          </div>
          <Link
            to="/admin/contact-submissions"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
          >
            <span>View all submissions</span>
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-ink-400">
            No form submissions received yet. Test by submitting a form on the Contact or Career pages!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-300">
              <thead className="border-b border-white/10 bg-white/5 text-ink-400 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Sender Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Division</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.slice(0, 5).map((sub) => (
                  <tr key={sub._id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium capitalize text-white">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                          sub.type === 'contact'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {sub.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{sub.fullName}</td>
                    <td className="px-4 py-3 text-ink-400">{sub.email}</td>
                    <td className="px-4 py-3 text-ink-400">{sub.division}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          sub.status === 'unread'
                            ? 'bg-amber-500/20 text-amber-300'
                            : sub.status === 'read'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
