"use client";

import { Board } from "@/src/domain/entities";
import { BoardMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";
import { RetroInput } from "../ui/retro/RetroInput";

const boardRepo = new BoardMockRepository();

interface RetroCreateThreadContentProps {
  boardId: string;
}

export function RetroCreateThreadContent({ boardId }: RetroCreateThreadContentProps) {
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    async function loadBoard() {
      const b = await boardRepo.findById(boardId);
      setBoard(b);
      setLoading(false);
    }
    loadBoard();
  }, [boardId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    router.push(`/forum/${boardId}`);
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
        <h1 className="font-bold">✏️ New Thread</h1>
        <p className="text-xs">Posting to: {board?.name}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)", padding: "12px" }}>
          <div className="mb-3">
            <RetroInput
              label="Subject:"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-bold mb-1">Message:</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={10}
              className="w-full p-2 text-xs"
              style={{ border: "2px inset var(--win98-border-dark)" }}
            />
          </div>

          <div className="flex gap-2">
            <RetroButton type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Posting..." : "📤 Post Thread"}
            </RetroButton>
            <Link href={`/forum/${boardId}`}>
              <RetroButton type="button">Cancel</RetroButton>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
