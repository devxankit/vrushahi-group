import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Placeholder logo lockup.
 *
 * Like every other image on the site, the logo is a placeholder — no legacy
 * artwork is carried over. The mark carries a dashed ring and a title/aria note
 * so it reads unmistakably as provisional without disfiguring the header.
 *
 * TO REPLACE: drop the final asset in /public, swap the <span> mark below for
 * an <img>, and remove the dashed ring. Nothing else references the mark.
 */
export default function Logo({ tone = 'dark', className }) {
  const onDark = tone === 'light'

  return (
    <Link
      to="/"
      aria-label={`${siteConfig.name} — home. Placeholder logo, final artwork pending.`}
      className={cn('group flex items-center gap-3', className)}
    >
      <span
        title="Placeholder logo — final artwork pending"
        aria-hidden="true"
        className={cn(
          'grid h-10 w-10 place-items-center rounded-xl border-2 border-dashed',
          'bg-gradient-to-br from-brand-500 to-amber-brand-500',
          'font-display text-lg font-bold text-white',
          'transition-transform duration-300 group-hover:scale-105',
          onDark ? 'border-white/40' : 'border-ink-300'
        )}
      >
        V
      </span>

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
