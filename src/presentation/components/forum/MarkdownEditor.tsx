"use client";

import { useState } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function MarkdownEditor({ value, onChange, placeholder, rows = 6 }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const insertFormat = (before: string, after: string = before) => {
    const textarea = document.querySelector("textarea.markdown-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newValue =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newValue);

    // Set cursor position after format
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: "B", title: "หนา", before: "**", after: "**" },
    { icon: "I", title: "เอียง", before: "_", after: "_" },
    { icon: "~~", title: "ขีดฆ่า", before: "~~", after: "~~" },
    { icon: "H", title: "หัวข้อ", before: "## ", after: "" },
    { icon: "•", title: "รายการ", before: "- ", after: "" },
    { icon: "1.", title: "รายการเรียงลำดับ", before: "1. ", after: "" },
    { icon: "🔗", title: "ลิงก์", before: "[", after: "](url)" },
    { icon: "📷", title: "รูปภาพ", before: "![alt](", after: ")" },
    { icon: "`", title: "โค้ด", before: "`", after: "`" },
    { icon: "```", title: "บล็อกโค้ด", before: "```\n", after: "\n```" },
    { icon: ">", title: "อ้างอิง", before: "> ", after: "" },
  ];

  // Simple markdown to HTML converter
  const renderMarkdown = (text: string) => {
    let html = text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/_(.*?)_/g, "<em>$1</em>")
      // Strikethrough
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg my-2 overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 hover:underline" target="_blank">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-2" />')
      // Blockquotes
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 my-2 text-gray-600 dark:text-gray-300">$1</blockquote>')
      // Unordered lists
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      // Line breaks
      .replace(/\n/g, "<br />");

    return html;
  };

  return (
    <div className="markdown-editor-container border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        {toolbarButtons.map((btn, index) => (
          <button
            key={index}
            onClick={() => insertFormat(btn.before, btn.after)}
            className="px-2 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title={btn.title}
          >
            {btn.icon}
          </button>
        ))}
        <div className="flex-1" />
        <div className="flex border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab("write")}
            className={`px-3 py-1 text-sm ${
              activeTab === "write"
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            เขียน
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-sm ${
              activeTab === "preview"
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            ตัวอย่าง
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {activeTab === "write" ? (
        <textarea
          className="markdown-editor w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "เขียนด้วย Markdown..."}
          rows={rows}
        />
      ) : (
        <div
          className="markdown-preview w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-[150px] prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) || '<p class="text-gray-400">ยังไม่มีเนื้อหา</p>' }}
        />
      )}
    </div>
  );
}
