# Production deployment — vrushahi.com

Live at **https://vrushahi.com** (and `www.`). Deployed 2026-08-26.

## Where it runs

| | |
|---|---|
| Server | Hostinger KVM4, `72.62.228.222`, Ubuntu 24.04 (CloudPanel-managed) |
| App directory | `/var/www/vrushahi-group` |
| Runtime user | `vrushahigroup` (never root) |
| Backend port | `5021` (loopback only — nginx is the only way in) |
| PM2 process | `vrushahi-group-api`, own PM2 daemon under `vrushahigroup` |
| Nginx site | `/etc/nginx/sites-available/vrushahi.com.conf` |
| Tracked branch | `main` |
| TLS | Let's Encrypt, expires 2026-11-23, auto-renews via `certbot.timer` |

> **This VPS is shared with 7+ other live projects** (vrushahiimpex.com, nowstay.in,
> vrumarket.com, grhapoch.com, jhumroo.in, nowcarsbooking.com, api.vrusoya.com).
> Port 5021 and the `vrushahigroup` user were chosen to stay clear of all of them.
> There is a separate `vrushahi` system user on the box — that one belongs to
> **vrushahiimpex.com**, not this project.

## Updating the site

Push to `main`, then on the server:

```bash
ssh root@72.62.228.222
bash /var/www/vrushahi-group/deploy.sh
```

Works as either `root` or `vrushahigroup` — it re-execs itself as the app user.
It fetches `origin/main`, `git reset --hard`, reinstalls both dependency trees,
rebuilds the frontend, restarts PM2, and health-checks before reporting success.
Untracked files (`.env`, `dist/`, `node_modules/`) are never touched.

To deploy a different branch: `BRANCH=my-branch bash /var/www/vrushahi-group/deploy.sh`

## How production env differs from local `.env`

Both files live on the server only (gitignored), mode `600`, owned by `vrushahigroup`.

**`backend/.env`**

| Variable | Local | Production | Why |
|---|---|---|---|
| `NODE_ENV` | `development` | `production` | enables the DB-failure hard exit and `combined` logging |
| `PORT` | `5000` | `5021` | 5000 is already taken by another project on this box |
| `CLIENT_URL` | `http://localhost:5173` | `https://vrushahi.com,https://www.vrushahi.com` | CORS allowlist |
| `TRUST_PROXY` | `0` | `1` | exactly one nginx hop; rate limiting needs the real client IP |
| `JWT_SECRET` | dev value | freshly generated 96-char secret | app-internal secret, never reuse the dev one |

Everything else (`MONGODB_URI`, mail, Turnstile, limits) is copied verbatim.

**`frontend/.env`** — `VITE_API_URL=https://vrushahi.com/api` (was `http://localhost:5000/api`).
Vite bakes this in at build time, so changing it requires a rebuild.

## Not configured yet

- **Email.** No SMTP/Resend credentials were supplied, so `MAIL_PROVIDER=console`.
  Contact and career submissions are still **persisted to MongoDB** and readable in
  the admin panel — they are just not emailed. To turn mail on, set `MAIL_PROVIDER=smtp`
  (plus `SMTP_*`) or `resend` (plus `RESEND_API_KEY`) in `backend/.env` and redeploy.
  No code change needed.
- **Turnstile CAPTCHA.** Off. Honeypot, timing checks and rate limiting are active.

## Admin panel

`https://vrushahi.com/admin/login` — publicly reachable. The password seeded by
`npm run seed` (`Admin@123456`) was a known default and has been rotated; the new
one was handed over separately.
