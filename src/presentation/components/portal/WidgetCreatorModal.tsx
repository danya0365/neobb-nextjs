"use client";

import { PortalWidget, useWidgetStore } from "@/src/presentation/stores/widgetStore";
import { useState } from "react";

const widgetTypes = [
  { type: "latest_threads", title: "📝 กระทู้ล่าสุด", description: "แสดงกระทู้ล่าสุด 5 อันดับ" },
  { type: "trending_threads", title: "🔥 กระทู้ยอดนิยม", description: "แสดงกระทู้ที่มีคนดูมากที่สุด" },
  { type: "categories", title: "📂 หมวดหมู่", description: "แสดงหมวดหมู่และบอร์ดทั้งหมด" },
  { type: "stats", title: "📊 สถิติ", description: "แสดงสถิติ สมาชิก กระทู้ โพสต์" },
  { type: "online_users", title: "🟢 สมาชิกออนไลน์", description: "แสดงสมาชิกที่กำลังออนไลน์" },
  { type: "quick_links", title: "🔗 ลิงก์ด่วน", description: "แสดงลิงก์ไปยังหน้าสำคัญ" },
  { type: "announcements", title: "📢 ประกาศ", description: "แสดงประกาศจากแอดมิน" },
  { type: "calendar", title: "📅 ปฏิทิน", description: "แสดงปฏิทินกิจกรรม" },
  { type: "custom_html", title: "🎨 HTML ที่กำหนดเอง", description: "แสดง HTML ที่กำหนดเอง" },
];

interface WidgetCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetCreatorModal({ isOpen, onClose }: WidgetCreatorModalProps) {
  const { widgets, setWidgets } = useWidgetStore();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [widgetName, setWidgetName] = useState("");
  const [position, setPosition] = useState<"main" | "sidebar">("main");

  if (!isOpen) return null;

  const existingTypes = widgets.map(w => w.type);

  const handleCreate = () => {
    if (!selectedType) return;

    const icon = widgetTypes.find(wt => wt.type === selectedType)?.title.split(" ")[0] || "📦";
    const title = widgetName.trim() || widgetTypes.find(wt => wt.type === selectedType)?.title || "New Widget";

    const positionWidgets = widgets.filter(w => w.position === position);
    const newOrder = positionWidgets.length + 1;

    const newWidget: PortalWidget = {
      id: `widget-${Date.now()}`,
      type: selectedType,
      title,
      icon,
      position,
      order: newOrder,
      isVisible: true,
    };

    setWidgets([...widgets, newWidget]);
    setSelectedType(null);
    setWidgetName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            ➕ เพิ่ม Widget ใหม่
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            เลือกประเภท Widget ที่ต้องการเพิ่มใน Portal
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Widget Types */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              เลือกประเภท Widget
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {widgetTypes.map((wt) => {
                const isExisting = existingTypes.includes(wt.type);
                return (
                  <button
                    key={wt.type}
                    disabled={isExisting}
                    onClick={() => setSelectedType(wt.type)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedType === wt.type
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                        : isExisting
                        ? "border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed"
                        : "border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                    }`}
                  >
                    <div className="text-lg mb-1">{wt.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{wt.description}</div>
                    {isExisting && (
                      <div className="text-xs text-orange-500 mt-1">มีอยู่แล้ว</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Configuration */}
          {selectedType && (
            <div className="space-y-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ชื่อ Widget (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={widgetTypes.find(wt => wt.type === selectedType)?.title}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ตำแหน่ง
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPosition("main")}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 ${
                      position === "main"
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    📋 พื้นที่หลัก
                  </button>
                  <button
                    onClick={() => setPosition("sidebar")}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 ${
                      position === "sidebar"
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    📌 แถบข้าง
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleCreate}
            disabled={!selectedType}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedType
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            เพิ่ม Widget
          </button>
        </div>
      </div>
    </div>
  );
}
