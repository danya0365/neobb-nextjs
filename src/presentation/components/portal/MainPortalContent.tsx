"use client";

import { Board, Category, Thread, User } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

// Initialize repositories
const threadRepo = new ThreadMockRepository();
const boardRepo = new BoardMockRepository();
const categoryRepo = new CategoryMockRepository();
const userRepo = new UserMockRepository();

export function MainPortalContent() {
  const [latestThreads, setLatestThreads] = useState<Thread[]>([]);
  const [trendingThreads, setTrendingThreads] = useState<Thread[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalPosts: 0, totalThreads: 0 });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [latest, trending, cats, allBoards, userStats, online] = await Promise.all([
        threadRepo.findLatest(5),
        threadRepo.findTrending(5),
        categoryRepo.findVisible(),
        boardRepo.findVisible(),
        userRepo.getStats(),
        userRepo.getOnlineUsers(),
      ]);

      setLatestThreads(latest);
      setTrendingThreads(trending);
      setCategories(cats);
      setBoards(allBoards);
      setOnlineUsers(online);
      
      // Calculate total posts/threads
      const totalPosts = allBoards.reduce((sum, b) => sum + b.postCount, 0);
      const totalThreads = allBoards.reduce((sum, b) => sum + b.threadCount, 0);
      setStats({ ...userStats, totalPosts, totalThreads });
      
      setLoading(false);
    }
    loadData();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🌐 Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            ศูนย์กลางชุมชน NeoBB
          </p>
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Latest & Trending */}
          <div className="lg:col-span-2 space-y-6">
            {/* Latest Threads Widget */}
            <WidgetCard title="📝 กระทู้ล่าสุด" icon="📝">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {latestThreads.map((thread) => (
                  <ThreadItem key={thread.id} thread={thread} />
                ))}
              </div>
              <Link 
                href="/forum" 
                className="block text-center py-2 text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
              >
                ดูทั้งหมด →
              </Link>
            </WidgetCard>

            {/* Trending Widget */}
            <WidgetCard title="🔥 กระทู้ยอดนิยม" icon="🔥">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {trendingThreads.map((thread) => (
                  <ThreadItem key={thread.id} thread={thread} showViews />
                ))}
              </div>
            </WidgetCard>

            {/* Categories Widget */}
            <WidgetCard title="📂 หมวดหมู่" icon="📂">
              <div className="space-y-4">
                {categories.map((cat) => (
                  <CategoryItem 
                    key={cat.id} 
                    category={cat} 
                    boards={boards.filter(b => b.categoryId === cat.id)}
                  />
                ))}
              </div>
            </WidgetCard>
          </div>

          {/* Column 2: Stats & Online Users */}
          <div className="space-y-6">
            {/* Stats Widget */}
            <WidgetCard title="📊 สถิติ" icon="📊">
              <div className="grid grid-cols-2 gap-4">
                <StatItem label="สมาชิก" value={stats.totalUsers} icon="👥" />
                <StatItem label="ออนไลน์" value={stats.activeUsers} icon="🟢" />
                <StatItem label="กระทู้" value={stats.totalThreads} icon="💬" />
                <StatItem label="โพสต์" value={stats.totalPosts} icon="📝" />
              </div>
            </WidgetCard>

            {/* Online Users Widget */}
            <WidgetCard title="🟢 สมาชิกออนไลน์" icon="🟢">
              <div className="flex flex-wrap gap-2">
                {onlineUsers.length > 0 ? (
                  onlineUsers.map((user) => (
                    <Link 
                      key={user.id}
                      href={`/profile/${user.id}`}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <img 
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                        alt={user.displayName}
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{user.displayName}</span>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">ไม่มีสมาชิกออนไลน์</p>
                )}
              </div>
            </WidgetCard>

            {/* Quick Links Widget */}
            <WidgetCard title="🔗 ลิงก์ด่วน" icon="🔗">
              <div className="space-y-2">
                <QuickLink href="/forum" icon="💬" label="เข้าสู่ฟอรั่ม" />
                <QuickLink href="/auth/register" icon="📝" label="สมัครสมาชิก" />
                <QuickLink href="/auth/login" icon="🔐" label="เข้าสู่ระบบ" />
                <QuickLink href="/help" icon="❓" label="ช่วยเหลือ" />
              </div>
            </WidgetCard>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

// Widget Card Component
function WidgetCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Thread Item Component
function ThreadItem({ thread, showViews }: { thread: Thread; showViews?: boolean }) {
  return (
    <Link 
      href={`/forum/${thread.boardId}/${thread.id}`}
      className="block py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-2 -mx-2 rounded-lg transition-colors"
    >
      <div className="flex items-start gap-3">
        {thread.prefix && (
          <span 
            className="px-2 py-0.5 text-xs rounded-full font-medium text-white"
            style={{ backgroundColor: thread.prefix.color }}
          >
            {thread.prefix.name}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white truncate">
            {thread.isPinned && <span className="text-yellow-500 mr-1">📌</span>}
            {thread.title}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>💬 {thread.replyCount}</span>
            {showViews && <span>👁️ {thread.viewCount}</span>}
            <span>{formatRelativeTime(thread.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Category Item Component
function CategoryItem({ category, boards }: { category: Category; boards: Board[] }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
        <span>{category.icon}</span>
        {category.name}
      </h4>
      <div className="grid gap-2 pl-4">
        {boards.map((board) => (
          <Link 
            key={board.id}
            href={`/forum/${board.id}`}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>{board.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{board.name}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {board.threadCount} กระทู้
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Stat Item Component
function StatItem({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}

// Quick Link Component
function QuickLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <span>{icon}</span>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </Link>
  );
}

// Helper function
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
