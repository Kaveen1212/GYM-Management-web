"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeRise, fadeOnly, staggerContainer } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** Stagger children that are <RevealItem/> instead of animating as one block. */
  stagger?: boolean;
  staggerAmount?: number;
  /** Re-trigger every time it scrolls into view. */
  once?: boolean;
};

/**
 * Scroll-reveal wrapper. Fades + rises into place on enter (opacity-only when
 * reduced motion is requested). Set `stagger` to cascade <RevealItem/> children.
 */
export function Reveal({
  delay = 0,
  stagger = false,
  staggerAmount = 0.08,
  once = true,
  children,
  ...props
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const variants = stagger
    ? staggerContainer(staggerAmount, delay)
    : reduced
      ? fadeOnly
      : fadeRise;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      variants={variants}
      transition={delay && !stagger ? { delay } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** A child of a staggered <Reveal stagger>. */
export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div variants={reduced ? fadeOnly : fadeRise} {...props}>
      {children}
    </motion.div>
  );
}
