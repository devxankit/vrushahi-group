import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import CtaBand from '@/components/home/CtaBand'
import { visionMission } from '@/data/aboutContent'

/** Copy is PRD A4.3, reproduced verbatim. */
export default function VisionMission() {
  return (
    <>
      <Seo title={visionMission.title} description={visionMission.summary} />

      <PageHero
        eyebrow={visionMission.eyebrow}
        title={visionMission.title}
        description={visionMission.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: visionMission.navLabel },
        ]}
        image={{
          alt: 'Strategic vision of Vrushahi Group soaring corporate architecture',
          label: visionMission.title,
          src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <StaggerGroup className="grid gap-6 lg:grid-cols-2" stagger={0.12}>
            {visionMission.statements.map((statement, index) => (
              <StaggerItem key={statement.id} variant="rise">
                <article className="relative flex h-full flex-col gap-5 overflow-hidden rounded-4xl border border-ink-200 bg-white p-9 shadow-card sm:p-11">
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 -right-2 font-display text-[7rem] leading-none font-bold text-ink-100 select-none"
                  >
                    0{index + 1}
                  </span>

                  <h2 className="relative font-display text-xs font-semibold tracking-[0.2em] text-brand-700 uppercase">
                    {statement.label}
                  </h2>

                  <p className="relative text-lg leading-relaxed text-ink-700 sm:text-xl">
                    {statement.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
