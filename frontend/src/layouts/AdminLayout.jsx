import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Icon from '@/components/ui/Icon'

const adminNavItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'grid' },
  { label: 'Divisions Manager', path: '/admin/divisions', icon: 'building' },
  { label: 'Contact Submissions', path: '/admin/contact-submissions', icon: 'mail' },
  { label: 'Career Applications', path: '/admin/career-applications', icon: 'userCheck' },
  { label: 'Site Content & Settings', path: '/admin/settings', icon: 'settings' },
  { label: 'Profile & Security', path: '/admin/profile', icon: 'user' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 flex flex-col font-sans antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-ink-900/90 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/75 hover:bg-white/5 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-amber-brand-500 font-display text-base font-bold text-white shadow-md">
              V
            </span>
            <div className="hidden sm:block">
              <span className="font-display text-base font-semibold tracking-wide text-white block leading-tight">
                VRUSHAHI
              </span>
              <span className="text-[10px] font-medium tracking-widest text-brand-400 uppercase block">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon name="externalLink" size={14} />
            View Live Site
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="hidden md:inline text-xs font-medium text-white/90">
              {user?.name || 'Administrator'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/20"
            title="Sign out of admin session"
          >
            <Icon name="logOut" size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-ink-900/50 p-4 lg:block">
          <nav className="flex flex-col gap-1.5">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600/20 border border-brand-500/30 text-white font-semibold shadow-sm'
                      : 'text-ink-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon name={item.icon} size={18} className="shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Sidebar Mobile */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative flex w-72 flex-col border-r border-white/10 bg-ink-900 p-5 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-base font-semibold text-white">
                  Admin Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-ink-400 hover:text-white"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {adminNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-md'
                          : 'text-ink-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Admin Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-ink-950 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
