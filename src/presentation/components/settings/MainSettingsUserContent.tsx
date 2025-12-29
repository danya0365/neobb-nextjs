"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

type Tab = "account" | "notifications" | "privacy" | "appearance";

export function MainSettingsUserContent() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Account settings
  const [account, setAccount] = useState({
    displayName: "Administrator",
    email: "admin@neobb.local",
    bio: "ผู้ดูแลระบบ NeoBB",
    website: "https://neobb.local",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    mentionNotifications: true,
    replyNotifications: true,
    threadUpdateNotifications: false,
    marketingEmails: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showEmail: false,
    allowMessages: true,
    showActivity: true,
  });

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "account", label: "บัญชี", icon: "👤" },
    { id: "notifications", label: "การแจ้งเตือน", icon: "🔔" },
    { id: "privacy", label: "ความเป็นส่วนตัว", icon: "🔒" },
    { id: "appearance", label: "การแสดงผล", icon: "🎨" },
  ];

  return (
    <animated.div style={fadeIn} className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ ตั้งค่าบัญชี</h1>
            <p className="text-gray-600 dark:text-gray-400">จัดการข้อมูลส่วนตัวและการตั้งค่า</p>
          </div>
          <MainButton variant="primary" icon="💾" onClick={handleSave} isLoading={saving}>
            {saved ? "✅ บันทึกแล้ว" : "บันทึก"}
          </MainButton>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-indigo-500"
                />
                <div>
                  <MainButton icon="📷">เปลี่ยนรูปโปรไฟล์</MainButton>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG ขนาดไม่เกิน 2MB</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <MainInput
                  label="ชื่อที่แสดง"
                  value={account.displayName}
                  onChange={e => setAccount({ ...account, displayName: e.target.value })}
                />
                <MainInput
                  label="อีเมล"
                  type="email"
                  value={account.email}
                  onChange={e => setAccount({ ...account, email: e.target.value })}
                />
              </div>
              <MainInput
                label="เกี่ยวกับฉัน"
                value={account.bio}
                onChange={e => setAccount({ ...account, bio: e.target.value })}
              />
              <MainInput
                label="เว็บไซต์"
                value={account.website}
                onChange={e => setAccount({ ...account, website: e.target.value })}
              />
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <MainButton icon="🔒">เปลี่ยนรหัสผ่าน</MainButton>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <ToggleItem
                label="การแจ้งเตือนทางอีเมล"
                description="รับการแจ้งเตือนผ่านทางอีเมล"
                checked={notifications.emailNotifications}
                onChange={v => setNotifications({ ...notifications, emailNotifications: v })}
              />
              <ToggleItem
                label="เมื่อถูกกล่าวถึง (@mentions)"
                description="แจ้งเตือนเมื่อมีคน @ ถึงคุณ"
                checked={notifications.mentionNotifications}
                onChange={v => setNotifications({ ...notifications, mentionNotifications: v })}
              />
              <ToggleItem
                label="การตอบกลับ"
                description="แจ้งเตือนเมื่อมีคนตอบกลับโพสต์ของคุณ"
                checked={notifications.replyNotifications}
                onChange={v => setNotifications({ ...notifications, replyNotifications: v })}
              />
              <ToggleItem
                label="อัปเดตกระทู้ที่ติดตาม"
                description="แจ้งเตือนเมื่อกระทู้ที่ติดตามมีอัปเดต"
                checked={notifications.threadUpdateNotifications}
                onChange={v => setNotifications({ ...notifications, threadUpdateNotifications: v })}
              />
              <ToggleItem
                label="อีเมลโปรโมชั่น"
                description="รับข่าวสารและโปรโมชั่นจาก NeoBB"
                checked={notifications.marketingEmails}
                onChange={v => setNotifications({ ...notifications, marketingEmails: v })}
              />
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              <ToggleItem
                label="แสดงสถานะออนไลน์"
                description="ให้ผู้อื่นเห็นว่าคุณออนไลน์อยู่"
                checked={privacy.showOnlineStatus}
                onChange={v => setPrivacy({ ...privacy, showOnlineStatus: v })}
              />
              <ToggleItem
                label="แสดงอีเมล"
                description="แสดงอีเมลในโปรไฟล์"
                checked={privacy.showEmail}
                onChange={v => setPrivacy({ ...privacy, showEmail: v })}
              />
              <ToggleItem
                label="อนุญาตข้อความส่วนตัว"
                description="ให้ผู้อื่นส่งข้อความส่วนตัวถึงคุณได้"
                checked={privacy.allowMessages}
                onChange={v => setPrivacy({ ...privacy, allowMessages: v })}
              />
              <ToggleItem
                label="แสดงกิจกรรมล่าสุด"
                description="แสดงกระทู้และโพสต์ล่าสุดในโปรไฟล์"
                checked={privacy.showActivity}
                onChange={v => setPrivacy({ ...privacy, showActivity: v })}
              />
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">ธีม</h3>
                <div className="flex gap-4">
                  <ThemeOption label="สว่าง" icon="☀️" active />
                  <ThemeOption label="มืด" icon="🌙" />
                  <ThemeOption label="ระบบ" icon="💻" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">เลย์เอาต์</h3>
                <div className="flex gap-4">
                  <ThemeOption label="Modern" icon="✨" active />
                  <ThemeOption label="Retro" icon="🖥️" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </animated.div>
  );
}

function ToggleItem({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeOption({ label, icon, active }: { label: string; icon: string; active?: boolean }) {
  return (
    <button
      className={`px-6 py-4 rounded-xl border-2 transition-colors ${
        active
          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
      }`}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    </button>
  );
}
