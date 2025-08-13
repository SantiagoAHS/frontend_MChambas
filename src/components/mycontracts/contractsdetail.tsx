"use client";
import { useTheme } from "@/context/ThemeContext";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Contract {
  id: number;
  servicio: {
    title: string;
  };
  fecha: string;
  estado: string;
  comprador: {
    nombre: string;
  };
  total: number;
}

const ContractsDetail: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/mycontracts/${id}`);
  };

  // Como no tienes el estado contracts ni loading, si los necesitas, debes agregarlos y la lógica fetch

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
          color: "#ff6600",
        }}
      >
        Mis Contratos
      </h2>

      {/* Aquí debería ir la lista de contratos si los tienes */}
      {/* Puedes agregar la lógica para mostrar contratos */}
      
      <p style={{ textAlign: "center" }}>No tienes contratos aún.</p>

      <button
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
    </div>
  );
};

export default ContractsDetail;
