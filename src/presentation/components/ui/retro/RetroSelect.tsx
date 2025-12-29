"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface RetroSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const RetroSelect = forwardRef<HTMLSelectElement, RetroSelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="retro-input-label">{label}</label>}
        <select
          ref={ref}
          className={`retro-select ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs mt-1" style={{ color: "red" }}>{error}</p>
        )}
      </div>
    );
  }
);

RetroSelect.displayName = "RetroSelect";
