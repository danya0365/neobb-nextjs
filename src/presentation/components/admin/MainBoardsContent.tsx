"use client";

import { Board, Category } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";

const categoryRepo = new CategoryMockRepository();
const boardRepo = new BoardMockRepository();

export function MainBoardsContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [cats, allBoards] = await Promise.all([
        categoryRepo.findAll(),
        boardRepo.findAll(),
      ]);
      setCategories(cats);
      setBoards(allBoards);
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

  return (
    <animated.div style={fadeIn} className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📂 จัดการบอร์ด</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {categories.length} หมวดหมู่, {boards.length} บอร์ด
          </p>
        </div>
        <div className="flex gap-2">
          <MainButton icon="📁">เพิ่มหมวดหมู่</MainButton>
          <MainButton variant="primary" icon="➕">เพิ่มบอร์ด</MainButton>
        </div>
      </div>

      {/* Categories & Boards */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Category Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <span className="text-xl">{category.icon}</span>
                <div>
                  <h2 className="font-semibold">{category.name}</h2>
                  <p className="text-sm opacity-80">{category.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white" title="แก้ไข">
                  ✏️
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white" title="ลบ">
                  🗑️
                </button>
              </div>
            </div>

            {/* Boards */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {boards.filter(b => b.categoryId === category.id).map((board) => (
                <div key={board.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="text-2xl">{board.icon || "💬"}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {board.name}
                      {board.isLocked && <span className="text-red-500">🔒</span>}
                      {!board.isVisible && <span className="text-gray-400">👁️‍🗨️</span>}
                    </div>
                    <div className="text-sm text-gray-500">{board.description}</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-bold text-gray-900 dark:text-white">{board.threadCount}</div>
                    <div className="text-xs text-gray-500">กระทู้</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="font-bold text-gray-900 dark:text-white">{board.postCount}</div>
                    <div className="text-xs text-gray-500">โพสต์</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="แก้ไข">
                      ✏️
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="ลบ">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              {boards.filter(b => b.categoryId === category.id).length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  ยังไม่มีบอร์ดในหมวดหมู่นี้
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </animated.div>
  );
}
