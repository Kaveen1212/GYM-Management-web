import Image from "next/image";
import {
  Award,
  Utensils,
  HeartPulse,
  Gavel,
  Users,
  Dumbbell,
  Laptop,
  Trophy,
  Activity,
  Scale,
  Flame,
  Zap,
  Pill,
  MessageCircle,
} from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

/**
 * <CoachPortfolio/> — this site IS the coach's portfolio, so his real
 * credentials and services live on the home page itself rather than a
 * separate route. Sourced from his printed flyer (Alpha Lift Fitness Centre).
 */

const WHATSAPP_NUMBER = "94770227550";
const WHATSAPP_DISPLAY = "077 022 7550";

const QUALIFICATIONS = [
  {
    icon: Award,
    label: "Physical Fitness Trainer NVQ 4",
    blurb: "Nationally recognized vocational qualification in personal training.",
  },
  {
    icon: Activity,
    label: "Sports Masseur NVQ 4",
    blurb: "Certified in sports massage and recovery technique.",
  },
  {
    icon: Utensils,
    label: "Qualified Nutritionist",
    blurb: "Nutrition coaching built around training and recovery.",
  },
  {
    icon: HeartPulse,
    label: "Qualified First Aider (Reg No. 21860)",
    blurb: "Registered and certified in emergency first aid response.",
  },
  {
    icon: Gavel,
    label: "SLFF National Judge",
    blurb: "Certified competition judge for the Sri Lanka Fitness Federation.",
  },
  {
    icon: Users,
    label: "Sri Lanka Fitness Federation Member",
    blurb: "Active member of Sri Lanka's official fitness governing body.",
  },
];

const SERVICES = [
  {
    icon: Dumbbell,
    label: "Personal training",
    blurb: "One-on-one coaching built around your goals.",
  },
  {
    icon: Laptop,
    label: "Online coaching",
    blurb: "Remote programming and check-ins from anywhere.",
  },
  {
    icon: Trophy,
    label: "Competition preparation",
    blurb: "Peak-week planning, posing and stage-ready conditioning.",
  },
  {
    icon: Activity,
    label: "Every sports fitness training",
    blurb: "Sport-specific conditioning for any discipline.",
  },
  {
    icon: Scale,
    label: "Weight loss and gaining",
    blurb: "Structured nutrition and training for your target weight.",
  },
  {
    icon: Flame,
    label: "Strength and conditioning training",
    blurb: "Build raw strength and athletic performance.",
  },
  {
    icon: Zap,
    label: "High intensity workout",
    blurb: "Fast-paced, high-output training sessions.",
  },
  {
    icon: Pill,
    label: "Supplements, vitamins and nutrition routines",
    blurb: "Guidance on supplementation and daily nutrition.",
  },
];

/** Standalone header/hero blocks — hairline top/bottom dividers on mobile (no
 *  box, so the fixed photo behind reads through), a translucent rounded card
 *  on desktop, matching nivis's index_faq perk cards. */
const PANEL =
  "border-y border-white/10 lg:rounded-md lg:border-y-0 lg:bg-surface/55 lg:backdrop-blur-md";
/** List rows — no border of their own; the list wrapper's `divide-y` supplies
 *  the dividers on mobile so adjacent rows don't double up. */
const PANEL_ROW = "lg:rounded-md lg:bg-surface/55 lg:backdrop-blur-md";

export function CoachPortfolio() {
  return (
    <section id="coach" className="scroll-mt-24 border-t border-border bg-[#0a0c0e]">
      {/* a full-bleed sticky photo (nivis's index_faq treatment), fixed in
          place on every screen size while the intro + credentials + services
          scroll over it as translucent panels (desktop) or a plain divided
          list (mobile, no boxes) */}
      <div className="relative">
        {/* sticky backdrop — pinned behind the scrolling column at every size */}
        <div className="pointer-events-none absolute inset-0">
          <div className="sticky top-0 h-[100svh] w-full">
            {/* portrait crop on phones, wide landscape crop on desktop */}
            <Image
              src="/programs/style.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover lg:hidden"
            />
            <Image
              src="/programs/style-landscape.png"
              alt=""
              fill
              sizes="100vw"
              className="hidden object-cover lg:block"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0e]/65 via-[#0a0c0e]/40 to-[#0a0c0e]/70 lg:bg-gradient-to-r lg:from-[#0a0c0e] lg:via-[#0a0c0e]/75 lg:to-[#0a0c0e]/10" />
            <div className="grain absolute inset-0 opacity-30" />
          </div>
        </div>

        {/* scrolling card column */}
        <div className="relative z-10 mx-auto max-w-9xl px-5 sm:px-8 lg:px-0">
          <div className="flex flex-col gap-2.5 pb-16 pt-20 lg:max-w-2xl lg:py-16">
            {/* hero panel — taller, like nivis's opening "Clothing to
                claim..." card, not a uniform row */}
            <Reveal className={`${PANEL} border-b-0 py-7 lg:p-10`}>
              <p className="eyebrow mb-5 text-accent">The coach · Alpha Lift Fitness Centre</p>
              <h2 className="font-display text-display-sm text-balance">
                Shape your body, perfectly — with K_RIPSTER.
              </h2>
              <p className="mt-6 max-w-xl text-lg text-muted">
                NVQ-certified trainer, national judge and qualified nutritionist,
                coaching everyday athletes and competitors alike at Alpha Lift
                Fitness Centre.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href="/onboarding"
                  size="lg"
                  className="h-11 px-6 text-sm font-pixel uppercase tracking-wider sm:h-14 sm:px-8 sm:text-base"
                  data-cursor="Apply"
                >
                  Join now
                </Button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="WhatsApp"
                  className="inline-flex h-11 items-center gap-2.5 rounded-md border border-border px-5 font-pixel text-[11px] font-medium uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent sm:h-14 sm:px-6 sm:text-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
            </Reveal>

            <Reveal className={`${PANEL} py-7 lg:mt-6 lg:p-7`}>
              <p className="eyebrow mb-3 text-accent">Credentials</p>
              <h3 className="font-display text-2xl tracking-tight">
                Qualifications &amp; certifications.
              </h3>
            </Reveal>
            <Reveal
              stagger
              staggerAmount={0.06}
              className="flex flex-col divide-y divide-white/10 lg:gap-2.5 lg:divide-y-0"
            >
              {QUALIFICATIONS.map((q) => (
                <RevealItem key={q.label} className={`${PANEL_ROW} py-6 lg:p-6`}>
                  <span className="block text-sm font-medium leading-snug text-ink lg:text-base">
                    {q.label}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted">
                    {q.blurb}
                  </span>
                </RevealItem>
              ))}
            </Reveal>

            <Reveal className={`${PANEL} py-7 lg:mt-6 lg:p-7`}>
              <p className="eyebrow mb-3 text-accent">Our service</p>
              <h3 className="font-display text-2xl tracking-tight">
                Everything you need, under one coach.
              </h3>
            </Reveal>
            <Reveal
              stagger
              staggerAmount={0.05}
              className="flex flex-col divide-y divide-white/10 lg:gap-2.5 lg:divide-y-0"
            >
              {SERVICES.map((s) => (
                <RevealItem
                  key={s.label}
                  className={`${PANEL_ROW} py-6 lg:p-6 transition-colors hover:bg-surface/90`}
                >
                  <span className="block text-sm font-medium leading-snug text-ink lg:text-base">
                    {s.label}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted">
                    {s.blurb}
                  </span>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
