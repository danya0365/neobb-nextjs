"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface SortableWidgetProps {
  id: string;
  children: React.ReactNode;
  isEditMode: boolean;
  onToggleVisibility?: () => void;
  isVisible?: boolean;
}

export function SortableWidget({
  id,
  children,
  isEditMode,
  onToggleVisibility,
  isVisible = true,
}: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : isVisible ? 1 : 0.4,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-widget ${isEditMode ? "edit-mode" : ""} ${isDragging ? "dragging" : ""}`}
    >
      {isEditMode && (
        <div className="widget-controls">
          <button
            {...attributes}
            {...listeners}
            className="widget-drag-handle"
            title="ลากเพื่อย้าย"
          >
            ⋮⋮
          </button>
          <button
            onClick={onToggleVisibility}
            className={`widget-visibility-btn ${isVisible ? "visible" : "hidden"}`}
            title={isVisible ? "ซ่อน Widget" : "แสดง Widget"}
          >
            {isVisible ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      )}
      <div className={!isVisible && isEditMode ? "opacity-50" : ""}>
        {children}
      </div>
    </div>
  );
}
