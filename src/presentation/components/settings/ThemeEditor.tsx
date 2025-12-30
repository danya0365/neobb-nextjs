"use client";

import { ForumTheme, useThemeStore } from "@/src/presentation/stores/themeStore";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";

export function ThemeEditor() {
  const { themes, currentThemeId, getCurrentTheme, setTheme, updateTheme, addTheme } = useThemeStore();
  const [editingTheme, setEditingTheme] = useState<ForumTheme | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [colors, setColors] = useState({
    primary: "#6366f1",
    secondary: "#8b5cf6",
    background: "#ffffff",
    surface: "#f9fafb",
    text: "#111827",
  });

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveNew = () => {
    if (!newThemeName.trim()) return;
    
    const newTheme: ForumTheme = {
      id: `custom-${Date.now()}`,
      name: newThemeName,
      colors,
    };
    
    addTheme(newTheme);
    setIsCreating(false);
    setNewThemeName("");
    setColors({
      primary: "#6366f1",
      secondary: "#8b5cf6",
      background: "#ffffff",
      surface: "#f9fafb",
      text: "#111827",
    });
  };

  const handleUpdateTheme = () => {
    if (!editingTheme) return;
    updateTheme(editingTheme.id, colors);
    setEditingTheme(null);
  };

  const startEditing = (theme: ForumTheme) => {
    setEditingTheme(theme);
    setColors(theme.colors);
    setIsCreating(false);
  };

  return (
    <div className="theme-editor bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🎨 ตัวแก้ไขธีม
        </h2>
        {!isCreating && !editingTheme && (
          <MainButton variant="primary" icon="➕" onClick={() => setIsCreating(true)}>
            สร้างธีมใหม่
          </MainButton>
        )}
      </div>

      {/* Theme List */}
      {!isCreating && !editingTheme && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                theme.id === currentThemeId
                  ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setTheme(theme.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white">
                  {theme.name}
                </span>
                {theme.id === currentThemeId && (
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    ✓ ใช้งานอยู่
                  </span>
                )}
              </div>
              <div className="flex gap-1 mb-3">
                {Object.values(theme.colors).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-600"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              {theme.id.startsWith("custom-") && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(theme);
                  }}
                  className="text-xs text-gray-500 hover:text-indigo-600"
                >
                  ✏️ แก้ไข
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingTheme) && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            {isCreating ? "สร้างธีมใหม่" : `แก้ไข: ${editingTheme?.name}`}
          </h3>

          {isCreating && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ชื่อธีม
              </label>
              <input
                type="text"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="ธีมของฉัน"
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {(Object.keys(colors) as (keyof typeof colors)[]).map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 capitalize">
                  {key}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="flex-1 px-2 py-1 text-xs rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="mb-6 p-4 rounded-lg border border-gray-200 dark:border-gray-600" style={{ backgroundColor: colors.background }}>
            <div className="font-bold mb-2" style={{ color: colors.text }}>Preview</div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
              <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: colors.primary }}>
                Primary Button
              </button>
              <button className="px-4 py-2 rounded-lg text-white ml-2" style={{ backgroundColor: colors.secondary }}>
                Secondary
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <MainButton
              variant="primary"
              onClick={isCreating ? handleSaveNew : handleUpdateTheme}
            >
              {isCreating ? "สร้างธีม" : "บันทึก"}
            </MainButton>
            <MainButton
              variant="secondary"
              onClick={() => {
                setIsCreating(false);
                setEditingTheme(null);
              }}
            >
              ยกเลิก
            </MainButton>
          </div>
        </div>
      )}
    </div>
  );
}
