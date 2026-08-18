import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Prose from '@/components/ui/Prose'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import Reveal from '@/components/motion/Reveal'
import CtaBand from '@/components/home/CtaBand'
import { companyProfile } from '@/data/aboutContent'

/** Copy is PRD A4.2, reproduced verbatim. */
export default function CompanyProfile() {
  return (
    <>
      <Seo title={companyProfile.title} description={companyProfile.summary} />

      <PageHero
        eyebrow={companyProfile.eyebrow}
        title={companyProfile.title}
        description={companyProfile.summary}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: companyProfile.navLabel },
        ]}
        image={{
          alt: 'Vrushahi Group Corporate Head Office and Boardroom',
          label: companyProfile.title,
          src: '/images/about-company-profile.png',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Prose paragraphs={companyProfile.paragraphs} size="lg" />
            </div>

            <Reveal variant="right" className="lg:col-span-5">
              <div className="overflow-hidden rounded-4xl shadow-card">
                <PlaceholderImage
                  alt="Vrushahi Group leadership and team at the Sangli head office"
                  label="Company profile"
                  src="/images/about-company-profile.png"
                  status="final"
                  aspect="aspect-[4/5]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
