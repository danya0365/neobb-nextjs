"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainThreadContent } from "./MainThreadContent";
import { RetroThreadContent } from "./RetroThreadContent";

interface ThreadViewProps {
  boardId: string;
  threadId: string;
}

export function ThreadView({ boardId, threadId }: ThreadViewProps) {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroThreadContent boardId={boardId} threadId={threadId} />
      ) : (
        <MainThreadContent boardId={boardId} threadId={threadId} />
      )}
    </LayoutProvider>
  );
}
