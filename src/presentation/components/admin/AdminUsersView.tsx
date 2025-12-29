"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { MainUsersContent } from "./MainUsersContent";
import { RetroUsersContent } from "./RetroUsersContent";

export function AdminUsersView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      <AdminLayoutWrapper>
        {currentLayout === "retro" ? (
          <RetroUsersContent />
        ) : (
          <MainUsersContent />
        )}
      </AdminLayoutWrapper>
    </LayoutProvider>
  );
}
