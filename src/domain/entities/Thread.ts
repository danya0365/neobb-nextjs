/**
 * Thread Entity
 * A discussion thread in a board
 */
export interface Thread {
  id: string;
  boardId: string;
  authorId: string;
  title: string;
  content: string;
  prefix?: ThreadPrefix;
  viewCount: number;
  replyCount: number;
  lastReplyAt?: string;
  lastReplyBy?: string;
  isPinned: boolean;
  isLocked: boolean;
  isArchived: boolean;
  tags: string[];
  poll?: Poll;
  createdAt: string;
  updatedAt: string;
}

/**
 * Thread Prefix (e.g., [Q&A], [Guide], [WIP])
 */
export interface ThreadPrefix {
  id: string;
  name: string;
  color: string;
}

/**
 * Poll for threads
 */
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  allowMultiple: boolean;
  endsAt?: string;
  isAnonymous: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

/**
 * Post Entity
 * A reply in a thread
 */
export interface Post {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  quotedPostId?: string;
  mentionedUserIds: string[];
  reactions: Reaction[];
  attachments: Attachment[];
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Reaction on a post
 */
export interface Reaction {
  type: string; // emoji or reaction type
  count: number;
  userIds: string[];
}

/**
 * File attachment
 */
export interface Attachment {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
}
