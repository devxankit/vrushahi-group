import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchUnits, createUnitAdmin, deleteUnitAdmin } from '@/services/api'
import Icon from '@/components/ui/Icon'
import PageLoader from '@/components/ui/PageLoader'

export default function AdminDivisions() {
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCluster, setSelectedCluster] = useState('All')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newUnit, setNewUnit] = useState({
    slug: '',
    name: '',
    shortLabel: '',
    cluster: '',
    summary: '',
    heroImage: '',
    heroImageAlt: '',
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const loadUnits = async () => {
    try {
      setLoading(true)
      const data = await fetchUnits()
      setUnits(data || [])
    } catch (err) {
      console.error('Error loading units:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUnits()
  }, [])

  const handleDelete = async (slug, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      await deleteUnitAdmin(slug)
      setMessage({ type: 'success', text: `Division "${name}" deleted successfully.` })
      loadUnits()
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete division.' })
    }
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    if (!newUnit.slug || !newUnit.name || !newUnit.shortLabel) {
      alert('Please fill in slug, name, and short label.')
      return
    }

    try {
      setSubmitting(true)
      await createUnitAdmin({
        ...newUnit,
        cluster: newUnit.cluster || null,
        body: [newUnit.summary || 'Division overview coming soon.'],
      })
      setMessage({ type: 'success', text: 'New division created successfully!' })
      setIsAddModalOpen(false)
      setNewUnit({
        slug: '',
        name: '',
        shortLabel: '',
        cluster: '',
        summary: '',
        heroImage: '',
        heroImageAlt: '',
        contentStatus: 'placeholder',
        imageStatus: 'placeholder',
      })
      loadUnits()
    } catch (err) {
      alert(err.message || 'Failed to create division')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <PageLoader />

  const clusters = ['All', 'Agri & Market', 'Events & Entertainment', 'Digital Entertainment', 'Technologies', 'Digital Platforms & Mobility', 'Standalone']

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(search.toLowerCase()) ||
      unit.shortLabel.toLowerCase().includes(search.toLowerCase()) ||
      unit.slug.toLowerCase().includes(search.toLowerCase())

    const matchesCluster =
      selectedCluster === 'All'
        ? true
        : selectedCluster === 'Standalone'
        ? !unit.cluster
        : unit.cluster === selectedCluster

    return matchesSearch && matchesCluster
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Divisions Manager</h1>
          <p className="text-xs text-ink-400">
            View, edit, reorder, and configure all Vrushahi Group business units dynamically.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-amber-brand-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:from-brand-500 hover:to-amber-brand-500 transition-all"
        >
          <Icon name="plus" size={16} />
          <span>Add New Division</span>
        </button>
      </div>

      {message.text && (
        <div
          className={`flex items-center justify-between rounded-xl p-4 text-xs font-medium ${
            message.type === 'success'
              ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
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
            placeholder="Search divisions by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 overflow-x-auto">
          {clusters.map((cluster) => (
            <button
              key={cluster}
              type="button"
              onClick={() => setSelectedCluster(cluster)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all ${
                selectedCluster === cluster
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>
      </div>

      {/* Divisions Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/80 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink-300">
            <thead className="border-b border-white/10 bg-white/5 text-ink-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Thumbnail</th>
                <th className="px-4 py-3.5">Division Name</th>
                <th className="px-4 py-3.5">Cluster</th>
                <th className="px-4 py-3.5">Copy Status</th>
                <th className="px-4 py-3.5">Image Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUnits.map((unit) => (
                <tr key={unit.slug} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="h-12 w-20 overflow-hidden rounded-lg bg-ink-950 border border-white/10">
                      {unit.heroImage ? (
                        <img
                          src={unit.heroImage}
                          alt={unit.heroImageAlt || unit.shortLabel}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-ink-500 font-mono">
                          No photo
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white text-sm">{unit.shortLabel}</div>
                    <div className="text-[11px] text-ink-400 font-mono">/group/{unit.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    {unit.cluster ? (
                      <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/90">
                        {unit.cluster}
                      </span>
                    ) : (
                      <span className="text-[11px] text-ink-500">Standalone</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        unit.contentStatus === 'complete'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {unit.contentStatus === 'complete' ? 'Complete' : 'Pending Copy'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        unit.imageStatus === 'final'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {unit.imageStatus === 'final' ? 'Final Image' : 'Placeholder'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/divisions/edit/${unit.slug}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10 transition-colors"
                      >
                        <Icon name="edit" size={14} />
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(unit.slug, unit.name)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-red-300 hover:bg-red-500/20 transition-colors"
                      >
                        <Icon name="trash" size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Division Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-bold text-white">Create New Division</h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-ink-400 hover:text-white"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1">
                  URL Slug (e.g. hospitality)
                </label>
                <input
                  type="text"
                  required
                  value={newUnit.slug}
                  onChange={(e) =>
                    setNewUnit({ ...newUnit, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
                  }
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  placeholder="hospitality"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1">
                  Full Name (Page Header Title)
                </label>
                <input
                  type="text"
                  required
                  value={newUnit.name}
                  onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  placeholder="Vrushahi Hospitality & Tourism"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1">
                  Short Label (Grid Tile & Nav)
                </label>
                <input
                  type="text"
                  required
                  value={newUnit.shortLabel}
                  onChange={(e) => setNewUnit({ ...newUnit, shortLabel: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  placeholder="Hospitality"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1">
                  Cluster Grouping
                </label>
                <select
                  value={newUnit.cluster}
                  onChange={(e) => setNewUnit({ ...newUnit, cluster: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-ink-950 px-3.5 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                >
                  <option value="">Standalone (No Cluster)</option>
                  <option value="Agri & Market">Agri & Market</option>
                  <option value="Events & Entertainment">Events & Entertainment</option>
                  <option value="Digital Entertainment">Digital Entertainment</option>
                  <option value="Technologies">Technologies</option>
                  <option value="Digital Platforms & Mobility">Digital Platforms & Mobility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1">
                  Summary Teaser
                </label>
                <textarea
                  rows={2}
                  value={newUnit.summary}
                  onChange={(e) => setNewUnit({ ...newUnit, summary: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  placeholder="One line description for tile card..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-white/15 px-4 py-2 text-xs font-semibold text-ink-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-brand-600 px-5 py-2 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Division'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
