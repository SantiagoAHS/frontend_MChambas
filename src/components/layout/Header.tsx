"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <header
      className={`py-2 text-center text-xs transition-colors duration-500 bg-red-500
        ${isLight ? "text-white" : "text-[#121212]"}
      `}
    >
      Los mejores servicios · Servicio al cliente · Calidad garantizada · Precios competitivos
    </header>
  );
};

export default Header;
