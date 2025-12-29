"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainLandingContent } from "./MainLandingContent";
import { RetroLandingContent } from "./RetroLandingContent";

export function LandingView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroLandingContent />
      ) : (
        <MainLandingContent />
      )}
    </LayoutProvider>
  );
}
