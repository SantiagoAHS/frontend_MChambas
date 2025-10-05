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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null); 


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

  // Cierra dropdown perfil si click fuera
  useEffect(() => {
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => document.removeEventListener("mousedown", handleClickOutsideDropdown);
  }, []);

  // Cierra menú hamburguesa si click fuera
  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <nav className="text-black dark:bg-gray dark:text-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo y menú hamburguesa */}
        <div className="flex items-center space-x-2">
          <button
            className="lg:hidden flex flex-col gap-[4px] p-2 rounded-md bg-transparent"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            <span className="block w-6 h-[3px] bg-orange-500"></span>
            <span className="block w-6 h-[3px] bg-orange-500"></span>
            <span className="block w-6 h-[3px] bg-orange-500"></span>
          </button>

          <Link href="/">
            <span className="text-orange-500 font-bold text-lg cursor-pointer">
              MChambas
            </span>
          </Link>
        </div>


        {/* Links de navegación */}
        <ul
          ref={menuRef}
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col absolute top-20 left-0 w-auto bg-white border border-gray-200 shadow-md rounded-md p-2
          lg:bg-transparent lg:border-none lg:shadow-none lg:static lg:flex lg:flex-row lg:items-center lg:space-x-6 text-sm font-medium text-gray-700 dark:text-white z-50`}
        >

          <li>
            <Link
              href="/offers"
              className={`block px-4 py-2 hover:text-red-600 ${
                pathname === "/offers"
                  ? "text-orange-500 border-b-2 border-orange-500 lg:pb-1"
                  : ""
              }`}
            >
              Ofertas
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={`block px-4 py-2 hover:text-red-600 ${
                pathname === "/services"
                  ? "text-orange-500 border-b-2 border-orange-500 lg:pb-1"
                  : ""
              }`}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              href="/myorders"
              className={`block px-4 py-2 hover:text-red-600 ${
                pathname === "/myorders"
                  ? "text-orange-500 border-b-2 border-orange-500 lg:pb-1"
                  : ""
              }`}
            >
              Mis pedidos
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`block px-4 py-2 hover:text-red-600 ${
                pathname === "/about"
                  ? "text-orange-500 border-b-2 border-orange-500 lg:pb-1"
                  : ""
              }`}
            >
              Acerca de
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`block px-4 py-2 hover:text-red-600 ${
                pathname === "/contact"
                  ? "text-orange-500 border-b-2 border-orange-500 lg:pb-1"
                  : ""
              }`}
            >
              Contacto
            </Link>
          </li>
        </ul>

        {/* Botón de tema y perfil */}
        <div className="flex items-center space-x-4">
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
                e.currentTarget.style.backgroundColor = "#3a3a3a";
              } else {
                e.currentTarget.style.backgroundColor =
                  "var(--button-hover-background)";
              }
              e.currentTarget.style.color = "var(--button-hover-text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--button-background)";
              e.currentTarget.style.color = "var(--button-text)";
            }}
            aria-label={
              theme === "light"
                ? "Cambiar a modo oscuro"
                : "Cambiar a modo claro"
            }
          >
            {theme === "light" ? "🌙" : "☀"}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-orange-500 hover:text-orange-600 transition"
              aria-label="Cuenta"
              style={{ backgroundColor: "transparent", padding: 0 }}
            >
              <UserCircle className="w-7 h-7" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 border border-gray-200 shadow-md rounded-md z-50">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/user"
                      className={`block px-4 py-2  hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        pathname === "/user"
                          ? "text-orange-500"
                          : "text-gray-700 dark:text-white hover:text-red-600"
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
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
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
                          ? "text-orange-500 bg-gray-100 dark:bg-gray-600"
                          : "text-gray-700 dark:text-white hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/register"
                      className={`block px-4 py-2 text-sm ${
                        pathname === "/register"
                          ? "text-orange-500 bg-gray-100 dark:bg-gray-600"
                          : "text-gray-700 dark:text-white hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
