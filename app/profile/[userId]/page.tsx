import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import type { Metadata } from "next";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params;
  return {
    title: `Profile ${userId} - NeoBB`,
    description: "โปรไฟล์สมาชิก NeoBB",
  };
}

/**
 * User Profile Page
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  return <ProfileView userId={userId} />;
}
