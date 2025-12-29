"use client";

import { Board, Thread, User } from "@/src/domain/entities";
import { BoardMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";

const boardRepo = new BoardMockRepository();
const threadRepo = new ThreadMockRepository();
const userRepo = new UserMockRepository();

interface MainBoardContentProps {
  boardId: string;
}

export function MainBoardContent({ boardId }: MainBoardContentProps) {
  const [board, setBoard] = useState<Board | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [boardData, threadData, allUsers] = await Promise.all([
        boardRepo.findById(boardId),
        threadRepo.findByBoard(boardId),
        userRepo.findAll(),
      ]);
      
      setBoard(boardData);
      setThreads(threadData);
      
      // Create user map for quick lookup
      const userMap = new Map<string, User>();
      allUsers.forEach(u => userMap.set(u.id, u));
      setUsers(userMap);
      
      setLoading(false);
    }
    loadData();
  }, [boardId]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบบอร์ด
          </h2>
          <Link href="/forum" className="text-indigo-600 hover:underline">
            กลับไปหน้า Forum
          </Link>
        </div>
      </div>
    );
  }

  const pinnedThreads = threads.filter(t => t.isPinned);
  const normalThreads = threads.filter(t => !t.isPinned);

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/forum" className="hover:text-indigo-600">Forum</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{board.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>{board.icon}</span>
              {board.name}
              {board.isLocked && <span className="text-red-500">🔒</span>}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{board.description}</p>
          </div>
          {!board.isLocked && (
            <MainButton variant="primary" icon="📝">สร้างกระทู้ใหม่</MainButton>
          )}
        </div>

        {/* Thread List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Row */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            <div className="col-span-7">หัวข้อ</div>
            <div className="col-span-2 text-center">ตอบ</div>
            <div className="col-span-3">ล่าสุด</div>
          </div>

          {/* Pinned Threads */}
          {pinnedThreads.length > 0 && (
            <>
              <div className="px-5 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-xs font-semibold text-yellow-700 dark:text-yellow-300">
                📌 ปักหมุด
              </div>
              {pinnedThreads.map(thread => (
                <ThreadRow key={thread.id} thread={thread} users={users} boardId={boardId} />
              ))}
            </>
          )}

          {/* Normal Threads */}
          {normalThreads.map(thread => (
            <ThreadRow key={thread.id} thread={thread} users={users} boardId={boardId} />
          ))}

          {/* Empty State */}
          {threads.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">💬</div>
              <p>ยังไม่มีกระทู้ในบอร์ดนี้</p>
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
}

function ThreadRow({ thread, users, boardId }: { thread: Thread; users: Map<string, User>; boardId: string }) {
  const author = users.get(thread.authorId);
  
  return (
    <Link 
      href={`/forum/${boardId}/${thread.id}`}
      className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-5 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      {/* Title & Author */}
      <div className="sm:col-span-7">
        <div className="flex items-center gap-2 flex-wrap">
          {thread.prefix && (
            <span 
              className="px-2 py-0.5 text-xs rounded font-medium text-white"
              style={{ backgroundColor: thread.prefix.color }}
            >
              {thread.prefix.name}
            </span>
          )}
          <span className="font-medium text-gray-900 dark:text-white">
            {thread.title}
          </span>
          {thread.isLocked && <span className="text-red-500">🔒</span>}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          โดย {author?.displayName || "Unknown"} • {formatRelativeTime(thread.createdAt)}
        </div>
      </div>

      {/* Stats */}
      <div className="sm:col-span-2 text-sm text-center text-gray-600 dark:text-gray-300">
        <div className="flex sm:flex-col items-center gap-2 sm:gap-0">
          <span>💬 {thread.replyCount}</span>
          <span className="sm:text-xs sm:text-gray-500">👁️ {thread.viewCount}</span>
        </div>
      </div>

      {/* Last Reply */}
      <div className="sm:col-span-3 text-sm text-gray-500 dark:text-gray-400">
        {thread.lastReplyAt 
          ? formatRelativeTime(thread.lastReplyAt)
          : "ยังไม่มีการตอบ"
        }
      </div>
    </Link>
  );
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "เมื่อกี้";
  if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
  if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
  return date.toLocaleDateString("th-TH");
}
