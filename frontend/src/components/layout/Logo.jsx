import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
import logoMark from '@/assets/logo-mark.png'
import logoTransparent from '@/assets/logo-transparent.png'

/**
 * Vrushahi Group Brand Logo component using the official logo artwork.
 */
export default function Logo({ tone = 'dark', variant = 'mark', className }) {
  const onDark = tone === 'light'

  if (variant === 'full') {
    return (
      <Link
        to="/"
        aria-label={`${siteConfig.name} — home.`}
        className={cn('group flex items-center', className)}
      >
        <img
          src={logoTransparent}
          alt={siteConfig.name}
          className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    )
  }

  return (
    <Link
      to="/"
      aria-label={`${siteConfig.name} — home.`}
      className={cn('group flex items-center gap-3', className)}
    >
      <img
        src={logoMark}
        alt="Vrushahi Group Logo"
        className="h-10 w-10 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-base font-bold tracking-tight sm:text-lg',
            onDark ? 'text-white' : 'text-ink-900'
          )}
        >
          VRUSHAHI
        </span>
        <span
          className={cn(
            'text-[11px] font-semibold tracking-[0.28em]',
            onDark ? 'text-white/55' : 'text-ink-400'
          )}
        >
          GROUP
        </span>
      </span>
    </Link>
  )
}

