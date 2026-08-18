import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import SocialIcons from '@/components/ui/SocialIcons'
import Reveal from '@/components/motion/Reveal'
import ContactForm from '@/components/forms/ContactForm'
import MapEmbed from '@/components/contact/MapEmbed'
import { siteConfig } from '@/config/site'

/**
 * Contact page — PRD B5.
 *
 * Replaces both halves of the legacy split: contact-us.html (linked from the
 * nav, but pure template filler plus a working map) and contact-us.php (a real
 * working form linked from nowhere). One page, one real form, one map.
 */
export default function Contact() {
  const { address, phone, phoneHref, email, emailHref } = siteConfig.contact

  return (
    <>
      <Seo
        title="Contact Us"
        description={`Get in touch with the Vrushahi Group in ${address.city}, ${address.state} — by phone, email, or using the enquiry form.`}
      />

      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Tell us what you need and we’ll route your enquiry to the right division."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
        image={{
          alt: 'Luxury Vrushahi Group corporate head office reception',
          label: 'Contact Us',
          src: '/images/contact-hero.png',
          status: 'final',
        }}
      />

      <section className="py-20 sm:py-24">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Contact details */}
            <Reveal variant="left" className="lg:col-span-5">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Contact details
              </h2>

              <p className="mt-3 leading-relaxed text-ink-500">
                Our head office is in {address.city}, {address.state}. We normally reply
                within two working days.
              </p>

              <ul className="mt-9 flex flex-col gap-6">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name="mapPin" size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
                      Address
                    </p>
                    <address className="mt-1.5 leading-relaxed text-ink-700 not-italic">
                      {address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <span className="block">
                        {address.city} {address.postalCode}, {address.state}
                      </span>
                      <span className="block">{address.country}</span>
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name="phone" size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
                      Phone
                    </p>
                    <a
                      href={phoneHref}
                      className="mt-1.5 inline-block text-ink-700 transition-colors hover:text-brand-700"
                    >
                      {phone}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name="mail" size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
                      Email
                    </p>
                    <a
                      href={emailHref}
                      className="mt-1.5 inline-block text-ink-700 transition-colors hover:text-brand-700"
                    >
                      {email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10 border-t border-ink-200 pt-8">
                <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
                  Follow us
                </p>
                <SocialIcons className="[&_a]:border-ink-200 [&_a]:text-ink-500" />
              </div>
            </Reveal>

            {/* Form */}
            <Reveal variant="right" delay={0.08} className="lg:col-span-7">
              <div className="rounded-4xl border border-ink-200 bg-white p-7 shadow-card sm:p-10">
                <h2 className="font-display text-2xl font-semibold text-ink-900">
                  Send us a message
                </h2>
                <p className="mt-2 mb-8 text-sm text-ink-500">All fields are required.</p>

                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container width="wide">
          <MapEmbed />
        </Container>
      </section>
    </>
  )
}
