"use client";

import { Board } from "@/src/domain/entities";
import { BoardMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

const boardRepo = new BoardMockRepository();

interface MainCreateThreadContentProps {
  boardId: string;
}

export function MainCreateThreadContent({ boardId }: MainCreateThreadContentProps) {
  const router = useRouter();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    async function loadBoard() {
      const b = await boardRepo.findById(boardId);
      setBoard(b);
      setLoading(false);
    }
    loadBoard();
  }, [boardId]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    // In real app, would create thread here
    router.push(`/forum/${boardId}`);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/forum" className="hover:text-indigo-600">Forum</Link>
          {" → "}
          <Link href={`/forum/${boardId}`} className="hover:text-indigo-600">{board?.name}</Link>
          {" → "}
          <span className="text-gray-900 dark:text-white">กระทู้ใหม่</span>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500">
            <h1 className="text-xl font-bold text-white">✏️ สร้างกระทู้ใหม่</h1>
            <p className="text-indigo-100 text-sm">ใน {board?.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <MainInput
              label="หัวข้อกระทู้"
              placeholder="พิมพ์หัวข้อที่นี่..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                เนื้อหา
              </label>
              <textarea
                placeholder="พิมพ์เนื้อหากระทู้..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                rows={12}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <MainInput
              label="แท็ก (คั่นด้วยเครื่องหมายจุลภาค)"
              placeholder="react, nextjs, typescript"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <MainButton type="submit" variant="primary" icon="📤" isLoading={submitting}>
                โพสต์กระทู้
              </MainButton>
              <Link href={`/forum/${boardId}`}>
                <MainButton type="button">ยกเลิก</MainButton>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </animated.div>
  );
}
