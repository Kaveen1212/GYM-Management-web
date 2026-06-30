"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_EXPO } from "@/lib/motion";

/** 3×3 dot grid — matches the reference's "SHOP ▦" mark exactly. */
function DotGrid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} fill="currentColor" aria-hidden>
      {[3, 9, 15].map((y) =>
        [3, 9, 15].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />)
      )}
    </svg>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-6 py-10 lg:px-10">
        {/* Logo — dark tile + lime mark */}
        <Link href="/" data-cursor="Home" className="flex items-center gap-2.5" aria-label="Apex — home">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-[#0c0e10] text-accent">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
              <path d="M12 3L3 20h18L12 3z" fill="currentColor" />
            </svg>
          </span>
          <span className="font-display text-lg tracking-tightest">APEX</span>
        </Link>

        {/* Boxy action buttons — white "Log in" + lime "Get coached" */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-2xl transition-all duration-500 ease-expo",
            scrolled && "glass p-1.5"
          )}
        >
          <Magnetic strength={0.8} className="inline-flex">
            <Link
              href="/login"
              data-cursor="Log in"
              className="inline-flex h-15 min-w-[120px] items-center justify-center rounded-lg bg-white px-6 font-mono text-xs font-medium uppercase tracking-wider text-bg transition-colors hover:bg-white/90"
            >
              Log in
            </Link>
          </Magnetic>
          <Magnetic strength={0.6} className="inline-flex">
            <Link
              href="/onboarding"
              data-cursor="Apply"
              className="inline-flex h-15 items-center justify-center gap-2.5 rounded-lg bg-accent px-6 font-mono text-xs font-medium uppercase tracking-wider text-accent-ink transition-colors hover:bg-accent-press"
            >
              Get coached
              <DotGrid className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}
