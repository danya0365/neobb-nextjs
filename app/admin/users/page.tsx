import { AdminUsersView } from "@/src/presentation/components/admin/AdminUsersView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "จัดการสมาชิก - Admin NeoBB",
  description: "จัดการสมาชิกในระบบ",
  robots: "noindex, nofollow",
};

export default function AdminUsersPage() {
  return <AdminUsersView />;
}
