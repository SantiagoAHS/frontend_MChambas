"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ContractDetail {
  id: number;
  servicio: {
    title: string;
    price: number;
    description?: string;
  };
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

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      // Puedes redirigir o mostrar mensaje de error
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/api/ventas/mis-ventas/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setContract(data);
        } else {
          console.error("Error al cargar detalle del contrato");
        }
      })
      .catch((err) => console.error("Error de red:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando detalle del contrato...</p>;
  }

  if (!contract) {
    return <p style={{ textAlign: "center" }}>Contrato no encontrado o no autorizado.</p>;
  }

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{contract.servicio.title}</h1>
      <p><strong>Cliente:</strong> {contract.comprador}</p>
      <p><strong>Fecha:</strong> {new Date(contract.fecha).toLocaleDateString()}</p>
      <p><strong>Estado:</strong> {contract.estado}</p>
      <p><strong>Cantidad:</strong> {contract.cantidad}</p>
      <p><strong>Total:</strong> ${contract.total}</p>
      <p><strong>Dirección:</strong> {contract.address}, {contract.city}, {contract.state}, {contract.postal_code}</p>
      <p><strong>Teléfono:</strong> {contract.phone}</p>

      {/* Puedes agregar más detalles o botones aquí */}
    </section>
  );
}
