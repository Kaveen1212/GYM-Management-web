"use client";

import Link from "next/link";
import { CalendarCheck, Video, MessageCircle, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * <ProcessPerks/> — Nivis's `index_faq` section ("OUR DEVELOPMENT PROCESS" +
 * Free Shipping / Returns / Custom Patches), rebuilt for K_RIPSTER. A narrow centered
 * column over a faint backdrop: eyebrow + heading, an intro/process blurb with a
 * CTA, then three icon-led blocks separated by hairlines.
 */

const PERKS = [
  {
    icon: CalendarCheck,
    title: "Weekly check-ins",
    body: "Every week I review your logs and adjust the plan — so progress stays honest and the programming keeps moving with your life.",
  },
  {
    icon: Video,
    title: "Form reviews",
    body: "Send a clip of any lift and get detailed coaching cues back, so technique sharpens session over session.",
  },
  {
    icon: MessageCircle,
    title: "24/7 chat access",
    body: "Questions between sessions? Message your coach — and the AI coach — anytime, and get answers when you need them.",
  },
];

export function ProcessPerks() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0c0e] px-6 py-24 sm:py-32">
      {/* faint backdrop (nivis used index-faq-desktop1.jpg) */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(200,250,40,0.05),transparent_60%)]" />
      <div className="grain absolute inset-0 opacity-[0.04]" />

      <div className="relative w-full max-w-[47.375rem]">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">K_RIPSTER coaching</p>
          <h2 className="font-display text-display-sm">How the coaching works.</h2>
        </Reveal>

        {/* intro / process blurb */}
        <Reveal className="mt-8 rounded-panel border border-border bg-surface/60 p-7 backdrop-blur-md sm:p-9">
          <p className="text-balance text-lg leading-relaxed text-muted">
            Every plan is built from your intake — your numbers, your training
            history, your schedule. From there I rapidly adjust loads, exercises
            and structure to get the most out of every single session.
          </p>
          <Link
            href="/#coach"
            data-cursor="The coach"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-accent"
          >
            Learn more
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        {/* perk blocks */}
        <div className="mt-10">
          {PERKS.map((p) => (
            <Reveal
              key={p.title}
              className="flex gap-5 border-t border-border py-7 sm:gap-8"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-card border border-border text-accent">
                <p.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-xl tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
