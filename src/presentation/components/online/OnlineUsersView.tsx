"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainOnlineUsersContent } from "./MainOnlineUsersContent";
import { RetroOnlineUsersContent } from "./RetroOnlineUsersContent";

export function OnlineUsersView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroOnlineUsersContent />
      ) : (
        <MainOnlineUsersContent />
      )}
    </LayoutProvider>
  );
}
