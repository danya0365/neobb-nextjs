"use client";

import { Thread, User } from "@/src/domain/entities";
import { ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";

const threadRepo = new ThreadMockRepository();
const userRepo = new UserMockRepository();

interface Activity {
  id: string;
  type: string;
  user: User;
  thread?: Thread;
  timestamp: string;
}

export function RetroActivityContent() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [threads, users] = await Promise.all([
        threadRepo.findAll(),
        userRepo.findAll(),
      ]);

      const mockActivities: Activity[] = [
        { id: "1", type: "New Thread", user: users[0], thread: threads[0], timestamp: "2024-12-28T14:30:00Z" },
        { id: "2", type: "New Reply", user: users[1], thread: threads[1], timestamp: "2024-12-28T14:15:00Z" },
        { id: "3", type: "New Member", user: users[2], timestamp: "2024-12-28T14:00:00Z" },
        { id: "4", type: "Trending", user: users[0], thread: threads[2], timestamp: "2024-12-28T13:45:00Z" },
      ];

      setActivities(mockActivities);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="h-full flex items-center justify-center retro-text">Loading...</div>;
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">📊 Activity Log</h1>
        <p className="text-xs">Recent community activity</p>
      </div>

      <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}>
        <table className="w-full text-xs" cellPadding={4}>
          <thead>
            <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
              <th className="text-left p-2" style={{ width: 120 }}>Time</th>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Action</th>
              <th className="text-left p-2">Thread</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id} style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}>
                <td className="p-2">{new Date(activity.timestamp).toLocaleString()}</td>
                <td className="p-2">
                  <Link href={`/profile/${activity.user.id}`} className="retro-link">
                    {activity.user.displayName}
                  </Link>
                </td>
                <td className="p-2">{activity.type}</td>
                <td className="p-2">
                  {activity.thread ? (
                    <Link href={`/forum/${activity.thread.boardId}/${activity.thread.id}`} className="retro-link">
                      {activity.thread.title}
                    </Link>
                  ) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
