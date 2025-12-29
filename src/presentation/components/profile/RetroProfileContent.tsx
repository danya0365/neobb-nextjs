"use client";

import { Badge, Role, Thread, User } from "@/src/domain/entities";
import { BadgeMockRepository, RoleMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const userRepo = new UserMockRepository();
const threadRepo = new ThreadMockRepository();
const roleRepo = new RoleMockRepository();
const badgeRepo = new BadgeMockRepository();

interface RetroProfileContentProps {
  userId: string;
}

export function RetroProfileContent({ userId }: RetroProfileContentProps) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const userData = await userRepo.findById(userId);
      if (userData) {
        setUser(userData);
        
        const [roleData, allBadges, userThreads] = await Promise.all([
          roleRepo.findById(userData.roleId),
          badgeRepo.findAll(),
          threadRepo.findByAuthor(userId),
        ]);

        setRole(roleData);
        setBadges(allBadges.filter(b => userData.badges.includes(b.id)));
        setThreads(userThreads.slice(0, 5));
      }
      setLoading(false);
    }
    loadData();
  }, [userId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center retro-text">
        <p>User not found. <Link href="/forum" className="retro-link">Go back</Link></p>
      </div>
    );
  }

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
        <h1 className="text-lg font-bold">👤 User Profile: {user.displayName}</h1>
      </div>

      <div className="flex gap-2">
        {/* Left - Profile Card */}
        <div
          className="w-48 flex-shrink-0"
          style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}
        >
          <div
            style={{
              backgroundColor: "var(--win98-titlebar)",
              color: "white",
              padding: "4px 8px",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            Profile Card
          </div>
          <div className="p-3 text-center">
            {/* Avatar */}
            <div
              style={{
                width: "80px",
                height: "80px",
                margin: "0 auto 8px",
                border: "2px inset var(--win98-border-dark)",
                overflow: "hidden",
              }}
            >
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.displayName}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Name */}
            <div className="font-bold">{user.displayName}</div>
            <div className="text-xs" style={{ color: "gray" }}>@{user.username}</div>

            {/* Role */}
            {role && (
              <div
                className="mt-2 text-xs font-bold"
                style={{ color: role.color }}
              >
                {role.displayName}
              </div>
            )}

            {/* Status */}
            <div className="mt-2 text-xs">
              Status:{" "}
              <span style={{ color: user.status === "active" ? "green" : "red" }}>
                {user.status === "active" ? "● Online" : "○ Offline"}
              </span>
            </div>

            <hr style={{ margin: "8px 0", border: "1px inset var(--win98-border-dark)" }} />

            {/* Stats */}
            <table className="w-full text-xs">
              <tbody>
                <tr>
                  <td className="text-left">Posts:</td>
                  <td className="text-right font-bold">{user.postCount}</td>
                </tr>
                <tr>
                  <td className="text-left">Threads:</td>
                  <td className="text-right font-bold">{user.threadCount}</td>
                </tr>
                <tr>
                  <td className="text-left">Reputation:</td>
                  <td className="text-right font-bold" style={{ color: "green" }}>{user.reputation}</td>
                </tr>
              </tbody>
            </table>

            {/* Badges */}
            {badges.length > 0 && (
              <>
                <hr style={{ margin: "8px 0", border: "1px inset var(--win98-border-dark)" }} />
                <div className="text-xs font-bold mb-1">Badges:</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {badges.map(badge => (
                    <span key={badge.id} title={badge.description}>
                      {badge.icon}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right - Details */}
        <div className="flex-1 space-y-2">
          {/* Bio */}
          <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
            <div
              style={{
                backgroundColor: "var(--win98-titlebar)",
                color: "white",
                padding: "4px 8px",
                fontWeight: "bold",
                fontSize: "11px",
              }}
            >
              About Me
            </div>
            <div className="p-3 text-xs" style={{ backgroundColor: "var(--win98-input-bg)" }}>
              {user.bio || "No bio provided."}
            </div>
          </div>

          {/* Info */}
          <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
            <div
              style={{
                backgroundColor: "var(--win98-titlebar)",
                color: "white",
                padding: "4px 8px",
                fontWeight: "bold",
                fontSize: "11px",
              }}
            >
              Account Information
            </div>
            <div className="p-3" style={{ backgroundColor: "var(--win98-input-bg)" }}>
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td style={{ width: "120px" }}>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Registered:</td>
                    <td>{new Date(user.createdAt).toLocaleDateString("en-US")}</td>
                  </tr>
                  <tr>
                    <td>Last Login:</td>
                    <td>{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString("en-US") : "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Threads */}
          <div style={{ border: "2px outset var(--win98-border-light)", backgroundColor: "var(--win98-bg)" }}>
            <div
              style={{
                backgroundColor: "var(--win98-titlebar)",
                color: "white",
                padding: "4px 8px",
                fontWeight: "bold",
                fontSize: "11px",
              }}
            >
              Recent Threads
            </div>
            <div style={{ backgroundColor: "var(--win98-input-bg)" }}>
              {threads.length > 0 ? (
                <table className="w-full text-xs" cellPadding={4}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--win98-bg)" }}>
                      <th className="text-left">Thread</th>
                      <th style={{ width: 50 }}>Replies</th>
                      <th style={{ width: 50 }}>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {threads.map(thread => (
                      <tr key={thread.id}>
                        <td>
                          <Link href={`/forum/${thread.boardId}/${thread.id}`} className="retro-link">
                            {thread.title}
                          </Link>
                        </td>
                        <td className="text-center">{thread.replyCount}</td>
                        <td className="text-center">{thread.viewCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-xs" style={{ color: "gray" }}>
                  No threads yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-2 flex gap-2">
        <RetroButton>📧 Send Message</RetroButton>
        <Link href="/forum">
          <RetroButton>← Back to Forum</RetroButton>
        </Link>
      </div>
    </div>
  );
}
