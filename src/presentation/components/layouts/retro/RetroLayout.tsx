"use client";

import { ReactNode } from "react";
import { RetroFooter } from "./RetroFooter";
import { RetroHeader } from "./RetroHeader";

interface RetroLayoutProps {
  children: ReactNode;
}

export function RetroLayout({ children }: RetroLayoutProps) {
  return (
    <div className="retro-layout">
      <RetroHeader />
      <main className="retro-content">{children}</main>
      <RetroFooter />
    </div>
  );
}
