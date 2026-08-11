/**
 * THE single source of truth for Vrushahi Group's 15 business units.
 *
 * This one array drives the homepage grid, the "Group" mega-menu, the mobile
 * drawer, the footer's Group column, the /group index and all 15 detail pages.
 * Adding a 16th division means adding one object here — no new markup, no new
 * route, no new nav entry (PRD B7 scalability, B4 data model).
 *
 * Driving all of it from one array is also what structurally fixes two legacy
 * bugs: A9.2 (three homepage tiles linked to the wrong page because the image
 * <a> and the heading <a> were maintained separately) and A9.7 (the footer's
 * Group column listed a different subset on every page).
 *
 * CONTENT: every `body` marked `contentStatus: 'placeholder'` is interim copy,
 * not final marketing copy. Six units carry real copy migrated verbatim from
 * the legacy site (PRD A4.6–A4.11); nine are awaiting client copy (PRD B10).
 *
 * IMAGES: every unit starts at `imageStatus: 'placeholder'` with
 * `heroImage: null`, which renders a clearly-labelled placeholder panel. When
 * real photography arrives, set `heroImage` to the asset path and flip
 * `imageStatus` to 'final' — that is the entire change, per unit.
 */

/**
 * @typedef {'Agri & Market'|'Events & Entertainment'|'Learning Systems'|'Technologies'|null} Cluster
 */

/**
 * @typedef {Object} UnitServiceItem
 * @property {string} title
 * @property {string} body
 * @property {{label: string, to: string}} [cta] - internal link rendered after the body
 */

/**
 * @typedef {Object} UnitSection
 * @property {string} title
 * @property {string[]} [body]           - paragraphs
 * @property {UnitServiceItem[]} [items] - sub-headed items (e.g. a services list)
 */

/**
 * @typedef {Object} BusinessUnit
 * @property {string} slug                  - "agriculture" (URL is /group/{slug})
 * @property {string} name                  - "Vrushahi Agriculture" (page <h1>)
 * @property {string} shortLabel            - "Agriculture" (nav + grid card)
 * @property {Cluster} cluster              - mega-menu sub-cluster, or null if standalone
 * @property {string|null} heroImage        - null while placeholder; asset path once final
 * @property {string} heroImageAlt          - describes the intended final photo; also the
 *                                            label shown on the placeholder panel
 * @property {string} summary               - one-liner for the grid card + meta description
 * @property {string[]} body                - body paragraphs
 * @property {UnitSection[]} [sections]     - optional structured sub-content
 * @property {{label: string, to: string, description: string}} [subPage] - internal deep link
 * @property {string|null} externalSiteUrl  - division microsite, e.g. "https://agri.vrushahi.com"
 * @property {'complete'|'placeholder'} contentStatus - surfaces pages still needing real copy
 * @property {'placeholder'|'final'} imageStatus      - every unit starts as 'placeholder'
 */

/**
 * Interim copy for the nine divisions with no authored content yet (PRD B10).
 * Deliberately shared rather than reworded per unit, so it is greppable and so
 * nobody mistakes it for approved marketing copy.
 */
export const PLACEHOLDER_SUMMARY = 'Division overview coming soon.'

export const PLACEHOLDER_BODY = [
  'Detailed information about this division is being prepared and will be published here shortly.',
  'In the meantime, please get in touch and we will connect you with the right team within the Vrushahi Group.',
]

