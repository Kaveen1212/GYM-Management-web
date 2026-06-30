import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PROGRAMS } from "@/lib/programs";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PROGRAMS.find((x) => x.slug === params.slug);
  return { title: p ? p.name : "Program" };
}

export default function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = PROGRAMS.find((p) => p.slug === params.slug);
  if (!program) notFound();

  return (
    <>
      <main className="relative overflow-hidden pb-40 pt-32 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
          style={{
            background: `radial-gradient(70% 60% at 50% 0%, rgb(${program.tint} / 0.18), transparent 65%)`,
          }}
        />
        <div className="relative mx-auto max-w-8xl px-6 lg:px-10">
          <Link
            href="/programs"
            data-cursor="Back"
            className="eyebrow text-faint transition-colors hover:text-ink"
          >
            ← All programs
          </Link>

          <Reveal className="mt-8 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="eyebrow text-accent">{program.index} — Program</span>
              <program.icon
                className="h-5 w-5"
                style={{ color: `rgb(${program.tint})` }}
                strokeWidth={1.5}
              />
            </div>
            <h1 className="mt-5 font-display text-display leading-[0.95]">
              {program.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">{program.tagline}</p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-panel border border-border sm:grid-cols-3">
            {[
              { label: "Duration", value: program.duration },
              { label: "Level", value: program.level },
              { label: "Investment", value: program.price },
            ].map((m) => (
              <div key={m.label} className="bg-surface/40 p-7">
                <p className="eyebrow mb-3">{m.label}</p>
                <p className="font-display text-2xl">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <h2 className="font-display text-2xl">What we focus on</h2>
              <ul className="mt-6 space-y-3">
                {program.focus.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-muted">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-border text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <div className="rounded-panel border border-border bg-surface p-7">
                <p className="eyebrow mb-3 text-accent">How it works</p>
                <p className="text-sm leading-relaxed text-muted">
                  Apply below and complete a short intake. I review your history
                  and goals, then build your first block inside the app — with
                  weekly check-ins and adjustments from there.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      {/* sticky action bar (like the reference purchase bar) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-8xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <div className="min-w-0">
            <p className="truncate font-display text-lg leading-tight">
              {program.name}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
              {program.duration} · {program.price}
            </p>
          </div>
          <Link
            href="/onboarding"
            data-cursor="Apply"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-lg bg-accent px-6 font-mono text-xs font-medium uppercase tracking-wider text-accent-ink transition-colors hover:bg-accent-press"
          >
            Get coached
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
