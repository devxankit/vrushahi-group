import { useState, useEffect } from 'react'
import Seo from '@/components/seo/Seo'
import PageHero from '@/components/layout/PageHero'
import Container from '@/components/ui/Container'
import Prose from '@/components/ui/Prose'
import CtaBand from '@/components/home/CtaBand'
import { fetchSetting } from '@/services/api'

const fallbackTerms = {
  title: 'Terms & Conditions',
  lastUpdated: 'August 2026',
  content: [
    'Welcome to the official website of Vrushahi Group. By accessing or using this website, you agree to comply with and be bound by the following terms.',
    'Intellectual Property: All logos, trademarks, text, graphics, images, and content displayed on this website are the intellectual property of Vrushahi Group and protected under copyright laws.',
    'Use of Website: You agree to use this site for lawful purposes only and not to engage in any activity that impairs site security, performance, or availability.',
    'Limitation of Liability: While Vrushahi Group makes reasonable efforts to ensure accurate information, we accept no liability for temporary unavailability or typographical inaccuracies.',
    'Governing Law: These terms shall be governed and construed in accordance with the laws of India, under the jurisdiction of courts in Sangli/Maharashtra.',
  ],
}

export default function TermsConditions() {
  const [data, setData] = useState(fallbackTerms)

  useEffect(() => {
    async function loadData() {
      const setting = await fetchSetting('termsAndConditions')
      if (setting && setting.content) {
        setData(setting)
      }
    }
    loadData()
  }, [])

  return (
    <>
      <Seo title={data.title} description="Vrushahi Group Terms and Conditions of website usage." />

      <PageHero
        eyebrow="Legal & Governance"
        title={data.title}
        description={`Last Updated: ${data.lastUpdated}`}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]}
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
