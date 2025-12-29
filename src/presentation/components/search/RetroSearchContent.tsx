"use client";

import { Thread, User } from "@/src/domain/entities";
import { ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const threadRepo = new ThreadMockRepository();
const userRepo = new UserMockRepository();

export function RetroSearchContent() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"threads" | "users">("threads");
  const [threadResults, setThreadResults] = useState<Thread[]>([]);
  const [userResults, setUserResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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

    setThreadResults(threads);
    setUserResults(users);
    setLoading(false);
  };

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      {/* Header */}
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">🔍 Search</h1>
        <p className="text-xs">Find threads and users</p>
      </div>

      {/* Search Form */}
      <div className="retro-groupbox mb-2">
        <span className="retro-groupbox-title">Search Query</span>
        <div className="flex gap-2 mt-2 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 p-1 text-xs"
            style={{ border: "2px inset var(--win98-border-dark)" }}
            placeholder="Enter search terms..."
          />
          <RetroButton variant="primary" onClick={handleSearch}>
            {loading ? "Searching..." : "Search"}
          </RetroButton>
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="searchType"
              checked={searchType === "threads"}
              onChange={() => setSearchType("threads")}
            />
            Threads ({threadResults.length})
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="searchType"
              checked={searchType === "users"}
              onChange={() => setSearchType("users")}
            />
            Users ({userResults.length})
          </label>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}>
          {searchType === "threads" ? (
            <table className="w-full text-xs" cellPadding={4}>
              <thead>
                <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                  <th className="text-left p-2">Thread</th>
                  <th className="text-center p-2" style={{ width: 60 }}>Replies</th>
                  <th className="text-center p-2" style={{ width: 60 }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {threadResults.length > 0 ? (
                  threadResults.map((thread, idx) => (
                    <tr key={thread.id} style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}>
                      <td className="p-2">
                        <Link href={`/forum/${thread.boardId}/${thread.id}`} className="retro-link">
                          {thread.isPinned && "📌 "}
                          {thread.title}
                        </Link>
                      </td>
                      <td className="text-center">{thread.replyCount}</td>
                      <td className="text-center">{thread.viewCount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4" style={{ color: "gray" }}>
                      No threads found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs" cellPadding={4}>
              <thead>
                <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                  <th className="text-left p-2">User</th>
                  <th className="text-center p-2" style={{ width: 80 }}>Posts</th>
                  <th className="text-center p-2" style={{ width: 80 }}>Rep</th>
                </tr>
              </thead>
              <tbody>
                {userResults.length > 0 ? (
                  userResults.map((user, idx) => (
                    <tr key={user.id} style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}>
                      <td className="p-2">
                        <Link href={`/profile/${user.id}`} className="retro-link">
                          {user.displayName} (@{user.username})
                        </Link>
                      </td>
                      <td className="text-center">{user.postCount}</td>
                      <td className="text-center">{user.reputation}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4" style={{ color: "gray" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
