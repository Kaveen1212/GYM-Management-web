"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Wraps page content for a route-enter transition. Used inside `template.tsx`
 * (Next re-mounts templates on navigation, so this fires on every route change).
 * Reduced motion → opacity-only via the media query in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
