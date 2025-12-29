"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RetroButton } from "../ui/retro/RetroButton";
import { RetroInput } from "../ui/retro/RetroInput";

export function RetroRegisterContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    router.push("/auth/login?registered=true");
  };

  return (
    <div className="h-full flex items-center justify-center p-4 retro-text overflow-auto">
      <div
        style={{
          width: "380px",
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
          <span>📝 New User Registration - NeoBB</span>
          <span style={{ cursor: "pointer" }}>✕</span>
        </div>

        {/* Content */}
        <div style={{ padding: "16px" }}>
          {/* Wizard Steps */}
          <div
            className="mb-4 p-2 text-xs text-center"
            style={{
              backgroundColor: "var(--win98-input-bg)",
              border: "1px inset var(--win98-border-dark)",
            }}
          >
            Step 1 of 1: Enter your information
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <RetroInput
                label="Username:"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                error={errors.username}
                required
              />
            </div>

            <div className="mb-2">
              <RetroInput
                label="Email:"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                required
              />
            </div>

            <div className="mb-2">
              <RetroInput
                label="Password:"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                required
              />
            </div>

            <div className="mb-2">
              <RetroInput
                label="Confirm Password:"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                required
              />
            </div>

            <div
              className="mb-3 p-2"
              style={{
                border: "1px solid var(--win98-border-dark)",
                backgroundColor: "var(--win98-input-bg)",
                maxHeight: "80px",
                overflow: "auto",
                fontSize: "10px",
              }}
            >
              <strong>Terms of Service</strong>
              <br />
              By registering, you agree to follow the community guidelines...<br />
              Be respectful to other members...<br />
              No spam or inappropriate content...
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                />
                I accept the Terms of Service
              </label>
              {errors.acceptTerms && (
                <div className="text-xs" style={{ color: "red" }}>{errors.acceptTerms}</div>
              )}
            </div>

            <div className="flex gap-2 justify-center mb-4">
              <RetroButton type="submit" variant="primary" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </RetroButton>
              <Link href="/portal">
                <RetroButton type="button">Cancel</RetroButton>
              </Link>
            </div>
          </form>

          <hr style={{ border: "1px inset var(--win98-border-dark)", margin: "12px 0" }} />

          <div className="text-center text-xs">
            Already have an account?{" "}
            <Link href="/auth/login" className="retro-link">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
