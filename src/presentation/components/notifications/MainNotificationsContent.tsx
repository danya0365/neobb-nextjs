"use client";

import { Notification } from "@/src/domain/entities";
import { NotificationMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";

const notificationRepo = new NotificationMockRepository();

export function MainNotificationsContent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    async function loadData() {
      const all = await notificationRepo.findByUser("user-1");
      setNotifications(all);
      setLoading(false);
    }
    loadData();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const handleMarkAllRead = async () => {
    await notificationRepo.markAllAsRead("user-1");
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkRead = async (id: string) => {
    await notificationRepo.markAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🔔 การแจ้งเตือน</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount > 0 ? `${unreadCount} รายการที่ยังไม่ได้อ่าน` : "ไม่มีการแจ้งเตือนใหม่"}
            </p>
          </div>
          {unreadCount > 0 && (
            <MainButton onClick={handleMarkAllRead} icon="✓">
              อ่านทั้งหมดแล้ว
            </MainButton>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <FilterTab active={filter === "all"} onClick={() => setFilter("all")} label="ทั้งหมด" count={notifications.length} />
          <FilterTab active={filter === "unread"} onClick={() => setFilter("unread")} label="ยังไม่อ่าน" count={unreadCount} />
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard 
                key={notification.id} 
                notification={notification}
                onMarkRead={() => handleMarkRead(notification.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">🔔</div>
              <p>ไม่มีการแจ้งเตือน</p>
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
}

function FilterTab({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {label} ({count})
    </button>
  );
}

function NotificationCard({ notification, onMarkRead }: { notification: Notification; onMarkRead: () => void }) {
  const icons: Record<string, string> = {
    mention: "💬",
    reply: "↩️",
    quote: "📝",
    reaction: "❤️",
    thread_update: "🔄",
    system: "📢",
    warning: "⚠️",
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-colors ${
        notification.isRead
          ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          : "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl">{icons[notification.type] || "🔔"}</div>
        <div className="flex-1">
          <p className={`${notification.isRead ? "text-gray-600 dark:text-gray-300" : "text-gray-900 dark:text-white font-medium"}`}>
            {notification.message}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span>{formatRelativeTime(notification.createdAt)}</span>
            {notification.link && (
              <Link href={notification.link} className="text-indigo-600 hover:underline">
                ดูเพิ่มเติม →
              </Link>
            )}
          </div>
        </div>
        {!notification.isRead && (
          <button
            onClick={onMarkRead}
            className="text-xs text-indigo-600 hover:underline"
          >
            อ่านแล้ว
          </button>
        )}
      </div>
    </div>
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
