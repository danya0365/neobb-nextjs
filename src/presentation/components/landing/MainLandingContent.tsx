"use client";

import { animated, config, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";
import { MainButton } from "../ui/main/MainButton";

export function MainLandingContent() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Hero animation
  const heroSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  // Features
  const features = [
    {
      icon: "🏠",
      title: "Portal Homepage",
      description: "Drag & Drop จัดวาง layout, Widget-based Architecture",
    },
    {
      icon: "🧩",
      title: "Widget System",
      description: "Module แยก, เปิด/ปิด/จัดเรียงได้ตามต้องการ",
    },
    {
      icon: "💬",
      title: "Forum System",
      description: "Category → Board → Thread → Post แบบมาตรฐานสากล",
    },
    {
      icon: "👥",
      title: "User & Role",
      description: "Role-based permission, Badge, Reputation System",
    },
    {
      icon: "🎨",
      title: "Theme System",
      description: "เปลี่ยน theme ได้ทันที, Dark/Light mode, Custom palette",
    },
    {
      icon: "🔌",
      title: "Plugin System",
      description: "Hook & event-based, Community plugin friendly",
    },
  ];

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden">
      {/* Hero Section */}
      <animated.div
        style={heroSpring}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            NeoBB
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Modern Web Forum / Community Platform
          <br />
          <span className="text-sm">Open Source • Modular • Customizable</span>
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/forum">
            <MainButton variant="primary" icon="🚀">
              เริ่มใช้งาน
            </MainButton>
          </Link>
          <Link href="/docs">
            <MainButton variant="secondary" icon="📖">
              เอกสาร
            </MainButton>
          </Link>
        </div>
      </animated.div>

      {/* Features Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            isHovered={hoveredFeature === index}
            onHover={() => setHoveredFeature(index)}
            onLeave={() => setHoveredFeature(null)}
            delay={index * 100}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8 py-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          🚀 NeoBB ไม่ใช่แค่ &quot;เว็บบอร์ด&quot; แต่เป็น{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            Community Engine
          </strong>{" "}
          ที่คุณสามารถควบคุมได้เต็มที่
        </p>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}

function FeatureCard({
  icon,
  title,
  description,
  isHovered,
  onHover,
  onLeave,
  delay,
}: FeatureCardProps) {
  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay,
    config: config.gentle,
  });

  const hoverSpring = useSpring({
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    boxShadow: isHovered
      ? "0 20px 40px rgba(99, 102, 241, 0.15)"
      : "0 4px 6px rgba(0, 0, 0, 0.05)",
    config: config.stiff,
  });

  return (
    <animated.div
      style={{ ...spring, ...hoverSpring }}
      className="p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </animated.div>
  );
}
