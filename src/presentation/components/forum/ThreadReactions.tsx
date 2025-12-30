"use client";

import { useState } from "react";

interface Reaction {
  emoji: string;
  label: string;
  count: number;
  reacted: boolean;
}

interface ThreadReactionsProps {
  threadId: string;
  initialReactions?: Reaction[];
}

const defaultReactions: Reaction[] = [
  { emoji: "👍", label: "Like", count: 12, reacted: false },
  { emoji: "❤️", label: "Love", count: 5, reacted: false },
  { emoji: "😂", label: "Haha", count: 3, reacted: false },
  { emoji: "🤔", label: "Thinking", count: 2, reacted: false },
  { emoji: "👏", label: "Clap", count: 8, reacted: false },
];

export function ThreadReactions({ threadId, initialReactions = defaultReactions }: ThreadReactionsProps) {
  const [reactions, setReactions] = useState<Reaction[]>(initialReactions);
  const [showPicker, setShowPicker] = useState(false);

  const toggleReaction = (index: number) => {
    setReactions(prev => prev.map((r, i) => {
      if (i !== index) return r;
      return {
        ...r,
        reacted: !r.reacted,
        count: r.reacted ? r.count - 1 : r.count + 1,
      };
    }));
  };

  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="thread-reactions">
      <div className="thread-reactions-list">
        {reactions.filter(r => r.count > 0 || r.reacted).map((reaction, index) => (
          <button
            key={reaction.emoji}
            className={`thread-reaction-btn ${reaction.reacted ? "reacted" : ""}`}
            onClick={() => toggleReaction(index)}
            title={reaction.label}
          >
            <span className="reaction-emoji">{reaction.emoji}</span>
            <span className="reaction-count">{reaction.count}</span>
          </button>
        ))}
        <button
          className="thread-reaction-add"
          onClick={() => setShowPicker(!showPicker)}
          title="Add reaction"
        >
          {showPicker ? "✕" : "+"}
        </button>
      </div>

      {showPicker && (
        <div className="thread-reactions-picker">
          {reactions.map((reaction, index) => (
            <button
              key={reaction.emoji}
              className={`reaction-picker-btn ${reaction.reacted ? "reacted" : ""}`}
              onClick={() => {
                toggleReaction(index);
                setShowPicker(false);
              }}
              title={reaction.label}
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}

      {totalReactions > 0 && (
        <div className="thread-reactions-summary">
          {totalReactions} reaction{totalReactions !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
