"use client";

import Link from "next/link";
import { useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

interface Message {
  id: string;
  fromUser: { id: string; displayName: string };
  subject: string;
  preview: string;
  isRead: boolean;
  createdAt: string;
}

const mockMessages: Message[] = [
  { id: "msg-1", fromUser: { id: "user-2", displayName: "ModeratorJane" }, subject: "Welcome to NeoBB!", preview: "Hello and welcome to the community...", isRead: false, createdAt: "2024-12-28T10:00:00Z" },
  { id: "msg-2", fromUser: { id: "user-3", displayName: "JohnDoe123" }, subject: "Re: React Hooks Question", preview: "Thanks for your answer...", isRead: true, createdAt: "2024-12-27T15:30:00Z" },
  { id: "msg-3", fromUser: { id: "user-4", displayName: "DevThailand" }, subject: "Project Collaboration", preview: "Interested in working together on...", isRead: true, createdAt: "2024-12-26T09:15:00Z" },
];

export function RetroMessagesContent() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composing, setComposing] = useState(false);

  const unreadCount = messages.filter(m => !m.isRead).length;

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    setComposing(false);
    if (!msg.isRead) {
      setMessages(messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m));
    }
  };

  return (
    <div className="h-full p-2 retro-text overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">📧 Private Messages</h1>
        <p className="text-xs">{unreadCount} unread messages</p>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <RetroButton variant="primary" onClick={() => { setComposing(true); setSelectedMessage(null); }}>
          ✏️ Compose
        </RetroButton>
        <Link href="/portal">
          <RetroButton>← Back</RetroButton>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-2 overflow-hidden">
        {/* Message List */}
        <div className="w-1/3" style={{ border: "2px inset var(--win98-border-dark)" }}>
          <div
            className="p-1 text-xs font-bold"
            style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}
          >
            Inbox
          </div>
          <div style={{ backgroundColor: "var(--win98-input-bg)" }} className="overflow-auto h-full">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-2 text-xs border-b cursor-pointer ${
                  selectedMessage?.id === msg.id ? "bg-blue-900 text-white" : ""
                }`}
                style={{
                  backgroundColor: selectedMessage?.id === msg.id ? "#000080" : msg.isRead ? "transparent" : "#ffffcc",
                  color: selectedMessage?.id === msg.id ? "white" : "inherit",
                }}
              >
                <div className="font-bold">{msg.fromUser.displayName}</div>
                <div className={!msg.isRead ? "font-bold" : ""}>{msg.subject}</div>
                <div className="text-xs" style={{ color: selectedMessage?.id === msg.id ? "#ccc" : "gray" }}>
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail / Compose */}
        <div className="flex-1 flex flex-col" style={{ border: "2px inset var(--win98-border-dark)" }}>
          {composing ? (
            <>
              <div className="p-1 text-xs font-bold" style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                Compose New Message
              </div>
              <div className="p-2 text-xs flex-1" style={{ backgroundColor: "var(--win98-input-bg)" }}>
                <div className="mb-2">
                  <label>To:</label>
                  <input type="text" className="w-full mt-1" style={{ border: "2px inset var(--win98-border-dark)" }} />
                </div>
                <div className="mb-2">
                  <label>Subject:</label>
                  <input type="text" className="w-full mt-1" style={{ border: "2px inset var(--win98-border-dark)" }} />
                </div>
                <div className="mb-2 flex-1">
                  <label>Message:</label>
                  <textarea className="w-full mt-1 h-24" style={{ border: "2px inset var(--win98-border-dark)" }} />
                </div>
                <div className="flex gap-2">
                  <RetroButton variant="primary">📤 Send</RetroButton>
                  <RetroButton onClick={() => setComposing(false)}>Cancel</RetroButton>
                </div>
              </div>
            </>
          ) : selectedMessage ? (
            <>
              <div className="p-1 text-xs font-bold" style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                {selectedMessage.subject}
              </div>
              <div className="p-2 text-xs" style={{ backgroundColor: "var(--win98-bg)" }}>
                <strong>From:</strong> {selectedMessage.fromUser.displayName}<br />
                <strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
              <div className="flex-1 p-2 text-xs overflow-auto" style={{ backgroundColor: "var(--win98-input-bg)" }}>
                {selectedMessage.preview}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="p-2 flex gap-2" style={{ backgroundColor: "var(--win98-bg)" }}>
                <RetroButton>↩️ Reply</RetroButton>
                <RetroButton>🗑️ Delete</RetroButton>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--win98-input-bg)" }}>
              <p className="text-xs" style={{ color: "gray" }}>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
