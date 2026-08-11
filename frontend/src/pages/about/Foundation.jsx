import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import Prose from '@/components/ui/Prose'
import ContentPendingNotice from '@/components/ui/ContentPendingNotice'
import CtaBand from '@/components/home/CtaBand'
import { foundation } from '@/data/aboutContent'

/**
 * The legacy foundation.html was 100% OS-Templates boilerplate — no CSR or
 * foundation content has ever been written for it (PRD A3 #6, B10). The route
 * and shell exist; the copy is explicitly interim.
 *
 * The legacy nav opened this page in a new tab, which only made sense while it
 * was imagined as a separate microsite. It is an internal route here, so it
 * opens in place like every other page.
 */
export default function Foundation() {
  return (
    <>
      <Seo title={foundation.title} description={foundation.summary} />

      <PageHero
        eyebrow={foundation.eyebrow}
        title={foundation.title}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: foundation.navLabel },
        ]}
        badge={<Badge variant="pending">Content pending</Badge>}
      />

      <section className="py-20 sm:py-24">
        <Container width="prose">
          <ContentPendingNotice className="mb-10" />
          <Prose paragraphs={foundation.paragraphs} size="lg" />
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
