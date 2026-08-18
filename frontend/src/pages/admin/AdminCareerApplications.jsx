import { useState, useEffect } from 'react'
import {
  fetchSubmissionsAdmin,
  updateSubmissionStatusAdmin,
  deleteSubmissionAdmin,
} from '@/services/api'
import Icon from '@/components/ui/Icon'
import PageLoader from '@/components/ui/PageLoader'

export default function AdminCareerApplications() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [activeApp, setActiveApp] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  const loadApplications = async () => {
    try {
      setLoading(true)
      const data = await fetchSubmissionsAdmin('career', statusFilter)
      setSubmissions(data.submissions || [])
    } catch (err) {
      console.error('Error loading career applications:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApplications()
  }, [statusFilter])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateSubmissionStatusAdmin(id, newStatus)
      if (activeApp && activeApp._id === id) {
        setActiveApp({ ...activeApp, status: newStatus })
      }
      loadApplications()
    } catch (err) {
      alert(err.message || 'Failed to update status')
    }
  }

  const handleDelete = async (id, applicantName) => {
    if (!window.confirm(`Delete career application from "${applicantName}"?`)) return

    try {
      await deleteSubmissionAdmin(id)
      if (activeApp && activeApp._id === id) setActiveApp(null)
      setMessage({ type: 'success', text: 'Application deleted.' })
      loadApplications()
    } catch (err) {
      alert(err.message || 'Failed to delete application')
    }
  }

  const openAppModal = (app) => {
    setActiveApp(app)
    if (app.status === 'unread') {
      handleStatusChange(app._id, 'read')
    }
  }

  if (loading) return <PageLoader />

  const filtered = submissions.filter((s) => {
    return (
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.division && s.division.toLowerCase().includes(search.toLowerCase())) ||
      (s.message && s.message.toLowerCase().includes(search.toLowerCase()))
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Career Applications</h1>
          <p className="text-xs text-ink-400">
            Review job applicants, resume attachments, and candidates across all group divisions.
          </p>
        </div>
      </div>

      {message.text && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300">
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage({ type: '', text: '' })}>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-900/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon
            name="search"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            placeholder="Search applicants by name, email, or division..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'All Candidates', value: '' },
            { label: 'Unread', value: 'unread' },
            { label: 'Reviewed (Read)', value: 'read' },
            { label: 'Archived', value: 'archived' },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                statusFilter === tab.value
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 shadow-card">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-ink-400">
            No career applications found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-300">
              <thead className="border-b border-white/10 bg-white/5 text-ink-400 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Applicant Name</th>
                  <th className="px-4 py-3.5">Preferred Division</th>
                  <th className="px-4 py-3.5">Resume Attachment</th>
                  <th className="px-4 py-3.5">Applied Date</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((app) => (
                  <tr
                    key={app._id}
                    className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${
                      app.status === 'unread' ? 'bg-emerald-500/[0.04]' : ''
                    }`}
                    onClick={() => openAppModal(app)}
                  >
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          app.status === 'unread'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : app.status === 'read'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white text-sm">{app.fullName}</div>
                      <div className="text-[11px] text-ink-400">{app.email}</div>
                      {app.phone && <div className="text-[10px] text-ink-500">{app.phone}</div>}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-white/90">
                      {app.division || 'General Application'}
                    </td>
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      {app.resumeUrl ? (
                        <a
                          href={`http://localhost:5000${app.resumeUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                        >
                          <Icon name="download" size={13} />
                          <span>{app.resumeOriginalName || 'Resume File'}</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-ink-500">No file attached</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-ink-400">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openAppModal(app)}
                          className="rounded-lg border border-white/15 bg-white/5 p-1.5 text-white hover:bg-white/10"
                          title="View application details"
                        >
                          <Icon name="eye" size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(app._id, app.fullName)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20"
                          title="Delete application"
                        >
                          <Icon name="trash" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Applicant Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveApp(null)}
          />
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                  Candidate Application Profile
                </span>
                <h2 className="font-display text-lg font-bold text-white">{activeApp.fullName}</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveApp(null)}
                className="text-ink-400 hover:text-white"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">
                  Email Address
                </span>
                <a
                  href={`mailto:${activeApp.email}`}
                  className="font-medium text-emerald-300 underline"
                >
                  {activeApp.email}
                </a>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">Phone</span>
                <span className="font-medium text-white">{activeApp.phone || 'N/A'}</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">
                  Preferred Division
                </span>
                <span className="font-medium text-white">{activeApp.division}</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">
                  Applied Date
                </span>
                <span className="font-medium text-white">
                  {new Date(activeApp.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {activeApp.resumeUrl && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="fileText" size={24} className="text-emerald-400" />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {activeApp.resumeOriginalName || 'Resume Document'}
                    </div>
                    <div className="text-[10px] text-emerald-300">Attached File</div>
                  </div>
                </div>
                <a
                  href={`http://localhost:5000${activeApp.resumeUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  <Icon name="download" size={14} />
                  Download File
                </a>
              </div>
            )}

            {activeApp.message && (
              <div>
                <span className="text-xs font-semibold text-ink-300 uppercase block mb-2">
                  Cover Note / Message
                </span>
                <div className="rounded-2xl border border-white/10 bg-ink-950 p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">
                  {activeApp.message}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-400">Application Status:</span>
                <select
                  value={activeApp.status}
                  onChange={(e) => handleStatusChange(activeApp._id, e.target.value)}
                  className="rounded-lg border border-white/15 bg-ink-950 px-3 py-1.5 text-xs text-white"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Reviewed (Read)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(activeApp._id, activeApp.fullName)}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20"
              >
                Delete Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
