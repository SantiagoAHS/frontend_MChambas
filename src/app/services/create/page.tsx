"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Servicescreate from "@/components/services/Servicescreate";
import { useTheme } from "@/context/ThemeContext";

export default function CreateServicePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#1f1f1f]" : "bg-gray-100";
  const text = isDark ? "text-gray-100" : "text-gray-800";

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${bg}`}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${text}`}>
          Crear nuevo servicio
        </h2>
        <Servicescreate />
      </main>
    </div>
  );
}
