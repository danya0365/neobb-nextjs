import { ThreadView } from "@/src/presentation/components/forum/ThreadView";
import type { Metadata } from "next";

interface ThreadPageProps {
  params: Promise<{ boardId: string; threadId: string }>;
}

export async function generateMetadata({ params }: ThreadPageProps): Promise<Metadata> {
  const { threadId } = await params;
  return {
    title: `Thread ${threadId} - NeoBB Forum`,
    description: "อ่านกระทู้และร่วมแสดงความคิดเห็น",
  };
}

/**
 * Thread Page - Shows thread with posts
 */
export default async function ThreadPage({ params }: ThreadPageProps) {
  const { boardId, threadId } = await params;
  return <ThreadView boardId={boardId} threadId={threadId} />;
}
