# NeoBB - TODO

> Modern Web Forum / Community Platform
> ตาม SOLID Clean Architecture Pattern

---

## 📋 Phase 1: Foundation & Layout

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

## 📋 Phase 2: Master Data & Mock Repository

### Domain Entities
- [ ] User
- [ ] Role / Permission
- [ ] Category
- [ ] Board
- [ ] Thread
- [ ] Post
- [ ] Widget
- [ ] Theme
- [ ] Notification

### Mock Data
- [ ] mockUsers
- [ ] mockRoles
- [ ] mockCategories
- [ ] mockBoards
- [ ] mockThreads
- [ ] mockPosts
- [ ] mockWidgets

### Mock Repository
- [ ] UserMockRepository
- [ ] CategoryMockRepository
- [ ] BoardMockRepository
- [ ] ThreadMockRepository
- [ ] PostMockRepository
- [ ] WidgetMockRepository

---

## 📋 Phase 3: Core Pages

### Landing Page
- [x] app/landing/page.tsx
- [x] LandingPresenter
- [x] LandingView (Main + Retro variants)

### Portal Homepage
- [ ] app/portal/page.tsx
- [ ] PortalPresenter
- [ ] PortalView (Widget-based layout)
- [ ] Drag & Drop Widget System

### Forum
- [ ] app/forum/page.tsx (Board listing)
- [ ] app/forum/[boardId]/page.tsx (Thread listing)
- [ ] app/forum/[boardId]/[threadId]/page.tsx (Post listing)

### User
- [ ] app/profile/[userId]/page.tsx
- [ ] app/auth/login/page.tsx
- [ ] app/auth/register/page.tsx

### Admin
- [ ] app/admin/page.tsx (Dashboard)
- [ ] app/admin/boards/page.tsx
- [ ] app/admin/users/page.tsx
- [ ] app/admin/widgets/page.tsx
- [ ] app/admin/themes/page.tsx

---

## 📋 Phase 4: Advanced Features

### Widget System
- [ ] LatestThreadsWidget
- [ ] TrendingTopicsWidget
- [ ] OnlineUsersWidget
- [ ] AnnouncementsWidget
- [ ] UserStatsWidget

### Notification System
- [ ] NotificationStore (Zustand)
- [ ] NotificationDropdown
- [ ] NotificationList

### Theme System
- [ ] ThemeStore (Zustand)
- [ ] ThemeSwitcher
- [ ] Custom Theme Editor

---

## 📋 Phase 5: Supabase Integration

- [ ] Supabase Client Config
- [ ] Auth Repository (Supabase)
- [ ] User Repository (Supabase)
- [ ] Category Repository (Supabase)
- [ ] Board Repository (Supabase)
- [ ] Thread Repository (Supabase)
- [ ] Post Repository (Supabase)

---

## 📋 Current Sprint

### 🎯 Sprint 1: Layout & Landing Page ✅
- [x] Task 1.1: สร้าง Layout System (MainLayout, RetroLayout)
- [x] Task 1.2: สร้าง Landing Page (ทุก component แยกตาม layout)