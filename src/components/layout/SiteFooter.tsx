"use client";

import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const FOOTER_NAV = [
  {
    title: "Platform",
    links: [
      { href: "/programs", label: "Programs" },
      { href: "/#coach", label: "The Coach" },
      { href: "/#reviews", label: "Reviews" },
      { href: "/onboarding", label: "Get Coached" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/app", label: "Client App" },
      { href: "/coach", label: "Coach Console" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "https://wa.me/94770227550", label: "WhatsApp — 077 022 7550" },
      { href: "#", label: "Instagram" },
      { href: "#", label: "hello@kripster.fit" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      {/* Final CTA band */}
      <div className="mx-auto max-w-8xl px-6 pt-24 pb-16 sm:pt-32 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Ready when you are</p>
            <h2 className="font-display text-display-sm max-w-xl text-balance">
              Stop guessing. Start training with intent.
            </h2>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              href="/onboarding"
              size="lg"
              data-cursor="Apply"
              className="font-pixel uppercase tracking-wider"
            >
              Get coached
            </Button>
            <Button
              href="/programs"
              size="lg"
              variant="secondary"
              data-cursor="Browse"
              className="font-pixel uppercase tracking-wider"
            >
              View programs
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Footer nav */}
      <div className="mx-auto grid max-w-8xl grid-cols-2 gap-8 px-6 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:px-10">
        <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-accent-ink">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path d="M12 3L3 20h18L12 3z" fill="currentColor" />
              </svg>
            </span>
            <span className="font-display text-lg tracking-tightest">K_RIPSTER</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted">
            Premium 1:1 strength &amp; physique coaching. Built for people who
            want to train like they mean it.
          </p>
          <div className="mt-5 flex gap-3 text-muted">
            <a href="#" aria-label="Instagram" data-cursor="Follow" className="transition-colors hover:text-accent">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" data-cursor="Watch" className="transition-colors hover:text-accent">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" data-cursor="Follow" className="transition-colors hover:text-accent">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {FOOTER_NAV.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Giant wordmark */}
      <div className="relative select-none px-2" aria-hidden>
        <div className="pointer-events-none bg-gradient-to-b from-ink/10 to-ink/[0.02] bg-clip-text pb-[2vw] text-center font-display leading-[1] text-transparent">
          <span className="block text-[11vw] font-bold tracking-tightest">K_RIPSTER</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-3 border-t border-border px-6 py-6 text-xs text-faint sm:flex-row lg:px-10">
        <p>© {2026} K_RIPSTER Performance. All rights reserved.</p>
        <p className="eyebrow">Train with intent</p>
      </div>
    </footer>
  );
}
