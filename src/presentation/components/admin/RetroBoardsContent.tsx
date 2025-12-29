"use client";

import { Board, Category } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository } from "@/src/infrastructure/repositories/mock";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const categoryRepo = new CategoryMockRepository();
const boardRepo = new BoardMockRepository();

export function RetroBoardsContent() {
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

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading boards...</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <div
        className="p-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">📂 Board Management</h1>
        <p className="text-xs">{categories.length} Categories, {boards.length} Boards</p>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2">
        <RetroButton>📁 Add Category</RetroButton>
        <RetroButton variant="primary">➕ Add Board</RetroButton>
      </div>

      {/* Tree View */}
      <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)", padding: "8px" }}>
        {categories.map((category) => (
          <div key={category.id} className="mb-2">
            {/* Category */}
            <div
              className="flex items-center gap-2 p-1 font-bold text-xs"
              style={{ backgroundColor: "var(--win98-bg)" }}
            >
              <span>📁</span>
              <span>{category.icon} {category.name}</span>
              <span className="flex-1" />
              <button className="px-1" title="Edit">✏️</button>
              <button className="px-1" title="Delete">🗑️</button>
            </div>

            {/* Boards */}
            <div className="ml-4 border-l border-gray-400 pl-2">
              {boards.filter(b => b.categoryId === category.id).map((board) => (
                <div key={board.id} className="flex items-center gap-2 text-xs py-1">
                  <span>├─</span>
                  <span>{board.icon || "📄"}</span>
                  <span className="flex-1">
                    {board.name}
                    {board.isLocked && " 🔒"}
                    {!board.isVisible && " (hidden)"}
                  </span>
                  <span className="text-gray-500">{board.threadCount} threads</span>
                  <button className="px-1" title="Edit">✏️</button>
                  <button className="px-1" title="Delete">🗑️</button>
                </div>
              ))}
              {boards.filter(b => b.categoryId === category.id).length === 0 && (
                <div className="text-xs py-1" style={{ color: "gray" }}>
                  └─ (no boards)
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
