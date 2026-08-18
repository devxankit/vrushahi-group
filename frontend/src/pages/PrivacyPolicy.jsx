import { useState, useEffect } from 'react'
import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Prose from '@/components/ui/Prose'
import CtaBand from '@/components/home/CtaBand'
import { fetchSetting } from '@/services/api'

const fallbackPrivacy = {
  title: 'Privacy Policy',
  lastUpdated: 'August 2026',
  content: [
    'Vrushahi Group ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.',
    'Information We Collect: We collect information provided directly by you when filling out contact or career forms, including name, email address, phone number, and resume files.',
    'How We Use Your Data: Data submitted through our portal is strictly used to evaluate employment applications, respond to commercial enquiries, and provide requested services.',
    'Data Security: We implement standard administrative, technical, and physical safeguards to prevent unauthorized access, alteration, or disclosure of user data.',
    'Third-Party Sharing: We do not sell or rent personal information to third parties. Information may only be shared with authorized Group entities for service fulfillment.',
    'Contact Us: If you have questions regarding this Privacy Policy, please email info@vrushahi.com.',
  ],
}

export default function PrivacyPolicy() {
  const [data, setData] = useState(fallbackPrivacy)

  useEffect(() => {
    async function loadData() {
      const setting = await fetchSetting('privacyPolicy')
      if (setting && setting.content) {
        setData(setting)
      }
    }
    loadData()
  }, [])

  return (
    <>
      <Seo title={data.title} description="Vrushahi Group Privacy Policy and data protection terms." />

      <PageHero
        eyebrow="Legal & Trust"
        title={data.title}
        description={`Last Updated: ${data.lastUpdated}`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="py-20 sm:py-24">
        <Container width="prose">
          <Prose paragraphs={data.content} size="lg" />
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
