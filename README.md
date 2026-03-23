# Relay

Relay is a manual-first WhatsApp lead manager for agencies. This implementation ships a polished Next.js app with:

- a marketing landing page
- auth and onboarding placeholders
- an authenticated app shell
- dashboard, leads, lead detail, follow-ups, quotes, templates, and settings pages
- seeded business data that reflects the V1 architecture
- a Prisma schema matching the planned PostgreSQL data model
- basic session auth and real Prisma-backed CRUD for leads and follow-ups

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM with PostgreSQL
- Basic cookie session auth

## Run locally with PostgreSQL

```bash
npm install
docker compose up -d
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

Demo login after seeding:

- `owner@northstargrowth.com`
- `demo12345`

## PostgreSQL setup

Relay is configured for PostgreSQL using:

- `DATABASE_URL` for runtime and pooled connections
- `DIRECT_URL` for direct Prisma schema/migration access

For local development, the provided [`docker-compose.yml`](C:\Users\dhruv\OneDrive\Desktop\codex app\docker-compose.yml) starts Postgres on port `5432`.

Common Prisma commands:

```bash
npm run db:push
npm run db:seed
npm run db:studio
```

For deployment-oriented migrations:

```bash
npm run db:migrate
npm run db:migrate:deploy
```

## Deployment prep

- `postinstall` runs `prisma generate`, which is useful on Vercel and similar hosts.
- Set `DATABASE_URL` and `DIRECT_URL` in your hosting provider.
- Run `npm run db:migrate:deploy` against the production database before or during deployment.
- Seed production only if you intentionally want demo data there.
- Full deployment notes live in [`docs/deployment.md`](C:\Users\dhruv\OneDrive\Desktop\codex app\docs\deployment.md).

## Current implementation notes

- The app is wired to Prisma and basic auth.
- Leads and follow-ups are live CRUD flows backed by the database.
- Quotes and templates are database-backed reads; quote creation is still prototype UI.
- Billing and external reminder integrations are not wired yet.
