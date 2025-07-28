"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "@/components/payments/CheckoutForm";
import CreditCardDetector from "@/components/payments/Card";

export default function CheckoutPage() {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [userName, setUserName] = useState("Cargando...");

  useEffect(() => {
    async function fetchService() {
      const res = await fetch(`http://localhost:8000/api/services/${id}/`);
      if (res.ok) {
        const data = await res.json();
        setService(data);
      }
    }

    async function fetchUserName() {
      const token = localStorage.getItem("token");
      if (!token) return setUserName("Invitado");

      const res = await fetch("http://localhost:8000/api/users/me/", {
        headers: { Authorization: `Token ${token}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUserName(userData.nombre || userData.username || "Usuario");
      } else {
        setUserName("Invitado");
      }
    }

    if (id) fetchService();
    fetchUserName();
  }, [id]);

  function handleSubmitCheckout(data: any) {
    console.log("Datos para completar la compra:", data);
    alert("Formulario enviado, ver consola");
    // Aquí iría la lógica para enviar los datos a backend y completar el pedido
  }

  if (!service) return <div className="p-6">Cargando servicio...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contratar Servicio</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Izquierda: detalles del servicio + tarjeta */}
        <div className="md:w-3/5 flex flex-col gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Detalles del Servicio</h2>
            <p><strong>Servicio:</strong> {service.title}</p>
            <p><strong>Precio:</strong> {service.price}</p>
            <p><strong>Proveedor:</strong> {service.provider.nombre}</p>
            {service.image && (
              <img
                src={`http://localhost:8000${service.image}`}
                alt={service.title}
                className="mt-4 w-full h-48 object-cover rounded"
              />
            )}
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Datos de Tarjeta</h2>
            <CreditCardDetector />
          </div>
        </div>

        {/* Derecha: formulario */}
        <div className="md:w-2/5 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Completar Datos</h2>
          <CheckoutForm userName={userName} onSubmit={handleSubmitCheckout} />
        </div>
      </div>
    </div>
  );
}
