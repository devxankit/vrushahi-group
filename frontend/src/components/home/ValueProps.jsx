import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import { getBusinessUnit, unitPath } from '@/data/businessUnits'

/**
 * Three feature teasers under the hero.
 *
 * The legacy homepage had this same trio — Events, Import-Export and Majha ATM
 * — but every word of their copy was lorem ipsum (PRD A4.1), so there is
 * nothing to migrate and nothing may be invented in its place. Instead each
 * teaser pulls the real one-line summary straight off its division in the data
 * model, so the block carries genuine copy and updates itself if a summary
 * changes.
 */
const FEATURED = [
  { slug: 'events', icon: 'building' },
  { slug: 'import-export', icon: 'arrowUpRight' },
  { slug: 'financial-technologies', icon: 'phone' },
]

export default function ValueProps() {
  const featured = FEATURED.map((entry) => ({
    ...entry,
    unit: getBusinessUnit(entry.slug),
  })).filter((entry) => entry.unit)

  return (
    <section className="relative z-10 -mt-16 pb-20 sm:-mt-20 sm:pb-24">
      <Container width="wide">
        <StaggerGroup className="grid gap-5 md:grid-cols-3" stagger={0.1}>
          {featured.map(({ slug, icon, unit }) => (
            <StaggerItem key={slug} variant="rise">
              <Link
                to={unitPath(unit)}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-ink-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={icon} size={22} />
                </span>

                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {unit.shortLabel}
                </h3>

                <p className="flex-1 text-sm leading-relaxed text-ink-500">
                  {unit.summary}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                  Learn more
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  )
}
