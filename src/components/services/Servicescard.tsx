"use client";

import { useRouter } from "next/navigation";
import { Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({ service }) => {
  const router = useRouter();

  const handleContact = async (e) => {
    e.stopPropagation(); // <- evita que se active el Link
    e.preventDefault();  // <- evita navegación automática

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para contactar");
      return;
    }

    try {
      // 1. Crear o recuperar el chat
      const res = await fetch("http://localhost:8000/api/chats/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ other_user_id: service.provider.id }),
      });

      if (!res.ok) throw new Error("No se pudo crear el chat");

      const chat = await res.json();

      // 2. Enviar mensaje inicial
      await fetch(`http://localhost:8000/api/chats/${chat.id}/send/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ content: "Hola, estoy interesado en tu servicio" }),
      });

      // 3. Redirigir al chat general
      router.push("/chat"); // o a `/chat/${chat.id}` si quieres ir a ese chat directamente

    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al contactar");
    }
  };

  return (
    <Link href={`/services/${service.id}`}>
      <div className="border border-orange-600 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer bg-white">
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
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
              {service.provider?.nombre?.[0] || "?"}
            </div>
            <span className="text-sm text-gray-500">
              {service.provider?.nombre || "Sin nombre"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
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
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">{service.price}</span>
            <button
              onClick={handleContact}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
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
