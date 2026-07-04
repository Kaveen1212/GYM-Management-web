import localFont from "next/font/local";

/**
 * Self-hosted "pixel" display face — used for eyebrow labels and CTA button
 * text (the chunky low-res mono look). This is Silkscreen (SIL Open Font
 * License, free for commercial use), a close open-license match for the
 * "lores-12" family the nivis reference uses via its own paid Typekit
 * subscription — that exact font is licensed to them and can't be reused here.
 */
export const pixelFont = localFont({
  src: [
    { path: "../fonts/silkscreen/Silkscreen-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/silkscreen/Silkscreen-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pixel",
  display: "swap",
});
