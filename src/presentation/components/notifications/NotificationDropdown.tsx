"use client";

import { Notification, useNotificationStore } from "@/src/presentation/stores/notificationStore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Mock initial notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "reply",
    title: "ความคิดเห็นใหม่",
    message: "TechGuru ตอบกลับในกระทู้ 'ตั้งค่า SSL Certificate'",
    link: "/forum/board-1/thread-1",
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "like",
    title: "ถูกใจโพสต์",
    message: "DevMaster ถูกใจโพสต์ของคุณ",
    link: "/forum/board-2/thread-2",
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "mention",
    title: "ถูกกล่าวถึง",
    message: "คุณถูกแท็กในกระทู้ 'แนะนำ Framework'",
    link: "/forum/board-3/thread-3",
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    type: "system",
    title: "ระบบ",
    message: "อัพเดท: นโยบายความเป็นส่วนตัวใหม่",
    link: "/help/privacy",
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, setNotifications, markAsRead, markAllAsRead } = useNotificationStore();

  // Initialize with mock data
  useEffect(() => {
    if (notifications.length === 0) {
      setNotifications(mockNotifications);
    }
  }, [notifications.length, setNotifications]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTypeIcon = (type: Notification["type"]) => {
    const icons = {
      reply: "💬",
      mention: "@",
      like: "❤️",
      follow: "👤",
      system: "🔔",
    };
    return icons[type] || "🔔";
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "เมื่อกี้";
    if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
    if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
    return `${diffDays} วันที่แล้ว`;
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="การแจ้งเตือน"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              🔔 การแจ้งเตือน
              {unreadCount > 0 && (
                <span className="ml-2 text-sm text-indigo-600 dark:text-indigo-400">
                  ({unreadCount} ใหม่)
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                อ่านทั้งหมด
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.slice(0, 10).map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link || "#"}
                  onClick={() => markAsRead(notif.id)}
                  className={`block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                    !notif.isRead ? "bg-indigo-50/50 dark:bg-indigo-900/10" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{getTypeIcon(notif.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${!notif.isRead ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                          {notif.title}
                        </span>
                        {!notif.isRead && (
                          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {notif.message}
                      </p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {getRelativeTime(notif.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <span className="text-3xl">🔕</span>
                <p className="mt-2">ไม่มีการแจ้งเตือน</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <Link
              href="/notifications"
              className="block px-4 py-3 text-center text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700"
            >
              ดูทั้งหมด →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
