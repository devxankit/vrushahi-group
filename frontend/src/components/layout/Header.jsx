import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { menuPanel } from '@/components/motion/variants'
import { getPrimaryNav } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'
import Logo from './Logo'
import { AboutPanel, GroupPanel } from './MegaMenu'
import MobileDrawer from './MobileDrawer'

/** How long the panel stays open after the pointer leaves, so diagonal travel works. */
const CLOSE_DELAY_MS = 140

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const closeTimer = useRef(null)
  const scrolled = useScrolled(8)
  const { pathname } = useLocation()

  const nav = getPrimaryNav()

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const closeMenu = useCallback(() => {
    cancelClose()
    setOpenMenu(null)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS)
  }, [cancelClose])

  const openMenuNow = useCallback(
    (id) => {
      cancelClose()
      setOpenMenu(id)
    },
    [cancelClose]
  )

  // Any navigation dismisses both the dropdown and the drawer.
  useEffect(() => {
    setOpenMenu(null)
    setDrawerOpen(false)
  }, [pathname])

  // Escape closes the open dropdown.
  useEffect(() => {
    if (!openMenu) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openMenu])

  useEffect(() => () => cancelClose(), [cancelClose])

  const isActive = (item) =>
    item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 bg-white transition-shadow duration-300',
          scrolled
            ? 'shadow-[0_1px_0_0_rgb(215_215_215/1),0_8px_24px_-12px_rgb(23_23_23/.18)]'
            : 'border-b border-ink-200'
        )}
      >
        <Container width="wide">
          <div
            className={cn(
              'flex items-center justify-between gap-6 transition-[height] duration-300',
              scrolled ? 'h-16' : 'h-20'
            )}
          >
            <Logo />

            {/* Desktop navigation */}
            <nav
              aria-label="Primary"
              className="hidden lg:block"
              onMouseLeave={scheduleClose}
            >
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const active = isActive(item)

                  if (!item.children) {
                    return (
                      <li key={item.id}>
                        <Link
                          to={item.to}
                          className={cn(
                            'relative flex h-10 items-center rounded-lg px-3.5 text-sm font-medium transition-colors duration-200',
                            active ? 'text-brand-700' : 'text-ink-600 hover:text-ink-900'
                          )}
                        >
                          {item.label}
                          {active ? <ActiveUnderline /> : null}
                        </Link>
                      </li>
                    )
                  }

                  const expanded = openMenu === item.children

                  return (
                    <li
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => openMenuNow(item.children)}
                    >
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        aria-controls={`menu-${item.children}`}
                        onClick={() =>
                          expanded ? closeMenu() : openMenuNow(item.children)
                        }
                        onFocus={() => openMenuNow(item.children)}
                        className={cn(
                          'relative flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-sm font-medium transition-colors duration-200',
                          active || expanded
                            ? 'text-brand-700'
                            : 'text-ink-600 hover:text-ink-900'
                        )}
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: expanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex"
                        >
                          <Icon name="chevronDown" size={15} />
                        </motion.span>
                        {active ? <ActiveUnderline /> : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Button to="/contact" size="sm" className="hidden sm:inline-flex">
                Get in touch
              </Button>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-ink-100 lg:hidden"
              >
                <Icon name="menu" size={22} />
              </button>
            </div>
          </div>
        </Container>

        {/* Dropdown / mega-menu panels */}
        <AnimatePresence>
          {openMenu ? (
            <motion.div
              key={openMenu}
              id={`menu-${openMenu}`}
              variants={menuPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute inset-x-0 top-full hidden justify-center lg:flex"
            >
              <div className="mx-6 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card-hover">
                {openMenu === 'about' ? (
                  <AboutPanel onNavigate={closeMenu} />
                ) : (
                  <GroupPanel onNavigate={closeMenu} />
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

/** Shared active-item underline; layoutId slides it between nav items. */
function ActiveUnderline() {
  return (
    <motion.span
      layoutId="nav-active-underline"
      className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-brand-500"
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
    />
  )
}
