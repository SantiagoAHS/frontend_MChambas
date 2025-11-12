"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext"; // Importamos el theme

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

  const { theme } = useTheme(); // Obtenemos el tema actual

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`https://mibackend-mchambas.onrender.com/api/ventas/mis-ventas/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setContract(data);
          setNewStatus(data.estado);
        } else {
          console.error("Error al cargar detalle del contrato");
        }
      })
      .catch((err) => console.error("Error de red:", err))
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
      alert("Estado actualizado correctamente");
    } else {
      alert("Error al actualizar el estado");
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

  // Clases dinámicas por tema
  const containerClasses =
    theme === "dark"
      ? "bg-[#1f1f1f] text-white border-purple-500"
      : "bg-white text-gray-800 border-green-500";

  return (
    <section
      className={`max-w-3xl mx-auto p-6 rounded shadow border transition-colors duration-300 ${containerClasses}`}
    >
      <h1 className="text-2xl font-bold mb-4">
        {contract.servicio_detalle?.title || "Título no disponible"}
      </h1>
      <p>
        <strong>Cliente:</strong> {contract.comprador}
      </p>
      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(contract.fecha).toLocaleDateString()}
      </p>

      <p className="mt-2">
        <strong>Estado:</strong>{" "}
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className={`border rounded px-2 py-1 ${
            theme === "dark"
              ? "bg-[#2a2a2a] text-white border-purple-500"
              : "bg-white text-black border-green-500"
          }`}
        >
          <option value="pendiente">Pendiente</option>
          <option value="iniciado">Iniciado</option>
          <option value="procesando">Procesando</option>
          <option value="cancelado">Cancelado</option>
          <option value="completado">Completado</option>
        </select>
        <button
          onClick={handleChangeStatus}
          className={`ml-3 px-4 py-1 rounded transition-colors ${
            theme === "dark"
              ? "bg-purple-500 hover:bg-purple-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Cambiar estado
        </button>
      </p>

      <p>
        <strong>Cantidad:</strong> {contract.cantidad}
      </p>
      <p>
        <strong>Total:</strong> ${contract.total}
      </p>
      <p>
        <strong>Dirección:</strong> {contract.address}, {contract.city},{" "}
        {contract.state}, {contract.postal_code}
      </p>
      <p>
        <strong>Teléfono:</strong> {contract.phone}
      </p>

      {/* Contenedor de reglas / seguridad */}
      <div
        className={`mt-6 p-4 rounded-lg border-l-4 ${
          theme === "dark"
            ? "bg-[#2a2a2a] border-orange-500 text-gray-200"
            : "bg-orange-50 border-orange-500 text-gray-800"
        }`}
      >
        <h3 className="font-semibold mb-2">Reglas de pago y seguridad</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>El pago se registra pero no se entrega al vendedor hasta que el servicio esté completado.</li>
          <li>Si el vendedor cancela la transacción, el pago será reembolsado automáticamente.</li>
          <li>Si el vendedor no responde en un tiempo razonable, el dinero será regresado.</li>
          <li>Para más información o soporte, contacta a <strong>soporte@mrchambasmx.com</strong>.</li>
        </ul>
      </div>
    </section>
  );
}