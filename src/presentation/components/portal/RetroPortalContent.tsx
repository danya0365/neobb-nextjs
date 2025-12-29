"use client";

import { Board, Category, Thread, User } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

// Initialize repositories
const threadRepo = new ThreadMockRepository();
const boardRepo = new BoardMockRepository();
const categoryRepo = new CategoryMockRepository();
const userRepo = new UserMockRepository();

export function RetroPortalContent() {
  const [latestThreads, setLatestThreads] = useState<Thread[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalPosts: 0, totalThreads: 0 });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [latest, cats, allBoards, userStats, online] = await Promise.all([
        threadRepo.findLatest(10),
        categoryRepo.findVisible(),
        boardRepo.findVisible(),
        userRepo.getStats(),
        userRepo.getOnlineUsers(),
      ]);

      setLatestThreads(latest);
      setCategories(cats);
      setBoards(allBoards);
      setOnlineUsers(online);
      
      const totalPosts = allBoards.reduce((sum, b) => sum + b.postCount, 0);
      const totalThreads = allBoards.reduce((sum, b) => sum + b.threadCount, 0);
      setStats({ ...userStats, totalPosts, totalThreads });
      
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <div className="text-center">
          <p>Loading... Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      {/* Welcome Banner */}
      <div
        className="text-center p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "#ffffff",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="text-lg font-bold">📋 NeoBB Portal</h1>
        <p className="text-xs">Community Center</p>
      </div>

      {/* Main Layout */}
      <div className="flex gap-2">
        {/* Left Column */}
        <div className="flex-1 space-y-2">
          {/* Categories & Boards */}
          <RetroWidgetBox title="📂 Forum Categories">
            <table className="w-full text-xs" cellPadding={4} style={{ border: "1px solid var(--win98-border-dark)" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                  <th className="text-left p-2">Board</th>
                  <th className="text-center p-2" style={{ width: 60 }}>Threads</th>
                  <th className="text-center p-2" style={{ width: 60 }}>Posts</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <>
                    <tr key={cat.id} style={{ backgroundColor: "var(--win98-bg)" }}>
                      <td colSpan={3} className="p-2 font-bold">
                        {cat.icon} {cat.name}
                      </td>
                    </tr>
                    {boards.filter(b => b.categoryId === cat.id).map((board, idx) => (
                      <tr 
                        key={board.id}
                        style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}
                      >
                        <td className="p-2">
                          <Link href={`/forum/${board.id}`} className="retro-link">
                            {board.icon} {board.name}
                          </Link>
                          <div className="text-xs" style={{ color: "gray" }}>{board.description}</div>
                        </td>
                        <td className="text-center">{board.threadCount}</td>
                        <td className="text-center">{board.postCount}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </RetroWidgetBox>

          {/* Latest Threads */}
          <RetroWidgetBox title="📝 Latest Threads">
            <table className="w-full text-xs" cellPadding={4} style={{ border: "1px solid var(--win98-border-dark)" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                  <th className="text-left p-2">Thread</th>
                  <th className="text-center p-2" style={{ width: 60 }}>Replies</th>
                  <th className="text-center p-2" style={{ width: 80 }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {latestThreads.map((thread, idx) => (
                  <tr 
                    key={thread.id}
                    style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}
                  >
                    <td className="p-2">
                      <Link href={`/forum/${thread.boardId}/${thread.id}`} className="retro-link">
                        {thread.isPinned && "📌 "}
                        {thread.prefix && `[${thread.prefix.name}] `}
                        {thread.title}
                      </Link>
                    </td>
                    <td className="text-center">{thread.replyCount}</td>
                    <td className="text-center">{thread.viewCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </RetroWidgetBox>
        </div>

        {/* Right Column */}
        <div className="w-48 space-y-2 flex-shrink-0">
          {/* Statistics */}
          <RetroWidgetBox title="📊 Statistics">
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>Total Members:</span>
                <strong>{stats.totalUsers}</strong>
              </div>
              <div className="flex justify-between">
                <span>Online Now:</span>
                <strong style={{ color: "green" }}>{stats.activeUsers}</strong>
              </div>
              <hr style={{ border: "1px inset var(--win98-border-dark)" }} />
              <div className="flex justify-between">
                <span>Total Threads:</span>
                <strong>{stats.totalThreads.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Posts:</span>
                <strong>{stats.totalPosts.toLocaleString()}</strong>
              </div>
            </div>
          </RetroWidgetBox>

          {/* Online Users */}
          <RetroWidgetBox title="🟢 Who's Online">
            <div className="text-xs">
              {onlineUsers.length > 0 ? (
                <div className="space-y-1">
                  {onlineUsers.map((user) => (
                    <Link 
                      key={user.id}
                      href={`/profile/${user.id}`}
                      className="retro-link block"
                    >
                      {user.displayName}
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: "gray" }}>No users online</p>
              )}
            </div>
          </RetroWidgetBox>

          {/* Quick Links */}
          <RetroWidgetBox title="🔗 Quick Links">
            <div className="space-y-1">
              <Link href="/forum" className="retro-link block text-xs">💬 Enter Forum</Link>
              <Link href="/auth/register" className="retro-link block text-xs">📝 Register</Link>
              <Link href="/auth/login" className="retro-link block text-xs">🔐 Login</Link>
              <Link href="/help" className="retro-link block text-xs">❓ Help/FAQ</Link>
            </div>
          </RetroWidgetBox>

          {/* Action Buttons */}
          <div className="space-y-1">
            <Link href="/forum" className="block">
              <RetroButton variant="primary" className="w-full">Enter Forum</RetroButton>
            </Link>
            <Link href="/auth/register" className="block">
              <RetroButton className="w-full">Register Now!</RetroButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Retro Widget Box Component
function RetroWidgetBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
      <div 
        className="px-2 py-1 font-bold text-xs"
        style={{ 
          backgroundColor: "var(--win98-titlebar)", 
          color: "white",
        }}
      >
        {title}
      </div>
      <div className="p-2" style={{ backgroundColor: "var(--win98-input-bg)" }}>
        {children}
      </div>
    </div>
  );
}
