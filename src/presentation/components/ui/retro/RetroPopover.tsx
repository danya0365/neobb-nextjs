"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface RetroPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}

export function RetroPopover({
  trigger,
  children,
  align = "left",
}: RetroPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`retro-popover ${align === "right" ? "right-0" : "left-0"} top-full mt-1`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface PopoverItemProps {
  onClick?: () => void;
  children: ReactNode;
}

export function RetroPopoverItem({ onClick, children }: PopoverItemProps) {
  return (
    <button className="retro-popover-item" onClick={onClick}>
      {children}
    </button>
  );
}

export function RetroPopoverSeparator() {
  return <div className="retro-popover-separator" />;
}
