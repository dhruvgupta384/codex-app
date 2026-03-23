# Relay Deployment Guide

Relay is configured for PostgreSQL with Prisma and is ready for either:

- local PostgreSQL via Docker
- hosted PostgreSQL via Neon or Supabase
- deployment to Vercel

## 1. Local PostgreSQL

Start PostgreSQL:

```bash
docker compose up -d
```

Use this local `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/relay?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/relay?schema=public"
```

Then run:

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

## 2. Neon or Supabase

Create a PostgreSQL database in Neon or Supabase and collect:

- pooled connection string for app/runtime traffic
- direct connection string for Prisma schema changes

Recommended env shape:

```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require&pgbouncer=true&connect_timeout=15"
DIRECT_URL="postgresql://user:password@host/db?sslmode=require"
```

If your provider gives you only one connection string, use it for both values temporarily.

Then run:

```bash
npm run db:push
npm run db:seed
```

## 3. Vercel

In Vercel project settings, add:

- `DATABASE_URL`
- `DIRECT_URL`

Then deploy the app. Before a production rollout, run:

```bash
npm run db:migrate:deploy
```

Useful notes:

- `postinstall` already runs `prisma generate`
- the app build remains `next build`
- seed production only if you intentionally want demo data

## 4. Recommended path

For the easiest hosted setup:

1. create a Neon Postgres database
2. copy pooled URL into `DATABASE_URL`
3. copy non-pooled URL into `DIRECT_URL`
4. run `npm run db:push`
5. run `npm run db:seed`
6. deploy to Vercel
