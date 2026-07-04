"use client";

import Link from "next/link";
import { Dumbbell, LineChart, PlayCircle, ArrowUpRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

/**
 * <DiscoverFeatures/> — Nivis's `discover-features` section, rebuilt for K_RIPSTER.
 * Nivis: a heading + a `grid md:grid-cols-3` of interactive feature boxes
 * (swiper on mobile). Here: the three core product surfaces, each a hover-lift
 * card with a tinted visual, big icon, title and copy.
 */

const FEATURES = [
  {
    icon: Dumbbell,
    title: "Workout runner",
    body: "Log every set, weight and RPE with a built-in rest timer and last-session numbers right where you need them.",
    tint: "200 250 40",
  },
  {
    icon: LineChart,
    title: "Progress dashboards",
    body: "Bodyweight, key lifts, measurements, PRs and adherence — tracked and visualised over every block.",
    tint: "86 132 178",
  },
  {
    icon: PlayCircle,
    title: "Exercise library",
    body: "Demo videos, coaching cues and smart substitutions for every movement your coach assigns.",
    tint: "74 184 150",
  },
];

export function DiscoverFeatures() {
  return (
    <section className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-accent">Inside the app</p>
            <h2 className="font-display text-display-sm text-balance">
              Everything you need to train with intent.
            </h2>
          </div>
          <Link
            href="/login"
            data-cursor="Open app"
            className="group hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent md:inline-flex"
          >
            Open the app
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.1}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <RevealItem key={f.title}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-panel border border-border bg-surface transition-colors duration-300 hover:border-white/20">
                {/* tinted visual */}
                <div
                  className="relative h-52 overflow-hidden"
                  style={{
                    background: `radial-gradient(120% 90% at 50% 0%, rgb(${f.tint} / 0.22), transparent 60%), linear-gradient(180deg, #14171b, #0c0e10)`,
                  }}
                >
                  <div className="grain absolute inset-0 opacity-50" />
                  <f.icon
                    className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-expo group-hover:scale-110"
                    style={{ color: `rgb(${f.tint})` }}
                    strokeWidth={1.25}
                  />
                  <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-white/40 transition-all duration-300 ease-expo group-hover:right-3.5 group-hover:top-3.5 group-hover:text-accent" />
                </div>
                {/* content */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl tracking-tight">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
