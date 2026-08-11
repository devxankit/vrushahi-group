import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import PlaceholderImage from '@/components/ui/PlaceholderImage'
import { EASE_OUT, heroLine, staggerContainer } from '@/components/motion/variants'
import { businessUnits } from '@/data/businessUnits'
import { siteConfig } from '@/config/site'

/**
 * Homepage hero — the full replacement for the legacy hero (PRD A4.1 / A9.8).
 *
 * The old one was a 1700×490 <iframe> pointing at slideshow.html, driven by a
 * cross-browser DHTML script using IE-only transition filters
 * (DXImageTransform.Microsoft.Wheel). None of that is portable and none of it
 * is ported. This is a static placeholder image with a slow Ken Burns drift and
 * scroll parallax, a line-by-line headline reveal and an animated scroll cue —
 * all transform/opacity only, and all disabled under prefers-reduced-motion.
 *
 * Copy is the legacy homepage's own, with its two typos fixed: "WELL COME To
 * VRUSHAHI GROUP" and the tagline "Technologie With Human Touch".
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Background drifts slower than the page; copy lifts away slightly faster.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const headlineLines = ['Technology with', 'a human touch']

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[min(88vh,46rem)] items-center overflow-hidden bg-ink-950"
    >
      {/* Placeholder hero image — swap via siteConfig/data when artwork arrives. */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: imageY }}
        className="absolute inset-0 -bottom-24"
      >
        <PlaceholderImage
          alt="Wide establishing shot representing the Vrushahi Group — its people, operations and facilities"
          label="Vrushahi Group — hero image"
          status="placeholder"
          tone="dark"
          aspect="h-full"
          kenBurns
          priority
          className="h-full w-full"
        />
      </motion.div>

      {/* Scrim keeps the copy legible over whatever photo lands here later. */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0" />

      <Container width="wide" className="relative py-24 sm:py-28">
        <motion.div
          style={
            prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }
          }
          className="max-w-3xl"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12)}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_OUT },
                },
              }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.14em] text-white/75 uppercase backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Welcome to Vrushahi Group
            </motion.p>

            <h1
              id="hero-heading"
              className="text-display-md text-white sm:text-display-lg lg:text-display-xl"
            >
              {headlineLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    variants={heroLine}
                    className={
                      index === headlineLines.length - 1
                        ? 'block brand-gradient-text'
                        : 'block'
                    }
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE_OUT },
                },
              }}
              className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: EASE_OUT },
                },
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/group" size="lg" icon="arrowRight">
                Explore our {businessUnits.length} divisions
              </Button>
              <Button to="/contact" size="lg" variant="onDark" icon={null}>
                Get in touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      <ScrollCue />
    </section>
  )
}

/** Animated affordance telling visitors there's more below the fold. */
function ScrollCue() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="absolute inset-x-0 bottom-7 hidden justify-center sm:flex"
    >
      <span className="flex flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-white/45 uppercase">
        Scroll
        <span className={prefersReducedMotion ? 'flex' : 'flex animate-float-cue'}>
          <Icon name="chevronDown" size={18} />
        </span>
      </span>
    </motion.div>
  )
}
