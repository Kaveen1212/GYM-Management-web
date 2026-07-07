"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

const STATS = [
  { to: 120, suffix: "+", label: "Athletes coached" },
  { to: 9, suffix: "", label: "Years experience" },
  { to: 8, suffix: "", label: "Podium finishes" },
  { to: 4.9, decimals: 1, label: "Avg client rating" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-border bg-surface/30">
      <Reveal
        stagger
        className="mx-auto grid max-w-9xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4"
      >
        {STATS.map((s) => (
          <RevealItem
            key={s.label}
            className="flex flex-col gap-2 bg-bg px-6 py-10 sm:px-8 sm:py-12"
          >
            <span className="font-display text-5xl text-accent-glow sm:text-6xl">
              <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </span>
            <span className="eyebrow">{s.label}</span>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
