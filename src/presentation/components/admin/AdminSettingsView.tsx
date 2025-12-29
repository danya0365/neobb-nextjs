"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { MainSettingsContent } from "./MainSettingsContent";
import { RetroSettingsContent } from "./RetroSettingsContent";

export function AdminSettingsView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      <AdminLayoutWrapper>
        {currentLayout === "retro" ? (
          <RetroSettingsContent />
        ) : (
          <MainSettingsContent />
        )}
      </AdminLayoutWrapper>
    </LayoutProvider>
  );
}
