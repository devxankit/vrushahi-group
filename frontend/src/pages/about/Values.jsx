import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import CtaBand from '@/components/home/CtaBand'
import { values } from '@/data/aboutContent'

/** Copy is PRD A4.4, reproduced verbatim. */
export default function Values() {
  return (
    <>
      <Seo title={values.title} description={values.summary} />

      <PageHero
        eyebrow={values.eyebrow}
        title={values.title}
        description={values.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: values.navLabel },
        ]}
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <StaggerGroup className="grid gap-6 lg:grid-cols-3" stagger={0.1}>
            {values.pillars.map((pillar, index) => (
              <StaggerItem key={pillar.id} variant="rise">
                <article className="flex h-full flex-col gap-4 rounded-3xl border border-ink-200 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-amber-brand-500 font-display text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <h2 className="font-display text-xl font-semibold text-ink-900">
                    {pillar.title}
                  </h2>

                  <p className="text-base leading-relaxed text-ink-600">{pillar.body}</p>
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
