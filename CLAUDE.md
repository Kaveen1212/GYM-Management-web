# BUILD BRIEF — "APEX" Personal-Trainer Coaching & Gym-Management Platform

> Paste this whole file into Claude Code as your first instruction, **or** save it in the repo root as `CLAUDE.md` so it persists across sessions. Drag the four reference GIFs (in `/references`) into the chat when you start, and tell Claude Code to fetch the live reference URL.

---

## 0. HOW TO USE THE REFERENCES (do this first)

You have two kinds of design reference. **Study both before writing any code.**

1. **Live reference site:** `https://www.nivisgear.com/`
   - Fetch it, then visit the product pages (e.g. `/products/protego-ski-jacket`) to see scroll behavior, the sticky purchase bar, the stacking sections, the reviews, and the giant footer wordmark.
   - We are **NOT** building a store. We are stealing its *visual language and motion design* and applying it to a fitness coaching platform.

2. **Motion reference GIFs** (in the `/references` folder — open and study each):
   - `01-hero-reveal.gif` → the **hero**: full-bleed looping video background, dark gradient, a glass info-card sliding up, huge type, a neon-lime CTA pill, a custom neon cursor, a "SCROLL TO EXPLORE" cue.
   - `02-scroll-stacking-cards.gif` → **the signature animation**: a pinned scroll section where full-width cards stack and swap vertically as you scroll. Each card = giant headline (left) · large image with parallax (center) · detail panel (right) · a small thumbnail rail top-right.
   - `03-product-customizer-modal.gif` → a **full-screen modal**: grid of cards, a "filter by category" dropdown, a search field, hover-lift on cards. We reuse this pattern for the **exercise picker / program builder**.
   - `04-reviews-typography.gif` → **oversized-quote testimonials**: massive pull-quotes, neon star ratings, "VERIFIED" badges, two-column scroll-reveal. We reuse this for the **coach's client reviews**.

**Your job:** match the *quality, polish, darkness, and motion* of these references — not the apparel content.

---

## 1. WHAT WE ARE BUILDING

A premium, cinematic **coaching platform a personal trainer gives to their clients.** It has three connected surfaces:

| Surface | Who it's for | Purpose |
|---|---|---|
| **A. Public site** (`/`) | Prospects | Cinematic landing + coach portfolio (wins, transformations, reviews) → convert visitors into clients |
| **B. Client app** (`/app/*`) | Logged-in clients | Onboarding, assigned workouts, logging, progress, history, AI + live coach chat |
| **C. Coach console** (`/coach/*`) | The trainer (admin) | Manage clients, build exercise library & plans, assign workouts, monitor progress, chat, edit portfolio |

The platform must feel like a **high-end performance brand**, not a generic SaaS dashboard. Dark, confident, fast, animated.

---

## 2. TECH STACK (use exactly this)

- **Next.js 14+ (App Router)** + **TypeScript** (strict)
- **Tailwind CSS** (with a custom design-token theme — see §3)
- **Framer Motion** — component-level animation, page transitions, layout animations, micro-interactions
- **GSAP + ScrollTrigger** — the pinned scroll-stacking section, parallax, scroll-scrubbed reveals
- **Lenis** (`@studio-freight/lenis`) — buttery smooth scrolling site-wide
- **lucide-react** — icons
- **Recharts** — progress charts
- **shadcn/ui** — accessible primitives (dialog, dropdown, tabs, sheet, toast), **restyled** to our dark theme (do not ship default shadcn look)
- **next/font** — self-hosted variable fonts
- **State/data:** keep it pragmatic. Build a typed **mock data layer** in `/lib/data` (in-memory + localStorage persistence) behind clean repository functions (`getClients()`, `assignWorkout()`, etc.) so the UI is fully interactive **without a backend**. Structure it so a real DB (Prisma/Postgres, Supabase) can drop in later by swapping the repository implementation only.
- **AI chat:** a Next.js **route handler** at `/app/api/coach-ai/route.ts` that calls the **Anthropic Messages API** server-side (model `claude-sonnet-4-6`), streaming the response. Read the key from `process.env.ANTHROPIC_API_KEY`. Never expose the key client-side. Give the AI a fitness-coach system prompt (see §6.B.8).

Mobile-first, fully responsive, keyboard-accessible, `prefers-reduced-motion` respected.

---

## 3. DESIGN SYSTEM (the "Apex" look)

