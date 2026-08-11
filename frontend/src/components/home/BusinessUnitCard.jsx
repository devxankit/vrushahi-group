import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import Icon from '@/components/ui/Icon'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { unitPath } from '@/data/businessUnits'

/**
 * One division tile.
 *
 * The whole card is a single <Link>, which is what structurally kills legacy bug
 * A9.2: on the old homepage the tile image and the tile heading were separate
 * anchors maintained by hand, and three of them (Industries, Beverages, VES
 * Exam) had images still pointing at VRUMARKET.html. With one link built from
 * `unit.slug` the image and the heading cannot disagree.
 */
export default function BusinessUnitCard({ unit }) {
  const isPending = unit.contentStatus === 'placeholder'

  return (
    <Link
      to={unitPath(unit)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-card-hover"
    >
      <div className="relative overflow-hidden">
        <PlaceholderImage
          alt={unit.heroImageAlt}
          label={unit.shortLabel}
          src={unit.heroImage}
          status={unit.imageStatus}
          aspect="aspect-[16/10]"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />

        {unit.cluster ? (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-ink-600 uppercase backdrop-blur-sm">
            {unit.cluster}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
            {unit.shortLabel}
          </h3>
          {isPending ? <Badge variant="pending">Content pending</Badge> : null}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-ink-500">{unit.summary}</p>

        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 opacity-0 transition-all duration-300 group-hover:opacity-100 max-md:opacity-100">
          View division
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  )
}
