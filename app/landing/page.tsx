import { LandingView } from "@/src/presentation/components/landing/LandingView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to NeoBB - Modern Community Platform",
  description: "NeoBB คือระบบ Web Forum / Community Platform แบบสมัยใหม่ ออกแบบมาเพื่อเป็น Open Source, Modular, และ Customizable",
  openGraph: {
    title: "NeoBB - Modern Community Platform",
    description: "Neo Bulletin Board - สร้างชุมชนออนไลน์ของคุณเอง",
    type: "website",
  },
};

/**
 * Landing Page - Server Component for SEO optimization
 */
export default function LandingPage() {
  return <LandingView />;
}
