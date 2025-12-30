"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainCreateThreadContent } from "./MainCreateThreadContent";
import { RetroCreateThreadContent } from "./RetroCreateThreadContent";

interface CreateThreadViewProps {
  boardId: string;
}

export function CreateThreadView({ boardId }: CreateThreadViewProps) {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroCreateThreadContent boardId={boardId} />
      ) : (
        <MainCreateThreadContent boardId={boardId} />
      )}
    </LayoutProvider>
  );
}
