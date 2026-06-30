"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * <NewsletterCTA/> — Nivis's `newsletter_footer` email-capture band, rebuilt for
 * Apex. Heading + email field + SUBSCRIBE + consent line. Mock submit (no
 * backend yet) with an optimistic confirmation.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="border-t border-border bg-bg py-24 sm:py-28">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-5 text-accent">Stay in the loop</p>
            <h2 className="font-display text-display-sm text-balance">
              Programs, insights, and the occasional kick in the butt.
            </h2>
          </div>

          <div>
            {done ? (
              <p className="flex items-center gap-3 rounded-input border border-accent/40 bg-accent/10 px-5 py-4 text-sm text-ink">
                <Check className="h-5 w-5 text-accent" />
                You&apos;re in. Watch your inbox.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setDone(true);
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="h-13 flex-1 rounded-input border border-border bg-surface-2 px-4 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="Subscribe"
                  className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-input bg-accent px-6 font-mono text-xs font-medium uppercase tracking-wider text-accent-ink transition-colors hover:bg-accent-press"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-1" />
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-faint">
              By signing up, you agree to receive the Apex newsletter. No spam —
              unsubscribe anytime.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
