"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { href: "/user", label: "Inicio" },
  { href: "/mycontracts", label: "Mis Trabajos" },
  { href: "/services/create", label: "Crear Servicio" },
  { href: "/chat", label: "Mis Chats" },
  { href: "/settings", label: "Configuración" },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const isLight = theme === "light";

  return (
    <aside
      className={clsx(
        "w-64 shadow-md p-4 transition-colors duration-300",
        isLight ? "bg-white" : "bg-[#3a3a3a]"
      )}
    >
      <h2 className="text-xl font-bold text-orange-600 mb-6">Panel Usuario</h2>
      <nav className="space-y-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "block px-2 py-1 rounded transition",
              pathname === href
                ? isLight
                  ? "text-orange-600 border-l-4 border-orange-600 bg-orange-50 font-semibold"
                  : "text-orange-600 border-l-4 border-orange-600 bg-orange-900 font-semibold"
                : isLight
                  ? "text-gray-700 hover:text-orange-600"
                  : "text-gray-200 hover:text-orange-400"
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
