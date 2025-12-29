/**
 * Widget Entity
 * Portal widget for customizable layouts
 */
export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  config: Record<string, unknown>;
  position: WidgetPosition;
  isEnabled: boolean;
  permissions: string[]; // Role IDs that can see this widget
  createdAt: string;
  updatedAt: string;
}

/**
 * Widget Types
 */
export type WidgetType =
  | "latest_threads"
  | "trending_topics"
  | "categories"
  | "online_users"
  | "announcements"
  | "pinned_threads"
  | "user_stats"
  | "custom_html"
  | "external_embed";

/**
 * Widget Position for drag & drop
 */
export interface WidgetPosition {
  column: number;
  order: number;
  width: "full" | "half" | "third";
}

/**
 * Notification Entity
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export type NotificationType =
  | "mention"
  | "reply"
  | "quote"
  | "reaction"
  | "thread_update"
  | "system"
  | "warning";

/**
 * Theme Entity
 */
export interface Theme {
  id: string;
  name: string;
  displayName: string;
  colors: ThemeColors;
  isDefault: boolean;
  isPublic: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}
