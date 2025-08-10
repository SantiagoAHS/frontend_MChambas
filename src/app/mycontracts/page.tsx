// app/mycontracts/page.tsx
"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ContractsDetail from "@/components/mycontracts/contractsdetail";

export default function ContractsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="min-h-screen flex bg-gray-100">
        <main className="flex-1 p-8">
          {children}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Mis Trabajos</h2>
          </div>
          <div>
            <ContractsDetail />
          </div>
        </main>
      </div>
    </div>
  );
}
