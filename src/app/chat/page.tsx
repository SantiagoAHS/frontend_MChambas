"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import MyChats from "@/components/chat/mychats";
import { useTheme } from "@/context/ThemeContext";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#1f1f1f]" : "bg-gray-100";
  const text = isDark ? "text-gray-100" : "text-gray-600";

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${bg}`}>
      <Sidebar />
      
      <main className="flex-1 p-8">
        {children}
        <div className="mt-6">
          <div className={`mt-2 transition-colors duration-300 ${text}`}>
            <MyChats />
          </div>
        </div>
      </main>
    </div>
  );
}
