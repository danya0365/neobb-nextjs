"use client";

import Link from "next/link";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";

interface Widget {
  id: string;
  name: string;
  type: string;
  position: string;
  isActive: boolean;
  order: number;
}

const mockWidgets: Widget[] = [
  { id: "1", name: "กระทู้ล่าสุด", type: "latest_threads", position: "main", isActive: true, order: 1 },
  { id: "2", name: "กระทู้ยอดนิยม", type: "trending_threads", position: "main", isActive: true, order: 2 },
  { id: "3", name: "สถิติฟอรั่ม", type: "forum_stats", position: "sidebar", isActive: true, order: 1 },
  { id: "4", name: "สมาชิกออนไลน์", type: "online_users", position: "sidebar", isActive: true, order: 2 },
  { id: "5", name: "ประกาศ", type: "announcements", position: "top", isActive: false, order: 1 },
  { id: "6", name: "ลิงก์ด่วน", type: "quick_links", position: "sidebar", isActive: true, order: 3 },
];

export function MainAdminWidgetsContent() {
  const [widgets, setWidgets] = useState(mockWidgets);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);

  const toggleWidget = (id: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
  };

  const getPositionLabel = (pos: string) => {
    const labels: Record<string, string> = {
      main: "พื้นที่หลัก",
      sidebar: "แถบข้าง",
      top: "ด้านบน",
      bottom: "ด้านล่าง",
    };
    return labels[pos] || pos;
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
              <span>/</span>
              <span>Widgets</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              🧩 จัดการ Widgets
            </h1>
          </div>
          <MainButton variant="primary" icon="➕">เพิ่ม Widget</MainButton>
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`bg-white dark:bg-gray-800 rounded-xl border ${
                widget.isActive
                  ? "border-green-200 dark:border-green-800"
                  : "border-gray-200 dark:border-gray-700 opacity-60"
              } p-4 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {widget.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getPositionLabel(widget.position)}
                  </p>
                </div>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    widget.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {widget.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                  {widget.type}
                </span>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="แก้ไข">
                    ✏️
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="เลื่อนขึ้น">
                    ⬆️
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="เลื่อนลง">
                    ⬇️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Widget Types Legend */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            📋 ประเภท Widget ที่รองรับ
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { type: "latest_threads", label: "กระทู้ล่าสุด", icon: "📝" },
              { type: "trending_threads", label: "กระทู้ยอดนิยม", icon: "🔥" },
              { type: "forum_stats", label: "สถิติฟอรั่ม", icon: "📊" },
              { type: "online_users", label: "สมาชิกออนไลน์", icon: "🟢" },
              { type: "announcements", label: "ประกาศ", icon: "📢" },
              { type: "quick_links", label: "ลิงก์ด่วน", icon: "🔗" },
              { type: "calendar", label: "ปฏิทิน", icon: "📅" },
              { type: "custom_html", label: "HTML ที่กำหนดเอง", icon: "🎨" },
            ].map((item) => (
              <div
                key={item.type}
                className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg"
              >
                <span>{item.icon}</span>
                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
