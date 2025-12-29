import { AdminSettingsView } from "@/src/presentation/components/admin/AdminSettingsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ตั้งค่าระบบ - Admin NeoBB",
  description: "ตั้งค่าระบบ NeoBB",
  robots: "noindex, nofollow",
};

export default function AdminSettingsPage() {
  return <AdminSettingsView />;
}
