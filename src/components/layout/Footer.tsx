"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <footer
      className={`w-full px-6 py-4 flex justify-center items-center transition-colors duration-500 bg-red-500 shadow-md
        ${isLight ? "text-white" : "text-[#121212]"}
      `}
    >
      <span
        className={`text-sm text-center transition-colors duration-300
          ${isLight ? "text-white" : "text-[#121212]"}
        `}
      >
        &copy; {new Date().getFullYear()} MrChambas. Todos los derechos reservados.
      </span>
    </footer>
  );
}
