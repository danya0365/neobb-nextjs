"use client";

import { useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";
import { RetroInput } from "../ui/retro/RetroInput";

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

export function RetroSettingsContent() {
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

  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "display", label: "Display" },
    { id: "registration", label: "Registration" },
    { id: "system", label: "System" },
  ];

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <div
        className="p-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">⚙️ System Settings</h1>
        <p className="text-xs">Configure NeoBB options</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-3 py-1 text-xs"
            style={{
              backgroundColor: activeTab === tab.id ? "var(--win98-bg)" : "var(--win98-border-light)",
              border: "2px outset var(--win98-border-light)",
              borderBottom: activeTab === tab.id ? "none" : undefined,
              marginBottom: activeTab === tab.id ? "-2px" : "0",
              zIndex: activeTab === tab.id ? 1 : 0,
              position: "relative",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          border: "2px outset var(--win98-border-light)",
          backgroundColor: "var(--win98-bg)",
          padding: "12px",
        }}
      >
        {activeTab === "general" && (
          <div className="space-y-3">
            <RetroInput
              label="Site Name:"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
            <RetroInput
              label="Description:"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            />
            <RetroInput
              label="Site URL:"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
            />
            <RetroInput
              label="Admin Email:"
              value={settings.adminEmail}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
            />
          </div>
        )}

        {activeTab === "display" && (
          <div className="space-y-3">
            <RetroInput
              label="Threads per page:"
              type="number"
              value={settings.threadsPerPage.toString()}
              onChange={(e) => setSettings({ ...settings, threadsPerPage: parseInt(e.target.value) || 25 })}
            />
            <RetroInput
              label="Posts per page:"
              type="number"
              value={settings.postsPerPage.toString()}
              onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) || 20 })}
            />
          </div>
        )}

        {activeTab === "registration" && (
          <div className="space-y-2 text-xs">
            <RetroCheckbox
              label="Allow new registrations"
              checked={settings.allowRegistration}
              onChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
            />
            <RetroCheckbox
              label="Require email verification"
              checked={settings.emailVerification}
              onChange={(checked) => setSettings({ ...settings, emailVerification: checked })}
            />
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-2 text-xs">
            <RetroCheckbox
              label="Maintenance Mode (⚠️ Site will be offline)"
              checked={settings.maintenanceMode}
              onChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            />
            <RetroCheckbox
              label="Debug Mode"
              checked={settings.debugMode}
              onChange={(checked) => setSettings({ ...settings, debugMode: checked })}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <RetroButton variant="primary" onClick={handleSave}>
          {saved ? "✅ Saved!" : "💾 Save Settings"}
        </RetroButton>
        <RetroButton>↩️ Reset</RetroButton>
      </div>

      {/* Status */}
      {saved && (
        <div
          className="p-2 text-xs"
          style={{
            backgroundColor: "#ccffcc",
            border: "1px solid green",
          }}
        >
          ✅ Settings saved successfully!
        </div>
      )}
    </div>
  );
}

function RetroCheckbox({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
