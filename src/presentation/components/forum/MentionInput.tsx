"use client";

import { User } from "@/src/domain/entities";
import { UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { useEffect, useRef, useState } from "react";

const userRepo = new UserMockRepository();

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export function MentionInput({ value, onChange, placeholder, className, rows = 4 }: MentionInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function searchUsers() {
      if (mentionQuery.length > 0) {
        const users = await userRepo.findAll();
        const filtered = users.filter(u =>
          u.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
          u.displayName.toLowerCase().includes(mentionQuery.toLowerCase())
        ).slice(0, 5);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    searchUsers();
  }, [mentionQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newCursor = e.target.selectionStart;
    onChange(newValue);
    setCursorPosition(newCursor);

    // Check for @ mention
    const textBeforeCursor = newValue.substring(0, newCursor);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
    } else {
      setMentionQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSelectUser = (user: User) => {
    const textBeforeCursor = value.substring(0, cursorPosition);
    const textAfterCursor = value.substring(cursorPosition);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      const beforeMention = textBeforeCursor.substring(0, mentionMatch.index);
      const newValue = `${beforeMention}@${user.username} ${textAfterCursor}`;
      onChange(newValue);
    }
    
    setShowSuggestions(false);
    setMentionQuery("");
    textareaRef.current?.focus();
  };

  // Highlight @mentions in preview
  const renderPreview = () => {
    const parts = value.split(/(@\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        return (
          <span key={i} className="text-indigo-600 dark:text-indigo-400 font-medium">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={className || "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"}
      />
      
      {/* Mention Suggestions */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {suggestions.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{user.displayName}</div>
                <div className="text-sm text-gray-500">@{user.username}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Preview hint */}
      {value.includes("@") && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          💡 Preview: {renderPreview()}
        </div>
      )}
    </div>
  );
}
