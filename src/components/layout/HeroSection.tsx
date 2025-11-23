"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className="hero-section py-10 px-4 flex justify-center transition-colors duration-500 bg-red-500"
    >
      <div
        className={`flex flex-col items-center justify-center text-center w-full max-w-3xl transition-colors duration-300
          ${isLight ? "text-white" : "text-[#121212]"}
        `}
      >
        {/* LOGO — sin margen inferior excesivo */}
        <div className="mb-2">
          <img
            src="/images/result_logo.png"
            className="w-[300px] h-auto"
          />
        </div>

        {/* TÍTULO MÁS CERCA DEL LOGO */}
        <h1 className="text-4xl font-bold mb-3 leading-tight">
          Bienvenido a Nuestra Plataforma
        </h1>

        {/* PÁRRAFO MÁS PEGADO */}
        <p className="text-lg max-w-xl mb-5 leading-snug">
          Aquí puedes encontrar las mejores soluciones para tus necesidades.
          Explora y descubre todo lo que tenemos preparado para ti.
        </p>

        {/* BOTÓN */}
        <button
          className={`font-semibold px-8 py-3 rounded shadow transition border-2
            ${
              isLight
                ? "bg-red-600 border-red-600 text-white hover:bg-white hover:text-red-600"
                : "bg-gray-700 border-gray-700 text-white hover:bg-gray-900"
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
