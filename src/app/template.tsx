import { PageTransition } from "@/components/motion/PageTransition";

/** Re-mounts on every route change → drives the page-enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
