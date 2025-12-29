"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainNotificationsContent } from "./MainNotificationsContent";
import { RetroNotificationsContent } from "./RetroNotificationsContent";

export function NotificationsView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroNotificationsContent />
      ) : (
        <MainNotificationsContent />
      )}
    </LayoutProvider>
  );
}
