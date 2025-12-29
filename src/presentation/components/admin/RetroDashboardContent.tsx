"use client";

import { BoardMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const userRepo = new UserMockRepository();
const boardRepo = new BoardMockRepository();

export function RetroDashboardContent() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalBoards: 0,
    totalPosts: 0,
    totalThreads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [userStats, boards] = await Promise.all([
        userRepo.getStats(),
        boardRepo.findAll(),
      ]);

      setStats({
        totalUsers: userStats.totalUsers,
        activeUsers: userStats.activeUsers,
        totalBoards: boards.length,
        totalPosts: boards.reduce((sum, b) => sum + b.postCount, 0),
        totalThreads: boards.reduce((sum, b) => sum + b.threadCount, 0),
      });
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <div
        className="p-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">📊 Admin Dashboard</h1>
        <p className="text-xs">System Overview - NeoBB Control Panel</p>
      </div>

      {/* Stats Table */}
      <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
        <div
          className="p-1 font-bold text-xs"
          style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}
        >
          System Statistics
        </div>
        <div className="p-2">
          <table className="w-full text-xs" cellPadding={4}>
            <tbody>
              <tr style={{ backgroundColor: "var(--win98-bg)" }}>
                <td>👥 Total Members:</td>
                <td className="font-bold">{stats.totalUsers}</td>
                <td>🟢 Online Now:</td>
                <td className="font-bold" style={{ color: "green" }}>{stats.activeUsers}</td>
              </tr>
              <tr>
                <td>📂 Total Boards:</td>
                <td className="font-bold">{stats.totalBoards}</td>
                <td>💬 Total Threads:</td>
                <td className="font-bold">{stats.totalThreads.toLocaleString()}</td>
              </tr>
              <tr style={{ backgroundColor: "var(--win98-bg)" }}>
                <td>📝 Total Posts:</td>
                <td className="font-bold">{stats.totalPosts.toLocaleString()}</td>
                <td>📈 Today&apos;s Posts:</td>
                <td className="font-bold">{Math.floor(Math.random() * 50) + 10}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
        <div
          className="p-1 font-bold text-xs"
          style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}
        >
          Quick Actions
        </div>
        <div className="p-2 flex flex-wrap gap-2">
          <Link href="/admin/users">
            <RetroButton>👤 Manage Users</RetroButton>
          </Link>
          <Link href="/admin/boards">
            <RetroButton>📂 Manage Boards</RetroButton>
          </Link>
          <Link href="/admin/settings">
            <RetroButton>⚙️ Settings</RetroButton>
          </Link>
          <Link href="/forum">
            <RetroButton>💬 View Forum</RetroButton>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
        <div
          className="p-1 font-bold text-xs"
          style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}
        >
          System Information
        </div>
        <div className="p-2 text-xs">
          <table className="w-full" cellPadding={4}>
            <tbody>
              <tr>
                <td style={{ width: "120px" }}>Version:</td>
                <td>NeoBB v1.0.0</td>
              </tr>
              <tr style={{ backgroundColor: "var(--win98-bg)" }}>
                <td>Framework:</td>
                <td>Next.js 15</td>
              </tr>
              <tr>
                <td>Database:</td>
                <td>Mock Data (Development)</td>
              </tr>
              <tr style={{ backgroundColor: "var(--win98-bg)" }}>
                <td>Server Status:</td>
                <td style={{ color: "green" }}>🟢 Online</td>
              </tr>
              <tr>
                <td>Last Backup:</td>
                <td>2024-12-28 03:00:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
