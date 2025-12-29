"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainSettingsUserContent } from "./MainSettingsUserContent";
import { RetroSettingsUserContent } from "./RetroSettingsUserContent";

export function SettingsView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroSettingsUserContent />
      ) : (
        <MainSettingsUserContent />
      )}
    </LayoutProvider>
  );
}
