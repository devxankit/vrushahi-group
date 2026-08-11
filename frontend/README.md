# Frontend

React 19 + Vite + Tailwind CSS v4 + React Router + Axios.

## Structure

```
src/
├── assets/
├── components/
├── config/     # env.js - centralised VITE_* access
├── hooks/
├── layouts/
├── pages/
├── routes/     # AppRoutes.jsx
├── services/   # api.js (single axios instance) + feature services
└── utils/
```

Path alias `@` → `src` (see `vite.config.js` / `jsconfig.json`).

## Getting started

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5173
```

## Scripts

```bash
npm run dev            # start dev server
npm run build           # production build
npm run preview          # preview production build
npm run lint              # oxlint
npm run format             # prettier --write
npm run format:check        # prettier --check
```

## Environment variables

See `.env.example`. All variables exposed to the browser must be prefixed with `VITE_`.

## Conventions

- All backend calls go through `src/services/api.js` (single axios instance) — don't import `axios` directly elsewhere.
