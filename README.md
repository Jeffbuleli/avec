# e-AVEC

Standalone [AVEC](https://e-avec.org) app extracted from McBuleli.

- **Domain:** [e-avec.org](https://e-avec.org)
- **Git:** [github.com/Jeffbuleli/avec](https://github.com/Jeffbuleli/avec)
- **Database:** same Postgres as McBuleli (same VPS, docker network `mcbuleli_default`)
- **Wallet:** USDT custodial balances stay in McBuleli tables. Deposit / withdraw on [mcbuleli.org](https://mcbuleli.org/app/wallet). Contributions debit that same balance.
- **Auth:** same `users` table and `JWT_SECRET`. Cookie is `eavec_session` (separate from `mcbuleli_session`).

## Brand

- Teal `#0F2D2F`
- Cream `#F6E8CD`
- Gold accent `#C9A227`
- Logos in `public/brand/`

## Local

```bash
cp ops/vps/.env.example .env
# Point DATABASE_URL at local/McBuleli Postgres and reuse JWT_SECRET
npm ci
npm run dev   # http://localhost:3001
```

Schema owner is McBuleli. Do **not** `drizzle-kit push` from this repo against production.

## VPS

1. DNS: `e-avec.org` + `www` → same origin as McBuleli (`162.35.181.98` / Cloudflare).
2. Copy `ops/vps/.env.example` → `ops/vps/.env` with McBuleli secrets.
3. `docker compose -f ops/vps/docker-compose.yml up -d --build` (needs external network `mcbuleli_default`).
4. Install `ops/vps/nginx-e-avec.conf` and issue TLS certs.
5. McBuleli UI `/app/wallet/groups` redirects here. Governance cron stays on McBuleli so votes are not double-executed.
