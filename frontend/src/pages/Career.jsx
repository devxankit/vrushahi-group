import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import Reveal from '@/components/motion/Reveal'
import CareerForm from '@/components/forms/CareerForm'
import { ourExperience } from '@/data/aboutContent'
import { businessUnits } from '@/data/businessUnits'

/**
 * Career page — PRD B5.
 *
 * The legacy career.html was OS-Templates boilerplate while the working
 * application form sat unlinked in career.php (A9.1). This is one page with the
 * real form.
 *
 * The supporting copy is the "Our Experience" paragraph from the legacy
 * homepage (A4.1), which is about how Vrushahi trains and develops its people —
 * genuinely written copy that belongs on a careers page. No new marketing copy
 * has been invented for this page.
 */
export default function Career() {
  return (
    <>
      <Seo
        title="Career"
        description="Apply to join the Vrushahi Group. Send us your details and resume and we’ll be in touch if there’s a match."
      />

      <PageHero
        eyebrow="Career"
        title="Build your career with Vrushahi"
        description="Send us your details and your resume, and we’ll be in touch if there’s a match across any of our divisions."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Career' }]}
        image={{
          alt: 'Energetic professionals collaborating in modern Vrushahi Group workspace',
          label: 'Career',
          src: '/images/career-hero.png',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="left" className="lg:col-span-5">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Why Vrushahi
              </h2>

              <p className="mt-5 leading-relaxed text-ink-600">{ourExperience.body}</p>

              <ul className="mt-9 flex flex-col gap-4">
                <li className="flex gap-3.5">
                  <Icon name="check" size={19} className="mt-0.5 shrink-0 text-success" />
                  <span className="leading-relaxed text-ink-600">
                    {businessUnits.length} divisions across agriculture, technology,
                    media, infrastructure and education.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <Icon name="check" size={19} className="mt-0.5 shrink-0 text-success" />
                  <span className="leading-relaxed text-ink-600">
                    Regular training to upgrade technical and management skills.
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <Icon name="check" size={19} className="mt-0.5 shrink-0 text-success" />
                  <span className="leading-relaxed text-ink-600">
                    Accredited certification and practical, on-the-job knowledge.
                  </span>
                </li>
              </ul>

              <div className="mt-10 rounded-2xl border border-ink-200 bg-ink-50 p-5">
                <p className="text-sm leading-relaxed text-ink-500">
                  <span className="font-medium text-ink-700">
                    No specific role in mind?{' '}
                  </span>
                  Apply anyway — tell us the kind of work you’re looking for in the “Role
                  you’re applying for” field.
                </p>
              </div>
            </Reveal>

            <Reveal variant="right" delay={0.08} className="lg:col-span-7">
              <div className="rounded-4xl border border-ink-200 bg-white p-7 shadow-card sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-ink-900">
                  Apply now
                </h2>
                <p className="mt-2 mb-8 text-sm text-ink-500">
                  All fields are required, including your resume.
                </p>

                <CareerForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
