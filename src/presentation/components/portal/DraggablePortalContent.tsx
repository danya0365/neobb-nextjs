"use client";

import { Board, Category, Thread, User } from "@/src/domain/entities";
import { BoardMockRepository, CategoryMockRepository, ThreadMockRepository, UserMockRepository } from "@/src/infrastructure/repositories/mock";
import { PortalWidget, useWidgetStore } from "@/src/presentation/stores/widgetStore";
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SortableWidget } from "./SortableWidget";
import { WidgetCreatorModal } from "./WidgetCreatorModal";

const threadRepo = new ThreadMockRepository();
const boardRepo = new BoardMockRepository();
const categoryRepo = new CategoryMockRepository();
const userRepo = new UserMockRepository();

export function DraggablePortalContent() {
  const { widgets, isEditMode, toggleEditMode, reorderWidgets, toggleWidgetVisibility } = useWidgetStore();
  const [latestThreads, setLatestThreads] = useState<Thread[]>([]);
  const [trendingThreads, setTrendingThreads] = useState<Thread[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalPosts: 0, totalThreads: 0 });
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function loadData() {
      const [latest, trending, cats, allBoards, userStats, online] = await Promise.all([
        threadRepo.findLatest(5),
        threadRepo.findTrending(5),
        categoryRepo.findVisible(),
        boardRepo.findVisible(),
        userRepo.getStats(),
        userRepo.getOnlineUsers(),
      ]);

      setLatestThreads(latest);
      setTrendingThreads(trending);
      setCategories(cats);
      setBoards(allBoards);
      setOnlineUsers(online);
      
      const totalPosts = allBoards.reduce((sum, b) => sum + b.postCount, 0);
      const totalThreads = allBoards.reduce((sum, b) => sum + b.threadCount, 0);
      setStats({ ...userStats, totalPosts, totalThreads });
      
      setLoading(false);
    }
    loadData();
  }, []);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const handleDragEnd = (event: DragEndEvent, position: "main" | "sidebar") => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const positionWidgets = widgets
      .filter(w => w.position === position)
      .sort((a, b) => a.order - b.order);

    const oldIndex = positionWidgets.findIndex((w) => w.id === active.id);
    const newIndex = positionWidgets.findIndex((w) => w.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderWidgets(position, oldIndex, newIndex);
    }
  };

  const renderWidget = (widget: PortalWidget) => {
    if (!widget.isVisible && !isEditMode) return null;

    switch (widget.type) {
      case "latest_threads":
        return (
          <WidgetCard title={widget.title}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {latestThreads.map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
              ))}
            </div>
            <Link href="/forum" className="block text-center py-2 text-indigo-600 hover:underline text-sm">
              ดูทั้งหมด →
            </Link>
          </WidgetCard>
        );
      case "trending_threads":
        return (
          <WidgetCard title={widget.title}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {trendingThreads.map((thread) => (
                <ThreadItem key={thread.id} thread={thread} showViews />
              ))}
            </div>
          </WidgetCard>
        );
      case "categories":
        return (
          <WidgetCard title={widget.title}>
            <div className="space-y-4">
              {categories.map((cat) => (
                <CategoryItem key={cat.id} category={cat} boards={boards.filter(b => b.categoryId === cat.id)} />
              ))}
            </div>
          </WidgetCard>
        );
      case "stats":
        return (
          <WidgetCard title={widget.title}>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="สมาชิก" value={stats.totalUsers} icon="👥" />
              <StatItem label="ออนไลน์" value={stats.activeUsers} icon="🟢" />
              <StatItem label="กระทู้" value={stats.totalThreads} icon="💬" />
              <StatItem label="โพสต์" value={stats.totalPosts} icon="📝" />
            </div>
          </WidgetCard>
        );
      case "online_users":
        return (
          <WidgetCard title={widget.title}>
            <div className="flex flex-wrap gap-2">
              {onlineUsers.length > 0 ? (
                onlineUsers.map((user) => (
                  <Link key={user.id} href={`/profile/${user.id}`}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs hover:bg-gray-200">
                    <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                      alt={user.displayName} className="w-5 h-5 rounded-full" />
                    <span>{user.displayName}</span>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">ไม่มีสมาชิกออนไลน์</p>
              )}
            </div>
          </WidgetCard>
        );
      case "quick_links":
        return (
          <WidgetCard title={widget.title}>
            <div className="space-y-2">
              <QuickLink href="/forum" icon="💬" label="เข้าสู่ฟอรั่ม" />
              <QuickLink href="/auth/register" icon="📝" label="สมัครสมาชิก" />
              <QuickLink href="/auth/login" icon="🔐" label="เข้าสู่ระบบ" />
              <QuickLink href="/help" icon="❓" label="ช่วยเหลือ" />
            </div>
          </WidgetCard>
        );
      default:
        return <WidgetCard title={widget.title}><p>Unknown widget type</p></WidgetCard>;
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  const mainWidgets = widgets.filter(w => w.position === "main").sort((a, b) => a.order - b.order);
  const sidebarWidgets = widgets.filter(w => w.position === "sidebar").sort((a, b) => a.order - b.order);

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🌐 Portal</h1>
            <p className="text-gray-600 dark:text-gray-400">ศูนย์กลางชุมชน NeoBB</p>
          </div>
          <div className="flex gap-3">
            {isEditMode && (
              <button
                onClick={() => setIsCreatorOpen(true)}
                className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                ➕ เพิ่ม Widget
              </button>
            )}
            <button
              onClick={toggleEditMode}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditMode
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {isEditMode ? "✓ บันทึก" : "✏️ จัดเรียง Widgets"}
            </button>
          </div>
        </div>

        {isEditMode && (
          <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-sm text-indigo-700 dark:text-indigo-300">
            💡 ลาก Widget เพื่อจัดเรียงใหม่ หรือคลิกไอคอน 👁️ เพื่อซ่อน/แสดง
          </div>
        )}

        {/* Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, "main")}
            >
              <SortableContext items={mainWidgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
                {mainWidgets.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    id={widget.id}
                    isEditMode={isEditMode}
                    isVisible={widget.isVisible}
                    onToggleVisibility={() => toggleWidgetVisibility(widget.id)}
                  >
                    {renderWidget(widget)}
                  </SortableWidget>
                ))}
              </SortableContext>
            </DndContext>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, "sidebar")}
            >
              <SortableContext items={sidebarWidgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
                {sidebarWidgets.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    id={widget.id}
                    isEditMode={isEditMode}
                    isVisible={widget.isVisible}
                    onToggleVisibility={() => toggleWidgetVisibility(widget.id)}
                  >
                    {renderWidget(widget)}
                  </SortableWidget>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
      
      <WidgetCreatorModal isOpen={isCreatorOpen} onClose={() => setIsCreatorOpen(false)} />
    </animated.div>
  );
}

// Helper components
function WidgetCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ThreadItem({ thread, showViews }: { thread: Thread; showViews?: boolean }) {
  return (
    <Link href={`/forum/${thread.boardId}/${thread.id}`} className="block py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-2 -mx-2 rounded-lg">
      <div className="flex items-start gap-3">
        {thread.prefix && (
          <span className="px-2 py-0.5 text-xs rounded-full font-medium text-white" style={{ backgroundColor: thread.prefix.color }}>
            {thread.prefix.name}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white truncate">
            {thread.isPinned && <span className="text-yellow-500 mr-1">📌</span>}
            {thread.title}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>💬 {thread.replyCount}</span>
            {showViews && <span>👁️ {thread.viewCount}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CategoryItem({ category, boards }: { category: Category; boards: Board[] }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
        <span>{category.icon}</span>{category.name}
      </h4>
      <div className="grid gap-2 pl-4">
        {boards.map((board) => (
          <Link key={board.id} href={`/forum/${board.id}`}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <span>{board.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{board.name}</span>
            </div>
            <div className="text-xs text-gray-500">{board.threadCount} กระทู้</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <span>{icon}</span>
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </Link>
  );
}
