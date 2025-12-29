import { AdminBoardsView } from "@/src/presentation/components/admin/AdminBoardsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "จัดการบอร์ด - Admin NeoBB",
  description: "จัดการหมวดหมู่และบอร์ดในระบบ",
  robots: "noindex, nofollow",
};

export default function AdminBoardsPage() {
  return <AdminBoardsView />;
}
