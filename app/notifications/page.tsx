import { NotificationsView } from "@/src/presentation/components/notifications/NotificationsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "การแจ้งเตือน - NeoBB",
  description: "ดูการแจ้งเตือนทั้งหมดของคุณ",
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
