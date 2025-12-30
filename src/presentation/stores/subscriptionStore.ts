"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Subscription {
  threadId: string;
  subscribedAt: string;
  notifyOnReply: boolean;
}

interface SubscriptionState {
  subscriptions: Subscription[];
  isSubscribed: (threadId: string) => boolean;
  subscribe: (threadId: string, notifyOnReply?: boolean) => void;
  unsubscribe: (threadId: string) => void;
  toggleNotification: (threadId: string) => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscriptions: [],

      isSubscribed: (threadId) => {
        return get().subscriptions.some(s => s.threadId === threadId);
      },

      subscribe: (threadId, notifyOnReply = true) => {
        set((state) => {
          if (state.subscriptions.some(s => s.threadId === threadId)) {
            return state;
          }
          return {
            subscriptions: [
              ...state.subscriptions,
              { threadId, subscribedAt: new Date().toISOString(), notifyOnReply },
            ],
          };
        });
      },

      unsubscribe: (threadId) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter(s => s.threadId !== threadId),
        }));
      },

      toggleNotification: (threadId) => {
        set((state) => ({
          subscriptions: state.subscriptions.map(s =>
            s.threadId === threadId ? { ...s, notifyOnReply: !s.notifyOnReply } : s
          ),
        }));
      },
    }),
    {
      name: "neobb-subscriptions",
    }
  )
);
