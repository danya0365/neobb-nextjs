"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  isLoading?: boolean;
}

export function MainButton({
  variant = "primary",
  icon,
  isLoading,
  children,
  className = "",
  disabled,
  ...props
}: MainButtonProps) {
  const variantClass = {
    primary: "main-btn-primary",
    secondary: "main-btn-secondary",
    ghost: "main-btn-ghost",
  }[variant];

  return (
    <button
      className={`main-btn ${variantClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
    </button>
  );
}
