import { AdminWidgetsView } from "@/src/presentation/components/admin/AdminWidgetsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "จัดการ Widgets - Admin - NeoBB",
  description: "จัดการ Widgets ของเว็บไซต์",
};

export default function AdminWidgetsPage() {
  return <AdminWidgetsView />;
}
