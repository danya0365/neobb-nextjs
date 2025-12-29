"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainRegisterContent } from "./MainRegisterContent";
import { RetroRegisterContent } from "./RetroRegisterContent";

export function RegisterView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroRegisterContent />
      ) : (
        <MainRegisterContent />
      )}
    </LayoutProvider>
  );
}
