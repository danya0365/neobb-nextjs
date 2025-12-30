"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PortalWidget {
  id: string;
  type: string;
  title: string;
  icon: string;
  position: "main" | "sidebar";
  order: number;
  isVisible: boolean;
}

const defaultWidgets: PortalWidget[] = [
  { id: "latest-threads", type: "latest_threads", title: "📝 กระทู้ล่าสุด", icon: "📝", position: "main", order: 1, isVisible: true },
  { id: "trending-threads", type: "trending_threads", title: "🔥 กระทู้ยอดนิยม", icon: "🔥", position: "main", order: 2, isVisible: true },
  { id: "categories", type: "categories", title: "📂 หมวดหมู่", icon: "📂", position: "main", order: 3, isVisible: true },
  { id: "stats", type: "stats", title: "📊 สถิติ", icon: "📊", position: "sidebar", order: 1, isVisible: true },
  { id: "online-users", type: "online_users", title: "🟢 สมาชิกออนไลน์", icon: "🟢", position: "sidebar", order: 2, isVisible: true },
  { id: "quick-links", type: "quick_links", title: "🔗 ลิงก์ด่วน", icon: "🔗", position: "sidebar", order: 3, isVisible: true },
];

interface WidgetState {
  widgets: PortalWidget[];
  isEditMode: boolean;
  setWidgets: (widgets: PortalWidget[]) => void;
  toggleEditMode: () => void;
  toggleWidgetVisibility: (id: string) => void;
  reorderWidgets: (position: "main" | "sidebar", oldIndex: number, newIndex: number) => void;
  moveWidgetToPosition: (widgetId: string, newPosition: "main" | "sidebar") => void;
  resetToDefault: () => void;
}

export const useWidgetStore = create<WidgetState>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      isEditMode: false,

      setWidgets: (widgets) => set({ widgets }),

      toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

      toggleWidgetVisibility: (id) => set((state) => ({
        widgets: state.widgets.map(w =>
          w.id === id ? { ...w, isVisible: !w.isVisible } : w
        ),
      })),

      reorderWidgets: (position, oldIndex, newIndex) => {
        const state = get();
        const positionWidgets = state.widgets
          .filter(w => w.position === position)
          .sort((a, b) => a.order - b.order);
        
        const [movedWidget] = positionWidgets.splice(oldIndex, 1);
        positionWidgets.splice(newIndex, 0, movedWidget);
        
        const reorderedWidgets = positionWidgets.map((w, i) => ({ ...w, order: i + 1 }));
        
        set({
          widgets: state.widgets.map(w => {
            const reordered = reorderedWidgets.find(rw => rw.id === w.id);
            return reordered || w;
          }),
        });
      },

      moveWidgetToPosition: (widgetId, newPosition) => set((state) => {
        const widget = state.widgets.find(w => w.id === widgetId);
        if (!widget || widget.position === newPosition) return state;

        const targetWidgets = state.widgets.filter(w => w.position === newPosition);
        const newOrder = targetWidgets.length + 1;

        return {
          widgets: state.widgets.map(w =>
            w.id === widgetId ? { ...w, position: newPosition, order: newOrder } : w
          ),
        };
      }),

      resetToDefault: () => set({ widgets: defaultWidgets }),
    }),
    {
      name: "neobb-portal-widgets",
    }
  )
);
