"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ForumTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
  };
}

const defaultThemes: ForumTheme[] = [
  {
    id: "default",
    name: "Default",
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      background: "#ffffff",
      surface: "#f9fafb",
      text: "#111827",
    },
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    colors: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      background: "#f0f9ff",
      surface: "#e0f2fe",
      text: "#0c4a6e",
    },
  },
  {
    id: "forest",
    name: "Forest Green",
    colors: {
      primary: "#10b981",
      secondary: "#34d399",
      background: "#f0fdf4",
      surface: "#dcfce7",
      text: "#14532d",
    },
  },
  {
    id: "midnight",
    name: "Midnight Dark",
    colors: {
      primary: "#818cf8",
      secondary: "#a78bfa",
      background: "#0f0f23",
      surface: "#1e1e3f",
      text: "#e2e8f0",
    },
  },
];

interface ThemeState {
  currentThemeId: string;
  themes: ForumTheme[];
  getCurrentTheme: () => ForumTheme;
  setTheme: (themeId: string) => void;
  addTheme: (theme: ForumTheme) => void;
  updateTheme: (themeId: string, colors: Partial<ForumTheme["colors"]>) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentThemeId: "default",
      themes: defaultThemes,
      
      getCurrentTheme: () => {
        const state = get();
        return state.themes.find(t => t.id === state.currentThemeId) || defaultThemes[0];
      },
      
      setTheme: (themeId) => set({ currentThemeId: themeId }),
      
      addTheme: (theme) => set((state) => ({
        themes: [...state.themes, theme],
      })),
      
      updateTheme: (themeId, colors) => set((state) => ({
        themes: state.themes.map(t =>
          t.id === themeId
            ? { ...t, colors: { ...t.colors, ...colors } }
            : t
        ),
      })),
    }),
    {
      name: "neobb-theme",
    }
  )
);
