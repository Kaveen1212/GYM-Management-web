import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata = { title: "Get coached" };

export default function OnboardingPage() {
  return (
    <ComingSoon
      eyebrow="Onboarding"
      title="Let's build your plan."
      body="The multi-step intake & goal-setting wizard — basics, experience, goals, availability and health notes — lands next."
      phase="Phase 2"
    />
  );
}
