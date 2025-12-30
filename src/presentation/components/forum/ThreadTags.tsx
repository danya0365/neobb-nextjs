"use client";

import { useState } from "react";

interface ThreadTagsProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  editable?: boolean;
  onTagsChange?: (tags: string[]) => void;
}

const defaultTags = ["React", "TypeScript", "Next.js", "ช่วยเหลือ"];

export function ThreadTags({
  tags = defaultTags,
  onTagClick,
  editable = false,
  onTagsChange,
}: ThreadTagsProps) {
  const [currentTags, setCurrentTags] = useState(tags);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (!newTag.trim() || currentTags.includes(newTag.trim())) return;
    
    const updated = [...currentTags, newTag.trim()];
    setCurrentTags(updated);
    setNewTag("");
    onTagsChange?.(updated);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = currentTags.filter(tag => tag !== tagToRemove);
    setCurrentTags(updated);
    onTagsChange?.(updated);
  };

  return (
    <div className="thread-tags-container">
      <div className="thread-tags">
        {currentTags.map((tag) => (
          <button
            key={tag}
            className="thread-tag"
            onClick={() => editable ? handleRemoveTag(tag) : onTagClick?.(tag)}
          >
            #{tag}
            {editable && <span className="ml-1 opacity-50">×</span>}
          </button>
        ))}
      </div>

      {editable && (
        <div className="tag-selector mt-2">
          <input
            type="text"
            className="tag-input"
            placeholder="เพิ่มแท็ก..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
          <button className="tag-add-btn" onClick={handleAddTag}>
            เพิ่ม
          </button>
        </div>
      )}
    </div>
  );
}
