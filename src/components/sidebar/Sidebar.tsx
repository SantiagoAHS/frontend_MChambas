"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isLight = theme === "light";

  // Cierra el sidebar si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Botón flotante para abrir en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-2 top-1/2 z-50 p-2 rounded-full shadow-md md:hidden"
        style={{
          backgroundColor: isLight ? "#ffffff" : "#3a3a3a",
          border: "1px solid #d1d5db", // gris-200
        }}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5 text-orange-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-orange-500" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 left-0 h-full w-64 shadow-md p-4 transition-transform duration-300 z-40",
          isLight ? "bg-white" : "bg-[#3a3a3a]",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:h-auto" // En escritorio siempre visible y relativo
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
              onClick={() => setIsOpen(false)} // Cerrar en móvil
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
