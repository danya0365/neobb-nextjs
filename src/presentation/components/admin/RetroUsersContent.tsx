"use client";

import { Role, User } from "@/src/domain/entities";
import { RoleMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { useEffect, useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";

const userRepo = new UserMockRepository();
const roleRepo = new RoleMockRepository();

export function RetroUsersContent() {
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
    return (
      <div className="h-full flex items-center justify-center">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <div
        className="p-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">👥 User Management</h1>
        <p className="text-xs">Total: {users.length} users</p>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 items-center">
        <RetroButton variant="primary">➕ Add User</RetroButton>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <span className="text-xs">Search:</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs p-1"
            style={{
              border: "2px inset var(--win98-border-dark)",
              width: "150px",
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div style={{ border: "2px inset var(--win98-border-dark)" }}>
        <table
          className="w-full text-xs"
          cellPadding={4}
          style={{ backgroundColor: "var(--win98-input-bg)" }}
        >
          <thead>
            <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
              <th className="text-left p-2">Username</th>
              <th className="text-left p-2">Display Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-center p-2">Role</th>
              <th className="text-center p-2">Posts</th>
              <th className="text-center p-2">Status</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => {
              const role = roles.get(user.roleId);
              return (
                <tr
                  key={user.id}
                  style={{ backgroundColor: idx % 2 === 0 ? "transparent" : "var(--win98-bg)" }}
                >
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.displayName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="text-center" style={{ color: role?.color }}>
                    {role?.displayName || "-"}
                  </td>
                  <td className="text-center">{user.postCount}</td>
                  <td className="text-center">
                    <span style={{ color: user.status === "active" ? "green" : "red" }}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="px-1" title="Edit">✏️</button>
                    <button className="px-1" title="Delete">🗑️</button>
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
