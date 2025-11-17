"use client";

import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const ServiceCardUser = ({ service }) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const cardBg = isLight ? "#ffffff" : "#2a2a2a";
  const textColor = isLight ? "#1f1f1f" : "#f5f5f5";
  const secondaryColor = isLight ? "#666666" : "#d1d1d1";

  const borderColor = "#ef4444"; 

  const shadowColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.35)";

  return (
    <div
      className="border rounded-lg overflow-hidden transition-shadow cursor-pointer hover:shadow-lg"
      style={{
        backgroundColor: cardBg,
        color: textColor,
        borderColor,
        borderWidth: "1px",
        boxShadow: `0 2px 6px ${shadowColor}`,
      }}
    >
      <Link href={`/services/${service.id}`}>
        <div className="relative cursor-pointer">
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            className="w-full h-48 object-cover"
          />

          {service.verified && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              Verificado
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-red-500">
          {service.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
            {service.provider?.nombre?.[0] || "?"}
          </div>
          <span className="text-sm" style={{ color: secondaryColor }}>
            {service.provider?.nombre || "Sin nombre"}
          </span>
        </div>

        <p className="text-sm mb-3" style={{ color: secondaryColor }}>
          {service.description}
        </p>

        <div className="flex items-center gap-4 text-sm mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{service.rating}</span>
            <span style={{ color: secondaryColor }}>({service.reviews})</span>
          </div>

          <div className="flex items-center gap-1" style={{ color: secondaryColor }}>
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm mb-4" style={{ color: secondaryColor }}>
          <Clock className="w-4 h-4" />
          <span>Responde en {service.responseTime}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-500">
            {service.price}
          </span>

          <Link
            href={`/services/update/${service.id}`}
            className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 transition"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardUser;
