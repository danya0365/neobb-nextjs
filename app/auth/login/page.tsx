import { LoginView } from "@/src/presentation/components/auth/LoginView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ - NeoBB",
  description: "เข้าสู่ระบบเพื่อเข้าถึงชุมชน NeoBB",
  robots: "noindex, nofollow",
};

/**
 * Login Page - Server Component
 */
export default function LoginPage() {
  return <LoginView />;
}
