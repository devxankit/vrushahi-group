import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchUnitBySlug, updateUnitAdmin } from '@/services/api'
import Icon from '@/components/ui/Icon'
import PageLoader from '@/components/ui/PageLoader'

export default function AdminDivisionEdit() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [unit, setUnit] = useState({
    name: '',
    shortLabel: '',
    slug: '',
    cluster: '',
    heroImage: '',
    heroImageAlt: '',
    summary: '',
    body: [],
    externalSiteUrl: '',
    contentStatus: 'complete',
    imageStatus: 'final',
    sections: [],
  })

  const [bodyText, setBodyText] = useState('')

  useEffect(() => {
    async function loadUnit() {
      try {
        setLoading(true)
        const data = await fetchUnitBySlug(slug)
        if (data) {
          setUnit({
            ...data,
            cluster: data.cluster || '',
            heroImage: data.heroImage || '',
            externalSiteUrl: data.externalSiteUrl || '',
            sections: data.sections || [],
          })
          setBodyText(Array.isArray(data.body) ? data.body.join('\n\n') : data.body || '')
        }
      } catch (err) {
        setMessage({ type: 'error', text: err.message || 'Failed to load division.' })
      } finally {
        setLoading(false)
      }
    }

    loadUnit()
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setMessage({ type: '', text: '' })

      const paragraphs = bodyText
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean)

      const updatedData = {
        ...unit,
        cluster: unit.cluster || null,
        externalSiteUrl: unit.externalSiteUrl || null,
        body: paragraphs,
      }

      await updateUnitAdmin(slug, updatedData)
      setMessage({ type: 'success', text: 'Division updated successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 4000)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save changes.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/divisions"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white"
          >
            <Icon name="arrowLeft" size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              Edit Division: {unit.shortLabel}
            </h1>
            <p className="text-xs text-ink-400">URL path: /group/{unit.slug}</p>
          </div>
        </div>

        <Link
          to={`/group/${unit.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
        >
          <Icon name="externalLink" size={14} />
          View Live Page
        </Link>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: Core Details */}
        <div className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
            Core Info & Metadata
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Full Page Title (h1)
              </label>
              <input
                type="text"
                required
                value={unit.name}
                onChange={(e) => setUnit({ ...unit, name: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Short Label (Nav & Card)
              </label>
              <input
                type="text"
                required
                value={unit.shortLabel}
                onChange={(e) => setUnit({ ...unit, shortLabel: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Cluster Grouping
              </label>
              <select
                value={unit.cluster}
                onChange={(e) => setUnit({ ...unit, cluster: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
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
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                External Microsite URL
              </label>
              <input
                type="text"
                value={unit.externalSiteUrl}
                onChange={(e) => setUnit({ ...unit, externalSiteUrl: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                placeholder="https://agri.vrushahi.com"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 pt-2">
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Content Status Badge
              </label>
              <select
                value={unit.contentStatus}
                onChange={(e) => setUnit({ ...unit, contentStatus: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="complete">Complete Copy (Approved)</option>
                <option value="placeholder">Placeholder (Shows 'Content Pending' badge)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Image Status
              </label>
              <select
                value={unit.imageStatus}
                onChange={(e) => setUnit({ ...unit, imageStatus: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="final">Final Photography Rendered</option>
                <option value="placeholder">Placeholder Hatch Rendered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: Image Configuration */}
        <div className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
            Division Hero Photography
          </h2>

          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                  Image Asset Path or Web URL
                </label>
                <input
                  type="text"
                  value={unit.heroImage}
                  onChange={(e) => setUnit({ ...unit, heroImage: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                  placeholder="/images/units/agriculture.png"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                  Image Alt Text Description
                </label>
                <input
                  type="text"
                  value={unit.heroImageAlt}
                  onChange={(e) => setUnit({ ...unit, heroImageAlt: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Image Preview
              </label>
              <div className="h-32 w-full overflow-hidden rounded-2xl border border-white/15 bg-ink-950">
                {unit.heroImage ? (
                  <img
                    src={unit.heroImage}
                    alt={unit.heroImageAlt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-ink-500">
                    No image URL set
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Summary & Body Copy */}
        <div className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
            Marketing Copy & Description
          </h2>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Summary Teaser (One liner for homepage grid & meta)
            </label>
            <textarea
              rows={2}
              value={unit.summary}
              onChange={(e) => setUnit({ ...unit, summary: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Body Copy Paragraphs (Separate paragraphs with double newlines)
            </label>
            <textarea
              rows={8}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white focus:border-brand-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-2xl border border-white/15 bg-ink-900/90 p-4 shadow-2xl backdrop-blur-md">
          <Link
            to="/admin/divisions"
            className="text-xs font-semibold text-ink-400 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-amber-brand-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg hover:from-brand-500 hover:to-amber-brand-500 disabled:opacity-50"
          >
            <Icon name="check" size={16} />
            <span>{saving ? 'Saving...' : 'Save Division Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
