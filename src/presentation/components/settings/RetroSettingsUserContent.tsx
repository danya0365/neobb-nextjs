"use client";

import Link from "next/link";
import { useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";
import { RetroInput } from "../ui/retro/RetroInput";

type Tab = "account" | "notifications" | "privacy";

export function RetroSettingsUserContent() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [saved, setSaved] = useState(false);

  const [account, setAccount] = useState({
    displayName: "Administrator",
    email: "admin@neobb.local",
    bio: "System Administrator",
    website: "https://neobb.local",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    mentionNotifications: true,
    replyNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showEmail: false,
    allowMessages: true,
  });

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 500));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full p-2 retro-text overflow-auto">
      {/* Header */}
      <div
        className="p-2 mb-2"
        style={{
          backgroundColor: "#000080",
          color: "white",
          border: "2px outset var(--win98-border-light)",
        }}
      >
        <h1 className="font-bold">⚙️ User Settings</h1>
        <p className="text-xs">Manage your account preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-0">
        {(["account", "notifications", "privacy"] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-3 py-1 text-xs capitalize"
            style={{
              backgroundColor: activeTab === tab ? "var(--win98-bg)" : "var(--win98-border-light)",
              border: "2px outset var(--win98-border-light)",
              borderBottom: activeTab === tab ? "none" : undefined,
              marginBottom: activeTab === tab ? "-2px" : "0",
              zIndex: activeTab === tab ? 1 : 0,
              position: "relative",
            }}
          >
            {tab}
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
        {activeTab === "account" && (
          <div className="space-y-3">
            <RetroInput
              label="Display Name:"
              value={account.displayName}
              onChange={e => setAccount({ ...account, displayName: e.target.value })}
            />
            <RetroInput
              label="Email:"
              type="email"
              value={account.email}
              onChange={e => setAccount({ ...account, email: e.target.value })}
            />
            <RetroInput
              label="Bio:"
              value={account.bio}
              onChange={e => setAccount({ ...account, bio: e.target.value })}
            />
            <RetroInput
              label="Website:"
              value={account.website}
              onChange={e => setAccount({ ...account, website: e.target.value })}
            />
            <hr style={{ border: "1px inset var(--win98-border-dark)", margin: "12px 0" }} />
            <RetroButton>🔒 Change Password</RetroButton>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-2 text-xs">
            <RetroCheckbox
              label="Email Notifications"
              checked={notifications.emailNotifications}
              onChange={v => setNotifications({ ...notifications, emailNotifications: v })}
            />
            <RetroCheckbox
              label="@ Mention Notifications"
              checked={notifications.mentionNotifications}
              onChange={v => setNotifications({ ...notifications, mentionNotifications: v })}
            />
            <RetroCheckbox
              label="Reply Notifications"
              checked={notifications.replyNotifications}
              onChange={v => setNotifications({ ...notifications, replyNotifications: v })}
            />
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-2 text-xs">
            <RetroCheckbox
              label="Show Online Status"
              checked={privacy.showOnlineStatus}
              onChange={v => setPrivacy({ ...privacy, showOnlineStatus: v })}
            />
            <RetroCheckbox
              label="Show Email in Profile"
              checked={privacy.showEmail}
              onChange={v => setPrivacy({ ...privacy, showEmail: v })}
            />
            <RetroCheckbox
              label="Allow Private Messages"
              checked={privacy.allowMessages}
              onChange={v => setPrivacy({ ...privacy, allowMessages: v })}
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        <RetroButton variant="primary" onClick={handleSave}>
          {saved ? "✅ Saved!" : "💾 Save Settings"}
        </RetroButton>
        <Link href="/portal">
          <RetroButton>← Back</RetroButton>
        </Link>
      </div>

      {saved && (
        <div
          className="mt-2 p-2 text-xs"
          style={{ backgroundColor: "#ccffcc", border: "1px solid green" }}
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
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
