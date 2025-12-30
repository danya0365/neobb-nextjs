"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { DraggablePortalContent } from "./DraggablePortalContent";
import { RetroPortalContent } from "./RetroPortalContent";

export function PortalView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroPortalContent />
      ) : (
        <DraggablePortalContent />
      )}
    </LayoutProvider>
  );
}

