"use client";

import { useState } from "react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface ThreadPollProps {
  pollId: string;
  question: string;
  options: PollOption[];
  totalVotes?: number;
  hasVoted?: boolean;
  selectedOptionId?: string;
  allowMultiple?: boolean;
  endsAt?: Date;
}

const defaultOptions: PollOption[] = [
  { id: "1", text: "Option A", votes: 45 },
  { id: "2", text: "Option B", votes: 32 },
  { id: "3", text: "Option C", votes: 18 },
  { id: "4", text: "Option D", votes: 5 },
];

export function ThreadPoll({
  pollId,
  question = "What do you think about this?",
  options = defaultOptions,
  hasVoted: initialHasVoted = false,
  selectedOptionId: initialSelectedId,
  endsAt,
}: ThreadPollProps) {
  const [pollOptions, setPollOptions] = useState(options);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [selectedId, setSelectedId] = useState<string | undefined>(initialSelectedId);

  const totalVotes = pollOptions.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setPollOptions(prev => prev.map(opt => ({
      ...opt,
      votes: opt.id === optionId ? opt.votes + 1 : opt.votes,
    })));
    setSelectedId(optionId);
    setHasVoted(true);
  };

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  const isExpired = endsAt && new Date() > endsAt;

  return (
    <div className="thread-poll">
      <div className="poll-header">
        <span className="poll-icon">📊</span>
        <h3 className="poll-question">{question}</h3>
      </div>

      <div className="poll-options">
        {pollOptions.map((option) => {
          const percentage = getPercentage(option.votes);
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              className={`poll-option ${hasVoted ? "voted" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted || isExpired}
            >
              <div className="poll-option-content">
                <span className="poll-option-text">{option.text}</span>
                {hasVoted && (
                  <span className="poll-option-votes">{option.votes} votes</span>
                )}
              </div>
              {hasVoted && (
                <div className="poll-option-bar-wrapper">
                  <div
                    className="poll-option-bar"
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="poll-option-percentage">{percentage}%</span>
                </div>
              )}
              {isSelected && <span className="poll-check">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="poll-footer">
        <span className="poll-total">{totalVotes} votes</span>
        {endsAt && (
          <span className="poll-ends">
            {isExpired ? "Poll ended" : `Ends ${endsAt.toLocaleDateString()}`}
          </span>
        )}
      </div>
    </div>
  );
}
