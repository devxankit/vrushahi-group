import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import BusinessUnitGrid from '@/components/home/BusinessUnitGrid'
import CtaBand from '@/components/home/CtaBand'
import { CLUSTER_ORDER, businessUnits, getUnitsByCluster } from '@/data/businessUnits'

/**
 * /group — the divisions overview. Recommended as an addition in PRD B3; the
 * legacy site had no landing page behind the "Group" nav item.
 */
export default function GroupIndex() {
  const standalone = businessUnits.filter((unit) => !unit.cluster)

  return (
    <>
      <Seo
        title="Our Group"
        description={`The ${businessUnits.length} divisions of the Vrushahi Group, spanning agriculture and export, financial technology, digital marketing, events and entertainment, mining, infrastructure, pharmaceuticals, education and IT.`}
      />

      <PageHero
        eyebrow="Our Group"
        title={`${businessUnits.length} divisions, one group`}
        description="Several divisions run their own operations and microsites. This is the full list, grouped the way the business is organised."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Group' }]}
      />

      {CLUSTER_ORDER.map((cluster, index) => {
        const units = getUnitsByCluster(cluster)
        if (!units.length) return null

        return (
          <section
            key={cluster}
            className={
              index % 2 === 0
                ? 'py-16 sm:py-20'
                : 'border-y border-ink-200 bg-ink-50 py-16 sm:py-20'
            }
          >
            <Container width="wide">
              <SectionHeading eyebrow="Cluster" title={cluster} />
              <div className="mt-10">
                <BusinessUnitGrid units={units} />
              </div>
            </Container>
          </section>
        )
      })}

      <section className="py-16 sm:py-20">
        <Container width="wide">
          <SectionHeading eyebrow="Also in the group" title="Independent divisions" />
          <div className="mt-10">
            <BusinessUnitGrid units={standalone} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
