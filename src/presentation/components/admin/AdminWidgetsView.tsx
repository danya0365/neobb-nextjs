"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainAdminWidgetsContent } from "./MainAdminWidgetsContent";
import { RetroAdminWidgetsContent } from "./RetroAdminWidgetsContent";

export function AdminWidgetsView() {
  const { currentLayout } = useLayoutStore();

  if (currentLayout === "retro") {
    return <RetroAdminWidgetsContent />;
  }

  return <MainAdminWidgetsContent />;
}
