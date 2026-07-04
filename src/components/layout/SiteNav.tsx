"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-4 sm:px-6 sm:py-10 lg:px-10">
        {/* Logo — dark tile + lime mark */}
        <Link href="/" data-cursor="Home" className="flex items-center gap-2 sm:gap-2.5" aria-label="K_RIPSTER — home">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-[#0c0e10] text-accent sm:h-9 sm:w-9">
            <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" aria-hidden>
              <path d="M12 3L3 20h18L12 3z" fill="currentColor" />
            </svg>
          </span>
          <span className="font-display text-sm tracking-tightest sm:text-lg">K_RIPSTER</span>
        </Link>

        {/* Boxy action buttons — white "Log in" + lime "Get coached" */}
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-md transition-all duration-500 ease-expo sm:gap-2",
            scrolled && "glass p-1.5"
          )}
        >
          <Link
            href="/login"
            data-cursor="Log in"
            className="inline-flex h-9 items-center justify-center rounded-md bg-white px-3 font-pixel text-[10px] font-medium uppercase tracking-wider text-bg sm:h-15 sm:min-w-[120px] sm:px-6 sm:text-xs"
          >
            Log in
          </Link>
          <Link
            href="/onboarding"
            data-cursor="Apply"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-accent px-3 font-pixel text-[10px] font-medium uppercase tracking-wider text-accent-ink sm:h-15 sm:gap-2.5 sm:px-6 sm:text-xs"
          >
            Get coached
            <DotGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
