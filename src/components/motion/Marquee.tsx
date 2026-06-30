"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Slow infinite ticker. Content is duplicated and the track is translated -50%,
 * so the loop is seamless. Pauses on hover.
 */
export function Marquee({
  children,
  className,
  durationSec = 30,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  durationSec?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
