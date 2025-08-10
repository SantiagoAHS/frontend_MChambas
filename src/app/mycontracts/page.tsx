"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ContractsDetail from "@/components/mycontracts/contractsdetail";
import { useTheme } from "@/context/ThemeContext";

export default function ContractsLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className={isLight ? "min-h-screen flex bg-gray-100" : "min-h-screen flex bg-[#1f1f1f]"}>
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
        <div className="mt-6">
          <h2 className={`text-2xl font-bold ${isLight ? "text-gray-800" : "text-gray-200"}`}>Mis Trabajos</h2>
        </div>
        <div>
          <ContractsDetail />
        </div>
      </main>
    </div>
  );
}
