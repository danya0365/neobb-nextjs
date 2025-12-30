"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainAdminThemesContent } from "./MainAdminThemesContent";
import { RetroAdminThemesContent } from "./RetroAdminThemesContent";

export function AdminThemesView() {
  const { currentLayout } = useLayoutStore();

  if (currentLayout === "retro") {
    return <RetroAdminThemesContent />;
  }

  return <MainAdminThemesContent />;
}
