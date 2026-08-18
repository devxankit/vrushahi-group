import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import CtaBand from '@/components/home/CtaBand'
import { corporateStrategies } from '@/data/aboutContent'

/** Copy is PRD A4.5, reproduced verbatim. */
export default function CorporateStrategies() {
  return (
    <>
      <Seo title={corporateStrategies.title} description={corporateStrategies.summary} />

      <PageHero
        eyebrow={corporateStrategies.eyebrow}
        title={corporateStrategies.title}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: corporateStrategies.navLabel },
        ]}
        image={{
          alt: 'Corporate Board Directors reviewing Vrushahi Group strategic goals',
          label: corporateStrategies.title,
          src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="prose">
          <Reveal as="p" className="text-lg leading-relaxed text-ink-600 sm:text-xl">
            {corporateStrategies.intro}
          </Reveal>

          <Reveal
            as="h2"
            delay={0.08}
            className="mt-14 font-display text-xs font-semibold tracking-[0.2em] text-brand-700 uppercase"
          >
            {corporateStrategies.listIntro}
          </Reveal>

          <StaggerGroup as="ol" className="mt-7 flex flex-col gap-4" stagger={0.07}>
            {corporateStrategies.strategies.map((strategy, index) => (
              <StaggerItem
                as="li"
                key={strategy.slice(0, 40)}
                className="flex gap-5 rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-bold text-brand-500 tabular-nums"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="flex-1 leading-relaxed text-ink-600">{strategy}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
