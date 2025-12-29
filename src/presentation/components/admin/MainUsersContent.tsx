"use client";

import { Role, User } from "@/src/domain/entities";
import { RoleMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { animated, config, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

const userRepo = new UserMockRepository();
const roleRepo = new RoleMockRepository();

export function MainUsersContent() {
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

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const filteredUsers = users.filter(u => 
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">👥 จัดการสมาชิก</h1>
          <p className="text-gray-600 dark:text-gray-400">ทั้งหมด {users.length} คน</p>
        </div>
        <MainButton variant="primary" icon="➕">เพิ่มสมาชิก</MainButton>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <MainInput
          placeholder="🔍 ค้นหาสมาชิก..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">ผู้ใช้</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">บทบาท</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">โพสต์</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map((user) => {
              const role = roles.get(user.roleId);
              return (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{user.displayName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {role && (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: role.color }}
                      >
                        {role.displayName}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                    {user.postCount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="แก้ไข">
                        ✏️
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="ลบ">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </animated.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600", label: "ใช้งาน" },
    banned: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600", label: "แบน" },
    muted: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-600", label: "ปิดเสียง" },
    pending: { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-600", label: "รอยืนยัน" },
  };
  
  const style = styles[status] || styles.active;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
