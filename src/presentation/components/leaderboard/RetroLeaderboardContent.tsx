"use client";

import { User } from "@/src/domain/entities/User";
import { UserMockRepository } from "@/src/infrastructure/repositories/mock/UserMockRepository";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RetroLeaderboardContent() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const repo = new UserMockRepository();
      const allUsers = await repo.findAll();
      const sorted = [...allUsers].sort((a, b) => b.reputation - a.reputation);
      setUsers(sorted.slice(0, 10));
    };
    loadUsers();
  }, []);

  return (
    <div className="retro-window">
      <div className="retro-window-title">
        <span>🏆 Top 10 Members - NeoBB</span>
      </div>
      <div className="retro-window-content">
        <table className="retro-table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Rank</th>
              <th>Username</th>
              <th>Display Name</th>
              <th style={{ width: "100px" }}>Posts</th>
              <th style={{ width: "100px" }}>Reputation</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index >= 3 && `#${index + 1}`}
                </td>
                <td>
                  <Link href={`/profile/${user.id}`} className="retro-link">
                    @{user.username}
                  </Link>
                </td>
                <td>{user.displayName || "-"}</td>
                <td style={{ textAlign: "center" }}>{user.postCount}</td>
                <td style={{ textAlign: "center", color: "#008000" }}>
                  +{user.reputation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