### Color tokens (define in `tailwind.config` + CSS vars)
```
--bg            #08090A   /* near-black page */
--surface       #121417   /* cards / panels */
--surface-2     #1A1D21   /* raised panels, inputs */
--border        rgba(255,255,255,0.08)
--text          #F4F5F6   /* primary */
--text-muted    #9BA0A6   /* secondary */
--text-faint    #5C6166   /* labels, meta */
--accent        #C8FA28   /* ELECTRIC LIME — the signature neon */
--accent-press  #B2E024
--accent-ink    #0A0A0A   /* text on lime buttons */
--danger        #FF5247
--success       #5BE37D
```
Lime is used **sparingly and intentionally**: primary CTAs, active states, star ratings, the custom cursor, key stat highlights, micro-accents. Everything else is monochrome dark. The restraint is what makes it premium.

### Typography
- **Display / headings:** a tight, heavy grotesque. First choice **PP Neue Montreal** or **Satoshi**; free fallback **Geist** or **Inter Tight**. Headings are **huge, weight 600–700, letter-spacing ~ -0.02 to -0.04em, line-height ~0.95–1.0**. Think the "Materials science meets mother nature." and "The fit is perfect…" scale from the references — display sizes go up to `clamp(3rem, 8vw, 8rem)`.
- **Body / UI:** **Inter** or **Geist**, 400–500.
- **Labels / eyebrows / meta:** uppercase, tracked-out (`letter-spacing 0.12em`), 11–12px, `--text-faint` (e.g. "SCROLL TO EXPLORE", "DESIGNED IN USA", "VERIFIED").

### Shape & surface
- Pills (nav buttons, CTAs): fully rounded. Cards/panels: radius 12–16px. Inputs: 10px.
- 1px hairline borders using `--border`. Soft inner shadows on raised surfaces. No heavy drop shadows.
- Subtle film-grain / noise texture overlay option on dark sections (very low opacity) for cinematic feel.

### Layout
- Generous whitespace, strong baseline grid, content max-width ~1280–1440px with full-bleed media sections.
- Sticky/translucent top nav (logo left; on public site, lime "GET COACHED" pill + "LOG IN" right; in apps, contextual).

---

## 4. SIGNATURE MOTION SPEC (match the GIFs)

Build these as reusable components/hooks. **This is where the "world-class" feeling lives — do not cut corners.**

1. **Smooth scroll** — initialize Lenis globally; sync with GSAP ScrollTrigger.
2. **Custom cursor** (`<NeonCursor/>`) — a lime ring that follows the pointer with slight lag/spring; grows + shows a small arrow/label on hover over interactive elements; hides on touch devices. (See GIF 1.)
3. **Hero** (`<CinematicHero/>`) — autoplay muted looping `<video>` background, dark gradient overlay, glass card that slides up with **staggered** children, headline with a per-word/line reveal, neon CTA pill, bouncing "SCROLL TO EXPLORE" indicator. (GIF 1.)
4. **Pinned stacking cards** (`<StackingShowcase/>`) — GSAP ScrollTrigger: pin the section, advance through N full-width cards as the user scrolls; outgoing card scales/fades, incoming slides up; center image has parallax; thumbnail rail updates the active index; progress dots. Use it for **coaching programs** (public) and **transformation stories** (portfolio). (GIF 2 — the core effect.)
5. **Scroll reveals** — headings/sections fade + rise into place on enter; big numbers **count up** (stats like "120+ athletes coached", "8 podium finishes").
6. **Magnetic buttons** — CTAs subtly pull toward the cursor; lime fill wipe on hover.
7. **Oversized-quote testimonials** (`<ReviewWall/>`) — giant pull-quotes, lime star rows, "VERIFIED" badges, two-column staggered reveal. (GIF 4.)
8. **Command-style modal / picker** (`<PickerModal/>`) — full-screen dark overlay, search + category filter, card grid with hover-lift; used for exercise selection & program building. (GIF 3.)
9. **Sticky action bar** — on detail pages (e.g. a workout or program), a bottom sticky bar with key info + primary action (like the reference purchase bar).
10. **Page transitions** — Framer Motion route transitions (fade/slide); shared-layout animation where it reads well.
11. **Marquee** — a slow infinite ticker for credentials/sponsors/keywords.
12. **Giant footer wordmark** — the brand name rendered massive across the footer, like "NIVIS". (GIF 1 source + footer frame.)

All motion: easing `cubic-bezier(0.16,1,0.3,1)` (expo-out) as the default; durations 0.4–0.8s; respect `prefers-reduced-motion` (disable transforms, keep opacity).

