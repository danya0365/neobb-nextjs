"use client";

import { Thread } from "@/src/domain/entities";
import { ThreadMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const threadRepo = new ThreadMockRepository();
const mockBookmarkedIds = ["thread-1", "thread-2", "thread-4"];

export function RetroBookmarksContent() {
  const [bookmarks, setBookmarks] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const allThreads = await threadRepo.findAll();
      setBookmarks(allThreads.filter(t => mockBookmarkedIds.includes(t.id)));
      setLoading(false);
    }
    loadData();
  }, []);

  const handleRemove = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center retro-text">Loading...</div>;
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">🔖 Bookmarks</h1>
        <p className="text-xs">{bookmarks.length} saved threads</p>
      </div>

      <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}>
        <table className="w-full text-xs" cellPadding={4}>
          <thead>
            <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
              <th className="text-left p-2">Thread</th>
              <th className="text-center p-2" style={{ width: 60 }}>Replies</th>
              <th className="text-center p-2" style={{ width: 60 }}>Views</th>
              <th className="text-center p-2" style={{ width: 60 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((thread, idx) => (
              <tr key={thread.id} style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}>
                <td className="p-2">
                  <Link href={`/forum/${thread.boardId}/${thread.id}`} className="retro-link">
                    {thread.title}
                  </Link>
                </td>
                <td className="text-center">{thread.replyCount}</td>
                <td className="text-center">{thread.viewCount}</td>
                <td className="text-center">
                  <button onClick={() => handleRemove(thread.id)} title="Remove">🗑️</button>
                </td>
              </tr>
            ))}
            {bookmarks.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4" style={{ color: "gray" }}>
                  No bookmarks yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <Link href="/forum">
          <RetroButton>← Back to Forum</RetroButton>
        </Link>
      </div>
    </div>
  );
}
