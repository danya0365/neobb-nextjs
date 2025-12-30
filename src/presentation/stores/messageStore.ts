"use client";

import { create } from "zustand";

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  replyToId?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  lastMessageAt: string;
  unreadCount: number;
}

interface MessageState {
  messages: Message[];
  conversations: Conversation[];
  selectedConversationId: string | null;
  
  // Actions
  sendMessage: (receiverId: string, subject: string, content: string, replyToId?: string) => void;
  markAsRead: (messageId: string) => void;
  markConversationAsRead: (conversationId: string) => void;
  deleteMessage: (messageId: string) => void;
  selectConversation: (conversationId: string | null) => void;
  getConversationMessages: (conversationId: string) => Message[];
  getTotalUnread: () => number;
}

// Mock current user ID
const CURRENT_USER_ID = "user-1";

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [
    {
      id: "msg-1",
      senderId: "user-2",
      receiverId: CURRENT_USER_ID,
      subject: "สวัสดีครับ",
      content: "ยินดีที่ได้รู้จักครับ!",
      isRead: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    },
    {
      id: "msg-2",
      senderId: "user-3",
      receiverId: CURRENT_USER_ID,
      subject: "คำถามเรื่อง React",
      content: "สอบถามเกี่ยวกับ useEffect หน่อยครับ",
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  conversations: [
    {
      id: "conv-1",
      participantIds: [CURRENT_USER_ID, "user-2"],
      lastMessageAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      unreadCount: 1,
    },
    {
      id: "conv-2",
      participantIds: [CURRENT_USER_ID, "user-3"],
      lastMessageAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      unreadCount: 0,
    },
  ],
  selectedConversationId: null,

  sendMessage: (receiverId, subject, content, replyToId) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      receiverId,
      subject,
      content,
      isRead: false,
      createdAt: new Date().toISOString(),
      replyToId,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  markAsRead: (messageId) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, isRead: true } : m
      ),
    }));
  },

  markConversationAsRead: (conversationId) => {
    const conversation = get().conversations.find((c) => c.id === conversationId);
    if (!conversation) return;

    set((state) => ({
      messages: state.messages.map((m) =>
        conversation.participantIds.includes(m.senderId) &&
        m.receiverId === CURRENT_USER_ID
          ? { ...m, isRead: true }
          : m
      ),
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    }));
  },

  deleteMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== messageId),
    }));
  },

  selectConversation: (conversationId) => {
    set({ selectedConversationId: conversationId });
    if (conversationId) {
      get().markConversationAsRead(conversationId);
    }
  },

  getConversationMessages: (conversationId) => {
    const conversation = get().conversations.find((c) => c.id === conversationId);
    if (!conversation) return [];

    return get().messages.filter(
      (m) =>
        conversation.participantIds.includes(m.senderId) &&
        conversation.participantIds.includes(m.receiverId)
    );
  },

  getTotalUnread: () => {
    return get().conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  },
}));
