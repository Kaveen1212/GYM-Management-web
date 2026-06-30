import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
        },
        // hairline color (default border color is wired separately below)
        border: "rgb(var(--border) / <alpha-value>)",
        ink: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        faint: "rgb(var(--text-faint) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          press: "rgb(var(--accent-press) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
        },
        danger: "rgb(var(--danger) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
      },
      borderColor: {
        // 1px hairlines default to white @ 8% — matches the brief's --border
        DEFAULT: "rgb(var(--border) / 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // fluid display sizes per the brief (up to clamp(3rem, 8vw, 8rem))
        "display-sm": ["clamp(2.2rem, 5vw, 3.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display": ["clamp(2.6rem, 7vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        eyebrow: "0.12em",
        tightest: "-0.04em",
      },
      borderRadius: {
        input: "10px",
        card: "14px",
        panel: "16px",
        pill: "9999px",
      },
      spacing: {
        // fill gaps in Tailwind's default scale
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
      },
      maxWidth: {
        content: "1280px",
        wide: "1440px",
        // shared site container — nav + all content sections align to this
        "8xl": "100rem", // 1600px
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        raised: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 1px 2px 0 rgba(0,0,0,0.4)",
        "accent-glow":
          "0 0 0 1px rgb(var(--accent)), 0 8px 30px -8px rgba(200,250,40,0.5)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
        "fade-in": "fade-in 0.5s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