---

## 5. INFORMATION ARCHITECTURE / ROUTES

```
/                         Public landing (cinematic)
/coach-profile            Full coach portfolio (wins, transformations, reviews, about)
/programs                 Coaching programs (stacking showcase) + detail modals
/programs/[slug]          Program detail (sticky action bar → "Apply / Get coached")
/onboarding               Multi-step intake & goal-setting wizard (post-signup)
/login  /signup           Auth screens (mock auth ok)

/app                      Client dashboard
/app/workouts             Assigned plans + planned workouts (calendar/list)
/app/workouts/[id]        Active workout runner + logging
/app/exercises            Client's exercise library (assigned by coach)
/app/progress             Progress tracking (charts, measurements, photos, PRs)
/app/history              Full workout & activity history
/app/chat                 Messaging hub → two threads: "AI Coach" + "Your Coach"
/app/profile              Client profile & settings

/coach                    Coach console dashboard (all clients overview)
/coach/clients            Client roster
/coach/clients/[id]       Single client: profile, goals, progress, assign work
/coach/exercises          Exercise library builder (global + per-client)
/coach/plans              Workout-plan builder
/coach/plans/[id]         Plan editor (drag exercises into days/weeks)
/coach/chat               Coach inbox (all client conversations)
/coach/portfolio          Edit portfolio: wins, transformations, reviews, bio
```

A **role switcher** in dev (top-right) lets you flip between Prospect / Client / Coach to demo all three surfaces without real auth.

---

## 6. FEATURE SPECS (build every one of these)

### A. PUBLIC SITE & COACH PORTFOLIO  *("the website given by the coach to their customers")*

1. **Landing (`/`)**
   - `<CinematicHero/>` (GIF 1): video bg, headline e.g. *"Train with intent. Build something that lasts."*, sub-line, lime "GET COACHED" CTA → `/onboarding`, secondary "View Programs".
   - **Stats strip** — count-up: athletes coached, years experience, podium finishes, avg client rating.
   - **`<StackingShowcase/>` of programs** (GIF 2): e.g. *Strength Foundations*, *Physique / Hypertrophy*, *Competition Prep*, *Online Remote Coaching* — each card: big headline, hero image, blurb, price/duration, "Learn more" → modal/detail.
   - **Transformation reel** — before/after "client builds" with sliders or paired images; scroll-reveal.
   - **`<ReviewWall/>`** (GIF 4): real-style client testimonials with ratings + verified badges.
   - **Credentials marquee** — certifications, federations, sponsors.
   - **Final CTA band** + **giant footer wordmark** + footer nav (Programs, About, Contact, Instagram, Login).

2. **Coach portfolio (`/coach-profile`)** — the trainer's story:
   - **Competition wins** — timeline / trophy grid (event, placement, year, photo).
   - **Client builds / transformations** — gallery with goal, duration, before→after.
   - **Reviews** — full `<ReviewWall/>`.
   - **About** — bio, philosophy, certifications, specialties.
   - **Press / features**, social links, CTA to get coached.

### B. CLIENT APP  *(logged-in client experience)*

3. **Onboarding & goal-setting (`/onboarding`)** — a polished **multi-step wizard** with progress bar and smooth step transitions:
   - Step 1 Welcome → Step 2 Basics (age, height, weight, sex) → Step 3 Experience level → Step 4 **Goal(s)** (lose fat / build muscle / strength / competition / general) with target + timeline → Step 5 Training availability (days/week, equipment access) → Step 6 Injuries/health notes → Step 7 Review & submit.
   - On finish: create the client profile + goals, route to `/app`, and surface the intake to the coach for review.

4. **Client dashboard (`/app`)** — *today's workout* card (with "Start" → runner), **streak / weekly volume**, next planned sessions, latest progress snapshot (weight + a key lift chart), unread messages, a motivational line. Animated cards (Framer Motion stagger on mount).

5. **Assigned workout plan + planned workouts (`/app/workouts`)**
   - Show the **active plan** (e.g. "Hypertrophy Block — Week 3 of 8") with week/day structure.
   - **Calendar + list toggle** of planned workouts; each shows name, target muscles, est. duration, completion status.
   - Tap a workout → detail/runner.

