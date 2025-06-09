// chat/page.tsx
"use client";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
