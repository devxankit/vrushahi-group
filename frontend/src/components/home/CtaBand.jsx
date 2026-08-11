import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'

/**
 * Closing call-to-action strip, shared by the home page and the division pages.
 */
export default function CtaBand({
  eyebrow = 'Get in touch',
  title = 'Let’s talk about working together',
  description = 'Whether you are a partner, a client or looking to join the team, we would like to hear from you.',
}) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container width="wide">
        <Reveal className="relative overflow-hidden rounded-4xl bg-ink-950 px-7 py-14 sm:px-14 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-amber-brand-500/10 blur-3xl"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-amber-brand-400 uppercase">
                <span aria-hidden="true" className="h-px w-7 bg-amber-brand-400/60" />
                {eyebrow}
              </span>

              <h2 className="mt-4 text-display-sm text-white">{title}</h2>

              <p className="mt-4 text-base leading-relaxed text-white/65">
                {description}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg" icon="arrowRight">
                Contact us
              </Button>
              <Button to="/career" size="lg" variant="onDark">
                View careers
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
