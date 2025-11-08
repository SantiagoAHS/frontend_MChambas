"use client";
import { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
  provider: {
    id: number;
    username: string;
    email: string;
  };
  verified: boolean;
  description: string;
  price: string;
}

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Obtener token desde localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Cargar lista de servicios
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/services/verify/services/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error al cargar servicios:", err))
      .finally(() => setLoading(false));
  }, [token]);

  // 🔹 Cambiar estado de verificación
  const toggleVerification = async (id: number, current: boolean) => {
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/services/verify/services/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ verified: !current }),
        }
      );

      if (!res.ok) throw new Error("Error al actualizar verificación");

      setServices((prev) =>
        prev.map((srv) =>
          srv.id === id ? { ...srv, verified: !current } : srv
        )
      );
    } catch (err) {
      console.error("Error al cambiar verificación:", err);
      alert("No se pudo actualizar el estado de verificación.");
    }
  };

  if (loading) return <p className="text-center mt-8">Cargando servicios...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Verificación de Servicios</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Título</th>
              <th className="p-3 border">Proveedor</th>
              <th className="p-3 border">Precio</th>
              <th className="p-3 border">Verificado</th>
              <th className="p-3 border">Acción</th>
            </tr>
          </thead>
          <tbody>
            {services.map((srv) => (
              <tr key={srv.id} className="text-center">
                <td className="p-3 border">{srv.id}</td>
                <td className="p-3 border">{srv.title}</td>
                <td className="p-3 border">{srv.provider?.username}</td>
                <td className="p-3 border">${srv.price}</td>
                <td className="p-3 border">
                  {srv.verified ? (
                    <span className="text-green-600 font-semibold">Sí</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => toggleVerification(srv.id, srv.verified)}
                    className={`px-3 py-1 rounded ${
                      srv.verified
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white transition`}
                  >
                    {srv.verified ? "Revocar" : "Verificar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
