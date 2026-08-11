/**
 * About-section copy, migrated verbatim from the legacy site (PRD A4.2–A4.5).
 *
 * These four pages were the only fully-written pages on the old site, so the
 * text below is reproduced exactly — the rebuild re-themes it, it does not
 * rewrite it. Only the Foundation page carries placeholder copy (PRD A3 #6:
 * no real CSR content has ever existed).
 */

/**
 * @typedef {Object} AboutPage
 * @property {string} slug
 * @property {string} title            - page <h1>
 * @property {string} navLabel
 * @property {string} eyebrow          - small kicker above the h1
 * @property {string} summary          - meta description + intro lede
 * @property {'complete'|'placeholder'} contentStatus
 */

/** Company Profile — PRD A4.2, four paragraphs verbatim. */
export const companyProfile = {
  slug: 'company-profile',
  title: 'Company Profile',
  navLabel: 'Company Profile',
  eyebrow: 'About Vrushahi',
  summary:
    'A diversified Indian group contributing across agriculture, hospitality and tourism, energy, import and export, information technology, healthcare, social service and education.',
  contentStatus: 'complete',
  paragraphs: [
    'Vrushahi has the leadership quality that comes from zeal for excellence in many projects handled by its team with the foresight of aspiring for infrastructures at the forefront by contributing to the sectors: namely, agriculture, hospitality and tourism, energy production, import and export of goods, information technology, healthcare and social service along with education.',
    'Our multi-cultured staff only strives to satisfy the clients so as to set examples for others by not only relying on our specialties and backgrounds but also for those of others in the world whenever appropriate. Our open culture encourages staff to seek answers in order to leverage the knowledge of our entire organization and beyond.',
    'Vrushahi knows that Diverse Projects Call for Creative Solutions. Our client-focused and open attitude brings into us flexible solutions in addressing today’s most challenging problems by providing professional answers that are of universal excellence applicable to particular environment.',
    'Vrushahi believes in the words, "perseverance leads to success!"',
  ],
}

/** Vision & Mission — PRD A4.3, both statements verbatim. */
export const visionMission = {
  slug: 'vision-mission',
  title: 'Vision & Mission',
  navLabel: 'Vision & Mission',
  eyebrow: 'About Vrushahi',
  summary:
    'Sustaining Vrushahi’s position as one of India’s most valuable corporations, and enhancing the wealth-generating capability of the enterprise in a globalizing environment.',
  contentStatus: 'complete',
  statements: [
    {
      id: 'vision',
      label: 'Vision',
      body: 'Sustain Vrushahi’s position as one of India’s most valuable corporations through world class performance, creating growing value for the Indian economy and the Company’s stakeholders',
    },
    {
      id: 'mission',
      label: 'Mission',
      body: 'To enhance the wealth generating capability of the enterprise in a globalizing environment, delivering superior and sustainable stakeholder value',
    },
  ],
}

/** Values — PRD A4.4, three pillars verbatim. */
export const values = {
  slug: 'values',
  title: 'Values',
  navLabel: 'Values',
  eyebrow: 'About Vrushahi',
  summary:
    'The three constituencies our values are built around: the clients we serve, our loyal and committed staff, and our shareholders.',
  contentStatus: 'complete',
  pillars: [
    {
      id: 'clients',
      title: 'The clients we serve',
      body: 'Our purpose is to create value for customers to earn their lifetime loyalty. This objective sits right at the heart of our business as one part of our Values – "No one tries harder for customers".',
    },
    {
      id: 'staff',
      title: 'Our loyal and committed staff',
      body: 'We know that if we look after our staff, they will look after our customers. Work can be a large part of our lives so our people deserve an employer who cares. That’s why one of our values is "Treat people how we like to be treated". We are committed to providing opportunities for our people to get on and turn their jobs into careers, and across all of our markets we offer a wide range of competitive benefits.',
    },
    {
      id: 'shareholders',
      title: 'Our Shareholders',
      body: 'As the owners of the business, it’s crucial that our shareholders value Vrushahi highly. Shareholders want a good return on their investment and that’s what we will continue to deliver for them. We offer sustainable, profitable growth from a combination of a strong business and exposure to rapidly growing emerging markets.',
    },
  ],
}

/** Corporate Strategies — PRD A4.5, intro + seven statements verbatim. */
export const corporateStrategies = {
  slug: 'corporate-strategies',
  title: 'Corporate Strategies',
  navLabel: 'Corporate Strategies',
  eyebrow: 'About Vrushahi',
  summary:
    'A board-managed professional company committed to creating enduring value for the nation and the shareholder, guided by seven corporate strategies.',
  contentStatus: 'complete',
  intro:
    'Vrushahi is a board-managed professional company, committed to creating enduring value for the nation and the shareholder. It has a rich organisational culture rooted in its core values of respect for people and belief in empowerment. Its philosophy of all-round value creation is backed by strong corporate governance policies and systems.',
  listIntro: 'Vrushahi corporate strategies are',
  strategies: [
    'Create multiple drivers of growth by developing a portfolio of world class businesses that best matches organisational capability with opportunities in domestic and export markets.',
    'Continue to focus on the chosen portfolio of Infrastructure, Energy, Agri Business and Information Technology.',
    'Benchmark the health of each business comprehensively across the criteria of Market Standing, Profitability and Internal Vitality.',
    'Ensure that each of its businesses is world class and internationally competitive.',
    'Enhance the competitive power of the portfolio through synergies derived by blending the diverse skills and capabilities residing in Vrushahi’s various businesses.',
    'Create distributed leadership within the organisation by nurturing talented and focused top management teams for each of the businesses.',
    'Continuously strengthen and refine Corporate Governance processes and systems to catalyse the entrepreneurial energies of management by striking the golden balance between executive freedom and the need for effective control and accountability.',
  ],
}

/**
 * Vrushahi Foundation — PRD A3 #6 / B10. The legacy page was 100% OS-Templates
 * boilerplate; no real CSR or foundation content has ever been written. Interim
 * copy only.
 */
export const foundation = {
  slug: 'foundation',
  title: 'Vrushahi Foundation',
  navLabel: 'Vrushahi Foundation',
  eyebrow: 'About Vrushahi',
  summary: 'Information about the Vrushahi Foundation is coming soon.',
  contentStatus: 'placeholder',
  paragraphs: [
    'Details of the Vrushahi Foundation’s work are being prepared and will be published here shortly.',
    'For enquiries about the Foundation in the meantime, please get in touch and we will connect you with the right team.',
  ],
}

/** Nav order for the About dropdown and the /about index. */
export const aboutPages = [
  companyProfile,
  visionMission,
  values,
  corporateStrategies,
  foundation,
]

/** Route for an About page. */
export function aboutPath(page) {
  return `/about/${page.slug}`
}

/** The "Our Experience" narrative from the legacy homepage — PRD A4.1, verbatim. */
export const ourExperience = {
  eyebrow: 'Our Experience',
  title: 'The people behind every Vrushahi service',
  body: 'The people of Vrushahi are crucial in the delivery of our services and flexible yet perfect solutions to our clients. In order to ensure that everyone is equipped with the right skill, knowledge and attitude. Regular trainings are held in place to constantly upgrade our team in technical and management skills. Vrushahi believes firmly in providing the right training, accredited certification and practical knowledge for our people, in order to execute perfect duties and respond efficiently.',
}
