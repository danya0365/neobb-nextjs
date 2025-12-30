"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainActivityContent } from "./MainActivityContent";
import { RetroActivityContent } from "./RetroActivityContent";

export function ActivityView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroActivityContent />
      ) : (
        <MainActivityContent />
      )}
    </LayoutProvider>
  );
}
