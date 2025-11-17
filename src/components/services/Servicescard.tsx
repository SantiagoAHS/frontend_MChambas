"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const ServiceCard = ({ service }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleContact = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para contactar");
      return;
    }

    try {
      const res = await fetch("https://mibackend-mchambas.onrender.com/api/chats/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ other_user_id: service.provider.id }),
      });

      if (!res.ok) throw new Error("No se pudo crear el chat");

      const chat = await res.json();

      await fetch(`https://mibackend-mchambas.onrender.com/api/chats/${chat.id}/send/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          content: "Hola, estoy interesado en tu servicio",
        }),
      });

      router.push("/chat");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al contactar");
    }
  };

  const borderColor = "#ef4444"; 
  const accentRed = "#ef4444";

  return (
    <Link href={`/services/${service.id}`} className="h-full">
      <div
        className="flex flex-col h-full rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
        style={{
          border: `2px solid ${borderColor}`,
          background: isLight ? "#ffffff" : "#1f1f1f",
          color: isLight ? "#000000" : "#e5e5e5",
        }}
      >
        <div className="relative">
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

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-1" style={{ color: accentRed }}>
            {service.title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
              {service.provider?.nombre?.[0] || "?"}
            </div>
            <span className="text-sm text-gray-500">
              {service.provider?.nombre || "Sin nombre"}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-3" style={{ flexGrow: 1 }}>
            {service.description}
          </p>

          <div className="flex items-center gap-4 text-sm mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-gray-500">({service.reviews})</span>
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
            <Clock className="w-4 h-4" />
            <span>Responde en {service.response_time}</span>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold" style={{ color: accentRed }}>
              {service.price}
            </span>

            <button
            onClick={handleContact}
            className="
              font-semibold px-4 py-2 rounded shadow transition border-2
              bg-red-500 text-white border-red-500
              hover:bg-white hover:text-red-500 hover:border-red-500
            "
          >
            Contactar
          </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
