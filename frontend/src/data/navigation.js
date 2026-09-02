/**
 * The site's navigation tree, composed from the content data rather than
 * hand-maintained.
 *
 * The header mega-menu, the mobile drawer and the footer all read from here, so
 * the three can never drift apart the way the legacy site's did (PRD A9.7: the
 * footer's "Group" column listed a different subset of divisions on nearly
 * every page). Adding a business unit to data/businessUnits.js adds it to all
 * three surfaces at once.
 */

import { aboutPages, aboutPath } from './aboutContent'
import { getBusinessUnit, unitPath } from './businessUnits'

/**
 * @typedef {Object} NavLink
 * @property {string} label
 * @property {string} to
 * @property {string} [contentStatus]
 */

/** About dropdown items. */
export function getAboutLinks() {
  return aboutPages.map((page) => ({
    label: page.navLabel,
    to: aboutPath(page),
    contentStatus: page.contentStatus,
  }))
}

/** Helper to format a single unit link */
function makeUnitLink(slug) {
  const unit = getBusinessUnit(slug)
  if (!unit) return null
  return {
    label: unit.shortLabel,
    to: unitPath(unit),
    contentStatus: unit.contentStatus,
  }
}

/**
 * Group mega-menu columns: 4 visually balanced columns of 4 links each.
 *
 * @returns {Array<{title: string, links?: NavLink[], clusters?: Array<{title: string, links: NavLink[]}>}>}
 */
export function getGroupMenuColumns() {
  return [
    {
      title: 'Agri & Global Trade',
      clusters: [
        {
          title: 'Agri & Market',
          links: [makeUnitLink('agriculture')].filter(Boolean),
        },
        {
          title: 'Trade & Resources',
          links: [makeUnitLink('import-export'), makeUnitLink('beverages'), makeUnitLink('mines-and-minerals')].filter(Boolean),
        },
      ],
    },
    {
      title: 'Digital Platforms & Mobility',
      links: [
        makeUnitLink('vru-market'),
        makeUnitLink('nowstay'),
        makeUnitLink('grhapoch'),
        makeUnitLink('now-cars-booking'),
      ].filter(Boolean),
    },
    {
      title: 'Media & Entertainment',
      clusters: [
        {
          title: 'Events & Entertainment',
          links: [makeUnitLink('events'), makeUnitLink('entertainment-world')].filter(Boolean),
        },
        {
          title: 'Digital Entertainment',
          links: [makeUnitLink('jhumaroo')].filter(Boolean),
        },
      ],
    },
    {
      title: 'Technologies & Industry',
      clusters: [
        {
          title: 'Technologies',
          links: [makeUnitLink('financial-technologies'), makeUnitLink('information-technologies'), makeUnitLink('digital-marketing')].filter(Boolean),
        },
        {
          title: 'Industries & Health',
          links: [makeUnitLink('industries'), makeUnitLink('pharmaceuticals')].filter(Boolean),
        },
      ],
    },
  ]
}

/** Top-level primary navigation. `children` marks a dropdown/mega-menu trigger. */
export function getPrimaryNav() {
  return [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'about', label: 'About', to: '/about', children: 'about' },
    { id: 'group', label: 'Group', to: '/group', children: 'group' },
    { id: 'career', label: 'Career', to: '/career' },
    { id: 'contact', label: 'Contact Us', to: '/contact' },
  ]
}

/** Footer column definitions — same data, flat shape. */
export function getFooterColumns() {
  const groupLinks = getGroupMenuColumns().flatMap((column) =>
    column.clusters
      ? column.clusters.flatMap((cluster) => cluster.links)
      : column.links || []
  )

  return [
    {
      id: 'about',
      title: 'About',
      links: [{ label: 'Overview', to: '/about' }, ...getAboutLinks()],
    },
    {
      id: 'group',
      title: 'Group',
      // The complete, consistent division list on every page — fixes A9.7.
      links: [{ label: 'All divisions', to: '/group' }, ...groupLinks],
    },
    {
      id: 'connect',
      title: 'Connect',
      links: [
        { label: 'Career', to: '/career' },
        { label: 'Contact Us', to: '/contact' },
      ],
    },
  ]
}
