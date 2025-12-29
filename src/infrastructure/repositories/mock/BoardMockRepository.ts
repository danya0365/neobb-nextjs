import { mockBoards, mockCategories } from "@/src/data/mock";
import { Board, Category } from "@/src/domain/entities";

/**
 * Category Repository Interface
 */
export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findVisible(): Promise<Category[]>;
  create(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category>;
  update(id: string, data: Partial<Category>): Promise<Category | null>;
  delete(id: string): Promise<boolean>;
  reorder(ids: string[]): Promise<void>;
}

/**
 * Board Repository Interface
 */
export interface IBoardRepository {
  findAll(): Promise<Board[]>;
  findById(id: string): Promise<Board | null>;
  findByCategory(categoryId: string): Promise<Board[]>;
  findVisible(): Promise<Board[]>;
  create(data: Omit<Board, "id" | "createdAt" | "updatedAt">): Promise<Board>;
  update(id: string, data: Partial<Board>): Promise<Board | null>;
  delete(id: string): Promise<boolean>;
  incrementPostCount(id: string): Promise<void>;
  incrementThreadCount(id: string): Promise<void>;
}

/**
 * Mock Category Repository Implementation
 */
export class CategoryMockRepository implements ICategoryRepository {
  private categories: Category[] = [...mockCategories];

  async findAll(): Promise<Category[]> {
    return this.categories.sort((a, b) => a.order - b.order);
  }

  async findById(id: string): Promise<Category | null> {
    return this.categories.find((c) => c.id === id) || null;
  }

  async findVisible(): Promise<Category[]> {
    return this.categories
      .filter((c) => c.isVisible)
      .sort((a, b) => a.order - b.order);
  }

  async create(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
    const newCategory: Category = {
      ...data,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id: string, data: Partial<Category>): Promise<Category | null> {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    
    this.categories[index] = {
      ...this.categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.categories[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.categories.splice(index, 1);
    return true;
  }

  async reorder(ids: string[]): Promise<void> {
    ids.forEach((id, index) => {
      const category = this.categories.find((c) => c.id === id);
      if (category) {
        category.order = index + 1;
        category.updatedAt = new Date().toISOString();
      }
    });
  }
}

/**
 * Mock Board Repository Implementation
 */
export class BoardMockRepository implements IBoardRepository {
  private boards: Board[] = [...mockBoards];

  async findAll(): Promise<Board[]> {
    return this.boards.sort((a, b) => a.order - b.order);
  }

  async findById(id: string): Promise<Board | null> {
    return this.boards.find((b) => b.id === id) || null;
  }

  async findByCategory(categoryId: string): Promise<Board[]> {
    return this.boards
      .filter((b) => b.categoryId === categoryId)
      .sort((a, b) => a.order - b.order);
  }

  async findVisible(): Promise<Board[]> {
    return this.boards
      .filter((b) => b.isVisible)
      .sort((a, b) => a.order - b.order);
  }

  async create(data: Omit<Board, "id" | "createdAt" | "updatedAt">): Promise<Board> {
    const newBoard: Board = {
      ...data,
      id: `board-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  async update(id: string, data: Partial<Board>): Promise<Board | null> {
    const index = this.boards.findIndex((b) => b.id === id);
    if (index === -1) return null;
    
    this.boards[index] = {
      ...this.boards[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.boards[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.boards.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.boards.splice(index, 1);
    return true;
  }

  async incrementPostCount(id: string): Promise<void> {
    const board = this.boards.find((b) => b.id === id);
    if (board) {
      board.postCount += 1;
      board.lastPostAt = new Date().toISOString();
    }
  }

  async incrementThreadCount(id: string): Promise<void> {
    const board = this.boards.find((b) => b.id === id);
    if (board) {
      board.threadCount += 1;
    }
  }
}
