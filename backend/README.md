# Backend

Express API server.

## Structure

```
src/
├── config/       # env.js - centralised process.env access
├── controllers/
├── middleware/    # errorHandler.js, notFound.js
├── models/
├── routes/         # index.js mounts feature routers under /api
├── services/
├── utils/
├── app.js            # express app + middleware wiring
└── server.js           # entrypoint
```

## Getting started

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:5000 (health check: /api/health)
```

## Scripts

```bash
npm run dev             # start with nodemon
npm start                 # start with node (production)
npm run format              # prettier --write
npm run format:check          # prettier --check
```

## Environment variables

See `.env.example`.

## Conventions

- `throw` inside async route handlers — `express-async-errors` catches them automatically and they're formatted by `src/middleware/errorHandler.js`.
- All new routes are mounted under `/api` in `src/routes/index.js`.
