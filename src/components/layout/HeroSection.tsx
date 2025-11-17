"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className="hero-section py-20 px-4 flex justify-center transition-colors duration-500 bg-red-500"
    >
      <div
        className={`flex flex-col items-center justify-center text-center w-full max-w-4xl transition-colors duration-300
          ${isLight ? "text-white" : "text-[#121212]"}
        `}
      >
        <h1 className="text-5xl font-bold mb-6">
          Bienvenido a Nuestra Plataforma
        </h1>
        <p className="text-xl max-w-2xl mb-8">
          Aquí puedes encontrar las mejores soluciones para tus necesidades.
          Explora y descubre todo lo que tenemos preparado para ti.
        </p>

        <button
          className={`
            font-semibold px-8 py-3 rounded shadow transition border-2
            bg-red-500 border-red-500
            ${
              isLight
                ? "text-white hover:bg-white hover:text-red-500"
                : "text-[#121212] hover:bg-[#121212] hover:text-white"
            }
          `}
        >
          Comenzar Ahora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
