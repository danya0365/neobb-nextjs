import { mockNotifications, mockThemes, mockWidgets } from "@/src/data/mock";
import { Notification, Theme, Widget } from "@/src/domain/entities";

/**
 * Widget Repository Interface
 */
export interface IWidgetRepository {
  findAll(): Promise<Widget[]>;
  findById(id: string): Promise<Widget | null>;
  findEnabled(): Promise<Widget[]>;
  create(data: Omit<Widget, "id" | "createdAt" | "updatedAt">): Promise<Widget>;
  update(id: string, data: Partial<Widget>): Promise<Widget | null>;
  delete(id: string): Promise<boolean>;
  updatePositions(positions: { id: string; position: Widget["position"] }[]): Promise<void>;
}

/**
 * Notification Repository Interface
 */
export interface INotificationRepository {
  findByUser(userId: string): Promise<Notification[]>;
  findUnreadByUser(userId: string): Promise<Notification[]>;
  create(data: Omit<Notification, "id" | "createdAt">): Promise<Notification>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
  delete(id: string): Promise<boolean>;
  getUnreadCount(userId: string): Promise<number>;
}

/**
 * Theme Repository Interface
 */
export interface IThemeRepository {
  findAll(): Promise<Theme[]>;
  findById(id: string): Promise<Theme | null>;
  findPublic(): Promise<Theme[]>;
  getDefault(): Promise<Theme | null>;
  create(data: Omit<Theme, "id" | "createdAt" | "updatedAt">): Promise<Theme>;
  update(id: string, data: Partial<Theme>): Promise<Theme | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * Mock Widget Repository Implementation
 */
export class WidgetMockRepository implements IWidgetRepository {
  private widgets: Widget[] = [...mockWidgets];

  async findAll(): Promise<Widget[]> {
    return this.widgets;
  }

  async findById(id: string): Promise<Widget | null> {
    return this.widgets.find((w) => w.id === id) || null;
  }

  async findEnabled(): Promise<Widget[]> {
    return this.widgets
      .filter((w) => w.isEnabled)
      .sort((a, b) => {
        if (a.position.column !== b.position.column) {
          return a.position.column - b.position.column;
        }
        return a.position.order - b.position.order;
      });
  }

  async create(data: Omit<Widget, "id" | "createdAt" | "updatedAt">): Promise<Widget> {
    const newWidget: Widget = {
      ...data,
      id: `widget-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.widgets.push(newWidget);
    return newWidget;
  }

  async update(id: string, data: Partial<Widget>): Promise<Widget | null> {
    const index = this.widgets.findIndex((w) => w.id === id);
    if (index === -1) return null;
    
    this.widgets[index] = {
      ...this.widgets[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.widgets[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.widgets.findIndex((w) => w.id === id);
    if (index === -1) return false;
    this.widgets.splice(index, 1);
    return true;
  }

  async updatePositions(positions: { id: string; position: Widget["position"] }[]): Promise<void> {
    positions.forEach(({ id, position }) => {
      const widget = this.widgets.find((w) => w.id === id);
      if (widget) {
        widget.position = position;
        widget.updatedAt = new Date().toISOString();
      }
    });
  }
}

/**
 * Mock Notification Repository Implementation
 */
export class NotificationMockRepository implements INotificationRepository {
  private notifications: Notification[] = [...mockNotifications];

  async findByUser(userId: string): Promise<Notification[]> {
    return this.notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async findUnreadByUser(userId: string): Promise<Notification[]> {
    return this.notifications
      .filter((n) => n.userId === userId && !n.isRead)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async create(data: Omit<Notification, "id" | "createdAt">): Promise<Notification> {
    const newNotification: Notification = {
      ...data,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  async markAsRead(id: string): Promise<void> {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) notification.isRead = true;
  }

  async markAllAsRead(userId: string): Promise<void> {
    this.notifications
      .filter((n) => n.userId === userId)
      .forEach((n) => (n.isRead = true));
  }

  async delete(id: string): Promise<boolean> {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index === -1) return false;
    this.notifications.splice(index, 1);
    return true;
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.filter((n) => n.userId === userId && !n.isRead).length;
  }
}

/**
 * Mock Theme Repository Implementation
 */
export class ThemeMockRepository implements IThemeRepository {
  private themes: Theme[] = [...mockThemes];

  async findAll(): Promise<Theme[]> {
    return this.themes;
  }

  async findById(id: string): Promise<Theme | null> {
    return this.themes.find((t) => t.id === id) || null;
  }

  async findPublic(): Promise<Theme[]> {
    return this.themes.filter((t) => t.isPublic);
  }

  async getDefault(): Promise<Theme | null> {
    return this.themes.find((t) => t.isDefault) || null;
  }

  async create(data: Omit<Theme, "id" | "createdAt" | "updatedAt">): Promise<Theme> {
    const newTheme: Theme = {
      ...data,
      id: `theme-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.themes.push(newTheme);
    return newTheme;
  }

  async update(id: string, data: Partial<Theme>): Promise<Theme | null> {
    const index = this.themes.findIndex((t) => t.id === id);
    if (index === -1) return null;
    
    this.themes[index] = {
      ...this.themes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.themes[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.themes.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.themes.splice(index, 1);
    return true;
  }
}
