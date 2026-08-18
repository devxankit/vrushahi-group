import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { updateAdminProfile, changeAdminPassword } from '@/services/api'
import Icon from '@/components/ui/Icon'

export default function AdminProfile() {
  const { user, setUser } = useAuth()

  const [name, setName] = useState(user?.name || 'Administrator')
  const [email, setEmail] = useState(user?.email || 'admin@vrushahi.com')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' })

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' })

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileMessage({ type: '', text: '' })

    try {
      setProfileSaving(true)
      const data = await updateAdminProfile({ name, email })
      setUser(data.user)
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (err) {
      setProfileMessage({ type: 'error', text: err.message || 'Failed to update profile.' })
    } finally {
      setProfileSaving(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordMessage({ type: '', text: '' })

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' })
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters.' })
      return
    }

    try {
      setPasswordSaving(true)
      await changeAdminPassword({ currentPassword, newPassword })
      setPasswordMessage({ type: 'success', text: 'Password changed successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setPasswordMessage({ type: 'error', text: err.message || 'Failed to change password.' })
    } finally {
      setPasswordSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Admin Profile & Security</h1>
        <p className="text-xs text-ink-400">
          Manage your account details and update your administrative login credentials.
        </p>
      </div>

      {/* Form 1: Account Information */}
      <form onSubmit={handleProfileSubmit} className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
        <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
          Account Information
        </h2>

        {profileMessage.text && (
          <div
            className={`flex items-center justify-between rounded-xl p-3.5 text-xs font-medium ${
              profileMessage.type === 'success'
                ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            <span>{profileMessage.text}</span>
            <button type="button" onClick={() => setProfileMessage({ type: '', text: '' })}>
              <Icon name="close" size={16} />
            </button>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Full Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={profileSaving}
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
        >
          {profileSaving ? 'Saving...' : 'Update Account Info'}
        </button>
      </form>

      {/* Form 2: Password Reset */}
      <form onSubmit={handlePasswordSubmit} className="rounded-3xl border border-white/10 bg-ink-900/80 p-6 space-y-5">
        <h2 className="font-display text-base font-bold text-white border-b border-white/10 pb-3">
          Change Password
        </h2>

        {passwordMessage.text && (
          <div
            className={`flex items-center justify-between rounded-xl p-3.5 text-xs font-medium ${
              passwordMessage.type === 'success'
                ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            <span>{passwordMessage.text}</span>
            <button type="button" onClick={() => setPasswordMessage({ type: '', text: '' })}>
              <Icon name="close" size={16} />
            </button>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="••••••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="••••••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink-300 uppercase mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-brand-500 focus:outline-none"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={passwordSaving}
          className="rounded-xl bg-amber-brand-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-brand-500 disabled:opacity-50"
        >
          {passwordSaving ? 'Updating...' : 'Change Password'}
        </button>
      </form>
    </div>
  )
}
