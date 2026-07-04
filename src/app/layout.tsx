import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { pixelFont } from "@/lib/fonts";
import "./globals.css";
import { Providers } from "./providers";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "K_RIPSTER — Train with intent",
    template: "%s · K_RIPSTER",
  },
  description:
    "Premium 1:1 strength & physique coaching. Personalised programming, real accountability, and a coach in your corner.",
  metadataBase: new URL("https://kripster.fit"),
};

export const viewport: Viewport = {
  themeColor: "#08090A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${pixelFont.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-ink antialiased">
        <Providers>
          <SiteNav />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