6. **Workout runner & logging (`/app/workouts/[id]`)** — the core logging UX:
   - Exercise-by-exercise flow. Per exercise: name, **embedded demo GIF/video**, coach cues, prescribed sets×reps×weight×tempo×rest.
   - **Log each set:** reps, weight, RPE, ✔ done. Auto-fill from last session; show last-time numbers and PRs inline.
   - **Rest timer** between sets (with the timer/notification pattern). Notes per exercise. Overall session feeling (1–5) + notes at the end.
   - Sticky bottom action bar: progress (e.g. "4/6 exercises") + "Finish workout".
   - On finish → write a `WorkoutLog`, update PRs/progress, celebratory micro-animation.

7. **Exercise library (`/app/exercises`)** — the client sees exercises **the coach assigned** to them: searchable/filterable grid (by muscle group, equipment), each card opens a detail sheet with demo media, step-by-step instructions, and coaching cues. (Reuse `<PickerModal/>` patterns.)

8. **AI coaching chat (`/app/chat` → "AI Coach" thread)** — streaming chat backed by `/api/coach-ai`:
   - System prompt makes Claude an **encouraging, knowledgeable strength & conditioning coach** that has context about the client's goals, current plan, and recent logs (pass a compact JSON summary in the system prompt). It answers form questions, suggests substitutions, explains the "why", nudges adherence — and **defers to the human coach** for medical issues or major plan changes, suggesting the client message their coach.
   - Streamed responses, typing indicator, suggested-prompt chips ("How do I fix my squat depth?", "I'm sore — should I still train?"). Clearly labeled as AI.

9. **Real coaching chat (`/app/chat` → "Your Coach" thread)** — 1:1 messaging with the human coach: text + image attachments + the ability to **attach a workout/log**; read receipts, timestamps; mock real-time (optimistic UI + polling/interval on the mock layer).

10. **Progress tracking (`/app/progress`)** — Recharts dashboards: bodyweight trend, key-lift strength trends, **measurements** (chest/waist/arms/etc.), **progress photos** timeline (before/after compare), **PR board**, weekly training-volume & adherence. Date-range filter. Everything dark-themed with lime accents.

11. **History (`/app/history`)** — chronological log of completed workouts (expandable to see sets), progress entries, milestones. Searchable/filterable.

12. **Profile & settings (`/app/profile`)** — editable personal info, goals, equipment, units (kg/lb), notification prefs, assigned coach card.

### C. COACH CONSOLE  *(the trainer / admin)*

13. **Coach dashboard (`/coach`)** — roster overview: client count, who trained today, adherence flags (clients falling behind), unread messages, recent PRs across clients, quick actions.

14. **Client roster (`/coach/clients`)** — searchable list/grid; each shows avatar, goal, current plan, adherence %, last activity; click → client detail.

15. **Client detail (`/coach/clients/[id]`)** — full view of one client: profile + intake answers + goals, their progress charts, current plan, recent logs, and **actions to assign a plan / assign individual exercises / message them**.

16. **Exercise library builder (`/coach/exercises`)** — coach **creates & manages exercises**: name, category, muscle groups, equipment, demo media (GIF/video URL or upload), written instructions, coaching cues. Mark **global** (all clients) or **assign to specific client(s)** — this fulfills *"exercise creating library for each client"* and *"coach will assign the exercise for each client."* Edit/duplicate/archive.

17. **Workout-plan builder (`/coach/plans` + `/coach/plans/[id]`)** — create a multi-week plan: name, goal, duration; structure **weeks → days → exercises**; for each exercise set prescribed sets/reps/weight/tempo/rest/notes; **drag-and-drop** to reorder; use `<PickerModal/>` (GIF 3) to add exercises from the library; then **assign the plan to a client** (or a template for reuse).

18. **Coach inbox (`/coach/chat`)** — all client conversations in one place; same messaging component as the client side; can attach plans/exercises into the chat.

19. **Portfolio management (`/coach/portfolio`)** — CRUD for everything on the public portfolio: **competition wins**, **client transformations/builds**, **reviews/testimonials** (add, mark verified), **bio & certifications**. Changes reflect on `/` and `/coach-profile`.

---

## 7. DATA MODEL (TypeScript types in `/lib/types.ts`)

Implement these (mock layer persists to localStorage; seed with realistic demo data — one coach, ~6 clients, a full exercise library, 2–3 plans, logged history, progress entries, reviews, wins, transformations):

