// services/create/page.tsx
"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Servicescreate from "@/components/services/Servicescreate";

export default function CreateServicePage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear nuevo servicio</h2>
        <Servicescreate />
      </main>
    </div>
  );
}
