"use client";

import { Board, Category } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const categoryRepo = new CategoryMockRepository();
const boardRepo = new BoardMockRepository();

export function RetroForumContent() {
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

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Loading forum...</p>
      </div>
    );
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      {/* Header */}
      <div
        className="text-center p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "#ffffff",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="text-lg font-bold">💬 NeoBB Forum</h1>
        <p className="text-xs">Select a board to view threads</p>
      </div>

      {/* Forum Table */}
      <table 
        className="w-full text-xs" 
        cellPadding={4} 
        style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}
      >
        <thead>
          <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
            <th className="text-left p-2">Forum</th>
            <th className="text-center p-2" style={{ width: 80 }}>Threads</th>
            <th className="text-center p-2" style={{ width: 80 }}>Posts</th>
            <th className="text-left p-2" style={{ width: 150 }}>Last Post</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <>
              {/* Category Row */}
              <tr key={category.id} style={{ backgroundColor: "var(--win98-bg)" }}>
                <td colSpan={4} className="p-2 font-bold" style={{ borderBottom: "1px solid var(--win98-border-dark)" }}>
                  {category.icon} {category.name}
                  {category.description && (
                    <span style={{ fontWeight: "normal", color: "gray" }}> - {category.description}</span>
                  )}
                </td>
              </tr>
              {/* Board Rows */}
              {boards.filter(b => b.categoryId === category.id).map((board, idx) => (
                <tr 
                  key={board.id}
                  style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}
                >
                  <td className="p-2">
                    <Link href={`/forum/${board.id}`} className="retro-link font-bold">
                      {board.icon} {board.name}
                      {board.isLocked && " 🔒"}
                    </Link>
                    <div style={{ color: "gray" }}>{board.description}</div>
                  </td>
                  <td className="text-center">{board.threadCount}</td>
                  <td className="text-center">{board.postCount}</td>
                  <td className="text-xs" style={{ color: "gray" }}>
                    {board.lastPostAt ? (
                      <>
                        {new Date(board.lastPostAt).toLocaleDateString("th-TH")}
                        <br />
                        by <Link href={`/profile/${board.lastPostBy}`} className="retro-link">{board.lastPostBy}</Link>
                      </>
                    ) : (
                      "No posts"
                    )}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>

      {/* Actions */}
      <div className="mt-2 flex gap-2">
        <Link href="/forum/new-thread">
          <RetroButton variant="primary">📝 New Thread</RetroButton>
        </Link>
        <Link href="/portal">
          <RetroButton>🏠 Back to Portal</RetroButton>
        </Link>
      </div>
    </div>
  );
}
