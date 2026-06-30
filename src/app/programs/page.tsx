import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/lib/programs";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = { title: "Programs" };

export default function ProgramsPage() {
  return (
    <main className="mx-auto max-w-8xl px-6 pb-28 pt-32 sm:pt-40 lg:px-10">
      <Reveal className="max-w-3xl">
        <p className="eyebrow mb-5 text-accent">Coaching programs</p>
        <h1 className="font-display text-display-sm">
          Pick the path. I&apos;ll build the plan.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Every program is a starting point — the real programming is tailored to
          your body, schedule and goals once we begin.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {PROGRAMS.map((p) => (
          <Reveal key={p.slug}>
            <Link
              href={`/programs/${p.slug}`}
              data-cursor="Details"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-panel border border-border bg-surface p-7 transition-colors hover:border-white/20"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(90% 70% at 100% 0%, rgb(${p.tint} / 0.16), transparent 55%)`,
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-accent">{p.index}</span>
                  <p.icon
                    className="h-7 w-7"
                    style={{ color: `rgb(${p.tint})` }}
                    strokeWidth={1.25}
                  />
                </div>
                <h2 className="mt-6 font-display text-3xl tracking-tight">{p.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.tagline}</p>
              </div>
              <div className="relative mt-8 flex items-center justify-between border-t border-border pt-5 text-sm">
                <span className="text-faint">
                  {p.duration} · {p.price}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors group-hover:text-accent">
                  View
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
