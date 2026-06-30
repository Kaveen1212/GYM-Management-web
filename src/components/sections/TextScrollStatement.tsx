"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * <TextScrollStatement/> — Nivis's `index_text_scroll` section, rebuilt for Apex.
 * A large centered statement that reveals word-by-word as it scrolls through the
 * viewport (GSAP scrub), with tiny inline looping video chips mid-sentence — the
 * exact pattern from the reference. Reduced motion shows it fully lit.
 */

type Part = { type: "text"; value: string } | { type: "video" };

const STATEMENT: Part[] = [
  { type: "text", value: "Apex is a" },
  { type: "video" },
  {
    type: "text",
    value:
      "performance coaching studio, building bespoke training for a handful of committed clients —",
  },
  { type: "video" },
  {
    type: "text",
    value:
      "programmed in detail, tested in the gym, and adjusted around your life every single week.",
  },
];

function VideoChip() {
  return (
    <span className="mx-1.5 inline-block translate-y-[2px] align-middle">
      <video
        className="h-[38px] w-[56px] rounded-[3px] object-cover sm:h-[60px] sm:w-[88px]"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </span>
  );
}

export function TextScrollStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".tsw");
      gsap.set(words, { opacity: 0.18 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.6,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // Build the word/video stream. Each word is an animatable span.
  let key = 0;
  const nodes = STATEMENT.flatMap((part) => {
    if (part.type === "video") return [<VideoChip key={`v${key++}`} />];
    return part.value.split(" ").map((w) => (
      <span key={`w${key++}`} className="tsw">
        {w}{" "}
      </span>
    ));
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0c0e] py-28 sm:py-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(200,250,40,0.05),transparent_60%)]" />
      <div className="relative mx-auto max-w-[58rem] px-6 text-center">
        <p className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-medium leading-[1.25] tracking-tight text-ink">
          {nodes}
        </p>
        <Link
          href="/coach-profile"
          data-cursor="The coach"
          className="group mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
        >
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
