"use client";

import { ReactNode, useEffect, useRef } from "react";

interface RetroModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function RetroModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: RetroModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="retro-modal-overlay">
      <div className="retro-modal" ref={modalRef}>
        <div className="retro-modal-titlebar">
          <span className="retro-modal-title">{title}</span>
          <button onClick={onClose} className="retro-modal-close">
            ×
          </button>
        </div>
        <div className="retro-modal-body">{children}</div>
        {footer && <div className="retro-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
