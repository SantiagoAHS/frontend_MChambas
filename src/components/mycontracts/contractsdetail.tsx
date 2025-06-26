"use client";
import React from "react";

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
  const handleView = (id: number) => {
    alert(`Ver detalles del contrato ${id}`);
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Mis Contratos</h2>

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
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                background: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                gap: "12px",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{contract.title}</div>
                <div style={{ color: "#555" }}>
                  Cliente: {contract.client} | Fecha: {contract.date} | Estado: {contract.status} | Total: ${contract.total}
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
