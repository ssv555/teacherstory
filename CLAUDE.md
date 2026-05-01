# CLAUDE.md

## Repository

GitHub: https://github.com/ssv555/teacherstory.git

## What is this?

Photo portfolio website for a veteran teacher (30+ years). Chronological timeline of career, school events, student graduations. Some albums are public, some are behind a paywall (card-to-card payment).

## Tech Stack

- **Runtime**: Bun
- **Backend**: Elysia (TypeScript), PostgreSQL + Drizzle ORM
- **Frontend**: React 19 + Vite 8 + TanStack Router/Query + Tailwind CSS 4
- **Animations**: Framer Motion (motion package)
- **Auth**: VK OAuth, Telegram, MAX (adapted from VDole)
- **Payments**: Card-to-card with screenshot verification (adapted from iamrich)

## Project Structure

Monorepo: `back/` (Elysia API) + `front/` (React SPA) + `bot/` (Telegram bot, future).

## Ports

- `33001` — Backend API (Elysia/Bun)
- `33002` — Frontend HMR (Vite dev server)

## Commands

```bash
bun run dev              # Start both backend + frontend (concurrently)
bun run dev:server       # Backend only (--watch)
bun run dev:front        # Frontend only (Vite HMR)
bun run typecheck        # Typecheck both back + front
bun run lint             # ESLint frontend
bun run build            # Lint + typecheck + Vite build
bun run db:push          # Apply schema + seeds
bun run db:generate      # Generate Drizzle migrations
bun run db:studio        # Drizzle Studio
```

## Cookie Prefix

`ts_` (ts_session, ts_csrf) — differs from VDole's `vd_`.

## Donor Projects

- **VDole** (`../VDole/`) — auth system, CAS storage, DB patterns, frontend scaffold
- **iamrich** (`../../iamrich/`) — payment system (card-to-card, screenshots, AI parsing)
