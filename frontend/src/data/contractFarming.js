/**
 * Contract Farming — /group/agriculture/contract-farming
 *
 * ⚠️ SOURCE TEXT NOT AVAILABLE. The legacy site had this article on Agri1.html,
 * an orphan page never linked from the navigation (PRD A3 #8, A4.6, B11.6). The
 * client chose to keep it as a dedicated sub-page of Agriculture.
 *
 * However, the PRD source document only *describes* the article — it records the
 * three section headings and what each section covers, but does not reproduce
 * the ~1500 words of bullet text itself, and the legacy `NEW VRUSHAHI GROUP`
 * folder is not present in this repository. The headings below are therefore
 * verbatim from PRD A4.6; the bullet content is pending.
 *
 * TO COMPLETE: paste the bullet lists out of the legacy Agri1.html into the
 * `points` arrays below and flip each section's `status` to 'complete'. The page
 * renders real content and drops the pending notice automatically.
 */

export const contractFarming = {
  slug: 'contract-farming',
  title: 'Contract Farming',
  eyebrow: 'Vrushahi Agriculture',
  parent: { label: 'Agriculture', to: '/group/agriculture' },
  summary:
    'How contract farming works in India, how small farmers benefit from it, and what makes a contract farming agreement succeed.',
  /** Drives the "content pending" notice; becomes 'complete' when all sections are filled. */
  contentStatus: 'placeholder',
  sections: [
    {
      id: 'what-is-contract-farming',
      // Heading verbatim from PRD A4.6.
      title: 'Contract Farming',
      status: 'placeholder',
      /**
       * PRD A4.6 records this section as ~11 bullets covering: what contract
       * farming is, its history in India (sugarcane, cotton, tea, coffee), the
       * buy-back agreement model, and how risk is allocated between the farmer
       * and the company.
       */
      pendingNote:
        'Covers what contract farming is, its history in India across sugarcane, cotton, tea and coffee, the buy-back agreement model, and how risk is shared between farmer and company.',
      points: [],
    },
    {
      id: 'small-farmer-benefits',
      // Heading verbatim from PRD A4.6.
      title: 'How can small farmers benefit from Contract Farming?',
      status: 'placeholder',
      /** PRD A4.6: ~6 bullets on capital constraints, quality inputs, management-skill transfer, risk reduction. */
      pendingNote:
        'Covers capital constraints, access to quality inputs, transfer of management skills, and reduction of risk for smallholders.',
      points: [],
    },
    {
      id: 'making-it-successful',
      // Heading verbatim from PRD A4.6.
      title: 'How can contract farming be successful?',
      status: 'placeholder',
      /** PRD A4.6: ~5 bullets on bargaining power, legal protection, transparent contract terms. */
      pendingNote:
        'Covers farmer bargaining power, legal protection, and transparency of contract terms.',
      points: [],
    },
  ],
}
