# Vrushahi Group — corporate website

A rebuild of the Vrushahi Group site: React (Vite, plain JavaScript) frontend and a
Node.js + Express API for the Contact and Career forms.

Requirements, content and the legacy extraction live in
[`docs/VRUSHAHI-PRD-SOURCE.md`](docs/VRUSHAHI-PRD-SOURCE.md) — that document is the
source of truth for copy and behaviour.

```
frontend/   React 19 + Vite 8 + Tailwind v4 + React Router 7 + Framer Motion
backend/    Express 4 API — contact + career endpoints
docs/       PRD and legacy-site extraction
```

## Running it

Two terminals:

```bash
cd backend  && npm install && npm run dev    # http://localhost:5000
cd frontend && npm install && npm run dev    # http://localhost:5173
```

Both read a `.env`; copy `.env.example` in each directory to get started. The API
defaults to `MAIL_PROVIDER=console`, which prints submissions to the terminal
instead of emailing them, so the forms work end to end with nothing configured.

## Two things you will want to change

**Swapping in real images.** Every image is a labelled placeholder — no legacy
artwork was carried over. Each business unit owns its image fields in
`frontend/src/data/businessUnits.js`, and swapping one in is two lines:

```js
heroImage: '/images/agriculture-hero.jpg',   // was null
imageStatus: 'final',                        // was 'placeholder'
```

`PlaceholderImage` renders the labelled panel while the status is `placeholder`
and a lazy-loaded responsive `<img>` once it is `final`. No component changes.
The logo is also a placeholder — see `frontend/src/components/layout/Logo.jsx`.

**Filling in the pending copy.** Ten pages carry clearly-marked interim text
(PRD B10). Find them all with:

```bash
grep -rn "contentStatus: 'placeholder'" frontend/src/data
```

Replacing a unit's `body` array and flipping `contentStatus` to `'complete'`
removes the "Content pending" badge and the in-page notice automatically.

## Adding a 16th division

Add one object to `businessUnits` in `frontend/src/data/businessUnits.js`. The
homepage grid, the Group mega-menu, the mobile drawer, the footer column, the
`/group` index and the `/group/:slug` page all read from that array, so nothing
else needs touching.

## Checks

```bash
cd frontend && npm run build   # production build
cd frontend && npm run lint    # oxlint
cd frontend && npm run smoke   # renders all 27 routes, asserts one <h1> each
```

`npm run smoke` also guards the legacy homepage bug where three grid tiles
linked to the wrong division (PRD A9.2).

## Still needed from the client

See the end of the build notes, or search the codebase for `TODO(B11`:

```bash
grep -rn "TODO(B11" frontend/src backend/src backend/.env.example
```
