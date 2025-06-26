"use client";
import React from "react";

type OrderDetail = {
  id: number;
  service: string;
  date: string;
  status: string;
  price: number;
};

const mockOrders: OrderDetail[] = [
  {
    id: 1,
    service: "Limpieza de hogar",
    date: "2024-06-10",
    status: "Completado",
    price: 350,
  },
  {
    id: 2,
    service: "Reparación de plomería",
    date: "2024-06-08",
    status: "En proceso",
    price: 500,
  },
];

const OrdersDetails: React.FC = () => {
  const handleViewDetails = (id: number) => {
    alert(`Ver detalles de la orden con ID: ${id}`);
    // O podrías usar router.push(`/orders/${id}`) si tienes una página por ID
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Servicios Pedidos</h1>

      {mockOrders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes órdenes registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {mockOrders.map((order) => (
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
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{order.service}</div>
                <div style={{ color: "#555" }}>
                  Fecha: {order.date} | Estado: {order.status} | Precio: ${order.price}
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
