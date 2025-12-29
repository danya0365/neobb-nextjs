import { ForumView } from "@/src/presentation/components/forum/ForumView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum - NeoBB",
  description: "ฟอรั่มพูดคุย NeoBB - เข้าร่วมการสนทนากับชุมชน",
  openGraph: {
    title: "Forum - NeoBB",
    description: "ฟอรั่มพูดคุย NeoBB",
    type: "website",
  },
};

/**
 * Forum Index Page - Server Component for SEO optimization
 */
export default function ForumPage() {
  return <ForumView />;
}
