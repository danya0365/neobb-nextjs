"use client";

import { User } from "@/src/domain/entities/User";
import { UserMockRepository } from "@/src/infrastructure/repositories/mock/UserMockRepository";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MainLeaderboardContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<"reputation" | "posts" | "joined">("reputation");

  useEffect(() => {
    const loadUsers = async () => {
      const repo = new UserMockRepository();
      const allUsers = await repo.findAll();
      
      const sorted = [...allUsers].sort((a, b) => {
        if (filter === "reputation") return b.reputation - a.reputation;
        if (filter === "posts") return b.postCount - a.postCount;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      
      setUsers(sorted.slice(0, 10));
    };
    loadUsers();
  }, [filter]);

  const getRankClass = (index: number) => {
    if (index === 0) return "gold";
    if (index === 1) return "silver";
    if (index === 2) return "bronze";
    return "default";
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}`;
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title">🏆 อันดับสมาชิก</h1>
        <p className="leaderboard-subtitle">ผู้มีส่วนร่วมดีเด่นในชุมชน NeoBB</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mb-6">
        {[
          { key: "reputation", label: "ชื่อเสียง", icon: "⭐" },
          { key: "posts", label: "โพสต์", icon: "💬" },
          { key: "joined", label: "เข้าร่วมก่อน", icon: "📅" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="leaderboard-list">
        {users.map((user, index) => (
          <Link key={user.id} href={`/profile/${user.id}`} className="leaderboard-item">
            <div className={`leaderboard-rank ${getRankClass(index)}`}>
              {getRankIcon(index)}
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl">
              {user.displayName?.charAt(0) || user.username.charAt(0)}
            </div>
            <div className="leaderboard-user">
              <div className="leaderboard-username">{user.displayName || user.username}</div>
              <div className="leaderboard-stats">
                @{user.username} · {user.postCount} โพสต์
              </div>
            </div>
            <div className="leaderboard-score">
              <div className="leaderboard-points">
                {filter === "reputation" && user.reputation}
                {filter === "posts" && user.postCount}
                {filter === "joined" && new Date(user.createdAt).toLocaleDateString("th-TH")}
              </div>
              <div className="leaderboard-label">
                {filter === "reputation" && "ชื่อเสียง"}
                {filter === "posts" && "โพสต์"}
                {filter === "joined" && "เข้าร่วม"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
