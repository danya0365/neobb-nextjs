"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainBookmarksContent } from "./MainBookmarksContent";
import { RetroBookmarksContent } from "./RetroBookmarksContent";

export function BookmarksView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroBookmarksContent />
      ) : (
        <MainBookmarksContent />
      )}
    </LayoutProvider>
  );
}
