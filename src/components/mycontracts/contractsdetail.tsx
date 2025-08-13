"use client";
import { useTheme } from "@/context/ThemeContext";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Contract {
  id: number;
  servicio_detalle: {
    title: string;
  };
  fecha: string;
  estado: string;
  comprador: string;  // Ahora es string
  total: number;
}

const ContractsDetail: React.FC = () => {
  const router = useRouter();
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
          console.log("Respuesta contratos:", data);
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
    return <p style={{ textAlign: "center" }}>Cargando contratos...</p>;
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Mis Contratos</h2>

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
                background: "#f9f9f9",
                borderRadius: "8px",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  {contract.servicio_detalle?.title || "Título no disponible"}
                </div>
                <div style={{ color: "#555" }}>
                  Cliente: {contract.comprador || "Nombre no disponible"} | Fecha:{" "}
                  {new Date(contract.fecha).toLocaleDateString()} | Estado:{" "}
                  {contract.estado} | Total: ${contract.total}
                </div>
              </div>
              <button
                onClick={() => handleView(contract.id)}
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

export default ContractsDetail;
