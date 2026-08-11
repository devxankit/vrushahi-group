import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Hero from '@/components/home/Hero'
import ValueProps from '@/components/home/ValueProps'
import ExperienceBlock from '@/components/home/ExperienceBlock'
import BusinessUnitGrid from '@/components/home/BusinessUnitGrid'
import CtaBand from '@/components/home/CtaBand'
import { businessUnits } from '@/data/businessUnits'
import { siteConfig } from '@/config/site'

export default function Home() {
  return (
    <>
      <Seo
        title="Diversified Business Conglomerate in Sangli"
        description={siteConfig.description}
      />

      {/* The page's single <h1> lives in the hero — the legacy pages carried
          several per page (PRD B7). */}
      <Hero />
      <ValueProps />
      <ExperienceBlock />

      <section className="py-20 sm:py-28">
        <Container width="wide">
          <SectionHeading
            eyebrow="Our Group"
            title={`${businessUnits.length} divisions, one group`}
            description="Vrushahi operates across agriculture and export, financial technology, digital marketing, events and entertainment, mining, infrastructure, pharmaceuticals, education and IT."
          />

          <div className="mt-14">
            <BusinessUnitGrid />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
