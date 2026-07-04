import { CinematicHero } from "@/components/hero/CinematicHero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { StackingShowcase } from "@/components/sections/StackingShowcase";
import { TextScrollStatement } from "@/components/sections/TextScrollStatement";
import { DiscoverFeatures } from "@/components/sections/DiscoverFeatures";
import { CoachPortfolio } from "@/components/sections/CoachPortfolio";
import { ProcessPerks } from "@/components/sections/ProcessPerks";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { CredentialsMarquee } from "@/components/sections/CredentialsMarquee";

export default function HomePage() {
  return (
    <>
      {/* Home page — mirrors the Nivis section order */}
      <CinematicHero poster="/hero-poster.jpg" />
      <StatsStrip />
      {/* products_showcase */}
      <StackingShowcase />
      {/* index_text_scroll */}
      <TextScrollStatement />
      {/* discover-features */}
      <DiscoverFeatures />
      {/* the coach's real portfolio — qualifications, services, contact */}
      <CoachPortfolio />
      {/* index_faq → our process + perks */}
      <ProcessPerks />
      {/* newsletter_footer → email capture */}
      <NewsletterCTA />
      <CredentialsMarquee />
    </>
  );
}
