"use client";

import { Thread } from "@/src/domain/entities/Thread";
import { ThreadMockRepository } from "@/src/infrastructure/repositories/mock/ThreadMockRepository";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TrendingThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const loadTrending = async () => {
      const repo = new ThreadMockRepository();
      const all = await repo.findAll();
      // Sort by view count to get trending
      const sorted = [...all].sort((a, b) => b.viewCount - a.viewCount);
      setThreads(sorted.slice(0, 5));
    };
    loadTrending();
  }, []);

  return (
    <div className="trending-threads bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        🔥 กระทู้มาแรง
      </h3>
      <div className="space-y-2">
        {threads.map((thread, index) => (
          <Link
            key={thread.id}
            href={`/forum/${thread.boardId}/${thread.id}`}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index === 0 ? "bg-red-500 text-white" :
              index === 1 ? "bg-orange-500 text-white" :
              index === 2 ? "bg-yellow-500 text-white" :
              "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            }`}>
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {thread.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                👁️ {thread.viewCount} · 💬 {thread.replyCount}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
