"use client";

import { User } from "@/src/domain/entities";
import { useState } from "react";

interface ComposeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient?: User;
  replyTo?: { subject: string; content: string };
}

export function ComposeMessageModal({ isOpen, onClose, recipient, replyTo }: ComposeMessageModalProps) {
  const [to, setTo] = useState(recipient?.displayName || "");
  const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : "");
  const [content, setContent] = useState(replyTo ? `\n\n---\n> ${replyTo.content}` : "");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !content.trim()) return;
    
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Message sent:", { to, subject, content });
    
    setIsSending(false);
    setTo("");
    setSubject("");
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            ✉️ เขียนข้อความใหม่
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ถึง
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="ชื่อผู้ใช้..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              หัวข้อ
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="หัวข้อข้อความ..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ข้อความ
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              placeholder="เขียนข้อความ..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSend}
            disabled={!to.trim() || !subject.trim() || !content.trim() || isSending}
            className={`px-4 py-2 rounded-lg font-medium ${
              to.trim() && subject.trim() && content.trim() && !isSending
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSending ? "กำลังส่ง..." : "📤 ส่ง"}
          </button>
        </div>
      </div>
    </div>
  );
}
