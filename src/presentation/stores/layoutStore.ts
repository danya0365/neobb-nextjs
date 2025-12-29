"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LayoutType = "main" | "retro";

interface LayoutState {
  currentLayout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  toggleLayout: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      currentLayout: "main",
      setLayout: (layout) => set({ currentLayout: layout }),
      toggleLayout: () =>
        set((state) => ({
          currentLayout: state.currentLayout === "main" ? "retro" : "main",
        })),
    }),
    {
      name: "neobb-layout",
    }
  )
);
