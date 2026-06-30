"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { PROGRAMS, type Program } from "@/lib/programs";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/motion/SmoothScroll";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger);

const COUNT = PROGRAMS.length;

/**
 * <StackingShowcase/> — the signature pinned scroll-stacking section (GIF 2).
 * On desktop the section pins (the screen stays fixed) and each program card
 * slides up over the previous one as you scroll, card by card; the outgoing
 * card scales back + dims, the incoming media parallaxes in. A persistent
 * control bar (active label · progress dots · clickable thumbnail rail) tracks
 * and drives the active index. On touch / small / reduced-motion it gracefully
 * degrades to a clean vertical list.
 */
export function StackingShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"stack" | "list">("list");
  const reduced = usePrefersReducedMotion();
  const { scrollTo } = useLenis();

  // Pinned stacking is a desktop + motion-OK enhancement; otherwise a list.
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const decide = () => setMode(mq.matches && !reduced ? "stack" : "list");
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, [reduced]);

  useLayoutEffect(() => {
    if (mode !== "stack" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      // Card 0 sits in place; the rest wait just off the bottom edge.
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          transformOrigin: "50% 0%",
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

      for (let i = 1; i < COUNT; i++) {
        const label = `seg${i}`;
        const prev = cards[i - 1];
        const cur = cards[i];
        const curImg = cur.querySelector<HTMLElement>(".stack-img");
        tl.addLabel(label);
        // outgoing card recedes
        tl.to(prev, { scale: 0.92, filter: "brightness(0.4)" }, label);
        // incoming card slides up to cover it
        tl.fromTo(cur, { yPercent: 100 }, { yPercent: 0 }, label);
        // incoming media parallaxes in
        if (curImg)
          tl.fromTo(
            curImg,
            { yPercent: 16, scale: 1.14 },
            { yPercent: 0, scale: 1 },
            label
          );
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [mode]);

  const goTo = (i: number) => {
    const sec = sectionRef.current;
    if (!sec) return;
    const top = window.scrollY + sec.getBoundingClientRect().top;
    const range = sec.offsetHeight - window.innerHeight;
    const target = top + (range * i) / (COUNT - 1);
    if (scrollTo) scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  /* ----------------------------- LIST FALLBACK ----------------------------- */
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

        {/* stacked cards */}
        {PROGRAMS.map((p, i) => (
          <div
            key={p.slug}
            className="stack-card absolute inset-0 z-10 flex items-center justify-center px-[clamp(16px,4vw,56px)] pb-[clamp(20px,4vh,40px)] pt-[clamp(76px,12vh,128px)]"
            style={{ zIndex: 10 + i }}
          >
            <div className="relative h-[clamp(500px,72vh,700px)] w-full max-w-[1180px] overflow-hidden rounded-panel border border-border bg-surface shadow-raised">
              <div className="grid h-full grid-cols-[1.05fr_1.3fr_0.95fr]">
                {/* headline */}
                <div className="flex flex-col justify-end p-[clamp(28px,3vw,48px)] pb-[clamp(80px,9vh,96px)]">
                  <h3 className="font-display text-[clamp(2.2rem,3.6vw,4.6rem)] leading-[0.92] tracking-tightest">
                    {p.headline.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>

                {/* media (parallax) */}
                <div className="relative overflow-hidden border-x border-border bg-[#0c0e10]">
                  <div
                    className="stack-img absolute inset-0"
                    style={{
                      background: `radial-gradient(120% 90% at 50% 0%, rgb(${p.tint} / 0.30), transparent 60%), linear-gradient(180deg, #14171b, #0a0c0e)`,
                    }}
                  >
                    <div className="grain absolute inset-0 opacity-60" />
                    <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26vh] leading-none text-white/[0.05]">
                      {p.index}
                    </span>
                    <p.icon
                      className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
                      style={{ color: `rgb(${p.tint})` }}
                      strokeWidth={1.25}
                    />
                  </div>
                </div>

                {/* detail panel */}
                <div className="flex flex-col justify-between p-[clamp(28px,2.4vw,40px)] pb-[clamp(80px,9vh,96px)]">
                  <div>
                    <h4 className="font-display text-2xl tracking-tight">
                      {p.name}
                    </h4>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {p.tagline}
                    </p>
                    <dl className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                      <MetaRow label="Duration" value={p.duration} />
                      <MetaRow label="Level" value={p.level} />
                      <MetaRow label="Investment" value={p.price} />
                    </dl>
                    <div className="mt-5 flex flex-wrap gap-2">
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

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href="/onboarding"
                      data-cursor="Apply"
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 font-mono text-xs font-medium uppercase tracking-wider text-accent-ink transition-colors hover:bg-accent-press"
                    >
                      Get coached
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/programs/${p.slug}`}
                      data-cursor="Details"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-4 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* persistent control bar — aligned to the card box: label · dots · rail */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-[clamp(16px,4vw,56px)] pb-[clamp(20px,4vh,40px)] pt-[clamp(76px,12vh,128px)]">
          <div className="relative h-[clamp(500px,72vh,700px)] w-full max-w-[1180px]">
            <div className="absolute inset-x-0 bottom-0 flex h-[clamp(60px,8vh,84px)] items-center justify-between gap-6 border-t border-border px-[clamp(24px,2.4vw,40px)]">
            <span className="eyebrow hidden truncate text-faint sm:block">
              {PROGRAMS[active].index} / 0{COUNT} — {PROGRAMS[active].name}
            </span>

            <div className="flex items-center gap-1.5">
              {PROGRAMS.map((p, i) => (
                <span
                  key={p.slug}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 ease-expo",
                    i === active ? "w-8 bg-accent" : "w-1.5 bg-white/25"
                  )}
                />
              ))}
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              {PROGRAMS.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${p.name}`}
                  data-cursor={p.name}
                  className={cn(
                    "relative grid h-11 w-11 place-items-center overflow-hidden rounded-md border transition-all duration-300 ease-expo",
                    i === active
                      ? "border-accent ring-1 ring-accent"
                      : "border-border opacity-60 hover:opacity-100"
                  )}
                  style={{
                    background: `radial-gradient(120% 100% at 50% 0%, rgb(${p.tint} / 0.45), #0c0e10 70%)`,
                  }}
                >
                  <p.icon className="h-4 w-4 text-white/85" strokeWidth={1.5} />
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
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

/** Compact horizontal card used by the mobile / reduced-motion list fallback. */
function ProgramCardListItem({ program: p }: { program: Program }) {
  return (
    <Link
      href={`/programs/${p.slug}`}
      data-cursor="Details"
      className="group grid grid-cols-1 overflow-hidden rounded-panel border border-border bg-surface transition-colors hover:border-white/20 sm:grid-cols-[1fr_1.1fr]"
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
