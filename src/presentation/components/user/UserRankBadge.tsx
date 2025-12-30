"use client";

import { User } from "@/src/domain/entities/User";

interface UserRankBadgeProps {
  user: User;
  size?: "sm" | "md" | "lg";
}

const rankConfig: Record<string, { label: string; icon: string; color: string; minRep: number }> = {
  legend: { label: "Legend", icon: "👑", color: "from-yellow-400 to-amber-500", minRep: 10000 },
  master: { label: "Master", icon: "⚜️", color: "from-purple-500 to-indigo-600", minRep: 5000 },
  expert: { label: "Expert", icon: "💎", color: "from-cyan-400 to-blue-500", minRep: 2000 },
  veteran: { label: "Veteran", icon: "🏆", color: "from-orange-400 to-red-500", minRep: 1000 },
  regular: { label: "Regular", icon: "⭐", color: "from-green-400 to-emerald-500", minRep: 500 },
  member: { label: "Member", icon: "🔵", color: "from-gray-400 to-gray-500", minRep: 100 },
  newbie: { label: "Newbie", icon: "🌱", color: "from-lime-400 to-green-500", minRep: 0 },
};

export function getUserRank(reputation: number): { label: string; icon: string; color: string } {
  for (const [, config] of Object.entries(rankConfig).sort((a, b) => b[1].minRep - a[1].minRep)) {
    if (reputation >= config.minRep) {
      return config;
    }
  }
  return rankConfig.newbie;
}

export function UserRankBadge({ user, size = "md" }: UserRankBadgeProps) {
  const rank = getUserRank(user.reputation);
  
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium text-white bg-gradient-to-r ${rank.color} ${sizeClasses[size]}`}
    >
      <span>{rank.icon}</span>
      <span>{rank.label}</span>
    </span>
  );
}
