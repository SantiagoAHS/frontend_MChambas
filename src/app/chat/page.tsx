// chat/page.tsx
"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import MyChats from "@/components/chat/mychats";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {children}
        <div className="mt-6">
          <div className="text-gray-600 mt-2">
            <MyChats />
          </div>
        </div>
      </main>
    </div>
  );
}
