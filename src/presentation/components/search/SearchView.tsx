"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainSearchContent } from "./MainSearchContent";
import { RetroSearchContent } from "./RetroSearchContent";

export function SearchView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroSearchContent />
      ) : (
        <MainSearchContent />
      )}
    </LayoutProvider>
  );
}
