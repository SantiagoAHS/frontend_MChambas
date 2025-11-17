"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Alta Calidad",
    description:
      "Solo ofrecemos servicios de la mejor calidad para nuestros clientes.",
    icon: (
      <svg
        className="w-12 h-12 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Disponibilidad 24/7",
    description:
      "Nuestro equipo está siempre disponible para ayudarte cuando nos necesites.",
    icon: (
      <svg
        className="w-12 h-12 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Fácil de Usar",
    description:
      "Interfaz intuitiva y diseño pensado en la mejor experiencia para el usuario.",
    icon: (
      <svg
        className="w-12 h-12 text-red-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
];

const Features: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      className="features-section py-16 px-6 transition-colors duration-300"
      style={{ backgroundColor: isLight ? "#f9fafb" : "#3a3a3a" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`feature-card p-6 rounded shadow hover:shadow-lg transition duration-300 border-t-4 border-red-500
              ${
                isLight
                  ? "bg-white text-gray-800 hover:bg-red-50"
                  : "bg-[#1e1e1e] text-gray-100 hover:bg-[#2a2a2a]"
              }
            `}
          >
            <div className="icon mb-4 mx-auto">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className={isLight ? "text-gray-600" : "text-gray-400"}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
