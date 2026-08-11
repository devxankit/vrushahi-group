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
import { getGroupMenuEntries, unitPath } from './businessUnits'

/**
 * @typedef {Object} NavLink
 * @property {string} label
 * @property {string} to
 * @property {boolean} [external]
 */

/** About dropdown items. */
export function getAboutLinks() {
  return aboutPages.map((page) => ({
    label: page.navLabel,
    to: aboutPath(page),
    contentStatus: page.contentStatus,
  }))
}

/**
 * Group mega-menu columns: each cluster becomes a column, and the standalone
 * divisions are collected into their own column so the menu stays balanced.
 *
 * @returns {Array<{title: string|null, links: NavLink[]}>}
 */
export function getGroupMenuColumns() {
  const entries = getGroupMenuEntries()
  const standalone = []
  const clusters = []

  for (const entry of entries) {
    if (entry.type === 'cluster') {
      clusters.push({
        title: entry.cluster,
        links: entry.units.map((unit) => ({
          label: unit.shortLabel,
          to: unitPath(unit),
          contentStatus: unit.contentStatus,
        })),
      })
    } else {
      standalone.push({
        label: entry.unit.shortLabel,
        to: unitPath(entry.unit),
        contentStatus: entry.unit.contentStatus,
      })
    }
  }

  return [...clusters, { title: 'More divisions', links: standalone }]
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
  const groupLinks = getGroupMenuColumns().flatMap((column) => column.links)

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
