"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleViewDetails = (id: number) => {
    alert(`Ver detalles de la orden con ID: ${id}`);
  };

  const background = isLight ? "#f9f9f9" : "#1e1e1e";
  const border = isLight ? "#ddd" : "#444";
  const text = isLight ? "#111" : "#ddd";
  const secondaryText = isLight ? "#555" : "#aaa";
  const buttonBg = isLight ? "#ff6600" : "#ff6600";
  const buttonHover = isLight ? "#ffffff" : "#222";
  const buttonText = "#ffffff";

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: isLight ? "#ffffff" : "#3a3a3a",
        color: text,
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <h1
  style={{
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "20px",
    color: "#ff6600",
  }}
>
  Servicios Pedidos
</h1>

      {mockOrders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes órdenes registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {mockOrders.map((order) => (
            <li
              key={order.id}
              style={{
                width: "100%",
                border: `1px solid ${border}`,
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                background: background,
                boxShadow: isLight
                  ? "0 2px 4px rgba(0,0,0,0.05)"
                  : "0 2px 4px rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                transition: "background-color 0.3s, border 0.3s",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div
                  style={{ fontWeight: "bold", marginBottom: "4px", color: text }}
                >
                  {order.service}
                </div>
                <div style={{ color: secondaryText }}>
                  Fecha: {order.date} | Estado: {order.status} | Precio: ${order.price}
                </div>
              </div>
              <button
                onClick={() => handleViewDetails(order.id)}
                style={{
                  background: buttonBg,
                  color: buttonText,
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  transition: "background 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = buttonHover;
                  e.currentTarget.style.color = isLight ? buttonBg : buttonBg;
                  e.currentTarget.style.border = `1px solid ${buttonBg}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = buttonBg;
                  e.currentTarget.style.color = buttonText;
                  e.currentTarget.style.border = "none";
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
