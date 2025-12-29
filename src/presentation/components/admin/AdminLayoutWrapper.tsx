"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

const adminMenuItems = [
  { href: "/admin", icon: "📊", label: "Dashboard", labelTh: "แดชบอร์ด" },
  { href: "/admin/users", icon: "👥", label: "Users", labelTh: "จัดการสมาชิก" },
  { href: "/admin/boards", icon: "📂", label: "Boards", labelTh: "จัดการบอร์ด" },
  { href: "/admin/settings", icon: "⚙️", label: "Settings", labelTh: "ตั้งค่า" },
];

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();
  const { currentLayout } = useLayoutStore();

  if (currentLayout === "retro") {
    return <RetroAdminLayout pathname={pathname}>{children}</RetroAdminLayout>;
  }

  return <MainAdminLayout pathname={pathname}>{children}</MainAdminLayout>;
}

function MainAdminLayout({ pathname, children }: { pathname: string; children: ReactNode }) {
  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Admin Panel
          </h1>
          <p className="text-xs text-gray-400 mt-1">NeoBB Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.labelTh}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/portal"
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>🏠</span>
            <span className="text-sm">กลับหน้าหลัก</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto">
        {children}
      </main>
    </div>
  );
}

function RetroAdminLayout({ pathname, children }: { pathname: string; children: ReactNode }) {
  return (
    <div className="h-full flex retro-text">
      {/* Sidebar */}
      <aside
        className="w-48 flex flex-col"
        style={{
          backgroundColor: "var(--win98-bg)",
          borderRight: "2px outset var(--win98-border-light)",
        }}
      >
        {/* Header */}
        <div
          className="p-2 font-bold text-xs"
          style={{
            backgroundColor: "var(--win98-titlebar)",
            color: "white",
          }}
        >
          ⚙️ Admin Panel
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2">
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Menu</span>
            <div className="flex flex-col gap-1 mt-2">
              {adminMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs p-1 flex items-center gap-1"
                    style={{
                      backgroundColor: isActive ? "var(--win98-titlebar)" : "transparent",
                      color: isActive ? "white" : "inherit",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-2">
          <Link href="/portal" className="retro-link text-xs">
            🏠 Back to Portal
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 overflow-auto"
        style={{ backgroundColor: "var(--win98-input-bg)" }}
      >
        {children}
      </main>
    </div>
  );
}
