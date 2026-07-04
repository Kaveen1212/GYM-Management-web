# K_RIPSTER — Coaching & Gym-Management Platform

A premium, cinematic coaching platform a personal trainer gives to their
clients. Three connected surfaces: a public marketing site + coach portfolio, a
logged-in **client app**, and a **coach console**. Dark, fast, animated — built
to feel like a high-end performance brand, not a generic SaaS dashboard.

> **Status: Phase 0 complete** — foundation, design system, the §4 motion
> primitives, and the cinematic landing hero. See _Build phases_ below.

---

## Tech stack

| Concern        | Choice |
| -------------- | ------ |
| Framework      | Next.js 14 (App Router) + React 18 |
| Language       | TypeScript (strict) |
| Styling        | Tailwind CSS v3 with a custom design-token theme |
| Component anim | Framer Motion |
| Scroll anim    | GSAP + ScrollTrigger |
| Smooth scroll  | Lenis (synced to GSAP) |
| Icons          | lucide-react |
| Charts         | Recharts (used from Phase 3) |
| AI chat        | Anthropic Messages API via a server route (Phase 5) |
| Fonts          | Geist (self-hosted via `next/font`) |

### A few deliberate decisions

- **Tailwind v3 (not v4):** the most battle-tested combo with GSAP / Lenis /
  Framer / shadcn. Design tokens are space-separated RGB channels in
  `globals.css` (`--accent: 200 250 40`) and mapped through
  `tailwind.config.ts` as `rgb(var(--token) / <alpha-value>)`, so opacity
  utilities (`bg-surface/40`, `via-bg/30`) work everywhere.
- **Fonts:** ships with **Geist** (self-hosted, zero build-time network
  dependency). The brief's first-choice display faces (PP Neue Montreal /
  Satoshi) are licensed — swap one in later by pointing `--font-display` at a
  `next/font/local` face in `src/app/layout.tsx`.
- **Hero video:** `<CinematicHero/>` works without any asset (animated-gradient
  + grain fallback). Drop a `/public/hero.mp4` to activate the video bg.

---

## Getting started

```bash
npm install
cp .env.local.example .env.local   # only needed for the AI chat (Phase 5)
npm run dev                         # http://localhost:3000
```

### Environment variables

| Var                 | Used by                              | Notes |
| ------------------- | ------------------------------------ | ----- |
| `ANTHROPIC_API_KEY` | `/api/coach-ai` (Phase 5), server-only | Never exposed to the client. |
| `COACH_AI_MODEL`    | AI chat                              | Defaults to `claude-sonnet-4-6`. |

### Scripts

| Command            | Does |
| ------------------ | ---- |
| `npm run dev`      | Dev server |
| `npm run build`    | Production build |
| `npm run start`    | Serve the production build |
| `npm run typecheck`| `tsc --noEmit` (strict) |
| `npm run lint`     | `next lint` |
| `npm run shot`     | Dev-only screenshot tool (drives local Chrome; needs `CHROME_PATH` if not at the default Windows location) |

---

## Project structure

```
src/
  app/
    layout.tsx          Root layout: fonts, providers, nav, footer, neon cursor
    template.tsx        Per-route enter transition
    page.tsx            Public landing
    globals.css         Design tokens + base + helpers + reduced-motion
    providers.tsx       Client providers (smooth scroll today; more later)
  components/
    motion/             §4 reusable motion primitives
      SmoothScroll.tsx    Lenis + GSAP ScrollTrigger, exposes useLenis()
      NeonCursor.tsx      Lime spring cursor (hidden on touch/reduced-motion)
      Reveal.tsx          Scroll-reveal + staggered children
      CountUp.tsx         Count-up-on-view number
      Magnetic.tsx        Cursor-magnet wrapper
      Marquee.tsx         Infinite ticker
      PageTransition.tsx  Route-enter wrapper
    hero/CinematicHero.tsx
    layout/             SiteNav, SiteFooter (giant wordmark)
    sections/           StatsStrip, CredentialsMarquee
    ui/button.tsx       Lime pill CTA (variants + magnetic + fill-wipe)
  lib/
    utils.ts            cn()
    motion.ts           Easing + shared variants
    hooks/              usePrefersReducedMotion, useIsTouch
```

### The mock data layer (coming in Phase 2)

All app/coach data will live behind repository functions in `src/lib/data/*`
(in-memory + `localStorage`), so swapping to a real DB (Prisma/Postgres,
Supabase) later touches only that layer — the UI calls `getClients()`,
`assignWorkout()`, etc., and never sees the storage.

---

## Accessibility & motion

- `prefers-reduced-motion` is honored globally (transforms disabled, opacity
  kept; Lenis and the neon cursor switch off).
- The custom cursor and magnetic effects disable on touch / coarse pointers.
- Focus-visible rings, semantic landmarks, keyboard-reachable nav.

---

## Build phases

- **Phase 0 — Foundation** ✅ — tooling, theme tokens, fonts, Lenis + GSAP +
  Framer wiring, the §4 motion primitives, and the cinematic landing hero.
- **Phase 1 — Public site** — stacking showcase, review wall, programs, coach
  portfolio.
- **Phase 2 — Mock data + auth + onboarding wizard.**
- **Phase 3 — Client app** — dashboard, workouts, runner/logging, progress.
- **Phase 4 — Coach console** — roster, exercise/plan builders, assignment.
- **Phase 5 — Chat** — live coach↔client + streaming AI coach.
- **Phase 6 — Polish** — states, responsive sweep, a11y, performance.

The full product brief lives in [`CLAUDE.md`](./CLAUDE.md).
