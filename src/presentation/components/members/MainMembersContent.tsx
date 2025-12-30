"use client";

import { Role, User } from "@/src/domain/entities";
import { RoleMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainInput } from "../ui/main/MainInput";

const userRepo = new UserMockRepository();
const roleRepo = new RoleMockRepository();

type SortBy = "posts" | "reputation" | "joined";

export function MainMembersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Map<string, Role>>(new Map());
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("posts");
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

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const filteredUsers = users
    .filter(u => 
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "posts") return b.postCount - a.postCount;
      if (sortBy === "reputation") return b.reputation - a.reputation;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">👥 สมาชิก</h1>
          <p className="text-gray-600 dark:text-gray-400">ทั้งหมด {users.length} คน</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <MainInput
              placeholder="🔍 ค้นหาสมาชิก..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <SortButton label="โพสต์" active={sortBy === "posts"} onClick={() => setSortBy("posts")} />
            <SortButton label="ชื่อเสียง" active={sortBy === "reputation"} onClick={() => setSortBy("reputation")} />
            <SortButton label="วันสมัคร" active={sortBy === "joined"} onClick={() => setSortBy("joined")} />
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => {
            const role = roles.get(user.roleId);
            return (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                    alt={user.displayName}
                    className="w-16 h-16 rounded-full border-2"
                    style={{ borderColor: role?.color || "#ccc" }}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {user.displayName}
                      {user.status === "active" && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                    </div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                    {role && (
                      <span
                        className="inline-block mt-1 px-2 py-0.5 rounded text-xs text-white"
                        style={{ backgroundColor: role.color }}
                      >
                        {role.displayName}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm">
                  <div className="text-center flex-1">
                    <div className="font-bold text-gray-900 dark:text-white">{user.postCount}</div>
                    <div className="text-xs text-gray-500">โพสต์</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-bold text-indigo-600">{user.reputation}</div>
                    <div className="text-xs text-gray-500">ชื่อเสียง</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="font-bold text-gray-900 dark:text-white">{user.threadCount}</div>
                    <div className="text-xs text-gray-500">กระทู้</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </animated.div>
  );
}

function SortButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
