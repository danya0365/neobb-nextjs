import { ActivityView } from "@/src/presentation/components/activity/ActivityView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "กิจกรรมล่าสุด - NeoBB",
  description: "กิจกรรมล่าสุดในชุมชน",
};

export default function ActivityPage() {
  return <ActivityView />;
}
