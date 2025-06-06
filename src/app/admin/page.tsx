// components/layouts/AdminLayout.tsx
"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar role="admin" />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
