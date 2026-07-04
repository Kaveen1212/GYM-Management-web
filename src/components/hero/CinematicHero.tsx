"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk, Globe } from "lucide-react";
import { EASE_EXPO } from "@/lib/motion";

const HEADLINE_LINES = ["Train with intent.", "Build something", "that lasts."];

/** Explicit, self-contained entrance — no variant inheritance to rely on. */
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE_EXPO, delay },
});

export function CinematicHero({
  videoSrc = "/hero.mp4",
  poster,
}: {
  videoSrc?: string;
  poster?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax: the media drifts slower than the page as you scroll away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bottomScrim = useTransform(scrollYProgress, [0, 1], [0.7, 0.3]);

  
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-bg grain"
    >
      <motion.div style={{ y: mediaY, scale: mediaScale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0b0d0f]">
          <div className="hero-glow hero-glow-a" />
          <div className="hero-glow hero-glow-b" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(200,250,40,0.08),transparent_55%)]" />
        </div>

      
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-bg/70 to-transparent" />
      <motion.div
        style={{ opacity: bottomScrim }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-bg via-bg/20 to-transparent"
      />

      <div className="relative z-20 flex h-full flex-col items-center justify-end px-4 pb-[5vh] pt-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.1 }}
          className="glass flex min-h-[clamp(260px,34vh,400px)] w-full max-w-3xl flex-col justify-between overflow-hidden rounded-md p-6 shadow-raised sm:p-8"
        >
          {/* top meta row */}
          <motion.div
            {...enter(0.3)}
            className="flex flex-wrap items-center justify-between gap-y-3 border-b border-border pb-5"
          >
            <span className="eyebrow flex items-center gap-2 text-accent">
              <ArrowDown className="h-3.5 w-3.5 animate-scroll-cue" />
              Scroll to explore
            </span>
            <span className="eyebrow hidden items-center gap-1.5 sm:flex">
              <Asterisk className="h-3.5 w-3.5" />
              Elevate every session
            </span>
            <span className="eyebrow flex items-center gap-1.5">
              Coached 1&#8209;on&#8209;1
              <Globe className="h-3.5 w-3.5" />
            </span>
          </motion.div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display max-w-[14ch] text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[0.96] tracking-tightest">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.35 + i * 0.08 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              {...enter(0.7)}
              className="flex shrink-0 flex-col items-start gap-3 sm:items-end"
            >
              <Link
                href="/programs"
                data-cursor="Browse"
                className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
              >
                View programs
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/onboarding"
                data-cursor="Apply"
                className="group relative flex min-h-[62px] w-full min-w-[150px] flex-col justify-end rounded-md bg-accent p-3 text-accent-ink transition-colors duration-300 ease-expo hover:bg-accent-press sm:w-auto"
              >
                <ArrowUpRight className="absolute right-2.5 top-2.5 h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="font-pixel text-sm font-medium uppercase leading-[1.4] tracking-wide">
                  Get
                  <br />
                  coached
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
