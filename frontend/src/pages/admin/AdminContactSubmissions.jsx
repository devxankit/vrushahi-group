import { useState, useEffect } from 'react'
import {
  fetchSubmissionsAdmin,
  updateSubmissionStatusAdmin,
  deleteSubmissionAdmin,
} from '@/services/api'
import Icon from '@/components/ui/Icon'
import PageLoader from '@/components/ui/PageLoader'

export default function AdminContactSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [activeMessage, setActiveMessage] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  const loadSubmissions = async () => {
    try {
      setLoading(true)
      const data = await fetchSubmissionsAdmin('contact', statusFilter)
      setSubmissions(data.submissions || [])
    } catch (err) {
      console.error('Error loading contact submissions:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubmissions()
  }, [statusFilter])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateSubmissionStatusAdmin(id, newStatus)
      if (activeMessage && activeMessage._id === id) {
        setActiveMessage({ ...activeMessage, status: newStatus })
      }
      loadSubmissions()
    } catch (err) {
      alert(err.message || 'Failed to update status')
    }
  }

  const handleDelete = async (id, senderName) => {
    if (!window.confirm(`Delete contact enquiry from "${senderName}"?`)) return

    try {
      await deleteSubmissionAdmin(id)
      if (activeMessage && activeMessage._id === id) setActiveMessage(null)
      setMessage({ type: 'success', text: 'Message deleted.' })
      loadSubmissions()
    } catch (err) {
      alert(err.message || 'Failed to delete submission')
    }
  }

  const openMessageModal = (sub) => {
    setActiveMessage(sub)
    if (sub.status === 'unread') {
      handleStatusChange(sub._id, 'read')
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
          <h1 className="font-display text-2xl font-bold text-white">Contact Submissions Inbox</h1>
          <p className="text-xs text-ink-400">
            Review and respond to messages submitted by users through the Contact Us form.
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-ink-900/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon
            name="search"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            placeholder="Search by sender name, email, or division..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'All Statuses', value: '' },
            { label: 'Unread', value: 'unread' },
            { label: 'Read', value: 'read' },
            { label: 'Archived', value: 'archived' },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                statusFilter === tab.value
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 shadow-card">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-ink-400">
            No contact submissions found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink-300">
              <thead className="border-b border-white/10 bg-white/5 text-ink-400 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Sender</th>
                  <th className="px-4 py-3.5">Target Division</th>
                  <th className="px-4 py-3.5">Message Snippet</th>
                  <th className="px-4 py-3.5">Submitted On</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((sub) => (
                  <tr
                    key={sub._id}
                    className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${
                      sub.status === 'unread' ? 'bg-brand-500/[0.04]' : ''
                    }`}
                    onClick={() => openMessageModal(sub)}
                  >
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          sub.status === 'unread'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : sub.status === 'read'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white text-sm">{sub.fullName}</div>
                      <div className="text-[11px] text-ink-400">{sub.email}</div>
                      {sub.phone && <div className="text-[10px] text-ink-500">{sub.phone}</div>}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-white/90">
                      {sub.division || 'General Inquiry'}
                    </td>
                    <td className="px-4 py-3.5 text-ink-300 max-w-xs truncate">
                      {sub.message}
                    </td>
                    <td className="px-4 py-3.5 text-ink-400">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openMessageModal(sub)}
                          className="rounded-lg border border-white/15 bg-white/5 p-1.5 text-white hover:bg-white/10"
                          title="Read full message"
                        >
                          <Icon name="eye" size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              sub._id,
                              sub.status === 'archived' ? 'read' : 'archived'
                            )
                          }
                          className="rounded-lg border border-white/15 bg-white/5 p-1.5 text-ink-300 hover:text-white hover:bg-white/10"
                          title={sub.status === 'archived' ? 'Unarchive' : 'Archive message'}
                        >
                          <Icon name="archive" size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(sub._id, sub.fullName)}
                          className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20"
                          title="Delete message"
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

      {/* View Message Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setActiveMessage(null)}
          />
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-brand-400 uppercase">
                  Contact Inquiry Details
                </span>
                <h2 className="font-display text-lg font-bold text-white">
                  {activeMessage.fullName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveMessage(null)}
                className="text-ink-400 hover:text-white"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">Email</span>
                <a
                  href={`mailto:${activeMessage.email}`}
                  className="font-medium text-brand-300 underline"
                >
                  {activeMessage.email}
                </a>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">Phone</span>
                <span className="font-medium text-white">{activeMessage.phone || 'N/A'}</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">Division</span>
                <span className="font-medium text-white">{activeMessage.division}</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-3.5">
                <span className="text-ink-400 block text-[10px] uppercase font-semibold">Date</span>
                <span className="font-medium text-white">
                  {new Date(activeMessage.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-ink-300 uppercase block mb-2">
                Message Content
              </span>
              <div className="rounded-2xl border border-white/10 bg-ink-950 p-4 text-xs leading-relaxed text-white font-sans whitespace-pre-wrap">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-400">Status:</span>
                <select
                  value={activeMessage.status}
                  onChange={(e) => handleStatusChange(activeMessage._id, e.target.value)}
                  className="rounded-lg border border-white/15 bg-ink-950 px-3 py-1.5 text-xs text-white"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(activeMessage._id, activeMessage.fullName)}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20"
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
