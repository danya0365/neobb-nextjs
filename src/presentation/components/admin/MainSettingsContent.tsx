"use client";

import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

interface Settings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  postsPerPage: number;
  threadsPerPage: number;
  allowRegistration: boolean;
  emailVerification: boolean;
  maintenanceMode: boolean;
  debugMode: boolean;
}

export function MainSettingsContent() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "NeoBB",
    siteDescription: "Modern Community Platform",
    siteUrl: "https://neobb.local",
    adminEmail: "admin@neobb.local",
    postsPerPage: 20,
    threadsPerPage: 25,
    allowRegistration: true,
    emailVerification: true,
    maintenanceMode: false,
    debugMode: false,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.gentle,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <animated.div style={fadeIn} className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ ตั้งค่าระบบ</h1>
          <p className="text-gray-600 dark:text-gray-400">กำหนดค่าทั่วไปของระบบ</p>
        </div>
        <MainButton variant="primary" icon="💾" onClick={handleSave} isLoading={saving}>
          {saved ? "✅ บันทึกแล้ว" : "บันทึกการตั้งค่า"}
        </MainButton>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <SettingsSection title="🌐 ตั้งค่าทั่วไป" icon="🌐">
          <div className="grid md:grid-cols-2 gap-4">
            <MainInput
              label="ชื่อเว็บไซต์"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
            <MainInput
              label="อีเมลผู้ดูแล"
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
            />
            <MainInput
              label="URL เว็บไซต์"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
            />
            <MainInput
              label="คำอธิบาย"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            />
          </div>
        </SettingsSection>

        {/* Display Settings */}
        <SettingsSection title="📄 ตั้งค่าการแสดงผล" icon="📄">
          <div className="grid md:grid-cols-2 gap-4">
            <MainInput
              label="กระทู้ต่อหน้า"
              type="number"
              value={settings.threadsPerPage.toString()}
              onChange={(e) => setSettings({ ...settings, threadsPerPage: parseInt(e.target.value) || 25 })}
            />
            <MainInput
              label="โพสต์ต่อหน้า"
              type="number"
              value={settings.postsPerPage.toString()}
              onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) || 20 })}
            />
          </div>
        </SettingsSection>

        {/* Registration Settings */}
        <SettingsSection title="👤 การลงทะเบียน" icon="👤">
          <div className="space-y-4">
            <ToggleSetting
              label="เปิดรับสมัครสมาชิก"
              description="อนุญาตให้ผู้ใช้ใหม่ลงทะเบียน"
              checked={settings.allowRegistration}
              onChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
            />
            <ToggleSetting
              label="ยืนยันอีเมล"
              description="ต้องยืนยันอีเมลก่อนเปิดใช้งานบัญชี"
              checked={settings.emailVerification}
              onChange={(checked) => setSettings({ ...settings, emailVerification: checked })}
            />
          </div>
        </SettingsSection>

        {/* System Settings */}
        <SettingsSection title="🔧 ระบบ" icon="🔧">
          <div className="space-y-4">
            <ToggleSetting
              label="โหมดบำรุงรักษา"
              description="ปิดการใช้งานชั่วคราวสำหรับบำรุงรักษา"
              checked={settings.maintenanceMode}
              onChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              dangerous
            />
            <ToggleSetting
              label="โหมด Debug"
              description="แสดงข้อมูล Debug (สำหรับนักพัฒนา)"
              checked={settings.debugMode}
              onChange={(checked) => setSettings({ ...settings, debugMode: checked })}
            />
          </div>
        </SettingsSection>
      </div>
    </animated.div>
  );
}

function SettingsSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <h2 className="font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange, dangerous }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  dangerous?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className={`font-medium ${dangerous ? "text-red-600" : "text-gray-900 dark:text-white"}`}>
          {label}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked
            ? dangerous
              ? "bg-red-500"
              : "bg-indigo-600"
            : "bg-gray-300 dark:bg-gray-600"
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
