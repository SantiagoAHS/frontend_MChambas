"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderDetail = {
  id: number;
  servicio: {
    title: string;
    price: number;
  };
  fecha: string;
  estado: string;
  total: number;
};

const OrdersDetails: React.FC = () => {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/ventas/mis-pedidos/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.error("Error cargando pedidos");
        }
      })
      .catch((err) => console.error("Error de red:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetails = (id: number) => {
    router.push(`/myorders/${id}`);  // Navega a la ruta dinámica del detalle
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando pedidos...</p>;
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Servicios Pedidos</h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes órdenes registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                background: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {order.servicio?.title}
                </div>
                <div style={{ color: "#555" }}>
                  Fecha: {new Date(order.fecha).toLocaleDateString()} | Estado: {order.estado} | Precio: ${order.total}
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(order.id)}
                style={{
                  background: "#ff5733",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Ver detalles
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersDetails;