- `User { id; role: 'coach' | 'client'; name; email; avatarUrl; createdAt }`
- `CoachProfile { userId; bio; philosophy; certifications[]; specialties[]; competitionWins: Win[]; transformations: Transformation[]; reviews: Review[]; stats }`
- `ClientProfile { userId; coachId; goals: Goal[]; experience; sex; age; heightCm; weightKg; equipment[]; daysPerWeek; healthNotes; onboardingComplete; units: 'kg'|'lb' }`
- `Goal { id; clientId; type; targetText; targetValue?; deadline?; status }`
- `Exercise { id; name; category; muscleGroups[]; equipment; mediaUrl; instructions[]; cues[]; createdByCoachId; isGlobal; assignedClientIds[] }`
- `WorkoutPlan { id; name; coachId; clientId?; isTemplate; goal; durationWeeks; weeks: Week[] }`
- `Week { index; days: PlannedWorkout[] }`
- `PlannedWorkout { id; planId; dayLabel; name; targetMuscles[]; items: PrescribedExercise[] }`
- `PrescribedExercise { exerciseId; sets; reps; weight?; tempo?; restSec; notes? }`
- `WorkoutLog { id; clientId; plannedWorkoutId; date; entries: LoggedExercise[]; durationMin; feeling?; notes? }`
- `LoggedExercise { exerciseId; sets: { reps; weight; rpe?; done }[] }`
- `ProgressEntry { id; clientId; date; weightKg?; bodyFat?; measurements?: Record<string,number>; photoUrls[]; notes? }`
- `PersonalRecord { id; clientId; exerciseId; metric; value; date }`
- `Conversation { id; type: 'ai' | 'coach-client'; participantIds[]; lastMessageAt }`
- `ChatMessage { id; conversationId; senderId | 'ai'; kind: 'text'|'image'|'workout'; body; attachment?; createdAt; readBy[] }`
- `Win { id; event; placement; year; photoUrl }`
- `Transformation { id; clientName; goal; durationWeeks; beforeUrl; afterUrl; summary }`
- `Review { id; clientName; rating; quote; verified; date }`

Expose a clean repository API in `/lib/data/*` (e.g. `clients.ts`, `exercises.ts`, `plans.ts`, `logs.ts`, `progress.ts`, `chat.ts`, `portfolio.ts`) so swapping to a real backend later touches only this layer.

---

## 8. BUILD PLAN (work in phases; keep it runnable at every step)

> Build incrementally. After each phase, the app should compile and the new screens should be reachable via the dev role-switcher. Commit per phase.

- **Phase 0 — Foundation:** Next.js + TS + Tailwind theme tokens + fonts + Lenis + GSAP/Framer setup. Global layout, nav, `<NeonCursor/>`, page-transition wrapper, reduced-motion handling. Build the motion primitives in §4 as isolated components first.
- **Phase 1 — Public site:** Landing with `<CinematicHero/>`, `<StackingShowcase/>`, stats count-up, `<ReviewWall/>`, marquee, giant footer. Then `/coach-profile`, `/programs`, `/programs/[slug]` with sticky action bar. **Polish the animations here to match the GIFs before moving on.**
- **Phase 2 — Mock data + auth + onboarding:** types, repositories, seed data, mock login/role switch, the onboarding wizard.
- **Phase 3 — Client app:** dashboard, workouts list/calendar, workout runner + logging, exercise library, progress, history, profile.
- **Phase 4 — Coach console:** dashboard, roster, client detail, exercise builder, plan builder (`<PickerModal/>` + drag-drop), assignment flows, portfolio management.
- **Phase 5 — Chat:** messaging component, real coach↔client thread, then the AI thread wired to `/api/coach-ai` (streaming Anthropic call with coaching system prompt + client context).
- **Phase 6 — Polish pass:** loading/empty/error states, toasts, skeletons, responsive sweep (mobile → desktop), accessibility (focus states, aria, keyboard), performance (lazy-load heavy media, `next/image`, code-split GSAP), and a final motion-quality review against the references.

---

## 9. QUALITY BAR / ACCEPTANCE CRITERIA

- It should feel as polished and cinematic as `nivisgear.com` — dark, fast, deliberate, with the lime accent used sparingly.
- The **pinned scroll-stacking section** must be smooth and match GIF 2's behavior.
- The **hero** must match GIF 1 (video bg, slide-up card, custom cursor, scroll cue).
- Reviews match GIF 4; the exercise/program **picker modal** matches GIF 3.
- All three roles are fully demoable end-to-end with seeded data and the role switcher.
- A coach can: create an exercise → build a plan → assign it to a client. That client can: see it, run/log the workout, and watch their progress charts update.
- AI chat streams real responses; live chat works between coach and client (mock real-time).
- Fully responsive, keyboard-accessible, `prefers-reduced-motion` honored, no console errors, `npm run build` passes.
- Provide a clear `README.md` (setup, `ANTHROPIC_API_KEY` env, how to run, where the mock data lives, how to swap in a real DB).

