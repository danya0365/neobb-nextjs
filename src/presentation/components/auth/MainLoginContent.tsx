"use client";

import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

export function MainLoginContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.username === "admin" && formData.password === "admin") {
      router.push("/portal");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <animated.div 
        style={fadeIn}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-white mb-1">เข้าสู่ระบบ</h1>
            <p className="text-indigo-100 text-sm">ยินดีต้อนรับกลับมา!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                ⚠️ {error}
              </div>
            )}

            <MainInput
              label="ชื่อผู้ใช้ หรือ อีเมล"
              type="text"
              placeholder="username หรือ email@example.com"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <MainInput
              label="รหัสผ่าน"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                จดจำฉัน
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>

            <MainButton 
              type="submit" 
              variant="primary" 
              isLoading={loading}
              className="w-full"
            >
              เข้าสู่ระบบ
            </MainButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">หรือ</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                ยังไม่มีบัญชี?{" "}
              </span>
              <Link href="/auth/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                สมัครสมาชิก
              </Link>
            </div>
          </form>
        </div>

        {/* Demo hint */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          💡 Demo: username &quot;admin&quot;, password &quot;admin&quot;
        </p>
      </animated.div>
    </div>
  );
}
