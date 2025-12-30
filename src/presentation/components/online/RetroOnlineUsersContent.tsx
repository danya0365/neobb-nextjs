"use client";

import { Role, User } from "@/src/domain/entities";
import { RoleMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";

const userRepo = new UserMockRepository();
const roleRepo = new RoleMockRepository();

export function RetroOnlineUsersContent() {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Map<string, Role>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [users, allRoles] = await Promise.all([
        userRepo.getOnlineUsers(),
        roleRepo.findAll(),
      ]);
      setOnlineUsers(users);
      const roleMap = new Map<string, Role>();
      allRoles.forEach(r => roleMap.set(r.id, r));
      setRoles(roleMap);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="h-full flex items-center justify-center retro-text">Loading...</div>;
  }

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">🟢 Online Users</h1>
        <p className="text-xs">{onlineUsers.length} users online</p>
      </div>

      <div className="retro-groupbox mb-2">
        <span className="retro-groupbox-title">Statistics</span>
        <div className="flex gap-4 text-xs mt-2">
          <span>🟢 Online: {onlineUsers.length}</span>
          <span>👥 Guests: 42</span>
          <span>📊 Total today: {onlineUsers.length + 42}</span>
        </div>
      </div>

      <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}>
        <table className="w-full text-xs" cellPadding={4}>
          <thead>
            <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Role</th>
              <th className="text-center p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {onlineUsers.map((user, idx) => {
              const role = roles.get(user.roleId);
              return (
                <tr key={user.id} style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}>
                  <td className="p-2">
                    <Link href={`/profile/${user.id}`} className="retro-link">
                      {user.displayName}
                    </Link>
                  </td>
                  <td className="p-2" style={{ color: role?.color }}>
                    {role?.displayName || "Member"}
                  </td>
                  <td className="text-center" style={{ color: "green" }}>
                    ● Online
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
