"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface MainSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const MainSelect = forwardRef<HTMLSelectElement, MainSelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="main-input-label">{label}</label>}
        <select
          ref={ref}
          className={`main-select ${error ? "border-red-500" : ""} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

MainSelect.displayName = "MainSelect";
