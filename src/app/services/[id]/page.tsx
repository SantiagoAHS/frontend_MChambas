"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ServicesReviews from "@/components/services/Servicesreviews";

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchService() {
      const res = await fetch(`http://localhost:8000/api/services/${id}/`, {
        cache: "no-store",
      });

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

      await fetch(`http://localhost:8000/api/chats/${chat.id}/send/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ content: "Hola, estoy interesado en tu servicio" }),
      });

      router.push("/chat");
    } catch (err) {
      console.error(err);
      alert("Error al contactar con el proveedor");
    }
  };

  if (error) return <div className="p-6">Servicio no encontrado</div>;
  if (!service) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p className="text-gray-600 mb-4">
          Ofrecido por: <strong>{service.provider.nombre}</strong>
        </p>

        {service.image && (
          <img
            src={`http://localhost:8000${service.image}`}
            alt={service.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <p className="text-gray-700 mb-4">{service.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {service.verified && (
            <div className="text-green-600 font-semibold">✅ Profesional verificado</div>
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
            <strong>Valoración:</strong> {service.rating} ⭐ ({service.reviews} reseñas)
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleContact}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Contactar
          </button>

          <button
            onClick={() => router.push(`/payments/checkout/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
