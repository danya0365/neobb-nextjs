"use client";

import { Thread, User } from "@/src/domain/entities";
import { ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

const threadRepo = new ThreadMockRepository();
const userRepo = new UserMockRepository();

interface Activity {
  id: string;
  type: "new_thread" | "new_post" | "new_user" | "trending";
  user: User;
  thread?: Thread;
  timestamp: string;
}

export function MainActivityContent() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [threads, users] = await Promise.all([
        threadRepo.findAll(),
        userRepo.findAll(),
      ]);

      // Generate mock activities
      const mockActivities: Activity[] = [
        { id: "1", type: "new_thread", user: users[0], thread: threads[0], timestamp: "2024-12-28T14:30:00Z" },
        { id: "2", type: "new_post", user: users[1], thread: threads[1], timestamp: "2024-12-28T14:15:00Z" },
        { id: "3", type: "new_user", user: users[2], timestamp: "2024-12-28T14:00:00Z" },
        { id: "4", type: "trending", user: users[0], thread: threads[2], timestamp: "2024-12-28T13:45:00Z" },
        { id: "5", type: "new_thread", user: users[1], thread: threads[3], timestamp: "2024-12-28T13:30:00Z" },
        { id: "6", type: "new_post", user: users[2], thread: threads[0], timestamp: "2024-12-28T13:00:00Z" },
      ];

      setActivities(mockActivities);
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_thread": return "📝";
      case "new_post": return "💬";
      case "new_user": return "👋";
      case "trending": return "🔥";
      default: return "📌";
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "new_thread":
        return <>สร้างกระทู้ใหม่ <Link href={`/forum/${activity.thread?.boardId}/${activity.thread?.id}`} className="text-indigo-600 hover:underline font-medium">{activity.thread?.title}</Link></>;
      case "new_post":
        return <>ตอบกลับในกระทู้ <Link href={`/forum/${activity.thread?.boardId}/${activity.thread?.id}`} className="text-indigo-600 hover:underline font-medium">{activity.thread?.title}</Link></>;
      case "new_user":
        return <>เข้าร่วมชุมชน</>;
      case "trending":
        return <>กระทู้ติด Trending <Link href={`/forum/${activity.thread?.boardId}/${activity.thread?.id}`} className="text-indigo-600 hover:underline font-medium">{activity.thread?.title}</Link></>;
      default:
        return <>ทำกิจกรรม</>;
    }
  };

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 กิจกรรมล่าสุด</h1>
          <p className="text-gray-600 dark:text-gray-400">สิ่งที่เกิดขึ้นในชุมชน</p>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div
              key={activity.id}
              className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-2xl">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Link href={`/profile/${activity.user.id}`} className="font-medium text-gray-900 dark:text-white hover:text-indigo-600">
                    {activity.user.displayName}
                  </Link>
                  <span className="text-gray-500">{getActivityText(activity)}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {formatRelativeTime(activity.timestamp)}
                </div>
              </div>
              <img
                src={activity.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user.username}`}
                alt={activity.user.displayName}
                className="w-10 h-10 rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </animated.div>
  );
}

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
