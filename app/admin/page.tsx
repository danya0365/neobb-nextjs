import { AdminDashboardView } from "@/src/presentation/components/admin/AdminDashboardView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - NeoBB",
  description: "แผงควบคุมผู้ดูแลระบบ NeoBB",
  robots: "noindex, nofollow",
};

/**
 * Admin Dashboard Page
 */
export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
