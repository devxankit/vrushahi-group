import { Link } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import Icon from '@/components/ui/Icon'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import CtaBand from '@/components/home/CtaBand'
import { aboutPages, aboutPath } from '@/data/aboutContent'

/**
 * /about — an overview page the legacy site never had (the "About" nav item was
 * a dropdown with no landing page of its own).
 */
export default function AboutIndex() {
  return (
    <>
      <Seo
        title="About"
        description="Company profile, vision and mission, values and corporate strategies of the Vrushahi Group."
      />

      <PageHero
        eyebrow="About Vrushahi"
        title="A group built on people, values and long-term thinking"
        description="Vrushahi is a board-managed professional company committed to creating enduring value for the nation and the shareholder, with a culture rooted in respect for people and belief in empowerment."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        image={{
          alt: 'Vrushahi Group leadership corporate overview and architecture',
          label: 'About Vrushahi',
          src: '/images/about-company-profile.png',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <StaggerGroup as="ul" className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
            {aboutPages.map((page) => (
              <StaggerItem as="li" key={page.slug} variant="rise" className="h-full">
                <Link
                  to={aboutPath(page)}
                  className="group flex h-full flex-col gap-3 rounded-3xl border border-ink-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl font-semibold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                      {page.title}
                    </h2>
                    {page.contentStatus === 'placeholder' ? (
                      <Badge variant="pending">Content pending</Badge>
                    ) : null}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-ink-500">
                    {page.summary}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    Read more
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

      <CtaBand />
    </>
  )
}
