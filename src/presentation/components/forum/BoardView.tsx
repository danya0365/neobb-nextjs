"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainBoardContent } from "./MainBoardContent";
import { RetroBoardContent } from "./RetroBoardContent";

interface BoardViewProps {
  boardId: string;
}

export function BoardView({ boardId }: BoardViewProps) {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroBoardContent boardId={boardId} />
      ) : (
        <MainBoardContent boardId={boardId} />
      )}
    </LayoutProvider>
  );
}
