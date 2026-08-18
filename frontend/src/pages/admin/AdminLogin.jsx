import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Icon from '@/components/ui/Icon'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@vrushahi.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setIsSubmitting(true)
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-ink-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-amber-brand-500 font-display text-2xl font-bold text-white shadow-lg">
            V
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold text-white">
            Admin Console Login
          </h2>
          <p className="mt-2 text-xs text-ink-400">
            Sign in to manage Vrushahi Group divisions, submissions, and website content.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
            <Icon name="alertTriangle" size={18} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-ink-300 uppercase mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand-500 focus:bg-white/10 focus:outline-none transition-all"
                placeholder="admin@vrushahi.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider text-ink-300 uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-brand-500 focus:bg-white/10 focus:outline-none transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-amber-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-brand-500 hover:to-amber-brand-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <Icon name="arrowRight" size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center text-[11px] text-ink-400">
          🔒 Restricted portal. Default Admin Credentials: <br />
          <span className="font-mono text-brand-300">admin@vrushahi.com</span> /{' '}
          <span className="font-mono text-amber-brand-300">Admin@123456</span>
        </div>
      </div>
    </div>
  )
}
