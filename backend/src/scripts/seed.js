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
    cluster: 'Digital Platforms & Mobility',
    heroImage: '/images/units/vru-market.png',
    heroImageAlt: 'VRU Market online superstore and retail storefront',
    summary:
      'VRU Market — your trusted digital supermarket and reliable online store for quality consumer products.',
    body: [
      'VRU Market is an integrated retail superstore and online marketplace offering a comprehensive selection of groceries, personal care, and daily household items.',
      'Dedicated to delivering maximum value for money, VRU Market guarantees authentic products, swift local delivery, and exceptional customer service.',
    ],
    externalSiteUrl: 'http://vrumarket.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 2,
  },
  {
    slug: 'beverages',
    name: 'Vrushahi Beverages',
    shortLabel: 'Beverages',
    cluster: 'Trade & Resources',
    heroImage: '/images/units/beverages.png',
    heroImageAlt: 'Vrushahi Beverages product range',
    summary: 'Detailed information about this division is being prepared and will be published here shortly.',
    body: [
      'Detailed information about this division is being prepared and will be published here shortly.',
      'In the meantime, please get in touch and we will connect you with the right team within the Vrushahi Group.',
    ],
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'final',
    order: 3,
  },
  {
    slug: 'digital-marketing',
    name: 'Vrushahi Digital Marketing Services',
    shortLabel: 'Digital Marketing',
    cluster: 'Technologies',
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
      'Lightning Bug Events is part of the Vrushahi Group. Founded in 2019, Lightning Bug Event Planners & Productions is an event planning and décor company that has redefined full service. As the only company around to both plan and produce, Lightning Bug Events is capable of bringing dream-like, breathtaking visions to life like no other. From luxury weddings to lavish social and corporate events, our team is committed to customizing and personalizing each and every one of our clients’ occasions. And with a headquarters in Sangli [MH] INDIA, as well as branches/affiliates across the India,',
      'Lightning Bug Events has absolutely no limitations. Our outstanding team of planners, designers, florists, coordinators and technical staff ensure our clients a stress-free experience and an awe-inspiring, magnificent event.',
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
      'Production Company. Vrushahi Entertainment World is Entertainment, media and Production Company. It aggregates Marathi, Hindi and English entertainment produces for channels. The company operates as a content, which includes programs/film rights/feeds/music rights, Music production, Film and TV production, Radio production, Theater production, Event production.',
    ],
    externalSiteUrl: 'https://entertainment.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 6,
  },
  {
    slug: 'jhumaroo',
    name: 'Jhumaroo Digital Entertainment & Short Video Platform',
    shortLabel: 'Jhumaroo',
    cluster: 'Digital Entertainment',
    heroImage: '/images/units/jhumaroo.png',
    heroImageAlt: 'Creators filming short video reels and live streaming on Jhumaroo entertainment platform',
    summary:
      'Short-video social entertainment platform — share videos, stream live content, and connect with creators.',
    body: [
      'Jhumaroo is Vrushahi Group’s short-video social entertainment and digital creator platform, enabling users to create, share, and discover trending short-form video content.',
      'Designed for high engagement and creative expression, Jhumaroo connects digital creators, influencers, and audiences through real-time video feeds, sound effects, and interactive social features.',
      'Express your talent, build your community, and experience non-stop digital video entertainment anywhere, anytime.',
    ],
    externalSiteUrl: 'http://jhumaroo.in',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 7,
  },
  {
    slug: 'mines-and-minerals',
    name: 'Vrushahi Mines & Minerals',
    shortLabel: 'Mines & Minerals',
    cluster: 'Trade & Resources',
    heroImage: '/images/units/mines-and-minerals.png',
    heroImageAlt: 'Haul trucks working an open-cast mining site',
    summary: 'Detailed information about this division is being prepared and will be published here shortly.',
    body: [
      'Detailed information about this division is being prepared and will be published here shortly.',
      'In the meantime, please get in touch and we will connect you with the right team within the Vrushahi Group.',
    ],
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'final',
    order: 8,
  },
  {
    slug: 'import-export',
    name: 'Vrushahi Import & Export',
    shortLabel: 'Import & Export',
    cluster: 'Trade & Resources',
    heroImage: '/images/units/import-export.png',
    heroImageAlt: 'Export cargo being prepared for international shipment',
    summary:
      'Exporting Indian spices, nuts, vegetables, handicrafts and coir-based products worldwide.',
    body: [
      'Exporting Indian spices, nuts, vegetables, handicrafts and coir based products. Having ventured into the activity of export and import, the organization has emerged as one of the key players in exporting agro based commodities based on the requirement of clients. Our company executes services at par with international standards. We deal in distributing agro based products based on "Best value for money" basis and are looking to expand our servicing areas. We are one of the most recognized export companies to export Indian food products all over the globe. We are servicing for the spices, herbs, dry fruits, natural honey, and handicraft care clients who require import and export business in India.',
    ],
    externalSiteUrl: 'https://impex.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 9,
  },
  {
    slug: 'industries',
    name: 'Vrushahi Industries',
    shortLabel: 'Industries',
    cluster: 'Industries & Health',
    heroImage: '/images/units/industries.png',
    heroImageAlt: 'Manufacturing facility production floor',
    summary: 'Detailed information about this division is being prepared and will be published here shortly.',
    body: [
      'Detailed information about this division is being prepared and will be published here shortly.',
      'In the meantime, please get in touch and we will connect you with the right team within the Vrushahi Group.',
    ],
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'final',
    order: 10,
  },
  {
    slug: 'pharmaceuticals',
    name: 'Vrushahi Pharmaceuticals',
    shortLabel: 'Pharmaceuticals',
    cluster: 'Industries & Health',
    heroImage: '/images/units/pharmaceuticals.png',
    heroImageAlt: 'Pharmaceutical production and packaging line',
    summary: 'Detailed information about this division is being prepared and will be published here shortly.',
    body: [
      'Detailed information about this division is being prepared and will be published here shortly.',
      'In the meantime, please get in touch and we will connect you with the right team within the Vrushahi Group.',
    ],
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'final',
    order: 11,
  },
  {
    slug: 'financial-technologies',
    name: 'Vrushahi Financial Technologies — Majha ATM',
    shortLabel: 'Financial Technologies',
    cluster: 'Technologies',
    heroImage: '/images/units/financial-technologies.png',
    heroImageAlt: 'Shopkeeper serving a customer at a Majha ATM banking point',
    summary:
      'Majha ATM — a hyper-local payments network that turns local shops into digital mini-banks.',
    body: [
      'Majha Atm a business conglomerate with interests across several sectors like technology, telecom & finance. Within our unique technology, we enable any local shops to function as a Digital Mini Bank helping them under one roof solution for providing smooth government & financial digital services. We are one of India’s largest tech-enabled Hyper-Local Payments Network offering various services like Cash Deposit, Cash Withdrawal, Balance Inquiry, Bill Payments, Aadhaar Enabled Services, Air Time Recharge, POS Services, Railway Ticketing Services, etc. through our authorized agents across India.',
      'Our USP is our inherently strong tech DNA with a scalable, modular and secure platform architecture, which helps offer a significantly superior user experience enabling solutions.',
      'We have created a cloud infrastructure with cutting edge technologies to empower our VLEs (Village Level Entrepreneur) with products and services pertinent to them and the customers.',
      'By partnering with banks and financial institutions, we provide doorstep services to hundreds of millions of Indians who are unbanked or under-banked sector and having limited capability to resolve basic banking services and avail various government schemes.',
    ],
    externalSiteUrl: 'https://majhaatm.vrushahi.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 12,
  },
  {
    slug: 'information-technologies',
    name: 'Vrushahi Information Technologies',
    shortLabel: 'Information Technologies',
    cluster: 'Technologies',
    heroImage: '/images/units/information-technologies.png',
    heroImageAlt: 'Software development team working at a bank of screens',
    summary: 'Detailed information about this division is being prepared and will be published here shortly.',
    body: [
      'Detailed information about this division is being prepared and will be published here shortly.',
      'In the meantime, please get in touch and we will connect you with the right team within the Vrushahi Group.',
    ],
    externalSiteUrl: null,
    contentStatus: 'placeholder',
    imageStatus: 'final',
    order: 13,
  },
  {
    slug: 'nowstay',
    name: 'NowStay Hotel & Staycation Bookings',
    shortLabel: 'NowStay',
    cluster: 'Digital Platforms & Mobility',
    heroImage: '/images/units/nowstay.png',
    heroImageAlt: 'NowStay hotel and staycation booking mobile platform',
    summary:
      'Instant hotel, luxury resort, and staycation reservation platform offering seamless bookings across India.',
    body: [
      'NowStay is Vrushahi Group’s premier online accommodation and hotel booking platform.',
      'We connect travelers with verified hotels, luxury resorts, boutique homestays, and staycation rentals at competitive rates.',
      'Featuring instant booking confirmation, transparent pricing, and 24/7 guest support, NowStay makes travel planning effortless.',
    ],
    externalSiteUrl: 'https://nowstay.in',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 14,
  },
  {
    slug: 'grhapoch',
    name: 'Grhapoch Doorstep Home Delivery',
    shortLabel: 'Grhapoch',
    cluster: 'Digital Platforms & Mobility',
    heroImage: '/images/units/grhapoch.png',
    heroImageAlt: 'Grhapoch doorstep grocery and household delivery service',
    summary:
      'Hyperlocal doorstep delivery service bringing fresh groceries, farm produce, and daily essentials right to your home.',
    body: [
      'Grhapoch (गृहपोच) delivers fresh groceries, organic farm produce, dairy, and essential household items directly from local markets to your doorstep.',
      'Our quick, reliable delivery network empowers local vendors and ensures families receive farm-fresh quality with guaranteed hygiene.',
      'Experience hassle-free ordering, real-time tracking, and scheduled deliveries tailored to your daily household needs.',
    ],
    externalSiteUrl: 'http://grhapoch.com/',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 15,
  },
  {
    slug: 'now-cars-booking',
    name: 'Now Cars Mobility & Rental Booking',
    shortLabel: 'Now Cars Booking',
    cluster: 'Digital Platforms & Mobility',
    heroImage: '/images/units/now-cars-booking.png',
    heroImageAlt: 'Luxury chauffeur-driven vehicles and modern car rental fleet',
    summary:
      'On-demand car rental, outstation cab booking, and urban chauffeur mobility services for personal and corporate travel.',
    body: [
      'Now Cars is a tech-driven mobility and car booking platform providing transparent, reliable vehicle rental services.',
      'From daily city rides and outstation cab bookings to luxury corporate fleets, Now Cars ensures well-maintained vehicles and verified drivers.',
      'Book your ride seamlessly with instant driver allocation, live GPS tracking, and fixed transparent pricing.',
    ],
    externalSiteUrl: 'http://nowcarsbooking.com',
    contentStatus: 'complete',
    imageStatus: 'final',
    order: 16,
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
        phone: '+91 9970907005',
        phoneHref: 'tel:+919970907005',
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

    // Seed / Ensure Admin User
    let existingAdmin = await User.findOne({ email: 'admin@vrushahi.com' })
    if (!existingAdmin) {
      await User.create({
        name: 'Vrushahi Admin',
        email: 'admin@vrushahi.com',
        password: 'Admin@123456',
        role: 'admin',
      })
      console.log('✅ Default Admin User created (Email: admin@vrushahi.com, Pass: Admin@123456)')
    } else {
      existingAdmin.password = 'Admin@123456'
      await existingAdmin.save()
      console.log('✅ Default Admin User password updated to Admin@123456')
    }

    // Seed & Sync Business Units into MongoDB Atlas
    for (const unit of initialBusinessUnits) {
      await BusinessUnit.findOneAndUpdate(
        { slug: unit.slug },
        unit,
        { upsert: true, returnDocument: 'after' }
      )
    }
    console.log(`✅ Upserted and synced ${initialBusinessUnits.length} Business Units into MongoDB Atlas`)

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
