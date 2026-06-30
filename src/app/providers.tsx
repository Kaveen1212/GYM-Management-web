"use client";

import { type ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/** Client-side providers (smooth scroll today; toasts/role/data later). */
export function Providers({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
