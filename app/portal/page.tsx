import { PortalView } from "@/src/presentation/components/portal/PortalView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal - NeoBB",
  description: "ศูนย์กลางชุมชน NeoBB - ดู Widget, กระทู้ล่าสุด, และอื่นๆ",
  openGraph: {
    title: "Portal - NeoBB",
    description: "ศูนย์กลางชุมชน NeoBB",
    type: "website",
  },
};

/**
 * Portal Page - Server Component for SEO optimization
 */
export default function PortalPage() {
  return <PortalView />;
}
