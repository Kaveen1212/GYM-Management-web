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
  { icon: Award, label: "Physical Fitness Trainer NVQ 4" },
  { icon: Activity, label: "Sports Masseur NVQ 4" },
  { icon: Utensils, label: "Qualified Nutritionist" },
  { icon: HeartPulse, label: "Qualified First Aider (Reg No. 21860)" },
  { icon: Gavel, label: "SLFF National Judge" },
  { icon: Users, label: "Sri Lanka Fitness Federation Member" },
];

const SERVICES = [
  { icon: Dumbbell, label: "Personal training" },
  { icon: Laptop, label: "Online coaching" },
  { icon: Trophy, label: "Competition preparation" },
  { icon: Activity, label: "Every sports fitness training" },
  { icon: Scale, label: "Weight loss and gaining" },
  { icon: Flame, label: "Strength and conditioning training" },
  { icon: Zap, label: "High intensity workout" },
  { icon: Pill, label: "Supplements, vitamins and nutrition routines" },
];

export function CoachPortfolio() {
  return (
    <section id="coach" className="scroll-mt-24 border-t border-border bg-[#0a0c0e] py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        {/* intro */}
        <Reveal className="max-w-3xl">
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
            <Button href="/onboarding" size="lg" className="font-pixel uppercase tracking-wider" data-cursor="Apply">
              Join now
            </Button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="WhatsApp"
              className="inline-flex h-14 items-center gap-2.5 rounded-md border border-border px-6 font-pixel text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </Reveal>

        {/* qualifications */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow mb-4">Credentials</p>
            <h3 className="font-display text-2xl tracking-tight">
              Qualifications &amp; certifications.
            </h3>
          </Reveal>
          <Reveal
            stagger
            staggerAmount={0.08}
            className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-border sm:grid-cols-2 lg:grid-cols-3"
          >
            {QUALIFICATIONS.map((q) => (
              <RevealItem
                key={q.label}
                className="flex items-start gap-4 bg-surface/40 p-6"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-accent">
                  <q.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="pt-2 text-sm font-medium leading-snug text-ink">
                  {q.label}
                </span>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* services */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow mb-4">Our service</p>
            <h3 className="font-display text-2xl tracking-tight">
              Everything you need, under one coach.
            </h3>
          </Reveal>
          <Reveal
            stagger
            staggerAmount={0.06}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SERVICES.map((s) => (
              <RevealItem
                key={s.label}
                className="group flex flex-col gap-4 rounded-md border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md border border-border text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-medium leading-snug text-ink">
                  {s.label}
                </span>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
