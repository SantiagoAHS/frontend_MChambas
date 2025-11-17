"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

interface ServicioDetalle {
  title: string;
  price: number;
  description?: string;
}

interface ContractDetail {
  id: number;
  servicio_detalle: ServicioDetalle;
  fecha: string;
  estado: string;
  comprador: string;
  cantidad: number;
  total: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
}

export default function ContractDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [contract, setContract] = useState<ContractDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setContract(data);
          setNewStatus(data.estado);
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChangeStatus = async () => {
    if (!contract || newStatus === contract.estado) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No autorizado");
      return;
    }

    const response = await fetch(
      `https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/${contract.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ estado: newStatus }),
      }
    );

    if (response.ok) {
      const updatedContract = await response.json();
      setContract(updatedContract);
      alert("Estado actualizado");
    } else {
      alert("Error al actualizar");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando detalle del contrato...</p>;
  }

  if (!contract) {
    return (
      <p style={{ textAlign: "center" }}>
        Contrato no encontrado o no autorizado.
      </p>
    );
  }

  // 🎨 Fondo gris/blanco, acentos rojos
  const container =
    theme === "dark"
      ? "bg-[#1f1f1f] text-white border-red-600"
      : "bg-white text-gray-800 border-red-600";

  const selectStyle =
    theme === "dark"
      ? "bg-[#2a2a2a] text-white border-red-600"
      : "bg-white text-black border-red-600";

  const button =
    theme === "dark"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-red-600 hover:bg-red-700 text-white";

  return (
    <section
      className={`max-w-3xl mx-auto p-6 rounded shadow border transition-colors duration-300 ${container}`}
    >
      <h1 className="text-2xl font-bold mb-4 text-red-600">
        {contract.servicio_detalle?.title || "Título no disponible"}
      </h1>

      <p>
        <strong className="text-red-600">Cliente:</strong> {contract.comprador}
      </p>

      <p>
        <strong className="text-red-600">Fecha:</strong>{" "}
        {new Date(contract.fecha).toLocaleDateString()}
      </p>

      <p className="mt-2 flex items-center gap-3">
        <strong className="text-red-600">Estado:</strong>

        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className={`border rounded px-2 py-1 ${selectStyle}`}
        >
          <option value="pendiente">Pendiente</option>
          <option value="iniciado">Iniciado</option>
          <option value="procesando">Procesando</option>
          <option value="cancelado">Cancelado</option>
          <option value="completado">Completado</option>
        </select>

        <button
          onClick={handleChangeStatus}
          className={`px-4 py-1 rounded transition-colors ${button}`}
        >
          Cambiar estado
        </button>
      </p>

      <p>
        <strong className="text-red-600">Cantidad:</strong> {contract.cantidad}
      </p>

      <p>
        <strong className="text-red-600">Total:</strong> ${contract.total}
      </p>

      <p>
        <strong className="text-red-600">Dirección:</strong>{" "}
        {contract.address}, {contract.city}, {contract.state},{" "}
        {contract.postal_code}
      </p>

      <p>
        <strong className="text-red-600">Teléfono:</strong> {contract.phone}
      </p>

      {/* 🔥 Caja informativa con bordes rojos */}
      <div
        className={`mt-6 p-4 rounded-lg border-l-4 ${
          theme === "dark"
            ? "bg-[#2a2a2a] border-red-500 text-gray-200"
            : "bg-gray-100 border-red-500 text-gray-800"
        }`}
      >
        <h3 className="font-semibold mb-2 text-red-600">
          Reglas de pago y seguridad
        </h3>

        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>El pago se libera solo cuando el servicio se completa.</li>
          <li>Si el vendedor cancela, se realiza reembolso automático.</li>
          <li>Si no responde, el dinero regresa al comprador.</li>
          <li>
            Para soporte, escribe a{" "}
            <strong className="text-red-600">soporte@mrchambasmx.com</strong>.
          </li>
        </ul>
      </div>
    </section>
  );
}
