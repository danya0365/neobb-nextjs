import { AdminThemesView } from "@/src/presentation/components/admin/AdminThemesView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "จัดการ Themes - Admin - NeoBB",
  description: "จัดการธีมของเว็บไซต์",
};

export default function AdminThemesPage() {
  return <AdminThemesView />;
}
