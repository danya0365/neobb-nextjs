"use client";

import { Board, Post, Thread, User } from "@/src/domain/entities";
import { BoardMockRepository, PostMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";

const boardRepo = new BoardMockRepository();
const threadRepo = new ThreadMockRepository();
const postRepo = new PostMockRepository();
const userRepo = new UserMockRepository();

interface MainThreadContentProps {
  boardId: string;
  threadId: string;
}

export function MainThreadContent({ boardId, threadId }: MainThreadContentProps) {
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

      // Increment view count
      if (threadData) {
        threadRepo.incrementViewCount(threadId);
      }

      setLoading(false);
    }
    loadData();
  }, [boardId, threadId]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  if (!thread || !board) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            ไม่พบกระทู้
          </h2>
          <Link href="/forum" className="text-indigo-600 hover:underline">
            กลับไปหน้า Forum
          </Link>
        </div>
      </div>
    );
  }

  const author = users.get(thread.authorId);

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/forum" className="hover:text-indigo-600">Forum</Link>
          <span className="mx-2">/</span>
          <Link href={`/forum/${boardId}`} className="hover:text-indigo-600">{board.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white truncate">{thread.title}</span>
        </nav>

        {/* Thread Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-start gap-4">
            {thread.prefix && (
              <span 
                className="px-3 py-1 text-sm rounded-full font-medium text-white"
                style={{ backgroundColor: thread.prefix.color }}
              >
                {thread.prefix.name}
              </span>
            )}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {thread.isPinned && <span className="text-yellow-500 mr-2">📌</span>}
                {thread.isLocked && <span className="text-red-500 mr-2">🔒</span>}
                {thread.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>👁️ {thread.viewCount} views</span>
                <span>💬 {thread.replyCount} replies</span>
                <span>{new Date(thread.createdAt).toLocaleDateString("th-TH")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Original Post */}
        <PostCard
          author={author}
          content={thread.content}
          createdAt={thread.createdAt}
          isOP
        />

        {/* Poll */}
        {thread.poll && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 mb-4 border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              📊 {thread.poll.question}
            </h3>
            <div className="space-y-2">
              {thread.poll.options.map((opt) => {
                const totalVotes = thread.poll!.options.reduce((sum, o) => sum + o.votes, 0);
                const percentage = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
                return (
                  <div key={opt.id} className="relative">
                    <div 
                      className="absolute inset-0 bg-purple-200 dark:bg-purple-800 rounded-lg"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex justify-between items-center p-3">
                      <span className="text-gray-900 dark:text-white">{opt.text}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {opt.votes} votes ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Replies */}
        {posts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💬 ความคิดเห็น ({posts.length})
            </h3>
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  author={users.get(post.authorId)}
                  content={post.content}
                  createdAt={post.createdAt}
                  reactions={post.reactions}
                  isEdited={post.isEdited}
                />
              ))}
            </div>
          </div>
        )}

        {/* Reply Form */}
        {!thread.isLocked && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              ✍️ เขียนความคิดเห็น
            </h3>
            <textarea 
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              rows={4}
              placeholder="เขียนความคิดเห็นของคุณ..."
            />
            <div className="flex justify-end mt-4">
              <MainButton variant="primary" icon="💬">ส่งความคิดเห็น</MainButton>
            </div>
          </div>
        )}
      </div>
    </animated.div>
  );
}

interface PostCardProps {
  author?: User;
  content: string;
  createdAt: string;
  isOP?: boolean;
  isEdited?: boolean;
  reactions?: { type: string; count: number }[];
}

function PostCard({ author, content, createdAt, isOP, isEdited, reactions }: PostCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border ${isOP ? 'border-indigo-200 dark:border-indigo-800' : 'border-gray-200 dark:border-gray-700'} overflow-hidden mb-4`}>
      <div className="flex">
        {/* Author Sidebar */}
        <div className="w-32 bg-gray-50 dark:bg-gray-700/50 p-4 flex flex-col items-center border-r border-gray-200 dark:border-gray-700">
          <img 
            src={author?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=unknown"}
            alt={author?.displayName || "Unknown"}
            className="w-16 h-16 rounded-full mb-2"
          />
          <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
            {author?.displayName || "Unknown"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {author?.postCount || 0} posts
          </div>
          {isOP && (
            <span className="mt-2 px-2 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded">
              OP
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              {reactions && reactions.length > 0 && (
                <div className="flex gap-1">
                  {reactions.map((r, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {r.type} {r.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              {new Date(createdAt).toLocaleString("th-TH")}
              {isEdited && <span className="ml-2 text-yellow-600">(แก้ไขแล้ว)</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
