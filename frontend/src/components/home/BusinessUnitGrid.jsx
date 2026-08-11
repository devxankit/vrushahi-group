import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import { businessUnits } from '@/data/businessUnits'
import BusinessUnitCard from './BusinessUnitCard'

/**
 * The full division grid, rendered from the shared data array with a staggered
 * entrance (PRD B12).
 *
 * The legacy grid was 14 hand-written tiles for 15 divisions, three of which
 * linked to the wrong page. This maps over the data, so it is always complete
 * and always correct.
 */
export default function BusinessUnitGrid({ units = businessUnits, className }) {
  return (
    <StaggerGroup
      as="ul"
      stagger={0.06}
      className={className ?? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}
    >
      {units.map((unit) => (
        <StaggerItem as="li" key={unit.slug} variant="rise" className="h-full">
          <BusinessUnitCard unit={unit} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
