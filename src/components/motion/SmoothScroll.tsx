"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/useReducedMotion";

type LenisApi = {
  lenis: Lenis | null;
  /** Pause smooth scrolling + lock the page (used by full-screen modals). */
  stop: () => void;
  /** Resume smooth scrolling. */
  start: () => void;
  /** Scroll to a target (selector, element, or offset). */
  scrollTo: Lenis["scrollTo"];
};

const LenisContext = createContext<LenisApi>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, force] = useState(0);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    // Reduced motion: skip Lenis entirely, use native scroll.
    if (reduced) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
      force((n) => n + 1);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;
    // Expose for tooling / debugging (e.g. programmatic scroll in screenshots,
    // which otherwise fights Lenis). Harmless in production.
    (window as unknown as Record<string, unknown>).lenis = lenis;
    force((n) => n + 1);

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Re-measure once everything (fonts/images) settles.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(t);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const api: LenisApi = {
    lenis: lenisRef.current,
    stop: () => {
      lenisRef.current?.stop();
      document.documentElement.classList.add("lenis-stopped");
    },
    start: () => {
      lenisRef.current?.start();
      document.documentElement.classList.remove("lenis-stopped");
    },
    scrollTo: (...args: Parameters<Lenis["scrollTo"]>) =>
      lenisRef.current?.scrollTo(...args),
  };

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
