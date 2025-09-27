"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

interface Contract {
  id: number;
  servicio_detalle: {
    title: string;
  };
  fecha: string;
  estado: string;
  comprador: string;
  total: number;
}

const ContractsDetail: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme(); // modo actual
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/ventas/mis-ventas/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setContracts(data);
        } else {
          console.error("Error cargando contratos");
        }
      })
      .catch((err) => console.error("Error de red:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleView = (id: number) => {
    router.push(`/mycontracts/${id}`);
  };

  if (loading) {
    return <p className="text-center">Cargando contratos...</p>;
  }

  return (
    <div
      className="w-full p-5 min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#f1f1f1" : "#000000",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
        Mis Contratos
      </h2>

      {contracts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tienes contratos aún.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {contracts.map((contract) => (
            <li
              key={contract.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "8px",
                backgroundColor:
                  theme === "dark" ? "#4B0082" : "#90EE90", // morado en dark, verde claro en light
                color: theme === "dark" ? "#fff" : "#000",
                transition: "background-color 0.3s ease, color 0.3s ease",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {contract.servicio_detalle?.title || "Título no disponible"}
                </div>
                <div style={{ fontSize: "14px" }}>
                  Cliente: {contract.comprador || "Nombre no disponible"} | Fecha:{" "}
                  {new Date(contract.fecha).toLocaleDateString()} | Estado:{" "}
                  {contract.estado} | Total: ${contract.total}
                </div>
              </div>
              <button
                onClick={() => handleView(contract.id)}
                style={{
                  background: theme === "dark" ? "#ff6600" : "#ff6600",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
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