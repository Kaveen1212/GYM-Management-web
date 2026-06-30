import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * On-brand placeholder for routes whose full build lands in a later phase.
 * Keeps every nav link + CTA reachable (no 404s) while the surfaces are scaffolded.
 */
export function ComingSoon({
  eyebrow,
  title,
  body,
  phase,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  phase?: string;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />
      <div className="relative z-10 max-w-2xl">
        <p className="eyebrow mb-5 text-accent">{eyebrow}</p>
        <h1 className="font-display text-display-sm">{title}</h1>
        {body ? <p className="mx-auto mt-6 max-w-lg text-lg text-muted">{body}</p> : null}
        {phase ? (
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Shipping in {phase}
          </p>
        ) : null}
        <div className="mt-10">
          <Link
            href="/"
            data-cursor="Home"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
