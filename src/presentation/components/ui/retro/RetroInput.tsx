"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface RetroInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const RetroInput = forwardRef<HTMLInputElement, RetroInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="retro-input-label">{label}</label>}
        <input
          ref={ref}
          className={`retro-input ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs mt-1" style={{ color: "red" }}>{error}</p>
        )}
      </div>
    );
  }
);

RetroInput.displayName = "RetroInput";
