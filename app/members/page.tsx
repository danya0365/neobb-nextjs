import { MembersView } from "@/src/presentation/components/members/MembersView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมาชิก - NeoBB",
  description: "รายชื่อสมาชิกทั้งหมด",
};

export default function MembersPage() {
  return <MembersView />;
}
