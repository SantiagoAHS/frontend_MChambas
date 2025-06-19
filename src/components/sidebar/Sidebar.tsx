// components/sidebar/Sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Role = "admin" | "user";

interface SidebarProps {
  role: Role;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();

  const links = role === "admin"
    ? [
        { href: "/admin/profile", label: "Inicio" },
        { href: "/admin/jobs", label: "Mis trabajos" },
        { href: "/admin/settings", label: "Configuración" },
      ]
    : [
        { href: "/user", label: "Inicio" },
        { href: "/myorders", label: "Mis Compras" },
        { href: "/chat", label: "Mis Chats" },
        { href: "/user/settings", label: "Configuración" },
      ];

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold text-red-600 mb-6">
        {role === "admin" ? "Panel Admin" : "Panel Usuario"}
      </h2>
      <nav className="space-y-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "block px-2 py-1 rounded",
              pathname === href
                ? "text-red-600 border-l-4 border-red-600 bg-red-50 font-semibold"
                : "text-gray-700 hover:text-red-600"
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
