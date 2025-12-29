"use client";

import { Board, Post, Thread, User } from "@/src/domain/entities";
import { BoardMockRepository, PostMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const boardRepo = new BoardMockRepository();
const threadRepo = new ThreadMockRepository();
const postRepo = new PostMockRepository();
const userRepo = new UserMockRepository();

interface RetroThreadContentProps {
  boardId: string;
  threadId: string;
}

export function RetroThreadContent({ boardId, threadId }: RetroThreadContentProps) {
  const [board, setBoard] = useState<Board | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [boardData, threadData, postData, allUsers] = await Promise.all([
        boardRepo.findById(boardId),
        threadRepo.findById(threadId),
        postRepo.findByThread(threadId),
        userRepo.findAll(),
      ]);

      setBoard(boardData);
      setThread(threadData);
      setPosts(postData);

      const userMap = new Map<string, User>();
      allUsers.forEach(u => userMap.set(u.id, u));
      setUsers(userMap);

      if (threadData) {
        threadRepo.incrementViewCount(threadId);
      }

      setLoading(false);
    }
    loadData();
  }, [boardId, threadId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Loading thread...</p>
      </div>
    );
  }

  if (!thread || !board) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Thread not found. <Link href="/forum" className="retro-link">Go back</Link></p>
      </div>
    );
  }

  const author = users.get(thread.authorId);

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
        <h1 className="text-sm font-bold">
          {thread.isPinned && "📌 "}
          {thread.prefix && `[${thread.prefix.name}] `}
          {thread.title}
          {thread.isLocked && " 🔒"}
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="text-xs mb-2" style={{ color: "gray" }}>
        <Link href="/forum" className="retro-link">Forum</Link>
        {' > '}
        <Link href={`/forum/${boardId}`} className="retro-link">{board.name}</Link>
        {' > '}{thread.title}
      </div>

      {/* Thread Stats */}
      <div className="text-xs mb-2" style={{ backgroundColor: "var(--win98-bg)", padding: "4px", border: "1px solid var(--win98-border-dark)" }}>
        Views: {thread.viewCount} | Replies: {thread.replyCount} | 
        Posted: {new Date(thread.createdAt).toLocaleDateString("th-TH")}
      </div>

      {/* Original Post */}
      <RetroPostBox 
        author={author}
        content={thread.content}
        createdAt={thread.createdAt}
        isOP
      />

      {/* Poll */}
      {thread.poll && (
        <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)", marginBottom: "8px", padding: "8px" }}>
          <div className="font-bold text-xs mb-2">📊 Poll: {thread.poll.question}</div>
          <table className="w-full text-xs" cellPadding={2}>
            <tbody>
              {thread.poll.options.map((opt) => {
                const totalVotes = thread.poll!.options.reduce((sum, o) => sum + o.votes, 0);
                const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                return (
                  <tr key={opt.id}>
                    <td style={{ width: "30%" }}>{opt.text}</td>
                    <td>
                      <div style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: "#000080", 
                        height: "12px",
                        minWidth: "1px"
                      }} />
                    </td>
                    <td style={{ width: "15%", textAlign: "right" }}>{opt.votes} ({percentage.toFixed(0)}%)</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Replies */}
      {posts.length > 0 && (
        <div className="mb-2">
          <div className="font-bold text-xs mb-2" style={{ borderBottom: "1px solid var(--win98-border-dark)", paddingBottom: "4px" }}>
            Replies ({posts.length})
          </div>
          {posts.map((post) => (
            <RetroPostBox
              key={post.id}
              author={users.get(post.authorId)}
              content={post.content}
              createdAt={post.createdAt}
              reactions={post.reactions}
              isEdited={post.isEdited}
            />
          ))}
        </div>
      )}

      {/* Reply Form */}
      {!thread.isLocked && (
        <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)", padding: "8px" }}>
          <div className="font-bold text-xs mb-2">Post Reply:</div>
          <textarea 
            className="w-full p-2 text-xs"
            rows={4}
            style={{
              border: "2px inset var(--win98-border-dark)",
              backgroundColor: "var(--win98-input-bg)",
              resize: "vertical",
            }}
            placeholder="Type your reply here..."
          />
          <div className="mt-2 flex gap-2">
            <RetroButton variant="primary">Post Reply</RetroButton>
            <RetroButton>Preview</RetroButton>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-2 flex gap-2">
        <Link href={`/forum/${boardId}`}>
          <RetroButton>← Back to {board.name}</RetroButton>
        </Link>
        <Link href="/forum">
          <RetroButton>🏠 Forum Index</RetroButton>
        </Link>
      </div>
    </div>
  );
}

interface RetroPostBoxProps {
  author?: User;
  content: string;
  createdAt: string;
  isOP?: boolean;
  isEdited?: boolean;
  reactions?: { type: string; count: number }[];
}

function RetroPostBox({ author, content, createdAt, isOP, isEdited, reactions }: RetroPostBoxProps) {
  return (
    <div 
      style={{ 
        border: "2px outset var(--win98-border-light)", 
        backgroundColor: isOP ? "#fffff0" : "var(--win98-input-bg)", 
        marginBottom: "8px" 
      }}
    >
      {/* Author Header */}
      <div 
        style={{ 
          backgroundColor: isOP ? "#000080" : "var(--win98-titlebar)", 
          color: "white", 
          padding: "4px 8px",
          fontSize: "11px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          <strong>{author?.displayName || "Unknown"}</strong>
          {isOP && " (OP)"}
        </span>
        <span>
          {new Date(createdAt).toLocaleString("th-TH")}
          {isEdited && " (edited)"}
        </span>
      </div>

      {/* Content */}
      <div style={{ display: "flex" }}>
        {/* Author Sidebar */}
        <div 
          style={{ 
            width: "100px", 
            padding: "8px", 
            backgroundColor: "var(--win98-bg)",
            borderRight: "1px solid var(--win98-border-dark)",
            textAlign: "center",
            fontSize: "10px",
          }}
        >
          <div style={{ 
            width: "48px", 
            height: "48px", 
            margin: "0 auto 4px",
            border: "1px solid var(--win98-border-dark)",
            overflow: "hidden",
          }}>
            <img 
              src={author?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=unknown"}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ fontWeight: "bold" }}>{author?.username || "unknown"}</div>
          <div style={{ color: "gray" }}>Posts: {author?.postCount || 0}</div>
          <div style={{ color: "gray" }}>Rep: {author?.reputation || 0}</div>
        </div>

        {/* Post Content */}
        <div style={{ flex: 1, padding: "8px", fontSize: "12px" }}>
          <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
          
          {/* Reactions */}
          {reactions && reactions.length > 0 && (
            <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed var(--win98-border-dark)" }}>
              {reactions.map((r, i) => (
                <span key={i} style={{ marginRight: "8px" }}>
                  {r.type} x{r.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
