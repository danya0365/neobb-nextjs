import { OnlineUsersView } from "@/src/presentation/components/online/OnlineUsersView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมาชิกออนไลน์ - NeoBB",
  description: "ดูสมาชิกที่กำลังออนไลน์",
};

export default function OnlineUsersPage() {
  return <OnlineUsersView />;
}
