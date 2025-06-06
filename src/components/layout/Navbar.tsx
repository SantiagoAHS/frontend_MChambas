"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-red-600 font-bold text-lg cursor-pointer">MChambas</span>
          </Link>
        </div>

        {/* Menú principal */}
        <ul className="flex space-x-6 text-sm font-medium text-gray-700 items-center">
          <li>
            <Link
              href="/offers"
              className={`hover:text-red-600 ${
                pathname === "/offers" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""
              }`}
            >
              Ofertas
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={`hover:text-red-600 ${
                pathname === "/services" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""
              }`}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              href="/myorders"
              className={`hover:text-red-600 ${
                pathname === "/myorders" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""
              }`}
            >
              Mis pedidos
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className={`hover:text-red-600 ${
                pathname === "/help" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""
              }`}
            >
              Ayuda
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`hover:text-red-600 ${
                pathname === "/about" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""
              }`}
            >
              Acerca de
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`hover:text-red-600 ${
                pathname === "/contact" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""
              }`}
            >
              Contacto
            </Link>
          </li>

        {/* Inicio de sesión y Registro */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 hover:text-red-600 transition"
              aria-label="Cuenta"
            >
              <UserCircle className="w-7 h-7" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md z-50">
                <Link
                  href="/login"
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                    pathname === "/login" ? "text-orange-500" : "text-gray-700"
                  }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                    pathname === "/register" ? "text-orange-500" : "text-gray-700"
                  }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
