import { SettingsView } from "@/src/presentation/components/settings/SettingsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ตั้งค่าบัญชี - NeoBB",
  description: "ตั้งค่าบัญชีและการแจ้งเตือน",
};

export default function UserSettingsPage() {
  return <SettingsView />;
}
