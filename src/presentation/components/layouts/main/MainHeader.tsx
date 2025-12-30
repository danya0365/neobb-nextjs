"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MainHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/landing", label: "Home", icon: "🏠" },
    { href: "/portal", label: "Portal", icon: "🌐" },
    { href: "/forum", label: "Forum", icon: "💬" },
    { href: "/members", label: "Members", icon: "👥" },
    { href: "/activity", label: "Activity", icon: "📊" },
    { href: "/online", label: "Online", icon: "🟢" },
  ];

  const userMenuItems = [
    { href: "/bookmarks", label: "Bookmarks", icon: "🔖" },
    { href: "/notifications", label: "Notifications", icon: "🔔" },
    { href: "/messages", label: "Messages", icon: "✉️" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
    { href: "/admin", label: "Admin Panel", icon: "🛠️" },
  ];

  return (
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <Link href="/landing" className="main-logo">
          <span className="main-logo-icon">🚀</span>
          <span className="main-logo-text">NeoBB</span>
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="main-nav-link"
            >
              <span className="main-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="main-header-actions">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="main-icon-button"
            title={mounted && theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {mounted && theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Layout Switch */}
          <button
            onClick={toggleLayout}
            className="main-icon-button"
            title="Switch to Retro Layout"
          >
            🖥️
          </button>

          {/* User Menu */}
          <div className="main-user-menu-wrapper">
            <button 
              className="main-icon-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title="User Menu"
            >
              👤
            </button>
            {showUserMenu && (
              <div className="main-user-dropdown">
                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="main-dropdown-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <span className="main-dropdown-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                <div className="main-dropdown-divider" />
                <button className="main-dropdown-item main-dropdown-logout">
                  <span className="main-dropdown-icon">🚪</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Auth Buttons (when logged out) */}
          <button className="main-button-outline">Sign In</button>
          <button className="main-button-primary">Sign Up</button>
        </div>
      </div>
    </header>
  );
}
