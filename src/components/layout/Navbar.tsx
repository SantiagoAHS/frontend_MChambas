"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 se agrega esto

const Navbar: React.FC = () => {
  const pathname = usePathname(); // 👈 obtener la ruta actual

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-red-600 font-bold text-lg cursor-pointer">
              MChambas
            </span>
          </Link>
        </div>

        {/* Menú principal */}
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
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
              servicios
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
