"use client";

import Link from "next/link";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  isActive: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

const mockThemes: Theme[] = [
  {
    id: "default",
    name: "Default",
    description: "ธีมมาตรฐานของ NeoBB",
    preview: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    isActive: true,
    colors: { primary: "#6366f1", secondary: "#8b5cf6", background: "#ffffff" },
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    description: "ธีมสีน้ำเงินมหาสมุทร",
    preview: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    isActive: false,
    colors: { primary: "#0ea5e9", secondary: "#06b6d4", background: "#f0f9ff" },
  },
  {
    id: "forest",
    name: "Forest Green",
    description: "ธีมสีเขียวธรรมชาติ",
    preview: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    isActive: false,
    colors: { primary: "#10b981", secondary: "#34d399", background: "#f0fdf4" },
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    description: "ธีมสีส้มอาทิตย์ตก",
    preview: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
    isActive: false,
    colors: { primary: "#f97316", secondary: "#fb923c", background: "#fff7ed" },
  },
  {
    id: "midnight",
    name: "Midnight Dark",
    description: "ธีมดาร์คโหมด สีม่วงเข้ม",
    preview: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
    isActive: false,
    colors: { primary: "#4f46e5", secondary: "#6366f1", background: "#0f0f23" },
  },
  {
    id: "rose",
    name: "Rose Pink",
    description: "ธีมสีชมพูกุหลาบ",
    preview: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    isActive: false,
    colors: { primary: "#ec4899", secondary: "#f472b6", background: "#fdf2f8" },
  },
];

export function MainAdminThemesContent() {
  const [themes, setThemes] = useState(mockThemes);

  const activateTheme = (id: string) => {
    setThemes(prev => prev.map(t => ({
      ...t,
      isActive: t.id === id,
    })));
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
              <span>Themes</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎨 จัดการ Themes
            </h1>
          </div>
          <MainButton variant="primary" icon="➕">สร้างธีมใหม่</MainButton>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl border-2 overflow-hidden transition-all ${
                theme.isActive
                  ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Preview */}
              <div
                className="h-32 w-full"
                style={{ background: theme.preview }}
              >
                {theme.isActive && (
                  <div className="flex items-center justify-center h-full">
                    <span className="bg-white/90 text-indigo-600 px-4 py-2 rounded-full font-medium shadow-lg">
                      ✓ กำลังใช้งาน
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {theme.description}
                </p>

                {/* Color Swatches */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Primary"
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: theme.colors.secondary }}
                    title="Secondary"
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-md"
                    style={{ backgroundColor: theme.colors.background }}
                    title="Background"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!theme.isActive && (
                    <button
                      onClick={() => activateTheme(theme.id)}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      เลือกใช้
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    ✏️ แก้ไข
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
