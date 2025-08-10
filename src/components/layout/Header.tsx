"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header
      className={`py-2 text-center text-xs ${
        theme === "light"
          ? "bg-green-500 text-black"
          : "bg-purple-500 text-white"
      }`}
    >
      Los mejores servicios · Servicio al cliente · Calidad garantizada · Precios competitivos
    </header>
  );
};

export default Header;
