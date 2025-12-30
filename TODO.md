# NeoBB - TODO

> Modern Web Forum / Community Platform
> ตาม SOLID Clean Architecture Pattern

---

## 📋 Phase 1: Foundation & Layout ✅

### Layout System
- [x] สร้าง LayoutProvider (context สำหรับ switch layout)
- [x] สร้าง MainLayout (Modern Design - Full Screen)
  - [x] MainHeader (Logo, Nav, Theme Toggle, Layout Switch)
  - [x] MainFooter
- [x] สร้าง RetroLayout (IE5 Style - Full Screen)
  - [x] RetroHeader (Title Bar, Menu Bar, Toolbar, Address Bar)
  - [x] RetroFooter (Status Bar)
- [x] เพิ่ม ThemeProvider (next-themes)
- [x] ปรับปรุง root layout.tsx

### Reusable Components (แยกตาม Layout)
- [x] Main Components
  - [x] MainModal
  - [x] MainInput
  - [x] MainSelect
  - [x] MainButton
  - [x] MainPopover
- [x] Retro Components
  - [x] RetroModal
  - [x] RetroInput
  - [x] RetroSelect
  - [x] RetroButton
  - [x] RetroPopover

---

## 📋 Phase 2: Master Data & Mock Repository ✅

### Domain Entities
- [x] User
- [x] Role / Permission
- [x] Category
- [x] Board
- [x] Thread
- [x] Post
- [x] Widget
- [x] Theme
- [x] Notification

### Mock Data
- [x] mockUsers
- [x] mockRoles
- [x] mockCategories
- [x] mockBoards
- [x] mockThreads
- [x] mockPosts
- [x] mockWidgets

### Mock Repository
- [x] UserMockRepository
- [x] CategoryMockRepository
- [x] BoardMockRepository
- [x] ThreadMockRepository
- [x] PostMockRepository
- [x] WidgetMockRepository

---

## 📋 Phase 3: Core Pages ✅

### Landing Page
- [x] app/landing/page.tsx
- [x] LandingPresenter
- [x] LandingView (Main + Retro variants)

### Portal Homepage
- [x] app/portal/page.tsx
- [x] PortalPresenter
- [x] PortalView (Widget-based layout)
- [x] Drag & Drop Widget System

### Forum
- [x] app/forum/page.tsx (Board listing)
- [x] app/forum/[boardId]/page.tsx (Thread listing)
- [x] app/forum/[boardId]/[threadId]/page.tsx (Post listing)
- [x] app/forum/[boardId]/new/page.tsx (Create Thread)

### User
- [x] app/profile/[userId]/page.tsx
- [x] app/auth/login/page.tsx
- [x] app/auth/register/page.tsx
- [x] app/bookmarks/page.tsx
- [x] app/settings/page.tsx
- [x] app/notifications/page.tsx
- [x] app/messages/page.tsx

### Admin
- [x] app/admin/page.tsx (Dashboard)
- [x] app/admin/boards/page.tsx
- [x] app/admin/users/page.tsx
- [x] app/admin/settings/page.tsx
- [x] app/admin/widgets/page.tsx
- [x] app/admin/themes/page.tsx

### Additional Pages
- [x] app/members/page.tsx (Member Directory)
- [x] app/activity/page.tsx (Activity Feed)
- [x] app/online/page.tsx (Online Users)
- [x] app/leaderboard/page.tsx (User Rankings)
- [x] app/search/page.tsx (Search)
- [x] app/help/page.tsx (Help)

---

## 📋 Phase 4: Advanced Features

### Widget System
- [x] LatestThreadsWidget (in Portal)
- [x] TrendingTopicsWidget (TrendingThreads.tsx)
- [x] OnlineUsersWidget (ActiveUsers.tsx)
- [x] AnnouncementsWidget (in Portal)
- [x] UserStatsWidget (ForumStats.tsx)

### Interactive Components
- [x] ThreadReactions (emoji reactions)
- [x] ThreadPoll (voting polls)
- [x] ThreadTags (hashtag labels)
- [x] UserRankBadge (rank display)

### Notification System
- [x] NotificationMockRepository
- [x] NotificationsView (Main + Retro)
- [x] NotificationStore (Zustand)
- [x] Real-time NotificationDropdown

### Theme System
- [x] ThemeStore (Zustand)
- [x] ThemeSwitcher
- [x] Custom Theme Editor

### Social & Interaction Features
- [x] User Mention System (@username)
- [x] Quote Reply System
- [x] Thread Subscription / Follow
- [x] Private Message System
- [x] Report Content System
- [x] Markdown Editor with Preview

---

## 📋 Phase 5: Supabase Integration (DEFERRED)

- [ ] Supabase Client Config
- [ ] Auth Repository (Supabase)
- [ ] User Repository (Supabase)
- [ ] Category Repository (Supabase)
- [ ] Board Repository (Supabase)
- [ ] Thread Repository (Supabase)
- [ ] Post Repository (Supabase)

---

## 📋 Current Sprint

### 🎯 Sprint 12: Final Features ✅
- [x] Widget Creator Modal for Portal
- [x] Admin Widgets/Themes Pages complete
- [x] All Phase 3 & 4 features complete