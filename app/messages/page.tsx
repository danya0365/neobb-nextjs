import { MessagesView } from "@/src/presentation/components/messages/MessagesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อความส่วนตัว - NeoBB",
  description: "กล่องข้อความส่วนตัว",
};

export default function MessagesPage() {
  return <MessagesView />;
}
