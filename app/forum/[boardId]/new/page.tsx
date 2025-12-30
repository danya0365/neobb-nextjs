import { CreateThreadView } from "@/src/presentation/components/forum/CreateThreadView";
import type { Metadata } from "next";

interface CreateThreadPageProps {
  params: Promise<{ boardId: string }>;
}

export async function generateMetadata({ params }: CreateThreadPageProps): Promise<Metadata> {
  const { boardId } = await params;
  return {
    title: "สร้างกระทู้ใหม่ - NeoBB",
    description: `สร้างกระทู้ใหม่ในบอร์ด ${boardId}`,
  };
}

export default async function CreateThreadPage({ params }: CreateThreadPageProps) {
  const { boardId } = await params;
  return <CreateThreadView boardId={boardId} />;
}
