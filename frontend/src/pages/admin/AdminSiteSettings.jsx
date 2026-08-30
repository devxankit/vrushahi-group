import { useState, useEffect } from 'react'
import { fetchSetting, updateSettingAdmin } from '@/services/api'
import Icon from '@/components/ui/Icon'
import PageLoader from '@/components/ui/PageLoader'

export default function AdminSiteSettings() {
  const [activeTab, setActiveTab] = useState('privacyPolicy')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [privacy, setPrivacy] = useState({ title: 'Privacy Policy', lastUpdated: 'August 2026', contentText: '' })
  const [terms, setTerms] = useState({ title: 'Terms & Conditions', lastUpdated: 'August 2026', contentText: '' })
  const [contact, setContact] = useState({
    city: 'Sangli',
    state: 'Maharashtra',
    addressLines: '',
    phone: '+91 9970907005',
    email: 'info@vrushahi.com',
  })

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true)
        const privacyData = await fetchSetting('privacyPolicy')
        if (privacyData) {
          setPrivacy({
            title: privacyData.title || 'Privacy Policy',
            lastUpdated: privacyData.lastUpdated || 'August 2026',
            contentText: Array.isArray(privacyData.content) ? privacyData.content.join('\n\n') : '',
          })
        }

        const termsData = await fetchSetting('termsAndConditions')
        if (termsData) {
          setTerms({
            title: termsData.title || 'Terms & Conditions',
            lastUpdated: termsData.lastUpdated || 'August 2026',
            contentText: Array.isArray(termsData.content) ? termsData.content.join('\n\n') : '',
          })
        }

        const siteConfigData = await fetchSetting('siteConfig')
        if (siteConfigData && siteConfigData.contact) {
          const c = siteConfigData.contact
          setContact({
            city: c.address?.city || 'Sangli',
            state: c.address?.state || 'Maharashtra',
            addressLines: Array.isArray(c.address?.lines) ? c.address.lines.join('\n') : '',
            phone: c.phone || '',
            email: c.email || '',
          })
        }
      } catch (err) {
        console.error('Settings load warning:', err.message)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSavePrivacy = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const paragraphs = privacy.contentText.split('\n\n').map((p) => p.trim()).filter(Boolean)
      await updateSettingAdmin('privacyPolicy', {
        title: privacy.title,
        lastUpdated: privacy.lastUpdated,
        content: paragraphs,
      })
      setMessage({ type: 'success', text: 'Privacy Policy updated successfully in MongoDB Atlas!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Privacy Policy' })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveTerms = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const paragraphs = terms.contentText.split('\n\n').map((p) => p.trim()).filter(Boolean)
      await updateSettingAdmin('termsAndConditions', {
        title: terms.title,
        lastUpdated: terms.lastUpdated,
        content: paragraphs,
      })
      setMessage({ type: 'success', text: 'Terms & Conditions updated successfully in MongoDB Atlas!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Terms & Conditions' })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveContact = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const lines = contact.addressLines.split('\n').map((l) => l.trim()).filter(Boolean)
      const siteConfigData = {
        siteName: 'Vrushahi Group',
        tagline: 'Technology with a Human Touch',
        contact: {
          address: {
            city: contact.city,
            state: contact.state,
            lines,
          },
          phone: contact.phone,
          phoneHref: `tel:${contact.phone.replace(/[^0-9+]/g, '')}`,
          email: contact.email,
          emailHref: `mailto:${contact.email}`,
        },
      }
      await updateSettingAdmin('siteConfig', siteConfigData)
      setMessage({ type: 'success', text: 'Contact Information updated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Contact Info' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Site Content & Policy Manager</h1>
        <p className="text-xs text-ink-400">
          Dynamically manage Privacy Policy, Terms & Conditions, and Contact details.
        </p>
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

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: 'privacyPolicy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms & Conditions' },
          { id: 'contactInfo', label: 'Contact Details' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id)
              setMessage({ type: '', text: '' })
            }}
            className={`border-b-2 px-5 py-3 text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-ink-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Privacy Policy */}
      {activeTab === 'privacyPolicy' && (
        <form onSubmit={handleSavePrivacy} className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
            Privacy Policy Content
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Policy Document Title
              </label>
              <input
                type="text"
                value={privacy.title}
                onChange={(e) => setPrivacy({ ...privacy, title: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Last Updated Label
              </label>
              <input
                type="text"
                value={privacy.lastUpdated}
                onChange={(e) => setPrivacy({ ...privacy, lastUpdated: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Policy Body Text (Separate paragraphs with double newlines)
            </label>
            <textarea
              rows={12}
              value={privacy.contentText}
              onChange={(e) => setPrivacy({ ...privacy, contentText: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white font-mono focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Privacy Policy'}
          </button>
        </form>
      )}

      {/* Tab 2: Terms & Conditions */}
      {activeTab === 'terms' && (
        <form onSubmit={handleSaveTerms} className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
            Terms & Conditions Content
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Document Title
              </label>
              <input
                type="text"
                value={terms.title}
                onChange={(e) => setTerms({ ...terms, title: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Last Updated Label
              </label>
              <input
                type="text"
                value={terms.lastUpdated}
                onChange={(e) => setTerms({ ...terms, lastUpdated: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Terms Text Content (Separate paragraphs with double newlines)
            </label>
            <textarea
              rows={12}
              value={terms.contentText}
              onChange={(e) => setTerms({ ...terms, contentText: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white font-mono focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Terms & Conditions'}
          </button>
        </form>
      )}

      {/* Tab 3: Contact Details */}
      {activeTab === 'contactInfo' && (
        <form onSubmit={handleSaveContact} className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
          <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
            Company Contact Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                City
              </label>
              <input
                type="text"
                value={contact.city}
                onChange={(e) => setContact({ ...contact, city: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
                State
              </label>
              <input
                type="text"
                value={contact.state}
                onChange={(e) => setContact({ ...contact, state: e.target.value })}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Head Office Address Lines (One per line)
            </label>
            <textarea
              rows={4}
              value={contact.addressLines}
              onChange={(e) => setContact({ ...contact, addressLines: e.target.value })}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white font-mono focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-brand-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Contact Details'}
          </button>
        </form>
      )}
    </div>
  )
}
