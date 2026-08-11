import { Link, useParams } from 'react-router-dom'
import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Prose from '@/components/ui/Prose'
import SectionHeading from '@/components/ui/SectionHeading'
import ContentPendingNotice from '@/components/ui/ContentPendingNotice'
import Reveal from '@/components/motion/Reveal'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import BusinessUnitGrid from '@/components/home/BusinessUnitGrid'
import CtaBand from '@/components/home/CtaBand'
import NotFound from '@/pages/NotFound'
import { businessUnits, getBusinessUnit } from '@/data/businessUnits'

/**
 * The single template behind all 15 division pages (PRD B5).
 *
 * The legacy site had one ~340-line HTML file per division, each duplicating the
 * whole header/nav/footer. Adding a division here is adding an object to
 * data/businessUnits.js — this component and the /group/:slug route already
 * handle the rest.
 */
export default function BusinessUnitPage() {
  const { slug } = useParams()
  const unit = getBusinessUnit(slug)

  // Unknown slug → the 404 page, rendered in place so the URL is preserved.
  if (!unit) return <NotFound />

  const isPending = unit.contentStatus === 'placeholder'
  const related = businessUnits
    .filter((other) => other.slug !== unit.slug)
    .filter((other) => (unit.cluster ? other.cluster === unit.cluster : !other.cluster))
    .slice(0, 3)

  return (
    <>
      <Seo title={unit.name} description={unit.summary} />

      <PageHero
        eyebrow={unit.cluster ?? 'Vrushahi Group'}
        title={unit.name}
        description={isPending ? undefined : unit.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Group', to: '/group' },
          { label: unit.shortLabel },
        ]}
        badge={isPending ? <Badge variant="pending">Content pending</Badge> : null}
        image={{
          alt: unit.heroImageAlt,
          label: unit.shortLabel,
          src: unit.heroImage,
          status: unit.imageStatus,
        }}
        actions={
          unit.externalSiteUrl ? (
            <Button href={unit.externalSiteUrl} size="lg">
              Visit the {unit.shortLabel} website
            </Button>
          ) : null
        }
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              {isPending ? <ContentPendingNotice className="mb-10" /> : null}

              <Prose paragraphs={unit.body} size="lg" />

              {unit.sections?.map((section) => (
                <div key={section.title} className="mt-16">
                  <SectionHeading title={section.title} />

                  {section.body ? (
                    <Prose paragraphs={section.body} className="mt-6" />
                  ) : null}

                  {section.items ? (
                    <StaggerGroup className="mt-8 flex flex-col gap-4" stagger={0.07}>
                      {section.items.map((item) => (
                        <StaggerItem
                          key={item.title}
                          className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                        >
                          <h3 className="font-display text-lg font-semibold text-ink-900">
                            {item.title}
                          </h3>
                          <p className="mt-2.5 leading-relaxed text-ink-600">
                            {item.body}
                          </p>
                          {item.cta ? (
                            <Link
                              to={item.cta.to}
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
                            >
                              {item.cta.label}
                              <Icon name="arrowRight" size={16} />
                            </Link>
                          ) : null}
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  ) : null}
                </div>
              ))}

              {unit.subPage ? (
                <Reveal className="mt-14">
                  <Link
                    to={unit.subPage.to}
                    className="group flex items-center justify-between gap-6 rounded-3xl border border-ink-200 bg-ink-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-card-hover"
                  >
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                        {unit.subPage.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">
                        {unit.subPage.description}
                      </p>
                    </div>
                    <Icon
                      name="arrowRight"
                      size={22}
                      className="shrink-0 text-brand-600 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Reveal>
              ) : null}
            </div>

            {/* Sidebar */}
            <Reveal variant="right" className="lg:col-span-4">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card">
                  <h2 className="font-display text-xs font-semibold tracking-[0.18em] text-ink-400 uppercase">
                    Division
                  </h2>

                  <dl className="mt-5 flex flex-col gap-4 text-sm">
                    <div>
                      <dt className="text-ink-400">Name</dt>
                      <dd className="mt-0.5 font-medium text-ink-900">{unit.name}</dd>
                    </div>

                    {unit.cluster ? (
                      <div>
                        <dt className="text-ink-400">Cluster</dt>
                        <dd className="mt-0.5 font-medium text-ink-900">
                          {unit.cluster}
                        </dd>
                      </div>
                    ) : null}

                    {unit.externalSiteUrl ? (
                      <div>
                        <dt className="text-ink-400">Website</dt>
                        <dd className="mt-0.5">
                          <a
                            href={unit.externalSiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium break-all text-brand-700 hover:text-brand-800"
                          >
                            {unit.externalSiteUrl.replace(/^https?:\/\//, '')}
                            <Icon name="arrowUpRight" size={14} />
                          </a>
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  <Button to="/contact" variant="outline" fullWidth className="mt-7">
                    Enquire about this division
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="border-t border-ink-200 bg-ink-50 py-20 sm:py-24">
          <Container width="wide">
            <SectionHeading
              eyebrow="Explore more"
              title={unit.cluster ? `More in ${unit.cluster}` : 'Other divisions'}
            />
            <div className="mt-10">
              <BusinessUnitGrid units={related} />
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  )
}
