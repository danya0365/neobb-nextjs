"use client";

import { LayoutProvider } from "@/src/presentation/providers/LayoutProvider";
import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { AdminLayoutWrapper } from "./AdminLayoutWrapper";
import { MainDashboardContent } from "./MainDashboardContent";
import { RetroDashboardContent } from "./RetroDashboardContent";

export function AdminDashboardView() {
  const { currentLayout } = useLayoutStore();

  return (
    <LayoutProvider>
      <AdminLayoutWrapper>
        {currentLayout === "retro" ? (
          <RetroDashboardContent />
        ) : (
          <MainDashboardContent />
        )}
      </AdminLayoutWrapper>
    </LayoutProvider>
  );
}
