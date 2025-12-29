"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";

interface Message {
  id: string;
  fromUser: { id: string; displayName: string; avatar?: string };
  subject: string;
  preview: string;
  isRead: boolean;
  createdAt: string;
}

// Mock messages data
const mockMessages: Message[] = [
  {
    id: "msg-1",
    fromUser: { id: "user-2", displayName: "ModeratorJane" },
    subject: "ยินดีต้อนรับสู่ NeoBB!",
    preview: "สวัสดีครับ ยินดีต้อนรับสู่ชุมชน NeoBB หากมีคำถามใดๆ สามารถสอบถามได้ตลอดเวลาครับ...",
    isRead: false,
    createdAt: "2024-12-28T10:00:00Z",
  },
  {
    id: "msg-2",
    fromUser: { id: "user-3", displayName: "JohnDoe123" },
    subject: "Re: คำถามเกี่ยวกับ React Hooks",
    preview: "ขอบคุณสำหรับคำตอบครับ ผมลองทำตามแล้วใช้งานได้แล้ว...",
    isRead: true,
    createdAt: "2024-12-27T15:30:00Z",
  },
  {
    id: "msg-3",
    fromUser: { id: "user-4", displayName: "DevThailand" },
    subject: "โปรเจค Collaboration",
    preview: "สนใจร่วมทำโปรเจค Open Source ด้วยกันไหมครับ มีไอเดียอยากปรึกษา...",
    isRead: true,
    createdAt: "2024-12-26T09:15:00Z",
  },
];

export function MainMessagesContent() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composing, setComposing] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    setComposing(false);
    if (!msg.isRead) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
    }
  };

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📧 ข้อความส่วนตัว</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount > 0 ? `${unreadCount} ข้อความใหม่` : "ไม่มีข้อความใหม่"}
            </p>
          </div>
          <MainButton variant="primary" icon="✏️" onClick={() => { setComposing(true); setSelectedMessage(null); }}>
            เขียนข้อความ
          </MainButton>
        </div>

        {/* Content */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Message List */}
          <div className="w-1/3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium text-gray-900 dark:text-white">
              กล่องข้อความ
            </div>
            <div className="flex-1 overflow-auto">
              {messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`w-full p-4 text-left border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    selectedMessage?.id === msg.id ? "bg-indigo-50 dark:bg-indigo-900/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={msg.fromUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.fromUser.id}`}
                      alt={msg.fromUser.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${msg.isRead ? "text-gray-600 dark:text-gray-400" : "font-semibold text-gray-900 dark:text-white"}`}>
                          {msg.fromUser.displayName}
                        </span>
                        {!msg.isRead && <span className="w-2 h-2 bg-indigo-600 rounded-full" />}
                      </div>
                      <div className={`text-sm truncate ${msg.isRead ? "text-gray-500" : "font-medium text-gray-900 dark:text-white"}`}>
                        {msg.subject}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{msg.preview}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail / Compose */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            {composing ? (
              <ComposeMessage onCancel={() => setComposing(false)} />
            ) : selectedMessage ? (
              <MessageDetail message={selectedMessage} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">📨</div>
                  <p>เลือกข้อความเพื่ออ่าน</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </animated.div>
  );
}

function MessageDetail({ message }: { message: Message }) {
  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white">{message.subject}</h2>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span>จาก: {message.fromUser.displayName}</span>
          <span>•</span>
          <span>{new Date(message.createdAt).toLocaleString("th-TH")}</span>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
          {message.preview}
          {"\n\n"}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
        <MainButton icon="↩️" variant="primary">ตอบกลับ</MainButton>
        <MainButton icon="🗑️">ลบ</MainButton>
      </div>
    </>
  );
}

function ComposeMessage({ onCancel }: { onCancel: () => void }) {
  return (
    <>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white">✏️ เขียนข้อความใหม่</h2>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ถึง:</label>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">หัวข้อ:</label>
          <input
            type="text"
            placeholder="หัวข้อข้อความ..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ข้อความ:</label>
          <textarea
            placeholder="พิมพ์ข้อความ..."
            className="w-full h-48 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
        <MainButton icon="📤" variant="primary">ส่งข้อความ</MainButton>
        <MainButton onClick={onCancel}>ยกเลิก</MainButton>
      </div>
    </>
  );
}
