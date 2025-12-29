"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";
import { RetroInput } from "../ui/retro/RetroInput";

export function RetroLoginContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.username === "admin" && formData.password === "admin") {
      router.push("/portal");
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-4 retro-text">
      <div
        style={{
          width: "320px",
          border: "2px outset var(--win98-border-light)",
          backgroundColor: "var(--win98-bg)",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            backgroundColor: "var(--win98-titlebar)",
            color: "white",
            padding: "4px 8px",
            fontWeight: "bold",
            fontSize: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>🔐 Log In - NeoBB</span>
          <span style={{ cursor: "pointer" }}>✕</span>
        </div>

        {/* Content */}
        <div style={{ padding: "16px" }}>
          {/* Icon */}
          <div className="text-center mb-4">
            <div style={{ fontSize: "48px" }}>🔑</div>
            <p className="text-xs" style={{ color: "gray" }}>
              Enter your credentials to log in
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4 p-2 text-xs"
              style={{
                backgroundColor: "#ffcccc",
                border: "1px solid red",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <RetroInput
                label="Username:"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <RetroInput
                label="Password:"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                />
                Remember me on this computer
              </label>
            </div>

            <div className="flex gap-2 justify-center mb-4">
              <RetroButton type="submit" variant="primary" disabled={loading}>
                {loading ? "Logging in..." : "OK"}
              </RetroButton>
              <Link href="/portal">
                <RetroButton type="button">Cancel</RetroButton>
              </Link>
            </div>
          </form>

          <hr style={{ border: "1px inset var(--win98-border-dark)", margin: "12px 0" }} />

          {/* Links */}
          <div className="text-center text-xs space-y-1">
            <div>
              <Link href="/auth/forgot-password" className="retro-link">
                Forgot Password?
              </Link>
            </div>
            <div>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="retro-link">
                Register Now
              </Link>
            </div>
          </div>

          {/* Demo hint */}
          <div
            className="mt-4 p-2 text-xs text-center"
            style={{
              backgroundColor: "#ffffcc",
              border: "1px solid #cccc00",
            }}
          >
            💡 Demo: username &quot;admin&quot;, password &quot;admin&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
