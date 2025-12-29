"use client";

import { BoardMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

const userRepo = new UserMockRepository();
const boardRepo = new BoardMockRepository();
const threadRepo = new ThreadMockRepository();

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalBoards: number;
  totalThreads: number;
  totalPosts: number;
  todayPosts: number;
}

export function MainDashboardContent() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalBoards: 0,
    totalThreads: 0,
    totalPosts: 0,
    todayPosts: 0,
  });
  const [recentUsers, setRecentUsers] = useState<{ id: string; displayName: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [userStats, users, boards, threads] = await Promise.all([
        userRepo.getStats(),
        userRepo.findAll(),
        boardRepo.findAll(),
        threadRepo.findAll(),
      ]);

      const totalPosts = boards.reduce((sum, b) => sum + b.postCount, 0);
      const totalThreads = boards.reduce((sum, b) => sum + b.threadCount, 0);

      setStats({
        totalUsers: userStats.totalUsers,
        activeUsers: userStats.activeUsers,
        totalBoards: boards.length,
        totalThreads,
        totalPosts,
        todayPosts: Math.floor(Math.random() * 50) + 10,
      });

      setRecentUsers(
        users
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
          .map((u) => ({ id: u.id, displayName: u.displayName, createdAt: u.createdAt }))
      );

      setLoading(false);
    }
    loadData();
  }, []);

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

  return (
    <animated.div style={fadeIn} className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">ภาพรวมระบบ NeoBB</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👥" label="สมาชิกทั้งหมด" value={stats.totalUsers} color="indigo" />
        <StatCard icon="🟢" label="ออนไลน์" value={stats.activeUsers} color="green" />
        <StatCard icon="📂" label="บอร์ด" value={stats.totalBoards} color="purple" />
        <StatCard icon="💬" label="กระทู้" value={stats.totalThreads} color="blue" />
        <StatCard icon="📝" label="โพสต์ทั้งหมด" value={stats.totalPosts} color="orange" />
        <StatCard icon="📈" label="โพสต์วันนี้" value={stats.todayPosts} color="pink" />
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">👤 สมาชิกล่าสุด</h2>
            <Link href="/admin/users" className="text-sm text-indigo-600 hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentUsers.map((user) => (
              <div key={user.id} className="px-6 py-3 flex justify-between items-center">
                <span className="text-gray-900 dark:text-white">{user.displayName}</span>
                <span className="text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("th-TH")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">⚡ การดำเนินการด่วน</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-3">
            <QuickActionButton href="/admin/users" icon="👤" label="จัดการสมาชิก" />
            <QuickActionButton href="/admin/boards" icon="📂" label="จัดการบอร์ด" />
            <QuickActionButton href="/admin/settings" icon="⚙️" label="ตั้งค่าระบบ" />
            <QuickActionButton href="/forum" icon="💬" label="ดู Forum" />
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">🖥️ ข้อมูลระบบ</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Version</span>
            <div className="font-medium text-gray-900 dark:text-white">NeoBB v1.0.0</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Framework</span>
            <div className="font-medium text-gray-900 dark:text-white">Next.js 15</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Database</span>
            <div className="font-medium text-gray-900 dark:text-white">Mock Data</div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Status</span>
            <div className="font-medium text-green-600">🟢 Online</div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-5 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">{value.toLocaleString()}</div>
          <div className="text-sm opacity-90">{label}</div>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}

function QuickActionButton({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </Link>
  );
}
