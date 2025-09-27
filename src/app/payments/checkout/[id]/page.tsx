"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import CheckoutForm from "@/components/payments/CheckoutForm";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const { theme } = useTheme();

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

      const res = await fetch("http://localhost:8000/api/user/profile/", {
        headers: { Authorization: `Token ${token}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUserName(userData.nombre || userData.email || "Usuario");
      } else {
        setUserName("Invitado");
      }
    }

    if (id) fetchService();
    fetchUserName();
  }, [id]);

  function handleSubmitCheckout(data: any) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para completar la compra");
      return;
    }

    const payload = {
      servicio: id,
      cantidad: 1,
      address: data.address,
      city: data.city,
      state: data.state,
      postal_code: data.postalCode,
      phone: data.phone,
    };

    fetch("http://localhost:8000/api/ventas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (res.ok) {
          await res.json();
          alert("Compra realizada con éxito");
          router.push("/myorders");
        } else {
          const error = await res.json();
          console.error("Error en la compra:", error);
          alert("Hubo un problema al procesar tu compra");
        }
      })
      .catch((err) => {
        console.error("Error de red:", err);
        alert("No se pudo conectar con el servidor");
      });
  }

  if (!service) {
    return (
      <div
        className={`p-6 ${
          theme === "dark" ? "bg-[#2a2a2a] text-white" : "bg-gray-100 text-black"
        }`}
      >
        Cargando servicio...
      </div>
    );
  }

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#3a3a3a] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-orange-600">
        Contratar Servicio
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/5 flex flex-col gap-8">
          <div
            className={`p-6 rounded-lg shadow transition-all duration-300 border ${
              theme === "dark"
                ? "bg-[#2a2a2a] border-[#2a2a2a]"
                : "bg-white border-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-orange-600">
              Detalles del Servicio
            </h2>
            <p>
              <strong>Servicio:</strong> {service.title}
            </p>
            <p>
              <strong>Precio:</strong> {service.price}
            </p>
            <p>
              <strong>Proveedor:</strong> {service.provider.nombre}
            </p>
            {service.image && (
              <img
                src={`http://localhost:8000${service.image}`}
                alt={service.title}
                className="mt-4 w-full h-48 object-cover rounded"
              />
            )}
          </div>
        </div>

        <div
          className={`md:w-2/5 p-6 rounded-lg shadow transition-all duration-300 border ${
            theme === "dark"
              ? "bg-[#2a2a2a] border-[#2a2a2a]"
              : "bg-white border-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            Completar Datos
          </h2>
          <CheckoutForm userName={userName} onSubmit={handleSubmitCheckout} />
        </div>
      </div>
    </div>
  );
}
