/**
 * Single source of truth for company identity, contact facts and outbound links.
 *
 * Everything the legacy site hard-coded into 29 duplicated HTML files lives here
 * once. Items marked TODO(B11) are the PRD's open client questions — each is a
 * one-line change in this file, nothing else needs touching.
 */

export const siteConfig = {
  name: 'Vrushahi Group',
  legalName: 'Vrushahi Group',
  /** Legacy homepage tagline (A4.1), typo-corrected from "Technologie". */
  tagline: 'Technology With a Human Touch',
  description:
    'Vrushahi Group is a Sangli-based diversified conglomerate spanning agriculture and export, financial technology, digital marketing, events and entertainment, mining, infrastructure, pharmaceuticals, education and IT.',
  url: 'https://www.vrushahi.com',

  contact: {
    /**
     * TODO(B11.1) — RESOLVED. The legacy site disagreed with itself: the topbar
     * and footer of all 29 pages showed 70300 78470, while contact-us.php showed
     * 77300 78470. Client confirmed 70300 78470.
     */
    phone: '+91 9970907005',
    phoneHref: 'tel:+919970907005',

    email: 'info@vrushahi.com',
    emailHref: 'mailto:info@vrushahi.com',

    /**
     * TODO(B11.2) — UNCONFIRMED. Two addresses existed in the legacy site. This
     * is the footer version (used on every page); contact-us.php carried
     * "01-no5, oooo, Sangli.416415", which is plainly an unreplaced placeholder.
     * Replace the lines below once the client confirms the registered address.
     */
    address: {
      lines: ['1st Floor, 5 No. Rahul Apartment', 'Nagaraj Colony, Vishrambag'],
      city: 'Sangli',
      state: 'Maharashtra',
      postalCode: '415416',
      country: 'India',
      confirmed: false,
    },
  },

  /**
   * Google Maps embed pinned to Vrushahi Group, Sangli — the one genuinely
   * working element on the legacy contact page (A4.12, lat/lng 16.8446/74.5898).
   */
  map: {
    embedUrl: 'https://www.google.com/maps?q=16.8446,74.5898&hl=en&z=15&output=embed',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=16.8446,74.5898',
    latitude: 16.8446,
    longitude: 74.5898,
    label: 'Vrushahi Group, Sangli, Maharashtra',
  },

  /**
   * TODO(B11.3) — UNCONFIRMED. Facebook was the only live social URL on the
   * legacy site; Twitter, LinkedIn and Dribbble all pointed at "#". Rather than
   * ship dead icons again (A9/B6.6) only confirmed accounts are listed here.
   * Add entries as the client confirms them — the footer renders whatever is in
   * this array.
   */
  socials: [
    {
      id: 'facebook',
      label: 'Facebook',
      href: 'https://www.facebook.com/vrushahigroup',
      brandColor: '#3B5998',
    },
  ],

  copyright: {
    startYear: 2020,
    holder: 'Vrushahi Group',
    developer: { name: 'Vrushahi', href: 'https://www.vrushahi.com' },
  },
}

/** Formats the address for a single-line display (topbar, meta tags). */
export function formatAddressOneLine() {
  const { lines, city, state, postalCode, country } = siteConfig.contact.address
  return [...lines, `${city} ${postalCode}`, state, country].join(', ')
}

/** Copyright range that never goes stale. */
export function formatCopyrightYears() {
  const { startYear } = siteConfig.copyright
  const now = new Date().getFullYear()
  return now > startYear ? `${startYear}–${now}` : `${startYear}`
}
