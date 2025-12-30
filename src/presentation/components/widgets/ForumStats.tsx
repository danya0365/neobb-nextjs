"use client";

interface ForumStatsProps {
  stats?: {
    totalThreads: number;
    totalPosts: number;
    totalUsers: number;
    onlineUsers: number;
    newestUser?: string;
  };
}

const defaultStats = {
  totalThreads: 1234,
  totalPosts: 56789,
  totalUsers: 4567,
  onlineUsers: 89,
  newestUser: "NewMember2024",
};

export function ForumStats({ stats = defaultStats }: ForumStatsProps) {
  const statItems = [
    { label: "กระทู้ทั้งหมด", value: stats.totalThreads, icon: "📝", color: "from-blue-500 to-cyan-500" },
    { label: "โพสต์ทั้งหมด", value: stats.totalPosts, icon: "💬", color: "from-purple-500 to-pink-500" },
    { label: "สมาชิกทั้งหมด", value: stats.totalUsers, icon: "👥", color: "from-green-500 to-emerald-500" },
    { label: "ออนไลน์", value: stats.onlineUsers, icon: "🟢", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <div className="forum-stats-container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-6 -mt-6`} />
            <div className="relative">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {stats.newestUser && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          🎉 ยินดีต้อนรับสมาชิกใหม่: <span className="font-medium text-indigo-600 dark:text-indigo-400">{stats.newestUser}</span>
        </div>
      )}
    </div>
  );
}
