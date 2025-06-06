// components/layouts/AdminLayout.tsx
"use client";
import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-red-600 mb-6">Panel Admin</h2>
        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="block text-gray-700 hover:text-red-600"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="block text-gray-700 hover:text-red-600"
          >
            Usuarios
          </Link>
          <Link
            href="/admin/offers"
            className="block text-gray-700 hover:text-red-600"
          >
            Ofertas
          </Link>
          <Link
            href="/admin/settings"
            className="block text-gray-700 hover:text-red-600"
          >
            Configuración
          </Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
