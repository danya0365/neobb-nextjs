import { BoardView } from "@/src/presentation/components/forum/BoardView";
import type { Metadata } from "next";

interface BoardPageProps {
  params: Promise<{ boardId: string }>;
}

export async function generateMetadata({ params }: BoardPageProps): Promise<Metadata> {
  const { boardId } = await params;
  return {
    title: `Board ${boardId} - NeoBB Forum`,
    description: "กระทู้สนทนาในบอร์ด",
  };
}

/**
 * Board Page - Shows threads in a specific board
 */
export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params;
  return <BoardView boardId={boardId} />;
}
