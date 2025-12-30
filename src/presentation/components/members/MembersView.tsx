"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { MainMembersContent } from "./MainMembersContent";
import { RetroMembersContent } from "./RetroMembersContent";

export function MembersView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      {currentLayout === "retro" ? (
        <RetroMembersContent />
      ) : (
        <MainMembersContent />
      )}
    </LayoutProvider>
  );
}
