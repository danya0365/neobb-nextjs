"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  icon?: ReactNode;
  isLoading?: boolean;
}

export function RetroButton({
  variant = "default",
  icon,
  isLoading,
  children,
  className = "",
  disabled,
  ...props
}: RetroButtonProps) {
  const variantClass = variant === "primary" ? "retro-btn-primary" : "";

  return (
    <button
      className={`retro-btn ${variantClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span>⏳</span>
      ) : (
        icon && <span className="mr-1">{icon}</span>
      )}
      {children}
    </button>
  );
}
