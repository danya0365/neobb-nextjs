"use client";

import { Board, Thread } from "@/src/domain/entities";
import { BoardMockRepository, ThreadMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const boardRepo = new BoardMockRepository();
const threadRepo = new ThreadMockRepository();

interface RetroBoardContentProps {
  boardId: string;
}

export function RetroBoardContent({ boardId }: RetroBoardContentProps) {
  const [board, setBoard] = useState<Board | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [boardData, threadData] = await Promise.all([
        boardRepo.findById(boardId),
        threadRepo.findByBoard(boardId),
      ]);
      setBoard(boardData);
      setThreads(threadData);
      setLoading(false);
    }
    loadData();
  }, [boardId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Loading board...</p>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Board not found. <Link href="/forum" className="retro-link">Go back</Link></p>
      </div>
    );
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      {/* Header */}
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "#ffffff",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="text-lg font-bold">{board.icon} {board.name}</h1>
        <p className="text-xs">{board.description}</p>
      </div>

      {/* Breadcrumb */}
      <div className="text-xs mb-2" style={{ color: "gray" }}>
        <Link href="/forum" className="retro-link">Forum</Link> {'>'} {board.name}
      </div>

      {/* Actions */}
      <div className="mb-2 flex gap-2">
        {!board.isLocked && (
          <RetroButton variant="primary">📝 New Thread</RetroButton>
        )}
        <Link href="/forum">
          <RetroButton>← Back to Forum</RetroButton>
        </Link>
      </div>

      {/* Thread Table */}
      <table 
        className="w-full text-xs" 
        cellPadding={4} 
        style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}
      >
        <thead>
          <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
            <th className="text-left p-2">Thread</th>
            <th className="text-center p-2" style={{ width: 70 }}>Replies</th>
            <th className="text-center p-2" style={{ width: 70 }}>Views</th>
            <th className="text-left p-2" style={{ width: 120 }}>Last Post</th>
          </tr>
        </thead>
        <tbody>
          {threads.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4" style={{ color: "gray" }}>
                No threads in this board.
              </td>
            </tr>
          ) : (
            threads.map((thread, idx) => (
              <tr 
                key={thread.id}
                style={{ 
                  backgroundColor: thread.isPinned 
                    ? "#ffffcc" 
                    : idx % 2 === 0 ? "transparent" : "var(--win98-bg)" 
                }}
              >
                <td className="p-2">
                  <Link href={`/forum/${boardId}/${thread.id}`} className="retro-link font-bold">
                    {thread.isPinned && "📌 "}
                    {thread.prefix && `[${thread.prefix.name}] `}
                    {thread.title}
                    {thread.isLocked && " 🔒"}
                  </Link>
                  <div style={{ color: "gray" }}>
                    by {thread.authorId} - {new Date(thread.createdAt).toLocaleDateString("th-TH")}
                  </div>
                </td>
                <td className="text-center">{thread.replyCount}</td>
                <td className="text-center">{thread.viewCount}</td>
                <td className="text-xs" style={{ color: "gray" }}>
                  {thread.lastReplyAt ? (
                    new Date(thread.lastReplyAt).toLocaleDateString("th-TH")
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