/** @type {BusinessUnit[]} */
export const businessUnits = [
  // --- Agri & Market ------------------------------------------------------
  {
    slug: 'agriculture',
    name: 'Vrushahi Agriculture',
    shortLabel: 'Agriculture',
    cluster: 'Agri & Market',
    heroImage: null,
    heroImageAlt: 'Freshly harvested farm produce being sorted for export',
    summary:
      'Integrated agri-business — sourcing, sorting and exporting quality produce direct from farmers around Sangli.',
    // Verbatim from PRD A4.6 (legacy Agri.html).
    body: [
      'We are engaged in integrated business development.',
      'We have two pronged approach, to export with pleasure and represent overseas interest to import gap based merchandises to serve domestic demands and to our business interest group in India as well.',
      'Under Agri Division "we have dedicated strategies for serving our overseas clients with good quality produces at the best competitive prices". We have dedicated Arrangement personnel to collect produces from farmers and sort it for export as per specifications, and pack it and send it to Airport, or sea Port with no loss of TRANSIT TIME.',
      'We are located near Agriculture Collection and integrated Market centre in Sangli or other region. So we don’t entertain any middlemen for cargo sorting or collection. Thereby we take customized care to sort the produces "export-worthy" and see that our customers are served well.',
      'We also have arrangement with bulk farming community for regular cargo for certain produces. For example "lemon" — we can supply as much as you want.',
      'Regarding your requirement, we have asked few other details, plz send clarification along with your brief co profile and the product basket you plan to import at a regular basis.',
    ],
    subPage: {
      label: 'Read: Contract Farming',
      to: '/group/agriculture/contract-farming',
      description:
        'How contract farming works in India, how small farmers benefit, and what makes an agreement succeed.',
    },
    externalSiteUrl: 'https://agri.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'placeholder',
  },
  {
    slug: 'vru-market',
    name: 'VRU Market',
    // Legacy heading was "VRUMARKET" with no space and, unlike every sibling,
    // no "Vrushahi" prefix (PRD A9.7). Normalised to "VRU Market" — the "VRU"
    // already carries the brand, so prefixing would read as "Vrushahi Vrushahi".
    shortLabel: 'VRU Market',
    cluster: 'Agri & Market',
    heroImage: null,
    heroImageAlt: 'VRU Market retail storefront',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },

  // --- Standalone ---------------------------------------------------------
  {
    slug: 'beverages',
    name: 'Vrushahi Beverages',
    shortLabel: 'Beverages',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Vrushahi Beverages product range',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },
  {
    slug: 'digital-marketing',
    name: 'Vrushahi Digital Marketing Services',
    shortLabel: 'Digital Marketing',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Digital marketing team reviewing campaign analytics',
    summary:
      'Full-service digital marketing — SEO, paid search, social media, content and strategy.',
    // Verbatim from PRD A4.7 (legacy Dm.html).
    body: [
      'Our full-service digital marketing agency offers affordable and effective digital marketing plans. We work to deliver improved rankings, increased traffic and, in turn, more business.',
    ],
    sections: [
      {
        title: 'What we do',
        items: [
          {
            title: 'Search Engine Optimization',
            body: 'We help you improve your Google ranking and increase your organic (non-paid) website traffic. SEO is more than just incorporating keywords and we can help to optimize all elements.',
          },
          {
            title: 'Search Engine Advertising',
            body: 'Search engine advertising, also known as pay-per-click advertising, helps you reach new customers and guarantees a consistent traffic flow to your website.',
          },
          {
            title: 'Social Media Marketing',
            body: 'We help you with social media management and advertising to help you grow your business and reach new clients.',
          },
          {
            title: 'Content Marketing',
            body: 'Content marketing helps you increase online visibility, traffic and brand awareness. We offer effective SEO-copywriting that resonates with your target audience.',
          },
          {
            title: 'Digital Marketing Strategy',
            body: 'Get your own digital marketing strategy built from scratch. Schedule a free consultation to get started.',
            cta: { label: 'Schedule a free consultation', to: '/contact' },
          },
        ],
      },
    ],
    externalSiteUrl: 'https://digital.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'placeholder',
  },

  // --- Events & Entertainment ---------------------------------------------
  {
    slug: 'events',
    name: 'Lightning Bug Events',
    shortLabel: 'Events',
    cluster: 'Events & Entertainment',
    heroImage: null,
    heroImageAlt: 'A styled event space set up by Lightning Bug Events',
    summary:
      'Event planning and production under the Lightning Bug Events banner — from luxury weddings to corporate showcases.',
    // Verbatim from PRD A4.8 (legacy Events.html).
    body: [
      'Lightning Bug Events is part of the Vrushahi Group. Founded in 2019, Lightning Bug Event Planners & Productions is an event planning and décor company that has redefined full service. As the only company around to both plan and produce, Lightning Bug Events is capable of bringing dream-like, breathtaking visions to life like no other. From luxury weddings to lavish social and corporate events, our team is committed to customizing and personalizing each and every one of our clients’ occasions. And with a headquarters in Sangli [MH] INDIA, as well as branches/affiliates across the India,',
      'Lightning Bug Events has absolutely no limitations. Our outstanding team of planners, designers, florists, coordinators and technical staff ensure our clients a stress-free experience and an awe-inspiring, magnificent event.',
    ],
    externalSiteUrl: 'https://lightningbugevents.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'placeholder',
  },
  {
    slug: 'entertainment-world',
    name: 'Vrushahi Entertainment World',
    shortLabel: 'Entertainment World',
    cluster: 'Events & Entertainment',
    heroImage: null,
    heroImageAlt: 'Film and television production set with lighting rigs',
    summary:
      'Entertainment, media and production across Marathi, Hindi and English — film, TV, radio, music and theatre.',
    // Verbatim from PRD A4.9 (legacy ENTERTAINMENT-WORLD.html).
    body: [
      'Production Company. Vrushahi Entertainment World is Entertainment, media and Production Company. It aggregates Marathi, Hindi and English entertainment produces for channels. The company operates as a content, which includes programs/film rights/feeds/music rights, Music production, Film and TV production, Radio production, Theater production, Event production.',
    ],
    externalSiteUrl: 'https://entertainment.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'placeholder',
  },

  // --- Standalone ---------------------------------------------------------
  {
    slug: 'mines-and-minerals',
    name: 'Vrushahi Mines & Minerals',
    shortLabel: 'Mines & Minerals',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Haul trucks working an open-cast mining site',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },
  {
    slug: 'import-export',
    name: 'Vrushahi Import & Export',
    shortLabel: 'Import & Export',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Export cargo being prepared for international shipment',
    summary:
      'Exporting Indian spices, nuts, vegetables, handicrafts and coir-based products worldwide.',
    // Verbatim from PRD A4.10 (legacy Ie.html).
    body: [
      'Exporting Indian spices, nuts, vegetables, handicrafts and coir based products. Having ventured into the activity of export and import, the organization has emerged as one of the key players in exporting agro based commodities based on the requirement of clients. Our company executes services at par with international standards. We deal in distributing agro based products based on "Best value for money" basis and are looking to expand our servicing areas. We are one of the most recognized export companies to export Indian food products all over the globe. We are servicing for the spices, herbs, dry fruits, natural honey, and handicraft care clients who require import and export business in India.',
    ],
    externalSiteUrl: 'https://impex.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'placeholder',
  },
  {
    slug: 'infra-buildcon',
    name: 'Vrushahi Infra Buildcon',
    shortLabel: 'Infra Buildcon',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Construction site with structural work underway',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },
  {
    slug: 'industries',
    name: 'Vrushahi Industries',
    shortLabel: 'Industries',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Manufacturing facility production floor',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },

  // --- Learning Systems ---------------------------------------------------
  {
    slug: 'international-school',
    name: 'Vrushahi International School & Colleges',
    shortLabel: 'International School & Colleges',
    cluster: 'Learning Systems',
    heroImage: null,
    heroImageAlt: 'School campus building and grounds',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },
  {
    slug: 'ves-exam',
    // Legacy heading read "VRUSHAHI SRARCH ELIGIBITY EXAM" — two typos, corrected
    // here per PRD A4.14 / A9.7.
    name: 'Vrushahi Search Eligibility Exam',
    shortLabel: 'VES Exam',
    cluster: 'Learning Systems',
    heroImage: null,
    heroImageAlt: 'Students sitting a written examination in a hall',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },

  // --- Standalone ---------------------------------------------------------
  {
    slug: 'pharmaceuticals',
    name: 'Vrushahi Pharmaceuticals',
    shortLabel: 'Pharmaceuticals',
    cluster: null,
    heroImage: null,
    heroImageAlt: 'Pharmaceutical production and packaging line',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },

  // --- Technologies -------------------------------------------------------
  {
    slug: 'financial-technologies',
    name: 'Vrushahi Financial Technologies — Majha ATM',
    shortLabel: 'Financial Technologies',
    cluster: 'Technologies',
    heroImage: null,
    heroImageAlt: 'Shopkeeper serving a customer at a Majha ATM banking point',
    summary:
      'Majha ATM — a hyper-local payments network that turns local shops into digital mini-banks.',
    // Verbatim from PRD A4.11 (legacy Ft.html).
    body: [
      'Majha Atm a business conglomerate with interests across several sectors like technology, telecom & finance. Within our unique technology, we enable any local shops to function as a Digital Mini Bank helping them under one roof solution for providing smooth government & financial digital services. We are one of India’s largest tech-enabled Hyper-Local Payments Network offering various services like Cash Deposit, Cash Withdrawal, Balance Inquiry, Bill Payments, Aadhaar Enabled Services, Air Time Recharge, POS Services, Railway Ticketing Services, etc. through our authorized agents across India.',
      'Our USP is our inherently strong tech DNA with a scalable, modular and secure platform architecture, which helps offer a significantly superior user experience enabling solutions.',
      'We have created a cloud infrastructure with cutting edge technologies to empower our VLEs (Village Level Entrepreneur) with products and services pertinent to them and the customers.',
      'By partnering with banks and financial institutions, we provide doorstep services to hundreds of millions of Indians who are unbanked or under-banked sector and having limited capability to resolve basic banking services and avail various government schemes.',
    ],
    externalSiteUrl: 'https://majhaatm.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'placeholder',
  },
  {
    slug: 'information-technologies',
    name: 'Vrushahi Information Technologies',
    shortLabel: 'Information Technologies',
    cluster: 'Technologies',
    heroImage: null,
    heroImageAlt: 'Software development team working at a bank of screens',
    summary: PLACEHOLDER_SUMMARY,
    body: PLACEHOLDER_BODY,
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'placeholder',
  },
]

/**
 * Cluster display order for the mega-menu. Units with `cluster: null` render as
 * standalone top-level entries, interleaved in array order.
 */
export const CLUSTER_ORDER = [
  'Agri & Market',
  'Events & Entertainment',
  'Learning Systems',
  'Technologies',
]

/** Route for a unit's detail page. */
export function unitPath(unit) {
  return `/group/${unit.slug}`
}

/** Look up one unit by slug. Returns undefined for unknown slugs (→ 404). */
export function getBusinessUnit(slug) {
  return businessUnits.find((unit) => unit.slug === slug)
}

/** All units belonging to a cluster, in array order. */
export function getUnitsByCluster(cluster) {
  return businessUnits.filter((unit) => unit.cluster === cluster)
}

/**
 * The Group menu as a flat list of entries, preserving the legacy nav order but
 * collapsing each cluster into a single expandable entry at the position of its
 * first member.
 *
 * @returns {Array<{type: 'unit', unit: BusinessUnit} | {type: 'cluster', cluster: string, units: BusinessUnit[]}>}
 */
export function getGroupMenuEntries() {
  const seenClusters = new Set()

  return businessUnits.reduce((entries, unit) => {
    if (!unit.cluster) {
      entries.push({ type: 'unit', unit })
      return entries
    }

    if (!seenClusters.has(unit.cluster)) {
      seenClusters.add(unit.cluster)
      entries.push({
        type: 'cluster',
        cluster: unit.cluster,
        units: getUnitsByCluster(unit.cluster),
      })
    }

    return entries
  }, [])
}

/** Units still awaiting real copy — used for the "content pending" badge and B10 tracking. */
export function getPendingContentUnits() {
  return businessUnits.filter((unit) => unit.contentStatus === 'placeholder')
}
