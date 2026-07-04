import { redirect } from "next/navigation";

// This site is the coach's portfolio — his qualifications, services and
// contact now live directly on the home page (see <CoachPortfolio/>).
export default function CoachProfilePage() {
  redirect("/#coach");
}
