"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface Contract {
  id: number;
  title: string;
  date: string;
  status: "Completado" | "En curso" | "Cancelado";
  client: string;
  total: number;
}

const mockContracts: Contract[] = [
  {
    id: 1,
    title: "Pintura de fachada",
    date: "2024-05-20",
    status: "Completado",
    client: "Carlos Martínez",
    total: 1500,
  },
  {
    id: 2,
    title: "Instalación de aire acondicionado",
    date: "2024-06-12",
    status: "En curso",
    client: "Ana Torres",
    total: 2800,
  },
];

const ContractsDetail: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleView = (id: number) => {
    alert(`Ver detalles del contrato ${id}`);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: isLight ? "white" : "#2a2a2a",
        color: isLight ? "#000" : "#eee",
        borderRadius: "12px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "24px",
          color: isLight ? "#ff6600" : "#ff6600",
        }}
      >
        Mis Contratos
      </h2>

      {mockContracts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes contratos aún.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {mockContracts.map((contract) => (
            <li
              key={contract.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: isLight ? "1px solid #ddd" : "1px solid #444",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                background: isLight ? "#f9f9f9" : "#3a3a3a",
                boxShadow: isLight
                  ? "0 2px 4px rgba(0,0,0,0.05)"
                  : "0 2px 4px rgba(255,255,255,0.05)",
                gap: "12px",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {contract.title}
                </div>
                <div style={{ color: isLight ? "#555" : "#ccc" }}>
                  Cliente: {contract.client} | Fecha: {contract.date} | Estado: {contract.status} | Total: ${contract.total}
                </div>
              </div>

              {/* Botón con efecto hover */}
              <button
                onClick={() => handleView(contract.id)}
                style={{
                  backgroundColor: "#ff6600",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#ff6600";
                  e.currentTarget.style.border = "1px solid #ff6600";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff6600";
                  e.currentTarget.style.color = "#fff";
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

export default ContractsDetail;
