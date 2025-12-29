"use client";

import { Badge, Role, Thread, User } from "@/src/domain/entities";
import { BadgeMockRepository, RoleMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

const userRepo = new UserMockRepository();
const threadRepo = new ThreadMockRepository();
const roleRepo = new RoleMockRepository();
const badgeRepo = new BadgeMockRepository();

interface MainProfileContentProps {
  userId: string;
}

export function MainProfileContent({ userId }: MainProfileContentProps) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const userData = await userRepo.findById(userId);
      if (userData) {
        setUser(userData);
        
        const [roleData, allBadges, userThreads] = await Promise.all([
          roleRepo.findById(userData.roleId),
          badgeRepo.findAll(),
          threadRepo.findByAuthor(userId),
        ]);

        setRole(roleData);
        setBadges(allBadges.filter(b => userData.badges.includes(b.id)));
        setThreads(userThreads.slice(0, 5));
      }
      setLoading(false);
    }
    loadData();
  }, [userId]);

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

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ไม่พบผู้ใช้</h2>
          <Link href="/forum" className="text-indigo-600 hover:underline">กลับไปหน้า Forum</Link>
        </div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.displayName}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 justify-center sm:justify-start">
                  {user.displayName}
                  {user.status === "active" && <span className="text-green-500">●</span>}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                {role && (
                  <span 
                    className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: role.color }}
                  >
                    {role.displayName}
                  </span>
                )}
              </div>
              
              {/* Stats */}
              <div className="flex gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.postCount}</div>
                  <div className="text-xs text-gray-500">โพสต์</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.threadCount}</div>
                  <div className="text-xs text-gray-500">กระทู้</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{user.reputation}</div>
                  <div className="text-xs text-gray-500">ชื่อเสียง</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">{user.bio}</p>
            )}

            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map(badge => (
                  <span 
                    key={badge.id}
                    className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    style={{ backgroundColor: badge.color + "20", color: badge.color }}
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    {badge.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">📝 กระทู้ล่าสุด</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {threads.length > 0 ? (
              threads.map(thread => (
                <Link
                  key={thread.id}
                  href={`/forum/${thread.boardId}/${thread.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {thread.title}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    💬 {thread.replyCount} ตอบ • 👁️ {thread.viewCount} views
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                ยังไม่มีกระทู้
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">สมัครเมื่อ</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString("th-TH", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">เข้าสู่ระบบล่าสุด</div>
            <div className="font-medium text-gray-900 dark:text-white">
              {user.lastLoginAt 
                ? new Date(user.lastLoginAt).toLocaleDateString("th-TH")
                : "ไม่ทราบ"
              }
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
