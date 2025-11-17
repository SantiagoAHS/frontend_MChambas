"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

type OrderDetail = {
  id: number;
  servicio_detalle: {
    title: string;
  };
  fecha: string;
  estado: string;
  total: number;
};

const OrdersDetails: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://mibackend-mchambas.onrender.com/api/ventas/mis-pedidos/", {
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
    router.push(`/myorders/${id}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando pedidos...</p>;
  }

  const background = isLight ? "#f2f2f2" : "#1f1f1f";
  const cardBg = isLight ? "#ffffff" : "#2a2a2a";

  const border = isLight ? "#ccc" : "#444";
  const text = isLight ? "#111" : "#e2e2e2";
  const secondaryText = isLight ? "#666" : "#bbb";

  const buttonBg = "#e60000";
  const buttonHover = isLight ? "#ffffff" : "#2c2c2c";
  const buttonText = "#ffffff";

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: background,
        color: text,
        transition: "0.3s ease",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "24px",
          fontSize: "20px",
          color: "#e60000",
          fontWeight: "bold",
        }}
      >
        Servicios Pedidos
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes órdenes registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {orders.map((order) => (
            <li
              key={order.id}
              style={{
                width: "100%",
                border: `1px solid ${border}`,
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                background: cardBg,
                boxShadow: isLight
                  ? "0 2px 4px rgba(0,0,0,0.05)"
                  : "0 2px 4px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                transition: "0.3s",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: "4px",
                    color: "#e60000",
                  }}
                >
                  {order.servicio_detalle?.title || "Título no disponible"}
                </div>
                <div style={{ color: secondaryText }}>
                  Fecha: {new Date(order.fecha).toLocaleDateString()} | Estado:{" "}
                  {order.estado} | Precio: ${order.total}
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(order.id)}
                style={{
                  background: buttonBg,
                  color: buttonText,
                  border: "1px solid transparent",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = buttonHover;
                  e.currentTarget.style.color = buttonBg;
                  e.currentTarget.style.border = `1px solid ${buttonBg}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = buttonBg;
                  e.currentTarget.style.color = buttonText;
                  e.currentTarget.style.border = "1px solid transparent";
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
