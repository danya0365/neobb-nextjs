"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainProfileContent } from "./MainProfileContent";
import { RetroProfileContent } from "./RetroProfileContent";

interface ProfileViewProps {
  userId: string;
}

export function ProfileView({ userId }: ProfileViewProps) {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroProfileContent userId={userId} />
      ) : (
        <MainProfileContent userId={userId} />
      )}
    </LayoutProvider>
  );
}
