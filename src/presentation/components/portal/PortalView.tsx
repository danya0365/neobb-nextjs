"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainPortalContent } from "./MainPortalContent";
import { RetroPortalContent } from "./RetroPortalContent";

export function PortalView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroPortalContent />
      ) : (
        <MainPortalContent />
      )}
    </LayoutProvider>
  );
}
