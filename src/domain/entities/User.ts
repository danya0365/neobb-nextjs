/**
 * User Entity
 * Represents a user in the NeoBB system
 */
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  roleId: string;
  reputation: number;
  postCount: number;
  threadCount: number;
  badges: string[];
  status: "active" | "banned" | "muted" | "pending";
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Role Entity
 * Represents a user role with permissions
 */
export interface Role {
  id: string;
  name: string;
  displayName: string;
  color: string;
  permissions: Permission[];
  isDefault: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Permission types
 */
export type Permission =
  | "admin.access"
  | "admin.manage_users"
  | "admin.manage_boards"
  | "admin.manage_widgets"
  | "admin.manage_themes"
  | "mod.edit_posts"
  | "mod.delete_posts"
  | "mod.lock_threads"
  | "mod.pin_threads"
  | "mod.ban_users"
  | "user.create_thread"
  | "user.create_post"
  | "user.edit_own_post"
  | "user.delete_own_post"
  | "user.upload_files"
  | "user.use_signature"
  | "guest.view_boards"
  | "guest.view_threads";

/**
 * Badge Entity
 */
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}
