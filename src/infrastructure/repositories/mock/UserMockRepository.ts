import { mockBadges, mockRoles, mockUsers } from "@/src/data/mock";
import { Badge, Role, User } from "@/src/domain/entities";

/**
 * User Repository Interface
 */
export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByRole(roleId: string): Promise<User[]>;
  create(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  getOnlineUsers(): Promise<User[]>;
  getStats(): Promise<{ totalUsers: number; activeUsers: number }>;
}

/**
 * Role Repository Interface
 */
export interface IRoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  getDefaultRole(): Promise<Role | null>;
}

/**
 * Badge Repository Interface
 */
export interface IBadgeRepository {
  findAll(): Promise<Badge[]>;
  findById(id: string): Promise<Badge | null>;
}

/**
 * Mock User Repository Implementation
 */
export class UserMockRepository implements IUserRepository {
  private users: User[] = [...mockUsers];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async findByRole(roleId: string): Promise<User[]> {
    return this.users.filter((u) => u.roleId === roleId);
  }

  async create(data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const newUser: User = {
      ...data,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  async getOnlineUsers(): Promise<User[]> {
    // Mock: users who logged in within last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    return this.users.filter((u) => u.lastLoginAt && u.lastLoginAt > oneHourAgo);
  }

  async getStats(): Promise<{ totalUsers: number; activeUsers: number }> {
    return {
      totalUsers: this.users.length,
      activeUsers: this.users.filter((u) => u.status === "active").length,
    };
  }
}

/**
 * Mock Role Repository Implementation
 */
export class RoleMockRepository implements IRoleRepository {
  private roles: Role[] = [...mockRoles];

  async findAll(): Promise<Role[]> {
    return this.roles;
  }

  async findById(id: string): Promise<Role | null> {
    return this.roles.find((r) => r.id === id) || null;
  }

  async findByName(name: string): Promise<Role | null> {
    return this.roles.find((r) => r.name === name) || null;
  }

  async getDefaultRole(): Promise<Role | null> {
    return this.roles.find((r) => r.isDefault) || null;
  }
}

/**
 * Mock Badge Repository Implementation
 */
export class BadgeMockRepository implements IBadgeRepository {
  private badges: Badge[] = [...mockBadges];

  async findAll(): Promise<Badge[]> {
    return this.badges;
  }

  async findById(id: string): Promise<Badge | null> {
    return this.badges.find((b) => b.id === id) || null;
  }
}
