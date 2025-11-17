"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import ServicesReviews from "@/components/services/Servicesreviews";

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const button = isDark
    ? "bg-red-500 text-white border-red-500 hover:bg-[#2a2a2a] hover:text-red-500"
    : "bg-red-500 text-white border-red-500 hover:bg-white hover:text-red-500";

  useEffect(() => {
    async function fetchService() {
      const res = await fetch(
        `https://mibackend-mchambas.onrender.com/api/services/${id}/`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        setError(true);
        return;
      }

      const data = await res.json();
      setService(data);
    }

    if (id) fetchService();
  }, [id]);

  const handleContact = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para contactar");
      return;
    }

    try {
      const res = await fetch(
        "https://mibackend-mchambas.onrender.com/api/chats/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ other_user_id: service.provider.id }),
        }
      );

      if (!res.ok) throw new Error("No se pudo crear el chat");

      const chat = await res.json();

      await fetch(
        `https://mibackend-mchambas.onrender.com/api/chats/${chat.id}/send/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            content: "Hola, estoy interesado en tu servicio",
          }),
        }
      );

      router.push("/chat");
    } catch (err) {
      console.error(err);
      alert("Error al contactar con el proveedor");
    }
  };

  if (error) return <div className="p-6">Servicio no encontrado</div>;
  if (!service) return <div className="p-6">Cargando...</div>;

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" ? "bg-[#3a3a3a] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto p-6 rounded shadow border ${
          theme === "dark"
            ? "bg-[#2b2b2b] border-red-500"
            : "bg-white border-red-500"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p
          className={`mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Ofrecido por: <strong>{service.provider.nombre}</strong>
        </p>

        {service.image && (
          <img
            src={`https://mibackend-mchambas.onrender.com${service.image}`}
            alt={service.title}
            className="w-full h-64 object-cover rounded mb-4 border border-gray-400"
          />
        )}

        <p className="mb-4">{service.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {service.verified && (
            <div className="text-green-500 font-semibold">
              ✅ Profesional verificado
            </div>
          )}
          <div>
            <strong>Ubicación:</strong> {service.location}
          </div>
          <div>
            <strong>Responde en:</strong> {service.response_time}
          </div>
          <div>
            <strong>Precio:</strong> {service.price}
          </div>
          <div>
            <strong>Valoración:</strong> {service.rating} ⭐ ({service.reviews}{" "}
            reseñas)
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleContact}
            className={`px-4 py-2 rounded font-semibold border-2 transition ${button}`}
          >
            Contactar
          </button>

          <button
            onClick={() => router.push(`/payments/checkout/${id}`)}
            className={`px-4 py-2 rounded font-semibold border-2 transition ${button}`}
          >
            Contratar
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        <ServicesReviews serviceId={parseInt(id as string, 10)} />
      </div>
    </div>
  );
}