---

## 10. NICE-TO-HAVES (only after the above is solid)
Dark/"stealth" theme toggle · PWA/offline workout logging · CSV export of logs · calendar sync · push-style reminders · public shareable transformation cards · multi-coach support.

---

### One-line kickoff to give Claude Code
> "Read `CLAUDE.md`, fetch `https://www.nivisgear.com/` and study the four GIFs in `/references`, then start **Phase 0**. Build the §4 motion primitives first, show me the hero, and check in before Phase 1."

---

## BUILD LOG (kept current across sessions)

### ✅ Phase 0 — Foundation (complete)
Scaffolded the app and built the §4 motion primitives + the cinematic hero.
`npm run typecheck` and `npm run build` both pass clean; `/` renders with no
console errors.

**Stack pinned:** Next.js 14.2 (App Router) · React 18 · TypeScript strict ·
Tailwind v3 · Framer Motion 11 · GSAP 3 + ScrollTrigger · Lenis 1 · lucide-react
· Recharts (added, used from Phase 3) · @anthropic-ai/sdk (added, used Phase 5).

**Key decisions (don't relitigate):**
- Tailwind **v3**, tokens as RGB channel triplets in `globals.css`, mapped via
  `rgb(var(--x) / <alpha-value>)` so opacity utilities work.
- Fonts: **Geist** self-hosted via `next/font` (no network at build). Display
  face is swappable for PP Neue Montreal / Satoshi via `next/font/local`.
- Hero has a gradient+grain fallback; real bg video is optional at
  `/public/hero.mp4`.
- `puppeteer-core` is a **dev-only** dependency powering `scripts/screenshot.mjs`
  (`npm run shot`) for visual verification each phase — not part of the shipped app.

**Built so far:** design tokens + `globals.css`; `lib/utils`, `lib/motion`,
reduced-motion + touch hooks; `SmoothScroll` (Lenis+GSAP, `useLenis()`);
`NeonCursor`, `Reveal`/`RevealItem`, `CountUp`, `Magnetic`, `Marquee`,
`PageTransition`; `ui/button` (lime pill, magnetic, fill-wipe); `CinematicHero`;
`SiteNav`; `SiteFooter` (giant wordmark); `StatsStrip`, `CredentialsMarquee`;
landing `page.tsx`.

### ▶ Next: Phase 1 — Public site
`<StackingShowcase/>` (GSAP pinned stacking cards — the signature effect),
`<ReviewWall/>`, `<PickerModal/>`, `/coach-profile`, `/programs`,
`/programs/[slug]` with sticky action bar. Polish animations to match the GIFs
before Phase 2.

#### Phase 0 refinement (hero matched to reference)
- Hero reworked to match the nivisgear hero composition the user pointed at:
  centered contained glass card floating above the bottom, eyebrow row spread
  (SCROLL TO EXPLORE · ELEVATE EVERY SESSION · COACHED 1-ON-1), tall gap, 3-line
  headline ("Train with intent. / Build something / that lasts.") bottom-left,
  and a solid **lime action box** with a corner arrow bottom-right (+ quiet
  "View programs" link). Overlay lightened so the bg video shows through.
- Nav simplified to logo-left + two **boxy** buttons right (white "Log in" +
  lime "Get coached"), matching the reference CART/SHOP pattern.
- **Buttons are now boxy (rounded-xl) site-wide**, not pills — the reference's
  language. (Deviates from the brief's "pills" line, by user direction.)
- Bg video slot: user adds `/public/hero.mp4` manually; clearly marked in
  `CinematicHero.tsx`. Gradient+grain fallback until then.

#### Hero video wired
- User's clip added at `/public/hero.mp4`. Cinematic 4K (3840×2160, ~36s) close-up
  of an eye — moody, on-brand.
- Optimized for web: served `hero.mp4` is **1080p ~6.5 MB** (H.264, faststart);
  4K master preserved as `hero-4k.mp4`; poster `hero-poster.jpg` wired via the
  `poster` prop in `app/page.tsx`. See `public/README.md` for the ffmpeg recipe.

#### Hero video visibility fix
- Bug: the hero gated the `<video>` visible only on React's `onCanPlay`. A
  fast-loading local file fires `canplay` BEFORE hydration attaches the handler,
  so it was missed → video stuck at opacity 0 over the gradient.
- Fix: video renders visible directly with `poster` (instant first paint) +ndy a
  post-hydration `play()` fallback. No event gating. (`CinematicHero.tsx`.)
- IMPORTANT (workflow): never run `next build` / `next start` while a `next dev`
  server is live — they share `.next` and corrupt each other (caused a
  "Cannot find module './676.js'" + missing-chunks crash earlier). If that
  happens: stop all servers, `rm -rf .next`, restart one server.

#### Hero tweaks (user feedback)
- Card slimmed to a bottom strip (min-h clamp(260px,34vh,400px), pb-5vh,
  headline clamp(1.9rem,4.2vw,3.6rem)) so the video reads clearly — was eating
  ~half the viewport.
- **NeonCursor removed** from `layout.tsx` — using the native OS cursor now.
  (Component file kept, just not rendered; `data-cursor` attrs are harmless.)

#### Nav buttons matched to the nivisgear CART/SHOP reference
- `SiteNav` buttons rebuilt to mirror the reference pair: white **LOG IN**
  (≈ "CART 00") + lime **GET COACHED** (≈ "SHOP ▦"). Both use **Geist Mono**
  uppercase `tracking-wider`, `rounded-lg`, `px-6`, and a custom inline **3×3
  dot-grid** `<DotGrid/>` SVG on the lime button (matches the SHOP glyph; the
  lucide `LayoutGrid` 2×2 was wrong).
- Height iterated by user: settled on **`h-15`** (60px). `h-15`/`h-18` aren't in
  Tailwind's default scale, so **`spacing: { 15: "3.75rem", 18: "4.5rem" }`** was
  added to `tailwind.config.ts`.
- User also hand-edited the nav container to `mx-18 … px-18 py-10 max-w-8xl`
  (kept as-is; `max-w-8xl` is undefined → currently a no-op).

### ▶ Phase 1 — Public site (in progress)
**`<StackingShowcase/>` — the signature pinned scroll-stacking section (GIF 2) — DONE.**
- `src/components/sections/StackingShowcase.tsx`. Desktop (≥1024 + motion-OK):
  GSAP ScrollTrigger, section height `COUNT*100vh`, sticky `h-screen` stage,
  cards `absolute inset-0` stacked; incoming card slides up (`yPercent 100→0`),
  outgoing recedes (`scale .92` + `brightness .4`), incoming media parallaxes
  (`yPercent/scale`). Scrub `0.8`. `onUpdate` → `active` index drives a
  persistent control bar (active label · progress dots · clickable thumbnail
  rail; rail uses `lenis.scrollTo`). Per-card layout = headline (left) · ghost-
  number + tinted icon media (center) · detail panel (right: tagline, meta,
  focus chips, Get coached / Learn more). Touch / reduced-motion → clean vertical
  **list fallback**.
- Data: `src/lib/programs.ts` (4 programs, each with `tint` RGB triplet). Marketing
  content for now; real repo layer is Phase 2, coach-editable in Phase 4.
- **Contained card sizing** (per user, to match the reference's floating card —
  not full-bleed): each `.stack-card` is `inset-0 flex items-center justify-center`
  with a centered frame `h-[clamp(500px,72vh,700px)] w-full max-w-[1180px]`. Stage
  has a full-bleed cinematic backdrop (`#070809` + per-tint blurred radials +
  vignette + grain) showing around the card. The control bar is a separate z-40
  layer using the SAME centering/box dims so it docks to the card's bottom.
  Per-card eyebrow removed (collided with the logo); headline anchors bottom-left.
- Wired into `app/page.tsx` after `<StatsStrip/>`.

**Placeholder + detail routes added (no more 404s from nav/CTAs):**
- `ComingSoon` component → `/onboarding`, `/login`, `/coach-profile` stubs.
- Real `/programs` (grid) and `/programs/[slug]` (detail + **sticky bottom action
  bar**, `generateStaticParams`) built from `PROGRAMS`.

**IMPORTANT — headless screenshot quirk (not a bug):** GSAP-transformed
(composited) layers render **blank/black in old `puppeteer` headless**
screenshots even though they're correct live. Verified the real DOM via
`elementsFromPoint`/computed styles, and captured proof with **new headless**:
`scripts/shot-stack-new.mjs` (launch `headless:"new"`, `--use-angle=swiftshader`).
Use that script — not `screenshot.mjs` — for any GSAP-transformed section. Lenis
also overrides `window.scrollTo`, so the instance is now exposed at
`window.lenis` (in `SmoothScroll`); scroll via `window.lenis.scrollTo(y,{immediate:true})`.

#### Site width unified to the nav
- User wanted all content to align with the (wide) nav. Defined **`max-w-8xl:
  "100rem"`** (1600px) in tailwind and put nav + `StatsStrip` + landing method
  section + `SiteFooter` (CTA band, footer grid, bottom bar) + `/programs` +
  `/programs/[slug]` (incl. sticky bar) on the SAME centered container
  (`mx-auto max-w-8xl px-6 lg:px-10`). Replaced the user's manual
  `mx-18/px-18` nav classes with this (kept `py-10`). Marquee, footer wordmark,
  and hero stay intentionally full-bleed.

### ▶ Nivis source captured — rebuilding the home page part-by-part to match it
User saved the real nivisgear page into `references/…Nivis Gear.html` +
`…_files/` (full Shopify theme: CSS, JS, images). Goal: replicate nivis design
section-by-section with Apex coaching content, home page first.

**Nivis design system (extracted from `index-text-scroll.css` `:root`)** —
use as the source of truth: accent **`#bfee16`** / light `#ddff34` (ours
`#C8FA28` is effectively the same); black **`#0d0b14`**; grey scale
`#2b2b2b…#e7e7e7`; fonts **Neue Montreal** (headings 500), **lores-12**
(eyebrows), **lores-12-narrow** (CTA/buttons — the pixel-mono look we approximate
with Geist Mono); `--page-width:120rem`, `--landing-content-inner-container:87.5rem`
(1400px), `--content-inner-container:47.375rem` (758px); easing
`cubic-bezier(0,0,.3,1)`; the **announcement bar is `display:none`** on nivis (skip).

**Home-page section map (nivis body order):** announcement-bar (hidden) ·
header ✅ · hero_index_video ✅ · products_showcase ✅ (our `StackingShowcase`) ·
**index_text_scroll ✅ (NEW — `TextScrollStatement.tsx`)** · discover-features ⏳ ·
index_faq ⏳ (it's a "process + 3 perk cards: Free Shipping/Returns/Custom
Patches", bg `index-faq-desktop1.jpg`) · newsletter_footer ⏳ · footer ✅.

`TextScrollStatement` = nivis `index_text_scroll`: centered big statement,
word spans dimmed→lit on scroll (GSAP scrub), inline looping `<video>` chips
(56×38 / 88×60, `/hero.mp4`), "LEARN MORE" → `/coach-profile`. Wired into
`page.tsx` after `StackingShowcase`. Screenshot tool: `scripts/shot-ts.mjs`
(networkidle2 + new-headless; needed because of GSAP layers + Lenis, see above).

#### Home-page nivis sections 6–8 built (all three, then reviewed)
User chose: build all 3 back-to-back; **keep current palette** (`#C8FA28` /
`#08090A`) — it's ~identical to nivis and already consistent (do NOT switch to
`#bfee16`/`#0d0b14` unless asked).
- **`DiscoverFeatures.tsx`** (discover-features) — heading + `md:grid-cols-3`
  hover-lift cards: Workout runner · Progress dashboards · Exercise library.
- **`ProcessPerks.tsx`** (index_faq) — narrow centered column (`max-w-[47.375rem]`,
  nivis's content-inner) over a faint backdrop: eyebrow + "How the coaching
  works" + glass intro panel w/ LEARN MORE + 3 hairline-separated icon blocks
  (Weekly check-ins · Form reviews · 24/7 chat access).
- **`NewsletterCTA.tsx`** (newsletter_footer) — email capture band, mock submit
  (optimistic "You're in"). Added `spacing: { 13: "3.25rem" }` for the `h-13`
  input/button.
- **`page.tsx` rewired to the nivis order** and the old "method" (Assess/Program/
  Adjust) section was **removed** (superseded by DiscoverFeatures + ProcessPerks):
  Hero → Stats → StackingShowcase → TextScrollStatement → DiscoverFeatures →
  ProcessPerks → NewsletterCTA → CredentialsMarquee → Footer.
- Screenshot tool for these: `scripts/shot-secs.mjs` (anchors by text).

**Home page now mirrors the full nivis section order. ✅**

#### ▶ Next in Phase 1
Rest of the brief's public-site pieces: `<ReviewWall/>` (GIF 4 oversized-quote
testimonials), `<PickerModal/>` (GIF 3), and build out `/coach-profile`
(wins/transformations/reviews/about). Optionally align exact nivis tokens later.
