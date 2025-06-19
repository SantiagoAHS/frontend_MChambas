// chat/page.tsx
"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar role="user" />
      <div className="min-h-screen flex bg-gray-100">
        <main className="flex-1 p-8">{children}
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Mis Chats</h2>
            {/* Aquí puedes agregar la lógica para mostrar los chats del usuario */}
          </div>
        </main>
      </div>
    </div>
  );
}
