"use client";

import Link from "next/link";

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer-container">
        {/* Brand */}
        <div className="main-footer-brand">
          <span className="main-footer-logo">🚀 NeoBB</span>
          <span className="main-footer-copyright">
            © {currentYear} NeoBB. Open Source Community Platform.
          </span>
        </div>

        {/* Links */}
        <nav className="main-footer-nav">
          <Link href="/about" className="main-footer-link">
            About
          </Link>
          <Link href="/docs" className="main-footer-link">
            Docs
          </Link>
          <Link href="https://github.com" className="main-footer-link" target="_blank">
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
