// chat/page.tsx
"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import MyChats from "@/components/chat/mychats";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar role="user" />
      <div className="min-h-screen flex bg-gray-100">
        <main className="flex-1 p-8">
          {children}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Mis Chats</h2>
            <div className="text-gray-600 mt-2">
              <MyChats />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
