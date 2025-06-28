"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/user", label: "Inicio" },
  { href: "/mycontracts", label: "Mis Trabajos" },
  { href: "/services/create", label: "Crear Servicio" },
  { href: "/chat", label: "Mis Chats" },
  { href: "/settings", label: "Configuración" },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold text-red-600 mb-6">Panel Usuario</h2>
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
