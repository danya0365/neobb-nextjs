import { LeaderboardView } from "@/src/presentation/components/leaderboard/LeaderboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "อันดับสมาชิก - NeoBB",
  description: "ผู้มีส่วนร่วมดีเด่นในฟอรั่ม NeoBB",
};

export default function LeaderboardPage() {
  return <LeaderboardView />;
}
