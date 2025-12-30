"use client";

import { Board, Thread } from "@/src/domain/entities";
import { BoardMockRepository, ThreadMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";

const threadRepo = new ThreadMockRepository();
const boardRepo = new BoardMockRepository();

// Mock bookmarked thread IDs
const mockBookmarkedIds = ["thread-1", "thread-2", "thread-4"];

export function MainBookmarksContent() {
  const [bookmarks, setBookmarks] = useState<Thread[]>([]);
  const [boards, setBoards] = useState<Map<string, Board>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [allThreads, allBoards] = await Promise.all([
        threadRepo.findAll(),
        boardRepo.findAll(),
      ]);

      const bookmarkedThreads = allThreads.filter(t => mockBookmarkedIds.includes(t.id));
      setBookmarks(bookmarkedThreads);

      const boardMap = new Map<string, Board>();
      allBoards.forEach(b => boardMap.set(b.id, b));
      setBoards(boardMap);

      setLoading(false);
    }
    loadData();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const handleRemoveBookmark = (threadId: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== threadId));
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🔖 บุ๊คมาร์ค</h1>
          <p className="text-gray-600 dark:text-gray-400">กระทู้ที่บันทึกไว้ {bookmarks.length} รายการ</p>
        </div>

        {/* Bookmarks List */}
        <div className="space-y-4">
          {bookmarks.length > 0 ? (
            bookmarks.map(thread => {
              const board = boards.get(thread.boardId);
              return (
                <div
                  key={thread.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/forum/${thread.boardId}/${thread.id}`}
                        className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        {thread.isPinned && "📌 "}
                        {thread.title}
                      </Link>
                      {board && (
                        <div className="text-sm text-gray-500 mt-1">
                          ใน <Link href={`/forum/${board.id}`} className="text-indigo-600 hover:underline">{board.name}</Link>
                        </div>
                      )}
                      <div className="flex gap-4 mt-3 text-sm text-gray-500">
                        <span>💬 {thread.replyCount} ตอบ</span>
                        <span>👁️ {thread.viewCount} views</span>
                        <span>📅 {new Date(thread.createdAt).toLocaleDateString("th-TH")}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(thread.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="ลบออกจากบุ๊คมาร์ค"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">ยังไม่มีบุ๊คมาร์ค</h3>
              <p className="text-gray-500 mb-4">คลิกไอคอน 🔖 บนกระทู้เพื่อบันทึกไว้อ่านทีหลัง</p>
              <Link href="/forum">
                <MainButton variant="primary">ไปหน้า Forum</MainButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
}
