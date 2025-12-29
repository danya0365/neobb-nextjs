"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainMessagesContent } from "./MainMessagesContent";
import { RetroMessagesContent } from "./RetroMessagesContent";

export function MessagesView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroMessagesContent />
      ) : (
        <MainMessagesContent />
      )}
    </LayoutProvider>
  );
}
