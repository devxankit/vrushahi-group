import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ContentPendingNotice from '@/components/ui/ContentPendingNotice'
import Reveal from '@/components/motion/Reveal'
import StaggerGroup from '@/components/motion/StaggerGroup'
import StaggerItem from '@/components/motion/StaggerItem'
import CtaBand from '@/components/home/CtaBand'
import { contractFarming } from '@/data/contractFarming'

/**
 * /group/agriculture/contract-farming
 *
 * The orphaned Agri1.html article, promoted to a real page (PRD B11.6 — the
 * client chose a dedicated sub-page over folding it into the Agriculture page).
 *
 * The three section headings are verbatim from the PRD; the bullet text is not
 * in the PRD and the legacy folder is not available, so the points are empty and
 * the page says so. Fill in data/contractFarming.js to complete it.
 */
export default function ContractFarming() {
  const isPending = contractFarming.contentStatus === 'placeholder'

  return (
    <>
      <Seo title={contractFarming.title} description={contractFarming.summary} />

      <PageHero
        eyebrow={contractFarming.eyebrow}
        title={contractFarming.title}
        description={contractFarming.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Group', to: '/group' },
          { label: contractFarming.parent.label, to: contractFarming.parent.to },
          { label: contractFarming.title },
        ]}
        badge={isPending ? <Badge variant="pending">Content pending</Badge> : null}
        image={{
          alt: 'Indian agricultural expert and local farmer in commercial farm field',
          label: 'Contract Farming',
          src: '/images/contract-farming.png',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="prose">
          {isPending ? (
            <ContentPendingNotice
              className="mb-12"
              title="This article is awaiting its source text"
              message="The Contract Farming article existed on the legacy site's unlinked Agri1.html page. Its section structure is preserved below, but the body text was not captured in the migration document and needs to be supplied before this page goes live."
            />
          ) : null}

          <StaggerGroup className="flex flex-col gap-12" stagger={0.1}>
            {contractFarming.sections.map((section) => (
              <StaggerItem key={section.id} as="section">
                <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
                  {section.title}
                </h2>

                {section.points.length ? (
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {section.points.map((point) => (
                      <li key={point.slice(0, 40)} className="flex gap-3.5">
                        <Icon
                          name="chevronRight"
                          size={18}
                          className="mt-1 shrink-0 text-brand-500"
                        />
                        <span className="leading-relaxed text-ink-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5 rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-6">
                    <p className="text-sm leading-relaxed text-ink-500">
                      <span className="font-medium text-ink-700">Content pending. </span>
                      {section.pendingNote}
                    </p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16">
            <Button to={contractFarming.parent.to} variant="outline" icon="arrowRight">
              Back to {contractFarming.parent.label}
            </Button>
          </Reveal>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
