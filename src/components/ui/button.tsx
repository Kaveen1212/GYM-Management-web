"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/Magnetic";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl font-medium transition-colors duration-300 ease-expo focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink hover:bg-accent-press",
        // outline that wipes to lime on hover
        secondary:
          "border border-border bg-surface/40 text-ink hover:border-accent hover:text-accent-ink",
        ghost: "text-ink/90 hover:text-accent",
        danger: "bg-danger text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
  /** Label shown inside the neon cursor on hover. */
  "data-cursor"?: string;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export function Button({
  variant,
  size,
  href,
  magnetic = true,
  className,
  children,
  "data-cursor": dataCursor,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  // Lime fill-wipe used by the `secondary` (outline) variant.
  const wipe =
    variant === "secondary" ? (
      <span
        aria-hidden
        className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-expo group-hover:scale-y-100"
      />
    ) : null;

  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  );

  const content = href ? (
    <Link href={href} className={classes} data-cursor={dataCursor}>
      {wipe}
      {inner}
    </Link>
  ) : (
    <button className={classes} data-cursor={dataCursor} {...props}>
      {wipe}
      {inner}
    </button>
  );

  return magnetic ? (
    <Magnetic strength={0.4} className="inline-flex">
      {content}
    </Magnetic>
  ) : (
    content
  );
}
