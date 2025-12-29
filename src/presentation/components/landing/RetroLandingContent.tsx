"use client";

import Link from "next/link";
import { RetroButton } from "../ui/retro/RetroButton";

export function RetroLandingContent() {
  const features = [
    {
      icon: "📂",
      title: "Portal Homepage",
      description: "Drag & Drop layout customization",
    },
    {
      icon: "🔧",
      title: "Widget System",
      description: "Modular widget architecture",
    },
    {
      icon: "📝",
      title: "Forum System",
      description: "Traditional bulletin board structure",
    },
    {
      icon: "👤",
      title: "User Management",
      description: "Role-based permissions",
    },
    {
      icon: "🎨",
      title: "Themes",
      description: "Customizable appearance",
    },
    {
      icon: "🔌",
      title: "Plugins",
      description: "Extensible plugin system",
    },
  ];

  return (
    <div className="h-full flex flex-col p-4 retro-text">
      {/* Welcome Banner */}
      <div
        className="text-center p-4 mb-4"
        style={{
          backgroundColor: "var(--win98-bg)",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="text-lg font-bold mb-2">
          🌐 Welcome to NeoBB - Internet Explorer 5.0
        </h1>
        <p className="text-xs">
          Modern Web Forum / Community Platform
        </p>
        <p className="text-xs mt-1">
          The site at http://neobb.local is best viewed in Internet Explorer 5.0 or higher
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Sidebar */}
        <div
          className="w-48 p-2 flex-shrink-0"
          style={{
            backgroundColor: "var(--win98-bg)",
            border: "2px inset var(--win98-border-dark)",
          }}
        >
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Navigation</span>
            <div className="flex flex-col gap-1 mt-2">
              <Link href="/landing" className="retro-link">📄 Home</Link>
              <Link href="/forum" className="retro-link">💬 Forum</Link>
              <Link href="/portal" className="retro-link">🌐 Portal</Link>
              <Link href="/admin" className="retro-link">⚙️ Admin</Link>
            </div>
          </div>

          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Quick Links</span>
            <div className="flex flex-col gap-1 mt-2">
              <Link href="/auth/login" className="retro-link">🔐 Login</Link>
              <Link href="/auth/register" className="retro-link">📝 Register</Link>
              <Link href="/help" className="retro-link">❓ Help</Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4 overflow-auto">
          {/* Marquee */}
          <div
            className="p-2 text-center"
            style={{
              backgroundColor: "#000080",
              color: "#ffff00",
              fontWeight: "bold",
            }}
          >
            <marquee>
              🎉 Welcome to NeoBB! The best community platform since 1999! 🎉
              &nbsp;&nbsp;&nbsp;
              📢 New features: Drag & Drop Portal, Widget System, Plugin Architecture!
              &nbsp;&nbsp;&nbsp;
              🔥 Join our community today!
            </marquee>
          </div>

          {/* Features Table */}
          <div
            style={{
              border: "2px inset var(--win98-border-dark)",
              backgroundColor: "var(--win98-input-bg)",
            }}
          >
            <table className="w-full text-xs" cellPadding={4}>
              <thead>
                <tr style={{ backgroundColor: "var(--win98-titlebar)", color: "white" }}>
                  <th className="text-left p-2">Icon</th>
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "transparent" : "var(--win98-bg)",
                    }}
                  >
                    <td className="p-2 text-center">{feature.icon}</td>
                    <td className="p-2 font-bold">{feature.title}</td>
                    <td className="p-2">{feature.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <Link href="/forum">
              <RetroButton variant="primary">Enter Forum</RetroButton>
            </Link>
            <Link href="/docs">
              <RetroButton>Read Documentation</RetroButton>
            </Link>
            <Link href="/download">
              <RetroButton>Download NeoBB</RetroButton>
            </Link>
          </div>

          {/* Under Construction */}
          <div className="text-center p-4">
            <span style={{ fontSize: "24px" }}>🚧</span>
            <p className="text-xs mt-1">
              This site is best viewed at 800x600 resolution
            </p>
            <p className="text-xs">
              © 1999-2024 NeoBB. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          className="w-48 p-2 flex-shrink-0"
          style={{
            backgroundColor: "var(--win98-bg)",
            border: "2px inset var(--win98-border-dark)",
          }}
        >
          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Statistics</span>
            <div className="flex flex-col gap-1 mt-2 text-xs">
              <div>👥 Users: 1,234</div>
              <div>📝 Posts: 56,789</div>
              <div>💬 Threads: 12,345</div>
              <div>🌐 Online: 42</div>
            </div>
          </div>

          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Awards</span>
            <div className="flex gap-1 mt-2 flex-wrap justify-center">
              <span title="Best Forum 1999">🏆</span>
              <span title="Netscape Now!">🌐</span>
              <span title="IE5 Compatible">💻</span>
              <span title="W3C Valid">✅</span>
            </div>
          </div>

          <div className="retro-groupbox">
            <span className="retro-groupbox-title">Visitor Counter</span>
            <div className="text-center mt-2">
              <div
                className="inline-block px-2 py-1 font-mono text-xs"
                style={{
                  backgroundColor: "#000",
                  color: "#0f0",
                  border: "1px inset var(--win98-border-dark)",
                }}
              >
                000012345
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
