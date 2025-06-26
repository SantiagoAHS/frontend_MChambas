import ServicesReviews from "@/components/services/Servicesreviews";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const res = await fetch(`http://localhost:8000/api/services/${id}/`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const service = await res.json();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p className="text-gray-600 mb-4">
          Ofrecido por: <strong>{service.provider.nombre}</strong>
        </p>
        {service.image && (
          <img
            src={`http://localhost:8000${service.image}`} // <-- url completa al backend
            alt={service.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <p className="text-gray-700 mb-4">{service.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
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
          <div>
            <span className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Contactar
            </span>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Comentarios</h2>
        <p className="text-gray-600 mb-4">
          <ServicesReviews />
        </p>
      </div>
    </div>
  );
}
