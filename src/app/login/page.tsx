import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <ComingSoon
      eyebrow="Members"
      title="Welcome back."
      body="Sign-in and the role switcher (prospect · client · coach) arrive with the mock auth layer."
      phase="Phase 2"
    />
  );
}
