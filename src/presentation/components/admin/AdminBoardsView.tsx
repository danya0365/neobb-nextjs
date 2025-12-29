"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { MainBoardsContent } from "./MainBoardsContent";
import { RetroBoardsContent } from "./RetroBoardsContent";

export function AdminBoardsView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      <AdminLayoutWrapper>
        {currentLayout === "retro" ? (
          <RetroBoardsContent />
        ) : (
          <MainBoardsContent />
        )}
      </AdminLayoutWrapper>
    </LayoutProvider>
  );
}
