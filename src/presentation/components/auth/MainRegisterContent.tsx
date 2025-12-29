"use client";

import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";
import { MainInput } from "../ui/main/MainInput";

export function MainRegisterContent() {
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

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.username.length < 3) {
      newErrors.username = "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (formData.password.length < 6) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "กรุณายอมรับเงื่อนไขการใช้งาน";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success
    router.push("/auth/login?registered=true");
  };

  return (
    <div className="h-full flex items-center justify-center p-6 overflow-auto">
      <animated.div 
        style={fadeIn}
        className="w-full max-w-md my-8"
      >
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="text-5xl mb-3">📝</div>
            <h1 className="text-2xl font-bold text-white mb-1">สมัครสมาชิก</h1>
            <p className="text-purple-100 text-sm">เข้าร่วมชุมชน NeoBB</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <MainInput
              label="ชื่อผู้ใช้"
              type="text"
              placeholder="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              error={errors.username}
              required
            />

            <MainInput
              label="อีเมล"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />

            <MainInput
              label="รหัสผ่าน"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              required
            />

            <MainInput
              label="ยืนยันรหัสผ่าน"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              required
            />

            <div>
              <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span>
                  ฉันยอมรับ{" "}
                  <Link href="/terms" className="text-purple-600 hover:underline">
                    เงื่อนไขการใช้งาน
                  </Link>
                  {" "}และ{" "}
                  <Link href="/privacy" className="text-purple-600 hover:underline">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
              )}
            </div>

            <MainButton 
              type="submit" 
              variant="primary" 
              isLoading={loading}
              className="w-full"
            >
              สมัครสมาชิก
            </MainButton>

            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                มีบัญชีอยู่แล้ว?{" "}
              </span>
              <Link href="/auth/login" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                เข้าสู่ระบบ
              </Link>
            </div>
          </form>
        </div>
      </animated.div>
    </div>
  );
}
