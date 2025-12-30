"use client";

import Link from "next/link";
import { useState } from "react";

interface Widget {
  id: string;
  name: string;
  type: string;
  position: string;
  isActive: boolean;
  order: number;
}

const mockWidgets: Widget[] = [
  { id: "1", name: "Latest Threads", type: "latest_threads", position: "main", isActive: true, order: 1 },
  { id: "2", name: "Trending Threads", type: "trending_threads", position: "main", isActive: true, order: 2 },
  { id: "3", name: "Forum Stats", type: "forum_stats", position: "sidebar", isActive: true, order: 1 },
  { id: "4", name: "Online Users", type: "online_users", position: "sidebar", isActive: true, order: 2 },
  { id: "5", name: "Announcements", type: "announcements", position: "top", isActive: false, order: 1 },
];

export function RetroAdminWidgetsContent() {
  const [widgets, setWidgets] = useState(mockWidgets);

  const toggleWidget = (id: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
  };

  return (
    <div className="retro-window">
      <div className="retro-window-title">
        <span>Widget Manager - NeoBB Admin</span>
      </div>
      <div className="retro-window-content">
        <div style={{ marginBottom: "10px" }}>
          <Link href="/admin" className="retro-link">[← Back to Admin]</Link>
          <span style={{ margin: "0 10px" }}>|</span>
          <button className="retro-button">[Add Widget]</button>
        </div>

        <table className="retro-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Type</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {widgets.map((widget) => (
              <tr key={widget.id}>
                <td style={{ textAlign: "center" }}>{widget.order}</td>
                <td>{widget.name}</td>
                <td>{widget.type}</td>
                <td>{widget.position}</td>
                <td style={{ textAlign: "center" }}>
                  <span style={{ color: widget.isActive ? "green" : "gray" }}>
                    {widget.isActive ? "ON" : "OFF"}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="retro-button"
                    onClick={() => toggleWidget(widget.id)}
                    style={{ marginRight: "5px" }}
                  >
                    [{widget.isActive ? "Disable" : "Enable"}]
                  </button>
                  <button className="retro-button" style={{ marginRight: "5px" }}>[Edit]</button>
                  <button className="retro-button">[Delete]</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
