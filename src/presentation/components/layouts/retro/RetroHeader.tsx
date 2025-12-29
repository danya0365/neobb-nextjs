"use client";

import { useLayoutStore } from "@/src/presentation/stores/layoutStore";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RetroHeader() {
  const { theme, setTheme } = useTheme();
  const { toggleLayout } = useLayoutStore();
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("http://neobb.local/landing");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <header className="retro-header">
      {/* Title Bar */}
      <div className="retro-titlebar">
        <div className="retro-titlebar-left">
          <span className="retro-titlebar-icon">🌐</span>
          <span className="retro-titlebar-text">
            NeoBB - Microsoft Internet Explorer
          </span>
        </div>
        <div className="retro-titlebar-controls">
          <button className="retro-titlebar-btn" title="Minimize">_</button>
          <button className="retro-titlebar-btn" title="Maximize">□</button>
          <button className="retro-titlebar-btn retro-close" title="Close">×</button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="retro-menubar">
        <button className="retro-menu-item">
          <span className="retro-menu-underline">F</span>ile
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">E</span>dit
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">V</span>iew
        </button>
        <button className="retro-menu-item">
          F<span className="retro-menu-underline">a</span>vorites
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">T</span>ools
        </button>
        <button className="retro-menu-item">
          <span className="retro-menu-underline">H</span>elp
        </button>
      </div>

      {/* Toolbar */}
      <div className="retro-toolbar">
        <button className="retro-toolbar-btn" disabled>
          <span className="retro-toolbar-icon">⬅️</span>
          <span className="retro-toolbar-label">Back</span>
        </button>
        <button className="retro-toolbar-btn" disabled>
          <span className="retro-toolbar-icon">➡️</span>
          <span className="retro-toolbar-label">Forward</span>
        </button>
        <button className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🛑</span>
          <span className="retro-toolbar-label">Stop</span>
        </button>
        <button className="retro-toolbar-btn" onClick={() => window.location.reload()}>
          <span className="retro-toolbar-icon">🔄</span>
          <span className="retro-toolbar-label">Refresh</span>
        </button>
        <Link href="/landing" className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">🏠</span>
          <span className="retro-toolbar-label">Home</span>
        </Link>

        <div className="retro-toolbar-separator" />

        <button className="retro-toolbar-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <span className="retro-toolbar-icon">{mounted && theme === "dark" ? "☀️" : "🌙"}</span>
          <span className="retro-toolbar-label">Theme</span>
        </button>
        <button className="retro-toolbar-btn" onClick={toggleLayout}>
          <span className="retro-toolbar-icon">✨</span>
          <span className="retro-toolbar-label">Modern</span>
        </button>

        <div className="retro-toolbar-separator" />

        <Link href="/forum" className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">💬</span>
          <span className="retro-toolbar-label">Forum</span>
        </Link>
        <Link href="/admin" className="retro-toolbar-btn">
          <span className="retro-toolbar-icon">⚙️</span>
          <span className="retro-toolbar-label">Admin</span>
        </Link>
      </div>

      {/* Address Bar */}
      <div className="retro-addressbar">
        <span className="retro-addressbar-label">Address</span>
        <div className="retro-addressbar-input-wrapper">
          <span className="retro-addressbar-icon">📄</span>
          <input
            type="text"
            className="retro-addressbar-input"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = currentUrl;
              }
            }}
          />
        </div>
        <button className="retro-addressbar-go">Go</button>
      </div>
    </header>
  );
}
