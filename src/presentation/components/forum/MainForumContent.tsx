"use client";

import { Board, Category } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";

const categoryRepo = new CategoryMockRepository();
const boardRepo = new BoardMockRepository();

export function MainForumContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [cats, allBoards] = await Promise.all([
        categoryRepo.findVisible(),
        boardRepo.findVisible(),
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
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            💬 Forum
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            เลือกบอร์ดเพื่อดูกระทู้สนทนา
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              boards={boards.filter(b => b.categoryId === category.id)}
            />
          ))}
        </div>
      </div>
    </animated.div>
  );
}

function CategoryCard({ category, boards }: { category: Category; boards: Board[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Category Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="text-xl">{category.icon}</span>
          {category.name}
        </h2>
        {category.description && (
          <p className="text-sm text-indigo-100 mt-1">{category.description}</p>
        )}
      </div>

      {/* Boards */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {boards.map((board) => (
          <BoardRow key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}

function BoardRow({ board }: { board: Board }) {
  return (
    <Link 
      href={`/forum/${board.id}`}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-2xl">
        {board.icon || "💬"}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {board.name}
          {board.isLocked && <span className="ml-2 text-red-500">🔒</span>}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {board.description}
        </p>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-6 text-center">
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {board.threadCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">กระทู้</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {board.postCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">โพสต์</div>
        </div>
      </div>

      {/* Arrow */}
      <div className="text-gray-400">
        →
      </div>
    </Link>
  );
}
