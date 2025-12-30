"use client";

import { Role, User } from "@/src/domain/entities";
import { RoleMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

const userRepo = new UserMockRepository();
const roleRepo = new RoleMockRepository();

export function MainOnlineUsersContent() {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Map<string, Role>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [users, allRoles] = await Promise.all([
        userRepo.getOnlineUsers(),
        roleRepo.findAll(),
      ]);
      setOnlineUsers(users);

      const roleMap = new Map<string, Role>();
      allRoles.forEach(r => roleMap.set(r.id, r));
      setRoles(roleMap);

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

  // Group by role
  const admins = onlineUsers.filter(u => u.roleId === "role-1");
  const mods = onlineUsers.filter(u => u.roleId === "role-2");
  const members = onlineUsers.filter(u => u.roleId !== "role-1" && u.roleId !== "role-2");

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🟢 สมาชิกออนไลน์</h1>
          <p className="text-gray-600 dark:text-gray-400">{onlineUsers.length} คนกำลังออนไลน์</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="ผู้ดูแล" count={admins.length} color="#ef4444" icon="👑" />
          <StatCard label="ผู้ช่วย" count={mods.length} color="#f59e0b" icon="🛡️" />
          <StatCard label="สมาชิก" count={members.length} color="#22c55e" icon="👤" />
        </div>

        {/* Online Users Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">รายชื่อ</h2>
          <div className="flex flex-wrap gap-4">
            {onlineUsers.map(user => {
              const role = roles.get(user.roleId);
              return (
                <Link
                  key={user.id}
                  href={`/profile/${user.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2"
                      style={{ borderColor: role?.color || "#ccc" }}
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {user.displayName}
                    </div>
                    {role && (
                      <span className="text-xs" style={{ color: role.color }}>
                        {role.displayName}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Guest info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          และผู้เยี่ยมชม 42 คน
        </div>
      </div>
    </animated.div>
  );
}

function StatCard({ label, count, color, icon }: { label: string; count: number; color: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold" style={{ color }}>{count}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
