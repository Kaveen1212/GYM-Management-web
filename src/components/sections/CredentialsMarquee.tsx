"use client";

import { Marquee } from "@/components/motion/Marquee";

const ITEMS = [
  "NSCA-CSCS Certified",
  "IFBB Pro Card",
  "Precision Nutrition L2",
  "USA Powerlifting",
  "10,000+ Sessions Coached",
  "Featured in Men's Health",
  "Olympic Lifting Cert.",
  "FMS Level 2",
];

export function CredentialsMarquee() {
  return (
    <section className="border-b border-border bg-bg py-6">
      <Marquee durationSec={40}>
        {ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-8 px-8">
            <span className="whitespace-nowrap font-display text-xl text-muted sm:text-2xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
