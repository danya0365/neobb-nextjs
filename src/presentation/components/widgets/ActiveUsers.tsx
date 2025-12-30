"use client";

import { User } from "@/src/domain/entities/User";
import { UserMockRepository } from "@/src/infrastructure/repositories/mock/UserMockRepository";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserRank } from "../user/UserRankBadge";

export function ActiveUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const repo = new UserMockRepository();
      const all = await repo.findAll();
      // Get top users by reputation (simulating active users)
      const sorted = [...all]
        .sort((a, b) => b.reputation - a.reputation);
      setUsers(sorted.slice(0, 8));
    };
    loadUsers();
  }, []);

  return (
    <div className="active-users bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        🟢 สมาชิกที่ใช้งานอยู่
      </h3>
      <div className="flex flex-wrap gap-2">
        {users.map((user) => {
          const rank = getUserRank(user.reputation);
          return (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {user.displayName || user.username}
              </span>
              <span className="text-xs">{rank.icon}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
