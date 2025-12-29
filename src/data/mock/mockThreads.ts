import { Post, Thread, ThreadPrefix } from "@/src/domain/entities";

/**
 * Mock Thread Prefixes
 */
export const mockThreadPrefixes: ThreadPrefix[] = [
  { id: "prefix-qa", name: "Q&A", color: "#4CAF50" },
  { id: "prefix-guide", name: "Guide", color: "#2196F3" },
  { id: "prefix-discussion", name: "Discussion", color: "#9C27B0" },
  { id: "prefix-wip", name: "WIP", color: "#FF9800" },
  { id: "prefix-solved", name: "Solved", color: "#607D8B" },
  { id: "prefix-help", name: "Help", color: "#F44336" },
];

/**
 * Mock Threads
 */
export const mockThreads: Thread[] = [
  {
    id: "thread-1",
    boardId: "board-5",
    authorId: "user-1",
    title: "🎉 ยินดีต้อนรับสู่ NeoBB - Modern Community Platform",
    content: `# ยินดีต้อนรับสู่ NeoBB!

NeoBB คือระบบ Web Forum / Community Platform แบบสมัยใหม่ที่ออกแบบมาเพื่อเป็น **Open Source, Modular, และ Customizable**

## Features หลัก
- Portal Homepage ที่ปรับแต่งได้
- Widget System แบบ Drag & Drop
- Theme System รองรับ Dark/Light Mode
- และอีกมากมาย!

ลองใช้งานและแชร์ feedback กันได้เลยครับ 🚀`,
    prefix: mockThreadPrefixes[1], // Guide
    viewCount: 1234,
    replyCount: 45,
    lastReplyAt: "2024-12-29T05:00:00Z",
    lastReplyBy: "user-3",
    isPinned: true,
    isLocked: false,
    isArchived: false,
    tags: ["neobb", "welcome", "guide"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-12-29T05:00:00Z",
  },
  {
    id: "thread-2",
    boardId: "board-5",
    authorId: "user-3",
    title: "ถามเรื่อง Next.js 15 กับ React 19",
    content: `สวัสดีครับ

กำลังจะ upgrade โปรเจคจาก Next.js 14 เป็น 15 อยากถามว่า:

1. มี breaking changes อะไรที่ต้องระวังบ้าง?
2. React 19 features ใหม่ๆ ที่น่าสนใจมีอะไรบ้าง?
3. ใครเคย migrate แล้วมีปัญหาอะไรบ้าง?

ขอบคุณครับ 🙏`,
    prefix: mockThreadPrefixes[0], // Q&A
    viewCount: 567,
    replyCount: 23,
    lastReplyAt: "2024-12-29T04:30:00Z",
    lastReplyBy: "user-4",
    isPinned: false,
    isLocked: false,
    isArchived: false,
    tags: ["nextjs", "react", "upgrade"],
    poll: {
      id: "poll-1",
      question: "คุณ upgrade เป็น Next.js 15 แล้วหรือยัง?",
      options: [
        { id: "opt-1", text: "ใช้ Next.js 15 แล้ว", votes: 45 },
        { id: "opt-2", text: "ยังใช้ Next.js 14 อยู่", votes: 32 },
        { id: "opt-3", text: "รอดู stable ก่อน", votes: 23 },
      ],
      allowMultiple: false,
      isAnonymous: false,
    },
    createdAt: "2024-12-28T10:00:00Z",
    updatedAt: "2024-12-29T04:30:00Z",
  },
  {
    id: "thread-3",
    boardId: "board-5",
    authorId: "user-4",
    title: "[Guide] สร้าง Design System ด้วย Tailwind CSS v4",
    content: `# สร้าง Design System ด้วย Tailwind CSS v4

บทความนี้จะแนะนำวิธีการสร้าง Design System ที่ดีด้วย Tailwind CSS v4

## สิ่งที่จะได้เรียนรู้
- การตั้งค่า Theme ใน Tailwind v4
- การสร้าง Custom Variants
- การใช้ CSS Layers
- Best practices

## เริ่มต้น

\`\`\`css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #6366F1;
  --color-secondary: #8B5CF6;
}
\`\`\`

(ต่อในคอมเมนต์...)`,
    prefix: mockThreadPrefixes[1], // Guide
    viewCount: 890,
    replyCount: 34,
    lastReplyAt: "2024-12-28T20:00:00Z",
    lastReplyBy: "user-3",
    isPinned: true,
    isLocked: false,
    isArchived: false,
    tags: ["tailwindcss", "design-system", "css"],
    createdAt: "2024-12-25T12:00:00Z",
    updatedAt: "2024-12-28T20:00:00Z",
  },
  {
    id: "thread-4",
    boardId: "board-6",
    authorId: "user-3",
    title: "Flutter vs React Native ในปี 2025",
    content: `มาถกกันหน่อยครับ

ใครใช้ Flutter บ้าง? ใครใช้ React Native บ้าง?

ข้อดี/ข้อเสียของแต่ละตัวตามประสบการณ์จริงเป็นยังไงบ้าง?`,
    prefix: mockThreadPrefixes[2], // Discussion
    viewCount: 432,
    replyCount: 56,
    lastReplyAt: "2024-12-28T15:00:00Z",
    lastReplyBy: "user-2",
    isPinned: false,
    isLocked: false,
    isArchived: false,
    tags: ["flutter", "react-native", "mobile"],
    createdAt: "2024-12-20T08:00:00Z",
    updatedAt: "2024-12-28T15:00:00Z",
  },
  {
    id: "thread-5",
    boardId: "board-8",
    authorId: "user-5",
    title: "ช่วยดู Error นี้หน่อยครับ",
    content: `สวัสดีครับ นักศึกษาใหม่ครับ

รัน npm run dev แล้วเจอ error นี้ครับ:

\`\`\`
Error: Cannot find module 'next'
\`\`\`

ช่วยแนะนำหน่อยครับ ขอบคุณครับ`,
    prefix: mockThreadPrefixes[5], // Help
    viewCount: 45,
    replyCount: 3,
    lastReplyAt: "2024-12-27T11:00:00Z",
    lastReplyBy: "user-4",
    isPinned: false,
    isLocked: false,
    isArchived: false,
    tags: ["help", "npm", "nextjs"],
    createdAt: "2024-12-27T10:00:00Z",
    updatedAt: "2024-12-27T11:00:00Z",
  },
];

/**
 * Mock Posts
 */
export const mockPosts: Post[] = [
  // Posts for thread-1
  {
    id: "post-1",
    threadId: "thread-1",
    authorId: "user-3",
    content: "ยินดีต้อนรับเช่นกันครับ! รอ features ใหม่ๆ อยู่นะครับ 🎉",
    mentionedUserIds: [],
    reactions: [
      { type: "👍", count: 12, userIds: ["user-2", "user-4", "user-5"] },
      { type: "❤️", count: 5, userIds: ["user-1", "user-2"] },
    ],
    attachments: [],
    isEdited: false,
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },
  {
    id: "post-2",
    threadId: "thread-1",
    authorId: "user-4",
    content: `ดีใจที่มี forum แบบนี้ครับ!

ขอถามหน่อยครับ Widget System ที่ว่ารองรับ custom widget ที่เราทำเองได้ไหมครับ?`,
    mentionedUserIds: ["user-1"],
    reactions: [
      { type: "👍", count: 8, userIds: ["user-1", "user-3"] },
    ],
    attachments: [],
    isEdited: false,
    createdAt: "2024-01-03T14:00:00Z",
    updatedAt: "2024-01-03T14:00:00Z",
  },
  {
    id: "post-3",
    threadId: "thread-1",
    authorId: "user-1",
    content: `@jane_dev ครับ รองรับ custom widget ครับ!

รอ documentation เพิ่มเติมนะครับ กำลังเขียนอยู่`,
    quotedPostId: "post-2",
    mentionedUserIds: ["user-4"],
    reactions: [
      { type: "🙏", count: 3, userIds: ["user-4"] },
    ],
    attachments: [],
    isEdited: true,
    editedAt: "2024-01-04T09:00:00Z",
    createdAt: "2024-01-04T08:00:00Z",
    updatedAt: "2024-01-04T09:00:00Z",
  },

  // Posts for thread-2
  {
    id: "post-4",
    threadId: "thread-2",
    authorId: "user-4",
    content: `ผม migrate แล้วครับ มีปัญหานิดหน่อย:

1. **useFormStatus** ต้องเรียกใน Client Component เท่านั้น
2. **Metadata API** มีการเปลี่ยนแปลงเล็กน้อย
3. **Image optimization** ดีขึ้นมาก

โดยรวมแล้วไม่ยากครับ`,
    mentionedUserIds: [],
    reactions: [
      { type: "👍", count: 15, userIds: ["user-3"] },
      { type: "🔥", count: 8, userIds: [] },
    ],
    attachments: [],
    isEdited: false,
    createdAt: "2024-12-28T11:00:00Z",
    updatedAt: "2024-12-28T11:00:00Z",
  },
  {
    id: "post-5",
    threadId: "thread-2",
    authorId: "user-2",
    content: `เห็นด้วยครับ React 19 ที่ชอบมาก:

- **use()** hook สำหรับ promise
- **Actions** สำหรับ form handling
- **useOptimistic** สำหรับ optimistic updates

ลองดูครับ!`,
    mentionedUserIds: [],
    reactions: [
      { type: "👍", count: 10, userIds: [] },
    ],
    attachments: [],
    isEdited: false,
    createdAt: "2024-12-28T14:00:00Z",
    updatedAt: "2024-12-28T14:00:00Z",
  },

  // Posts for thread-5 (Help thread)
  {
    id: "post-6",
    threadId: "thread-5",
    authorId: "user-4",
    content: `ลอง run คำสั่งนี้ก่อนนะครับ:

\`\`\`bash
npm install
\`\`\`

แล้วค่อย run dev ใหม่ครับ`,
    mentionedUserIds: [],
    reactions: [],
    attachments: [],
    isEdited: false,
    createdAt: "2024-12-27T10:30:00Z",
    updatedAt: "2024-12-27T10:30:00Z",
  },
  {
    id: "post-7",
    threadId: "thread-5",
    authorId: "user-5",
    content: "ขอบคุณครับ! ใช้ได้แล้วครับ 🙏",
    quotedPostId: "post-6",
    mentionedUserIds: ["user-4"],
    reactions: [
      { type: "🎉", count: 2, userIds: ["user-4"] },
    ],
    attachments: [],
    isEdited: false,
    createdAt: "2024-12-27T11:00:00Z",
    updatedAt: "2024-12-27T11:00:00Z",
  },
];
