import { mockPosts, mockThreads } from "@/src/data/mock";
import { Post, Thread } from "@/src/domain/entities";

/**
 * Thread Repository Interface
 */
export interface IThreadRepository {
  findAll(): Promise<Thread[]>;
  findById(id: string): Promise<Thread | null>;
  findByBoard(boardId: string): Promise<Thread[]>;
  findByAuthor(authorId: string): Promise<Thread[]>;
  findPinned(boardId: string): Promise<Thread[]>;
  findLatest(limit: number): Promise<Thread[]>;
  findTrending(limit: number): Promise<Thread[]>;
  search(query: string): Promise<Thread[]>;
  create(data: Omit<Thread, "id" | "createdAt" | "updatedAt">): Promise<Thread>;
  update(id: string, data: Partial<Thread>): Promise<Thread | null>;
  delete(id: string): Promise<boolean>;
  incrementViewCount(id: string): Promise<void>;
  incrementReplyCount(id: string): Promise<void>;
}

/**
 * Post Repository Interface
 */
export interface IPostRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  findByThread(threadId: string): Promise<Post[]>;
  findByAuthor(authorId: string): Promise<Post[]>;
  create(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Promise<Post>;
  update(id: string, data: Partial<Post>): Promise<Post | null>;
  delete(id: string): Promise<boolean>;
  addReaction(id: string, type: string, userId: string): Promise<void>;
  removeReaction(id: string, type: string, userId: string): Promise<void>;
}

/**
 * Mock Thread Repository Implementation
 */
export class ThreadMockRepository implements IThreadRepository {
  private threads: Thread[] = [...mockThreads];

  async findAll(): Promise<Thread[]> {
    return this.threads;
  }

  async findById(id: string): Promise<Thread | null> {
    return this.threads.find((t) => t.id === id) || null;
  }

  async findByBoard(boardId: string): Promise<Thread[]> {
    return this.threads
      .filter((t) => t.boardId === boardId)
      .sort((a, b) => {
        // Pinned first, then by date
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async findByAuthor(authorId: string): Promise<Thread[]> {
    return this.threads.filter((t) => t.authorId === authorId);
  }

  async findPinned(boardId: string): Promise<Thread[]> {
    return this.threads.filter((t) => t.boardId === boardId && t.isPinned);
  }

  async findLatest(limit: number): Promise<Thread[]> {
    return this.threads
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async findTrending(limit: number): Promise<Thread[]> {
    return this.threads
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  }

  async search(query: string): Promise<Thread[]> {
    const lowerQuery = query.toLowerCase();
    return this.threads.filter(
      (t) =>
        t.title.toLowerCase().includes(lowerQuery) ||
        t.content.toLowerCase().includes(lowerQuery) ||
        t.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async create(data: Omit<Thread, "id" | "createdAt" | "updatedAt">): Promise<Thread> {
    const newThread: Thread = {
      ...data,
      id: `thread-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.threads.push(newThread);
    return newThread;
  }

  async update(id: string, data: Partial<Thread>): Promise<Thread | null> {
    const index = this.threads.findIndex((t) => t.id === id);
    if (index === -1) return null;
    
    this.threads[index] = {
      ...this.threads[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.threads[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.threads.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.threads.splice(index, 1);
    return true;
  }

  async incrementViewCount(id: string): Promise<void> {
    const thread = this.threads.find((t) => t.id === id);
    if (thread) thread.viewCount += 1;
  }

  async incrementReplyCount(id: string): Promise<void> {
    const thread = this.threads.find((t) => t.id === id);
    if (thread) {
      thread.replyCount += 1;
      thread.lastReplyAt = new Date().toISOString();
    }
  }
}

/**
 * Mock Post Repository Implementation
 */
export class PostMockRepository implements IPostRepository {
  private posts: Post[] = [...mockPosts];

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findById(id: string): Promise<Post | null> {
    return this.posts.find((p) => p.id === id) || null;
  }

  async findByThread(threadId: string): Promise<Post[]> {
    return this.posts
      .filter((p) => p.threadId === threadId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.posts.filter((p) => p.authorId === authorId);
  }

  async create(data: Omit<Post, "id" | "createdAt" | "updatedAt">): Promise<Post> {
    const newPost: Post = {
      ...data,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  async update(id: string, data: Partial<Post>): Promise<Post | null> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) return null;
    
    this.posts[index] = {
      ...this.posts[index],
      ...data,
      isEdited: true,
      editedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.posts[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.posts.splice(index, 1);
    return true;
  }

  async addReaction(id: string, type: string, userId: string): Promise<void> {
    const post = this.posts.find((p) => p.id === id);
    if (!post) return;

    const reaction = post.reactions.find((r) => r.type === type);
    if (reaction) {
      if (!reaction.userIds.includes(userId)) {
        reaction.userIds.push(userId);
        reaction.count += 1;
      }
    } else {
      post.reactions.push({ type, count: 1, userIds: [userId] });
    }
  }

  async removeReaction(id: string, type: string, userId: string): Promise<void> {
    const post = this.posts.find((p) => p.id === id);
    if (!post) return;

    const reaction = post.reactions.find((r) => r.type === type);
    if (reaction) {
      const userIndex = reaction.userIds.indexOf(userId);
      if (userIndex > -1) {
        reaction.userIds.splice(userIndex, 1);
        reaction.count -= 1;
        if (reaction.count === 0) {
          const reactionIndex = post.reactions.indexOf(reaction);
          post.reactions.splice(reactionIndex, 1);
        }
      }
    }
  }
}
