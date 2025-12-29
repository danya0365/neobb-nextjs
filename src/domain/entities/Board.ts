/**
 * Category Entity
 * Top-level forum organization
 */
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Board Entity
 * Forum board within a category
 */
export interface Board {
  id: string;
  categoryId: string;
  parentBoardId?: string; // For nested boards
  name: string;
  description?: string;
  icon?: string;
  order: number;
  threadCount: number;
  postCount: number;
  lastPostAt?: string;
  lastPostBy?: string;
  isVisible: boolean;
  isLocked: boolean;
  permissions: BoardPermission[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Board-specific permissions
 */
export interface BoardPermission {
  roleId: string;
  canView: boolean;
  canCreateThread: boolean;
  canReply: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canPin: boolean;
  canLock: boolean;
}
