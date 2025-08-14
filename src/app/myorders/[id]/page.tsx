'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function MyOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/api/ventas/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          console.error("Error cargando detalle de pedido");
        }
      })
      .catch((err) => console.error("Error de red:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Colores dinámicos según el tema
  const containerClasses =
    theme === "dark"
      ? "bg-[#1f1f1f] text-gray-100 border-purple-600"
      : "bg-white text-gray-800 border-green-600";

  if (loading) {
    return (
      <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
        Cargando detalle del pedido...
      </p>
    );
  }

  if (!order) {
    return (
      <p className={theme === "dark" ? "text-red-400" : "text-red-500"}>
        No se encontró el pedido.
      </p>
    );
  }

  return (
    <section
      className={`max-w-3xl mx-auto p-4 rounded shadow border transition-colors duration-300 ${containerClasses}`}
    >
      <h1 className="text-2xl font-bold mb-4">
        {order.servicio_detalle?.title
          ? `Detalle del Pedido: ${order.servicio_detalle.title}`
          : `Detalle del Pedido #${order.id}`}
      </h1>

      <p><strong>Cantidad:</strong> {order.cantidad}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <p><strong>Estado:</strong> {order.estado}</p>
      <p><strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}</p>
      <p><strong>Dirección:</strong> {order.address}, {order.city}, {order.state}, {order.postal_code}</p>
      <p><strong>Teléfono:</strong> {order.phone}</p>
      <p><strong>Comprador:</strong> {order.comprador}</p>
    </section>
  );
}