"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext"; 

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { theme, toggleTheme } = useTheme(); 

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => window.removeEventListener("storage", checkToken);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <nav className="text-black dark:bg-gray dark:text-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="text-red-600 font-bold text-lg cursor-pointer">MChambas</span>
          </Link>
        </div>

        <ul className="flex space-x-6 text-sm font-medium text-gray-700 items-center">
          <li><Link href="/offers" className={`hover:text-red-600 ${pathname === "/offers" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""}`}>Ofertas</Link></li>
          <li><Link href="/services" className={`hover:text-red-600 ${pathname === "/services" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""}`}>Servicios</Link></li>
          <li><Link href="/myorders" className={`hover:text-red-600 ${pathname === "/myorders" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""}`}>Mis pedidos</Link></li>
          <li><Link href="/help" className={`hover:text-red-600 ${pathname === "/help" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""}`}>Ayuda</Link></li>
          <li><Link href="/about" className={`hover:text-red-600 ${pathname === "/about" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""}`}>Acerca de</Link></li>
          <li><Link href="/contact" className={`hover:text-red-600 ${pathname === "/contact" ? "text-orange-500 border-b-2 border-orange-500 pb-1" : ""}`}>Contacto</Link></li>

          <li>
            <button
              onClick={toggleTheme}
              className="rounded-full text-sm transition font-medium flex items-center justify-center"
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: "var(--button-background)",
                color: "var(--button-text)",
                border: "var(--button-border)",
                padding: 0,
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                if (theme === "dark") {
                  e.currentTarget.style.backgroundColor = "#3a3a3a";  // Hover oscuro personalizado
                } else {
                  e.currentTarget.style.backgroundColor = "var(--button-hover-background)";
                }
                e.currentTarget.style.color = "var(--button-hover-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--button-background)";
                e.currentTarget.style.color = "var(--button-text)";
              }}
              aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </li>

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
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/user"
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                        pathname === "/user" ? "text-orange-500" : "text-gray-700 hover:text-red-600"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`block px-4 py-2 text-sm ${
                        pathname === "/login"
                          ? "text-orange-500 bg-gray-100"
                          : "text-gray-700 hover:text-red-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/register"
                      className={`block px-4 py-2 text-sm ${
                        pathname === "/register"
                          ? "text-orange-500 bg-gray-100"
                          : "text-gray-700 hover:text-red-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
