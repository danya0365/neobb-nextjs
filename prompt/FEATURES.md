# NeoBB

NeoBB คือระบบ Web Forum / Community Platform แบบสมัยใหม่  
ออกแบบมาเพื่อเป็น **Open Source, Modular, และ Customizable**  
เหมาะสำหรับนักพัฒนา, ชุมชนออนไลน์, และองค์กรที่ต้องการระบบ discussion เป็นของตัวเอง

> NeoBB = Neo (ใหม่) + BB (Bulletin Board)  
> ทายาทของ phpBB / vBulletin / IPB ในยุค modern web

---

## ✨ Core Concept

- Portal-first (หน้าแรกคือศูนย์กลาง)
- Drag & Drop Layout
- Widget-based Architecture
- Themeable & Extensible
- Community-driven

---

## 🏠 Portal Homepage (Dashboard)

หน้าแรกของ NeoBB คือ **Portal ที่ผู้ใช้และแอดมินจัดการเองได้**

### ความสามารถ
- Drag & Drop จัดวาง layout
- เลือก widget ได้อิสระ
- แยก layout ตาม role
- รองรับ responsive (desktop / tablet / mobile)

### Widget ตัวอย่าง
- Latest Threads
- Trending Topics
- Categories / Boards
- Online Users
- Announcements
- Pinned Threads
- User Stats
- Custom HTML / Markdown
- External Embed (YouTube, Twitter, etc.)

> Portal สามารถสร้างได้หลายหน้า เช่น:
> - Home
> - Community
> - Knowledge Base
> - Staff Dashboard

---

## 🧩 Widget System

- Widget เป็น module แยก
- เปิด / ปิด / จัดเรียงได้
- รองรับ custom widget จาก developer
- Widget มี permission ของตัวเอง

---

## 💬 Forum System (มาตรฐานสากล)

### Board & Category
- Category → Board → Thread → Post
- Nested board ได้หลายระดับ
- ตั้ง permission ราย board

### Thread & Post
- Markdown / Rich Text Editor
- Quote / Mention / Reaction
- Attachments (image, file)
- Poll / Voting
- Pin / Lock / Archive
- Thread prefix (เช่น [Q&A], [Guide])

### Search
- Full-text search
- Filter by category / tag / user / date

---

## 👥 User & Role System

- User Profile แบบ modern
- Role-based permission (Admin / Mod / Member / Guest)
- Badge / Title / Reputation
- Activity log
- User mute / ban / warning

---

## 🎨 Theme & Appearance

### Theme System
- เปลี่ยน theme ได้ทันที (runtime)
- รองรับ Dark / Light
- Custom color palette
- Override component style

### Theme Scope
- Global theme
- Theme per user
- Theme per portal page

---

## 🔔 Notification System

- In-app notification
- Email notification
- Mention & reply alert
- Subscription to thread / board

---

## 🛠️ Admin Panel

- Manage boards & categories
- Manage users & roles
- Manage widgets
- Theme manager
- Plugin manager
- Moderation tools
- System logs

---

## 🔌 Plugin / Extension System

- Plugin lifecycle (install / enable / disable)
- Hook & event-based
- Extend:
  - UI
  - API
  - Permission
  - Widget
- Community plugin friendly

---

## 🔐 Security & Performance

- Rate limit
- Spam protection
- Permission isolation
- Audit log
- Cache-ready architecture
- CDN friendly

---

## 🌐 API & Integration

- REST / GraphQL / RPC-ready
- Webhook support
- OAuth / SSO integration
- External service integration

---

## 📦 Target Use Cases

- Community forum
- Developer discussion board
- Q&A platform
- Knowledge base
- Internal company forum
- Open source community

---

## 🚀 Philosophy

NeoBB ไม่ใช่แค่ "เว็บบอร์ด"  
แต่เป็น **Community Engine** ที่เจ้าของสามารถควบคุมได้เต็มที่  
ไม่ผูกกับ platform ใด platform หนึ่ง

---

## 📜 License

MIT / Open Source (community driven)
