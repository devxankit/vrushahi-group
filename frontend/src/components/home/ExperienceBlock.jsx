import Container from '@/components/ui/Container'
import Reveal from '@/components/motion/Reveal'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import Button from '@/components/ui/Button'
import { ourExperience } from '@/data/aboutContent'

/**
 * "Our Experience" — the one piece of genuinely authored copy on the legacy
 * homepage (PRD A4.1). Reproduced verbatim; only the presentation is new.
 */
export default function ExperienceBlock() {
  return (
    <section className="border-y border-ink-200 bg-ink-50 py-20 sm:py-28">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="left">
            <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">
              <span aria-hidden="true" className="h-px w-7 bg-brand-500/50" />
              {ourExperience.eyebrow}
            </span>

            <h2 className="mt-4 text-display-sm sm:text-display-md">
              {ourExperience.title}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-ink-500 sm:text-lg">
              {ourExperience.body}
            </p>

            <Button
              to="/about/company-profile"
              variant="outline"
              icon="arrowRight"
              className="mt-8"
            >
              About the group
            </Button>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div className="overflow-hidden rounded-4xl shadow-card">
              <PlaceholderImage
                alt="Vrushahi team members in training or at work across the group's divisions"
                label="Our people"
                src="/images/experience-people.png"
                status="final"
                aspect="aspect-[4/3]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
