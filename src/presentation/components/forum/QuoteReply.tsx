"use client";

import { Post, User } from "@/src/domain/entities";
import { useState } from "react";

interface QuoteReplyProps {
  post: Post;
  author: User;
  onQuote: (quotedContent: string) => void;
}

export function QuoteReply({ post, author, onQuote }: QuoteReplyProps) {
  const [isQuoting, setIsQuoting] = useState(false);
  
  const handleQuote = () => {
    const quotedContent = `[quote="${author.displayName}"]${post.content}[/quote]\n\n`;
    onQuote(quotedContent);
    setIsQuoting(true);
    setTimeout(() => setIsQuoting(false), 1000);
  };

  return (
    <button
      onClick={handleQuote}
      className={`flex items-center gap-1 text-sm transition-colors ${
        isQuoting
          ? "text-green-600 dark:text-green-400"
          : "text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
      }`}
      title="อ้างอิง"
    >
      <span>{isQuoting ? "✓" : "💬"}</span>
      <span>{isQuoting ? "อ้างอิงแล้ว" : "อ้างอิง"}</span>
    </button>
  );
}

// Quote display component
interface QuotedContentProps {
  content: string;
}

export function QuotedContent({ content }: QuotedContentProps) {
  // Parse [quote="username"]content[/quote]
  const quoteMatch = content.match(/\[quote="([^"]+)"\]([\s\S]*?)\[\/quote\]/g);
  
  if (!quoteMatch) return <>{content}</>;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  content.replace(
    /\[quote="([^"]+)"\]([\s\S]*?)\[\/quote\]/g,
    (match, author, quotedText, offset) => {
      // Add text before quote
      if (offset > lastIndex) {
        parts.push(<span key={`text-${offset}`}>{content.substring(lastIndex, offset)}</span>);
      }
      
      // Add quote block
      parts.push(
        <blockquote
          key={`quote-${offset}`}
          className="my-3 pl-4 border-l-4 border-indigo-500 bg-gray-50 dark:bg-gray-700/50 rounded-r-lg py-2"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            💬 อ้างจาก <span className="font-medium">{author}</span>
          </div>
          <div className="text-gray-700 dark:text-gray-300 italic">
            {quotedText.trim()}
          </div>
        </blockquote>
      );

      lastIndex = offset + match.length;
      return match;
    }
  );

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(<span key="text-end">{content.substring(lastIndex)}</span>);
  }

  return <>{parts}</>;
}
