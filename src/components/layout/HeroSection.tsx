"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section className="hero-section bg-gradient-to-r from-red-500 to-orange-600 py-20 px-4 flex justify-center">
      <div
        className={`flex flex-col items-center justify-center text-center w-full max-w-4xl transition-colors duration-300 ${
          isLight ? "text-white" : "text-black"
        }`}
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
            ${isLight ? "bg-green-500 text-white border-green-500 hover:bg-white hover:text-green-500" 
                      : "bg-purple-500 text-white border-purple-500 hover:bg-white hover:text-purple-500"}
          `}
        >
          Comenzar Ahora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
