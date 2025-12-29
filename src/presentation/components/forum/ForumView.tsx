"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainForumContent } from "./MainForumContent";
import { RetroForumContent } from "./RetroForumContent";

export function ForumView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroForumContent />
      ) : (
        <MainForumContent />
      )}
    </LayoutProvider>
  );
}
