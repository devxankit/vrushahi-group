import mongoose from 'mongoose'
import { env } from '../config/env.js'
import User from '../models/User.js'
import BusinessUnit from '../models/BusinessUnit.js'
import SiteSetting from '../models/SiteSetting.js'

const initialBusinessUnits = [
  {
    slug: 'agriculture',
    name: 'Vrushahi Agriculture',
    shortLabel: 'Agriculture',
    cluster: 'Agri & Market',
    heroImage: '/images/units/agriculture.png',
    heroImageAlt: 'Freshly harvested farm produce being sorted for export',
    summary:
      'Integrated agri-business — sourcing, sorting and exporting quality produce direct from farmers around Sangli.',
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
    imageStatus: 'final',
    order: 1,
  },
  {
    slug: 'vru-market',
    name: 'VRU Market',
    shortLabel: 'VRU Market',
    cluster: 'Agri & Market',
    heroImage: '/images/units/vru-market.png',
    heroImageAlt: 'VRU Market retail storefront',
    summary: 'Direct farm-to-retail supermarket network providing fresh produce and daily essentials.',
    body: [
      'VRU Market is Vrushahi Group’s direct retail initiative bringing farm-fresh produce and quality consumer products straight to neighborhood stores and supermarkets.',
      'We bridge the gap between regional agricultural producers and urban consumers with transparent pricing, quality assurance, and sustainable supply chains.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 2,
  },
  {
    slug: 'beverages',
    name: 'Vrushahi Beverages',
    shortLabel: 'Beverages',
    cluster: null,
    heroImage: '/images/units/beverages.png',
    heroImageAlt: 'Vrushahi Beverages product range',
    summary: 'Natural fruit juices, bottled mineral water, and premium refreshing beverages.',
    body: [
      'Vrushahi Beverages produces high-quality natural fruit juices, packaged drinking water, and functional refreshing drinks.',
      'Crafted from locally sourced fruits and processed under international safety standards, our beverage portfolio stands for purity and authentic flavor.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 3,
  },
  {
    slug: 'digital-marketing',
    name: 'Vrushahi Digital Marketing Services',
    shortLabel: 'Digital Marketing',
    cluster: null,
    heroImage: '/images/units/digital-marketing.png',
    heroImageAlt: 'Digital marketing team reviewing campaign analytics',
    summary:
      'Full-service digital marketing — SEO, paid search, social media, content and strategy.',
    body: [
      'Our full-service digital marketing agency offers affordable and effective digital marketing plans. We work to deliver improved rankings, increased traffic and, in turn, more business.',
    ],
    sections: [
      {
        title: 'What we do',
        items: [
          {
            title: 'Search Engine Optimization',
            body: 'We help you improve your Google ranking and increase your organic website traffic.',
          },
          {
            title: 'Search Engine Advertising',
            body: 'Pay-per-click advertising to reach targeted customers with high conversion focus.',
          },
          {
            title: 'Social Media Marketing',
            body: 'Comprehensive social media management and brand building campaigns.',
          },
          {
            title: 'Content Marketing',
            body: 'Engaging SEO copywriting and narrative marketing that converts visitors into customers.',
          },
          {
            title: 'Digital Marketing Strategy',
            body: 'Customized 360-degree digital roadmaps tailored for corporate growth.',
            cta: { label: 'Schedule a free consultation', to: '/contact' },
          },
        ],
      },
    ],
    externalSiteUrl: 'https://digital.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 4,
  },
  {
    slug: 'events',
    name: 'Lightning Bug Events',
    shortLabel: 'Events',
    cluster: 'Events & Entertainment',
    heroImage: '/images/units/events.png',
    heroImageAlt: 'A styled event space set up by Lightning Bug Events',
    summary:
      'Event planning and production under the Lightning Bug Events banner — from luxury weddings to corporate showcases.',
    body: [
      'Lightning Bug Events is part of the Vrushahi Group. Founded in 2019, Lightning Bug Event Planners & Productions is an event planning and décor company that has redefined full service.',
      'From luxury weddings to lavish social and corporate events, our team is committed to customizing and personalizing each and every one of our clients’ occasions.',
    ],
    externalSiteUrl: 'https://lightningbugevents.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 5,
  },
  {
    slug: 'entertainment-world',
    name: 'Vrushahi Entertainment World',
    shortLabel: 'Entertainment World',
    cluster: 'Events & Entertainment',
    heroImage: '/images/units/entertainment-world.png',
    heroImageAlt: 'Film and television production set with lighting rigs',
    summary:
      'Entertainment, media and production across Marathi, Hindi and English — film, TV, radio, music and theatre.',
    body: [
      'Vrushahi Entertainment World is an entertainment, media and production powerhouse aggregating Marathi, Hindi and English content.',
      'Operations span film production, television broadcasting rights, music publishing, radio programming, and live theatre productions.',
    ],
    externalSiteUrl: 'https://entertainment.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 6,
  },
  {
    slug: 'mines-and-minerals',
    name: 'Vrushahi Mines & Minerals',
    shortLabel: 'Mines & Minerals',
    cluster: null,
    heroImage: '/images/units/mines-and-minerals.png',
    heroImageAlt: 'Haul trucks working an open-cast mining site',
    summary: 'Responsible mineral extraction, quarrying, and industrial raw material supply.',
    body: [
      'Vrushahi Mines & Minerals operates open-cast quarrying and mineral processing facilities adhering to strict environmental standards.',
      'We supply high-grade industrial minerals, crushed aggregates, and construction materials across western India.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 7,
  },
  {
    slug: 'import-export',
    name: 'Vrushahi Import & Export',
    shortLabel: 'Import & Export',
    cluster: null,
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Export cargo being prepared for international shipment',
    summary:
      'Exporting Indian spices, nuts, vegetables, handicrafts and coir-based products worldwide.',
    body: [
      'Exporting Indian spices, nuts, vegetables, handicrafts and coir based products. Having ventured into the activity of export and import, the organization has emerged as one of the key players in exporting agro based commodities based on the requirement of clients.',
      'We deal in distributing agro based products on "Best value for money" basis all over the globe.',
    ],
    externalSiteUrl: 'https://impex.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 8,
  },
  {
    slug: 'infra-buildcon',
    name: 'Vrushahi Infra Buildcon',
    shortLabel: 'Infra Buildcon',
    cluster: null,
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Construction site with structural work underway',
    summary: 'Civil infrastructure development, commercial construction, and urban land development.',
    body: [
      'Vrushahi Infra Buildcon develops modern commercial complexes, industrial parks, and civil infrastructure projects.',
      'Combining engineering excellence with sustainable building techniques to construct enduring architectural milestones.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 9,
  },
  {
    slug: 'industries',
    name: 'Vrushahi Industries',
    shortLabel: 'Industries',
    cluster: null,
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Manufacturing facility production floor',
    summary: 'Industrial manufacturing, packaging solutions, and engineering fabrication.',
    body: [
      'Vrushahi Industries manufactures precision engineered industrial components and sustainable eco-packaging products.',
      'Our state-of-the-art facilities serve automotive, agro-processing, and consumer packaging industries.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 10,
  },
  {
    slug: 'international-school',
    name: 'Vrushahi International School & Colleges',
    shortLabel: 'International School & Colleges',
    cluster: 'Learning Systems',
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'School campus building and grounds',
    summary: 'Nurturing future leaders with modern global education, sports, and holistic learning environments.',
    body: [
      'Vrushahi International School & Colleges provides holistic, tech-enabled education designed to nurture critical thinking and moral leadership.',
      'Campuses feature modern labs, sports complexes, and internationally benchmarked curricula from primary through higher education.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 11,
  },
  {
    slug: 'ves-exam',
    name: 'Vrushahi Search Eligibility Exam',
    shortLabel: 'VES Exam',
    cluster: 'Learning Systems',
    heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Students sitting a written examination in a hall',
    summary: 'State-wide talent search and merit scholarship examinations for school and college students.',
    body: [
      'The Vrushahi Search Eligibility Exam (VES Exam) identifies, encourages, and awards scholarships to meritorious young minds across Maharashtra.',
      'Over 50,000 students participate annually, opening pathways to higher education sponsorships and career guidance.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 12,
  },
  {
    slug: 'pharmaceuticals',
    name: 'Vrushahi Pharmaceuticals',
    shortLabel: 'Pharmaceuticals',
    cluster: null,
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Pharmaceutical production and packaging line',
    summary: 'Quality generic medicines, herbal healthcare formulations, and pharmaceutical distribution.',
    body: [
      'Vrushahi Pharmaceuticals produces essential generic medicines and WHO-GMP certified herbal health supplements.',
      'Dedicated to making affordable healthcare accessible across rural and urban markets.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 13,
  },
  {
    slug: 'financial-technologies',
    name: 'Vrushahi Financial Technologies — Majha ATM',
    shortLabel: 'Financial Technologies',
    cluster: 'Technologies',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a670fc80782?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Shopkeeper serving a customer at a Majha ATM banking point',
    summary:
      'Majha ATM — a hyper-local payments network that turns local shops into digital mini-banks.',
    body: [
      'Majha ATM is a technology-driven hyper-local payments network enabling local shopkeepers to offer banking, cash withdrawal, Aadhaar payments, and utility services.',
      'Empowering village level entrepreneurs (VLEs) to deliver financial inclusion to hundreds of millions of underserved citizens.',
    ],
    externalSiteUrl: 'https://majhaatm.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 14,
  },
  {
    slug: 'information-technologies',
    name: 'Vrushahi Information Technologies',
    shortLabel: 'Information Technologies',
    cluster: 'Technologies',
    heroImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Software development team working at a bank of screens',
    summary: 'Enterprise software development, cloud infrastructure, web apps and digital transformation.',
    body: [
      'Vrushahi IT offers enterprise custom software development, mobile application engineering, cloud integration, and cybersecurity.',
      'We empower business enterprises and group divisions with cutting-edge digital platforms.',
    ],
    externalSiteUrl: null,
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 15,
  },
]

const initialSettings = [
  {
    key: 'siteConfig',
    data: {
      siteName: 'Vrushahi Group',
      tagline: 'Technology with a Human Touch',
      contact: {
        address: {
          city: 'Sangli',
          state: 'Maharashtra',
          lines: ['Vrushahi Group Head Office', 'Near Agri Market Centre, Sangli', 'Maharashtra 416416, India'],
        },
        phone: '+91 98220 00000',
        phoneHref: 'tel:+919822000000',
        email: 'info@vrushahi.com',
        emailHref: 'mailto:info@vrushahi.com',
      },
    },
  },
  {
    key: 'privacyPolicy',
    data: {
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
    },
  },
  {
    key: 'termsAndConditions',
    data: {
      title: 'Terms & Conditions',
      lastUpdated: 'August 2026',
      content: [
        'Welcome to the official website of Vrushahi Group. By accessing or using this website, you agree to comply with and be bound by the following terms.',
        'Intellectual Property: All logos, trademarks, text, graphics, images, and content displayed on this website are the intellectual property of Vrushahi Group and protected under copyright laws.',
        'Use of Website: You agree to use this site for lawful purposes only and not to engage in any activity that impairs site security, performance, or availability.',
        'Limitation of Liability: While Vrushahi Group makes reasonable efforts to ensure accurate information, we accept no liability for temporary unavailability or typographical inaccuracies.',
        'Governing Law: These terms shall be governed and construed in accordance with the laws of India, under the jurisdiction of courts in Sangli/Maharashtra.',
      ],
    },
  },
]

export async function seedDatabase() {
  try {
    await mongoose.connect(env.mongodbUri)
    console.log('🌱 Connected to MongoDB Atlas for Seeding...')

    // Seed Admin User
    const existingAdmin = await User.findOne({ email: 'admin@vrushahi.com' })
    if (!existingAdmin) {
      await User.create({
        name: 'Vrushahi Admin',
        email: 'admin@vrushahi.com',
        password: 'Admin@123456',
        role: 'admin',
      })
      console.log('✅ Default Admin User created (Email: admin@vrushahi.com, Pass: Admin@123456)')
    } else {
      console.log('ℹ️ Admin user already exists')
    }

    // Seed Business Units
    const unitCount = await BusinessUnit.countDocuments()
    if (unitCount === 0) {
      await BusinessUnit.insertMany(initialBusinessUnits)
      console.log(`✅ Seeded ${initialBusinessUnits.length} Business Units into MongoDB Atlas`)
    } else {
      console.log(`ℹ️ Business Units already present (${unitCount} found)`)
    }

    // Seed Site Settings
    for (const setting of initialSettings) {
      await SiteSetting.findOneAndUpdate(
        { key: setting.key },
        { data: setting.data },
        { upsert: true, new: true }
      )
    }
    console.log('✅ Seeded Site Settings & Policies')

    console.log('🎉 Seeding Complete Successfully!')
  } catch (error) {
    console.error('❌ Seeding Error:', error)
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => mongoose.disconnect())
}
