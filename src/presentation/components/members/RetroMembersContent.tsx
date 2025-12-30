"use client";

import { Role, User } from "@/src/domain/entities";
import { RoleMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import Link from "next/link";
import { useEffect, useState } from "react";

const userRepo = new UserMockRepository();
const roleRepo = new RoleMockRepository();

export function RetroMembersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Map<string, Role>>(new Map());
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [allUsers, allRoles] = await Promise.all([
        userRepo.findAll(),
        roleRepo.findAll(),
      ]);
      setUsers(allUsers);
      const roleMap = new Map<string, Role>();
      allRoles.forEach(r => roleMap.set(r.id, r));
      setRoles(roleMap);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredUsers = users.filter(u => 
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 className="font-bold">👥 Member Directory</h1>
        <p className="text-xs">{users.length} registered members</p>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs">Search:</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-1 text-xs"
          style={{ border: "2px inset var(--win98-border-dark)" }}
        />
      </div>

      <div style={{ border: "2px inset var(--win98-border-dark)", backgroundColor: "var(--win98-input-bg)" }}>
        <table className="w-full text-xs" cellPadding={4}>
          <thead>
            <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Display Name</th>
              <th className="text-center p-2">Role</th>
              <th className="text-center p-2">Posts</th>
              <th className="text-center p-2">Rep</th>
              <th className="text-center p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => {
              const role = roles.get(user.roleId);
              return (
                <tr key={user.id} style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}>
                  <td className="p-2">
                    <Link href={`/profile/${user.id}`} className="retro-link">
                      {user.username}
                    </Link>
                  </td>
                  <td className="p-2">{user.displayName}</td>
                  <td className="text-center" style={{ color: role?.color }}>
                    {role?.displayName || "-"}
                  </td>
                  <td className="text-center">{user.postCount}</td>
                  <td className="text-center">{user.reputation}</td>
                  <td className="text-center">
                    <span style={{ color: user.status === "active" ? "green" : "gray" }}>
                      {user.status === "active" ? "● Online" : "○ Offline"}
                    </span>
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
