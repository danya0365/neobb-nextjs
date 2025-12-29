"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { ReactNode, useEffect, useRef } from "react";

interface MainModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function MainModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: MainModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animation
  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: config.stiff,
  });

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(-10px)",
    config: config.stiff,
  });

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

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <animated.div
      ref={overlayRef}
      className="main-modal-overlay"
      style={overlaySpring}
      onClick={handleOverlayClick}
    >
      <animated.div className="main-modal" style={modalSpring}>
        <div className="main-modal-header">
          <h2 className="main-modal-title">{title}</h2>
          <button onClick={onClose} className="main-modal-close">
            ✕
          </button>
        </div>
        <div className="main-modal-body">{children}</div>
        {footer && <div className="main-modal-footer">{footer}</div>}
      </animated.div>
    </animated.div>
  );
}
