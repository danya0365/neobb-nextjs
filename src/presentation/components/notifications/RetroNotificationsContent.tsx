"use client";

import { Notification } from "@/src/domain/entities";
import { NotificationMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const notificationRepo = new NotificationMockRepository();

export function RetroNotificationsContent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const all = await notificationRepo.findByUser("user-1");
      setNotifications(all);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleMarkAllRead = async () => {
    await notificationRepo.markAllAsRead("user-1");
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      {/* Header */}
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">🔔 Notifications</h1>
        <p className="text-xs">{unreadCount} unread</p>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        {unreadCount > 0 && (
          <RetroButton onClick={handleMarkAllRead}>✓ Mark All Read</RetroButton>
        )}
        <Link href="/portal">
          <RetroButton>← Back</RetroButton>
        </Link>
      </div>

      {/* Notification List */}
      <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}>
        <table className="w-full text-xs" cellPadding={4}>
          <thead>
            <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
              <th className="text-left p-2">Type</th>
              <th className="text-left p-2">Message</th>
              <th className="text-center p-2">Date</th>
              <th className="text-center p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification, idx) => (
              <tr
                key={notification.id}
                style={{
                  backgroundColor: notification.isRead
                    ? idx % 2 === 0 ? "transparent" : "var(--win98-bg)"
                    : "#ffffcc",
                }}
              >
                <td className="p-2">{notification.type}</td>
                <td className="p-2">
                  {notification.link ? (
                    <Link href={notification.link} className="retro-link">
                      {notification.message}
                    </Link>
                  ) : (
                    notification.message
                  )}
                </td>
                <td className="text-center">{new Date(notification.createdAt).toLocaleDateString()}</td>
                <td className="text-center">
                  {notification.isRead ? (
                    <span style={{ color: "gray" }}>Read</span>
                  ) : (
                    <span style={{ color: "green", fontWeight: "bold" }}>New</span>
                  )}
                </td>
              </tr>
            ))}
            {notifications.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4" style={{ color: "gray" }}>
                  No notifications
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
