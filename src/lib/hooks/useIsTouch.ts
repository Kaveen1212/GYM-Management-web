"use client";

import { useEffect, useState } from "react";

/**
 * True on touch / coarse-pointer devices (no precise pointer).
 * Used to disable the custom cursor and magnetic effects on touch.
 * SSR-safe (defaults to false so desktop gets enhancements on first paint).
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isTouch;
}
