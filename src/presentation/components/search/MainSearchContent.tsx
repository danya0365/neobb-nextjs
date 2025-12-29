"use client";

import { Post, Thread, User } from "@/src/domain/entities";
import { PostMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

const threadRepo = new ThreadMockRepository();
const postRepo = new PostMockRepository();
const userRepo = new UserMockRepository();

type SearchType = "threads" | "posts" | "users";

interface SearchResults {
  threads: Thread[];
  posts: Post[];
  users: User[];
}

export function MainSearchContent() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("threads");
  const [results, setResults] = useState<SearchResults>({ threads: [], posts: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(true);

    const [threads, users] = await Promise.all([
      threadRepo.search(query),
      userRepo.findAll().then(all => all.filter(u => 
        u.displayName.toLowerCase().includes(query.toLowerCase()) ||
        u.username.toLowerCase().includes(query.toLowerCase())
      )),
    ]);

    // Get posts from threads
    const posts = await Promise.all(
      threads.map(t => postRepo.findByThread(t.id))
    ).then(arr => arr.flat());

    setResults({ threads, posts: posts.slice(0, 10), users });
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const resultCounts = {
    threads: results.threads.length,
    posts: results.posts.length,
    users: results.users.length,
  };

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🔍 ค้นหา</h1>
          <p className="text-gray-600 dark:text-gray-400">ค้นหากระทู้ โพสต์ และสมาชิกใน NeoBB</p>
        </div>

        {/* Search Box */}
        <div className="flex gap-3 mb-8">
          <div className="flex-1">
            <MainInput
              placeholder="พิมพ์คำค้นหา..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <MainButton variant="primary" icon="🔍" onClick={handleSearch} isLoading={loading}>
            ค้นหา
          </MainButton>
        </div>

        {searched && (
          <>
            {/* Result Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <ResultTab type="threads" label="กระทู้" count={resultCounts.threads} active={searchType} onClick={setSearchType} />
              <ResultTab type="posts" label="โพสต์" count={resultCounts.posts} active={searchType} onClick={setSearchType} />
              <ResultTab type="users" label="สมาชิก" count={resultCounts.users} active={searchType} onClick={setSearchType} />
            </div>

            {/* Results */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin text-4xl mb-2">⏳</div>
                  <p className="text-gray-500">กำลังค้นหา...</p>
                </div>
              ) : (
                <>
                  {searchType === "threads" && (
                    results.threads.length > 0 ? (
                      results.threads.map(thread => (
                        <ThreadResult key={thread.id} thread={thread} />
                      ))
                    ) : (
                      <EmptyResult />
                    )
                  )}
                  {searchType === "posts" && (
                    results.posts.length > 0 ? (
                      results.posts.map(post => (
                        <PostResult key={post.id} post={post} />
                      ))
                    ) : (
                      <EmptyResult />
                    )
                  )}
                  {searchType === "users" && (
                    results.users.length > 0 ? (
                      results.users.map(user => (
                        <UserResult key={user.id} user={user} />
                      ))
                    ) : (
                      <EmptyResult />
                    )
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </animated.div>
  );
}

function ResultTab({ type, label, count, active, onClick }: { type: SearchType; label: string; count: number; active: SearchType; onClick: (t: SearchType) => void }) {
  return (
    <button
      onClick={() => onClick(type)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        active === type
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
      }`}
    >
      {label} ({count})
    </button>
  );
}

function ThreadResult({ thread }: { thread: Thread }) {
  return (
    <Link
      href={`/forum/${thread.boardId}/${thread.id}`}
      className="block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
        {thread.isPinned && "📌 "}
        {thread.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">{thread.content}</p>
      <div className="flex gap-4 mt-2 text-xs text-gray-400">
        <span>💬 {thread.replyCount}</span>
        <span>👁️ {thread.viewCount}</span>
      </div>
    </Link>
  );
}

function PostResult({ post }: { post: Post }) {
  return (
    <Link
      href={`/forum/board-1/${post.threadId}`}
      className="block p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.content}</p>
      <div className="flex gap-4 mt-2 text-xs text-gray-400">
        <span>{new Date(post.createdAt).toLocaleDateString("th-TH")}</span>
      </div>
    </Link>
  );
}

function UserResult({ user }: { user: User }) {
  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
    >
      <img
        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
        alt={user.displayName}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">{user.displayName}</h3>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>
      <div className="ml-auto text-sm text-gray-500">
        {user.postCount} posts
      </div>
    </Link>
  );
}

function EmptyResult() {
  return (
    <div className="text-center py-12 text-gray-500">
      <div className="text-4xl mb-2">🔍</div>
      <p>ไม่พบผลลัพธ์</p>
    </div>
  );
}
