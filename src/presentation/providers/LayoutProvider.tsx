"use client";

import { ReactNode } from "react";
import { MainLayout } from "../components/layouts/main/MainLayout";
import { RetroLayout } from "../components/layouts/retro/RetroLayout";
import { useLayoutStore } from "../stores/layoutStore";

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const { currentLayout } = useLayoutStore();

  if (currentLayout === "retro") {
    return <RetroLayout>{children}</RetroLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
}
