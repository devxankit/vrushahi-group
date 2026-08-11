import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import SocialIcons from '@/components/ui/SocialIcons'
import Reveal from '@/components/motion/Reveal'
import { getFooterColumns } from '@/data/navigation'
import { formatCopyrightYears, siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
import Logo from './Logo'

/**
 * Site footer (PRD B8).
 *
 * Modernises the legacy dark photographic footer into a solid deep-charcoal
 * treatment, and — critically — renders its Group column from the shared
 * navigation data, so all fifteen divisions are listed identically on every
 * page. The legacy footer listed a different, partial subset page-to-page and
 * carried stale labels like "Imort & Export" (PRD A2 / A9.7).
 *
 * The decorative newsletter mini-form is deliberately gone: it was never wired
 * to anything, and PRD B6.4 rules out shipping another dead form. Reinstate it
 * here if a mailing-list provider is chosen later.
 */
export default function Footer() {
  const columns = getFooterColumns()
  const { address, phone, phoneHref, email, emailHref } = siteConfig.contact

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white/70">
      {/* Soft brand wash instead of the legacy stretched background JPG. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-brand-500/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-amber-brand-500/8 blur-3xl"
      />

      <Container width="wide" className="relative">
        <Reveal className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo tone="light" />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {siteConfig.description}
            </p>

            <address className="mt-7 flex flex-col gap-3.5 text-sm not-italic">
              <span className="flex items-start gap-3">
                <Icon name="mapPin" size={17} className="mt-0.5 text-brand-500" />
                <span className="leading-relaxed">
                  {address.lines.join(', ')}
                  <br />
                  {address.city} {address.postalCode}, {address.state}, {address.country}
                </span>
              </span>

              <a
                href={phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="phone" size={17} className="text-brand-500" />
                {phone}
              </a>

              <a
                href={emailHref}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="mail" size={17} className="text-brand-500" />
                {email}
              </a>
            </address>

            <SocialIcons className="mt-7" />
          </div>

          {/* Nav columns — generated from the same data as the header */}
          {columns.map((column) => (
            <nav
              key={column.id}
              aria-label={column.title}
              className={cn(column.id === 'group' ? 'lg:col-span-4' : 'lg:col-span-2')}
            >
              <h2 className="font-display text-xs font-semibold tracking-[0.18em] text-white uppercase">
                {column.title}
              </h2>

              <ul
                className={cn(
                  'mt-5 flex flex-col gap-2.5 text-sm',
                  column.id === 'group' && 'sm:grid sm:grid-cols-2 sm:gap-x-6'
                )}
              >
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-block text-white/55 transition-colors duration-200 hover:text-amber-brand-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            Copyright © {formatCopyrightYears()} — {siteConfig.copyright.holder}. All
            Rights Reserved.
          </p>
          <p>
            Web Developed by{' '}
            <a
              href={siteConfig.copyright.developer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-amber-brand-400"
            >
              {siteConfig.copyright.developer.name}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
