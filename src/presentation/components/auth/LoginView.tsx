"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainLoginContent } from "./MainLoginContent";
import { RetroLoginContent } from "./RetroLoginContent";

export function LoginView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroLoginContent />
      ) : (
        <MainLoginContent />
      )}
    </LayoutProvider>
  );
}
