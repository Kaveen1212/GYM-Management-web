"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useIsTouch } from "@/lib/hooks/useIsTouch";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Lime ring cursor that follows the pointer with spring lag.
 * - Grows on hover over links/buttons or any element with `data-cursor`.
 * - Shows a label when the hovered element has `data-cursor="Some label"`.
 * - Hidden entirely on touch devices and when reduced-motion is requested.
 */
export function NeonCursor() {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const enabled = !isTouch && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 350, mass: 0.5 });
  const ringY = useSpring(y, { damping: 28, stiffness: 350, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("neon-cursor-active");
      return;
    }
    document.documentElement.classList.add("neon-cursor-active");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      if (el) {
        setHovering(true);
        const l = el.getAttribute("data-cursor");
        setLabel(l && l.length > 0 ? l : null);
      } else {
        setHovering(false);
        setLabel(null);
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("neon-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 1 : hovering ? 1.9 : 1;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* outer ring (or pill with label) */}
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-accent text-accent"
        animate={{
          scale: pressed ? 0.85 : ringSize,
          paddingLeft: label ? 14 : 0,
          paddingRight: label ? 14 : 0,
          height: 30,
          width: label ? "auto" : 30,
          backgroundColor: label ? "rgba(200,250,40,0.12)" : "rgba(200,250,40,0)",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 320, mass: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-eyebrow"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* center dot (tracks tighter) */}
      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        animate={{
          width: hovering || label ? 0 : 5,
          height: hovering || label ? 0 : 5,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
