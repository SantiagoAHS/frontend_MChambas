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

    fetch(`https://mibackend-mchambas.onrender.com/api/ventas/${id}/`, {
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
      {order.estado === "cancelado" && (
        <div
          className={`mt-4 p-4 rounded-lg border-l-4 ${
            theme === "dark"
              ? "bg-red-900 border-red-500 text-red-200"
              : "bg-red-100 border-red-500 text-red-700"
          }`}
        >
          <h3 className="font-semibold">El vendedor canceló el pedido</h3>
          <p className="text-sm mt-1">
            El vendedor no completó el servicio. Tu dinero será reembolsado y se verá reflejado en tu cuenta en un plazo de <strong>3 a 5 días hábiles</strong>.
          </p>
        </div>
      )}

      {order.estado === "completado" && (
        <div
          className={`mt-4 p-4 rounded-lg border-l-4 ${
            theme === "dark"
              ? "bg-green-900 border-green-500 text-green-200"
              : "bg-green-100 border-green-500 text-green-700"
          }`}
        >
          <h3 className="font-semibold">Pedido completado</h3>
          <p className="text-sm mt-1">
            El servicio ha sido finalizado correctamente. El pago ya ha sido liberado al vendedor.
          </p>
        </div>
      )}

      <div
        className={`mt-6 p-4 rounded-lg border-l-4 ${
          theme === "dark"
            ? "bg-[#2a2a2a] border-orange-500 text-gray-200"
            : "bg-orange-50 border-orange-500 text-gray-800"
        }`}
      >
        <h3 className="font-semibold mb-2">Pago protegido</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Si el vendedor cancela la transacción, tu pago será reembolsado automáticamente.</li>
          <li>Si el vendedor no responde en un tiempo razonable, tu dinero será regresado.</li>
          <li>Para más información o soporte, contacta a <strong>soporte@mrchambasmx.com</strong>.</li>
        </ul>
      </div>
    </section>
  );
}