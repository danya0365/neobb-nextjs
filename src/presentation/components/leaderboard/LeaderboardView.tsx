"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainLeaderboardContent } from "./MainLeaderboardContent";
import { RetroLeaderboardContent } from "./RetroLeaderboardContent";

export function LeaderboardView() {
  const { currentLayout } = useLayoutStore();

  if (currentLayout === "retro") {
    return <RetroLeaderboardContent />;
  }

  return <MainLeaderboardContent />;
}
