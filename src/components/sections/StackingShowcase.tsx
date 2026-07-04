"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PROGRAMS, type Program } from "@/lib/programs";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger);

const COUNT = PROGRAMS.length;

/**
 * <StackingShowcase/> — the signature pinned scroll-stacking section (GIF 2).
 * The section pins (the screen stays fixed) and each program card flies up
 * and off as you scroll, card by card, while the next one emerges from the
 * deck behind it — on every screen size, mobile included. The card's internal
 * layout stacks (headline / media / detail) on narrow screens and switches to
 * 3 columns at the `lg` breakpoint. Only reduced-motion users get a plain
 * vertical list instead.
 */
export function StackingShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Pinned stacking runs on every screen size — only reduced-motion users get
  // the plain list fallback.
  const mode: "stack" | "list" = reduced ? "list" : "stack";

  useLayoutEffect(() => {
    if (mode !== "stack" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      const stageHeight = stageRef.current?.clientHeight || window.innerHeight;

      // All cards already sit on screen, centered, fanned into a shallow deck:
      // card 0 up front at full size, the rest waiting just behind — slightly
      // smaller and nudged down — instead of parked off-screen below.
      cards.forEach((card, i) => {
        gsap.set(card, {
          scale: i === 0 ? 1 : 0.98 - (i - 1) * 0.02,
          y: i === 0 ? 0 : 12 * i,
          transformOrigin: "50% 50%",
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) =>
            setActive(Math.round(self.progress * (COUNT - 1))),
        },
      });

      for (let i = 0; i < COUNT - 1; i++) {
        const label = `seg${i}`;
        tl.addLabel(label);
        // current front card is sent up and off the top of the screen
        tl.to(cards[i], { y: -stageHeight }, label);
        // the next card in the deck emerges — scales up to fill the front
        tl.to(cards[i + 1], { scale: 1, y: 0, duration: 0.5 }, `${label}+=0.25`);
        // remaining background cards shuffle one position closer to the front
        for (let j = i + 2; j < COUNT; j++) {
          tl.to(
            cards[j],
            {
              scale: 0.98 - (j - i - 2) * 0.02,
              y: 12 * (j - i - 1),
              duration: 0.5,
            },
            `${label}+=0.25`
          );
        }
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [mode]);

  if (mode === "list") {
    return (
      <section id="programs" className="bg-[#0a0c0e] py-20 sm:py-28">
        <div className="mx-auto max-w-content px-6">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow mb-4 text-accent">Coaching programs</p>
            <h2 className="font-display text-display-sm">
              Four ways to train with me.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-5">
            {PROGRAMS.map((p) => (
              <Reveal key={p.slug}>
                <ProgramCardListItem program={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------ PINNED STACK ----------------------------- */
  return (
    <section
      ref={sectionRef}
      id="programs"
      style={{ height: `${COUNT * 100}vh` }}
      className="relative bg-[#0a0c0e]"
      aria-label="Coaching programs"
    >
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden grain">
        {/* full-bleed cinematic backdrop (per active) — the card floats above it */}
        <div className="absolute inset-0 z-0 bg-[#070809]" />
        <div
          className="absolute inset-0 z-0 transition-[background] duration-700 ease-out"
          style={{
            background: `radial-gradient(55% 45% at 28% 22%, rgb(${PROGRAMS[active].tint} / 0.22), transparent 60%), radial-gradient(50% 55% at 82% 80%, rgb(${PROGRAMS[active].tint} / 0.13), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.7))]" />

        {/* stacked cards — all present on screen from the start, fanned into a
            shallow deck; the front card (highest z-index) flies up and off on
            scroll, the next one (already waiting behind) scales up to replace it */}
        {PROGRAMS.map((p, i) => (
          <div
            key={p.slug}
            className="absolute inset-0 z-10 flex items-center justify-center px-[clamp(12px,4vw,56px)] pb-[clamp(12px,3vh,40px)] pt-[clamp(64px,11vh,128px)]"
            style={{ zIndex: 10 + (COUNT - i) }}
          >
            <div className="stack-card relative h-[clamp(460px,82svh,700px)] w-full max-w-[1480px] overflow-hidden rounded-panel border border-border bg-surface shadow-raised">
              {/* mobile: stacked rows (headline / media / detail) — desktop: 3 columns */}
              <div className="grid h-full grid-rows-[auto_minmax(160px,1fr)_auto] lg:grid-rows-none lg:grid-cols-[0.85fr_1.75fr_0.8fr]">
                {/* headline */}
                <div className="flex flex-col justify-end p-5 pb-3 lg:p-[clamp(28px,3vw,48px)] lg:pb-[clamp(80px,9vh,96px)]">
                  <h3 className="font-display text-[clamp(1.7rem,3.6vw,4.6rem)] leading-[0.96] tracking-tightest lg:leading-[0.92]">
                    {p.headline.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>

                {/* media (parallax) */}
                <div className="relative overflow-hidden border-y border-border bg-[#0c0e10] lg:border-x lg:border-y-0">
                  <div className="stack-img absolute inset-0">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                    {/* tint wash + dark gradient — keeps every photo reading as one campaign */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgb(${p.tint} / 0.22), transparent 45%, rgba(10,12,14,0.55) 100%)`,
                      }}
                    />
                    <div className="grain pointer-events-none absolute inset-0 opacity-40" />
                    <span className="pointer-events-none absolute left-4 top-4 font-display text-sm leading-none text-white/40">
                      {p.index}
                    </span>
                  </div>
                </div>

                {/* detail panel */}
                <div className="flex flex-col justify-between overflow-hidden p-5 pt-3 lg:p-[clamp(28px,2.4vw,40px)] lg:pb-[clamp(80px,9vh,96px)]">
                  <div>
                    <h4 className="font-display text-lg tracking-tight lg:text-2xl">
                      {p.name}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted lg:mt-4 lg:line-clamp-none">
                      {p.tagline}
                    </p>

                    {/* compact single-line meta on mobile */}
                    <p className="mt-3 border-t border-border pt-3 font-mono text-[11px] uppercase tracking-wider text-faint lg:hidden">
                      {p.duration} · {p.level} · {p.price}
                    </p>

                    {/* full meta + focus chips on desktop */}
                    <dl className="mt-6 hidden space-y-2.5 border-t border-border pt-5 text-sm lg:block">
                      <MetaRow label="Duration" value={p.duration} />
                      <MetaRow label="Level" value={p.level} />
                      <MetaRow label="Investment" value={p.price} />
                    </dl>
                    <div className="mt-5 hidden flex-wrap gap-2 lg:flex">
                      {p.focus.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-[11px] text-muted"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 lg:mt-6">
                    <Link
                      href="/onboarding"
                      data-cursor="Apply"
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 font-pixel text-xs font-medium uppercase tracking-wider text-accent-ink transition-colors hover:bg-accent-press"
                    >
                      Get coached
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/programs/${p.slug}`}
                      data-cursor="Details"
                      className="inline-flex h-11 items-center justify-center rounded-md border border-border px-4 font-pixel text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-faint">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

/** Compact horizontal card used by the reduced-motion list fallback. */
function ProgramCardListItem({ program: p }: { program: Program }) {
  return (
    <Link
      href={`/programs/${p.slug}`}
      data-cursor="Details"
      className="group grid grid-cols-1 overflow-hidden rounded-md border border-border bg-surface transition-colors hover:border-white/20 sm:grid-cols-[1fr_1.1fr]"
    >
      <div
        className="relative h-44 overflow-hidden sm:h-auto"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, rgb(${p.tint} / 0.30), transparent 60%), linear-gradient(180deg, #14171b, #0a0c0e)`,
        }}
      >
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-white/[0.05] sm:text-[12rem]">
          {p.index}
        </span>
        <p.icon
          className="absolute right-5 top-5 h-9 w-9"
          style={{ color: `rgb(${p.tint})` }}
          strokeWidth={1.25}
        />
      </div>
      <div className="flex flex-col justify-between p-6">
        <div>
          <span className="eyebrow text-accent">{p.index} — Program</span>
          <h3 className="mt-3 font-display text-2xl tracking-tight">{p.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.tagline}</p>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-faint">
            {p.duration} · {p.price}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors group-hover:text-accent">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
