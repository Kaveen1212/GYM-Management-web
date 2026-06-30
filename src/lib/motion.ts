import type { Variants, Transition } from "framer-motion";

/** Signature expo-out easing — the default across the Apex motion system. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.8,
} as const;

export const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_EXPO,
};

/** Fade + rise — the workhorse reveal. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

/** Container that staggers its children on enter. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Per-line / per-word headline reveal (clipped slide-up). */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DURATION.slow, ease: EASE_EXPO } },
};

/** Reduced-motion-safe variant: opacity only, no transform. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_EXPO } },
};
