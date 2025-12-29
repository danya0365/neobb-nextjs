import { RegisterView } from "@/src/presentation/components/auth/RegisterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก - NeoBB",
  description: "สมัครสมาชิกเพื่อเข้าร่วมชุมชน NeoBB",
  robots: "noindex, nofollow",
};

/**
 * Register Page - Server Component
 */
export default function RegisterPage() {
  return <RegisterView />;
}
