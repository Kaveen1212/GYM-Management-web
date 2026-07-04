import { Dumbbell, Flame, Trophy, Wifi, type LucideIcon } from "lucide-react";

/**
 * Coaching programs shown in the landing's <StackingShowcase/> (the signature
 * pinned scroll-stacking section). This is marketing/portfolio content for the
 * public site — the full typed repository layer arrives in Phase 2 and the coach
 * edits these via the portfolio console in Phase 4.
 */
export type Program = {
  slug: string;
  index: string; // "01"
  name: string;
  /** Giant left-hand headline, one entry per line. */
  headline: string[];
  tagline: string;
  duration: string;
  level: string;
  price: string;
  focus: string[];
  icon: LucideIcon;
  /** RGB channel triplet ("70 110 150") used for the per-card glow + media wash. */
  tint: string;
  /** Real coach photo shown in the card's media panel — /public/programs/*.png */
  image: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "strength-foundations",
    index: "01",
    name: "Strength Foundations",
    headline: ["Build a base", "that holds."],
    tagline:
      "Master the barbell lifts and build real, transferable strength with progressive programming and weekly technique review.",
    duration: "8–12 weeks",
    level: "All levels",
    price: "From $180/mo",
    focus: ["Squat", "Bench", "Deadlift", "Technique"],
    icon: Dumbbell,
    tint: "86 132 178",
    image: "/programs/strength-foundations.png",
  },
  {
    slug: "physique-hypertrophy",
    index: "02",
    name: "Physique / Hypertrophy",
    headline: ["Add muscle.", "On purpose."],
    tagline:
      "A hypertrophy block engineered around your weak points — volume, intensity, and nutrition dialled in to actually grow.",
    duration: "10 weeks",
    level: "Intermediate",
    price: "From $220/mo",
    focus: ["Volume", "Nutrition", "Symmetry"],
    icon: Flame,
    tint: "204 140 64",
    image: "/programs/physique-hypertrophy.png",
  },
  {
    slug: "competition-prep",
    index: "03",
    name: "Competition Prep",
    headline: ["Peak for", "the platform."],
    tagline:
      "Twelve to sixteen weeks of peaking, conditioning and stage-craft. Bring your best physique on the day that counts.",
    duration: "12–16 weeks",
    level: "Advanced",
    price: "From $300/mo",
    focus: ["Peak week", "Posing", "Conditioning"],
    icon: Trophy,
    tint: "214 84 74",
    image: "/programs/competition-prep.png",
  },
  {
    slug: "online-remote-coaching",
    index: "04",
    name: "Online Remote Coaching",
    headline: ["Coached", "anywhere."],
    tagline:
      "Full programming, video form checks and 24/7 chat access — premium coaching delivered to you, wherever you train.",
    duration: "Ongoing",
    level: "All levels",
    price: "From $150/mo",
    focus: ["Remote", "Video review", "24/7 chat"],
    icon: Wifi,
    tint: "74 184 150",
    image: "/programs/online-remote-coaching.png",
  },
];
