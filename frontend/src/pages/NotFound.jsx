import Seo from '@/components/seo/Seo'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" noIndex />

      <Container width="prose" className="py-28 text-center sm:py-36">
        <Reveal>
          <p className="font-display text-display-lg brand-gradient-text">404</p>

          <h1 className="mt-4 text-display-sm">This page doesn’t exist</h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-500">
            The page you’re looking for may have been moved or renamed. The old site’s
            URLs have all changed in this rebuild.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" icon="arrowRight">
              Back to home
            </Button>
            <Button to="/group" variant="outline">
              Browse divisions
            </Button>
          </div>
        </Reveal>
      </Container>
    </>
  )
}
