"use client";

import { useSubscriptionStore } from "@/src/presentation/stores/subscriptionStore";

interface ThreadSubscribeButtonProps {
  threadId: string;
}

export function ThreadSubscribeButton({ threadId }: ThreadSubscribeButtonProps) {
  const { isSubscribed, subscribe, unsubscribe } = useSubscriptionStore();
  const subscribed = isSubscribed(threadId);

  const handleToggle = () => {
    if (subscribed) {
      unsubscribe(threadId);
    } else {
      subscribe(threadId);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        subscribed
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      <span>{subscribed ? "🔔" : "🔕"}</span>
      <span>{subscribed ? "กำลังติดตาม" : "ติดตาม"}</span>
    </button>
  );
}
