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
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState<any>(null);

  useEffect(() => {
    async function fetchService() {
      const res = await fetch(`https://mibackend-mchambas.onrender.com/api/services/${id}/`);
      if (res.ok) {
        const data = await res.json();
        setService(data);
      }
    }

    async function fetchUserName() {
      const token = localStorage.getItem("token");
      if (!token) return setUserName("Invitado");

      const res = await fetch("https://mibackend-mchambas.onrender.com/api/user/profile/", {
        headers: { Authorization: `Token ${token}` },
      });
      if (res.ok) {
        const userData = await res.json();
        setUserName(userData.nombre || userData.email || "Usuario");
      } else {
        setUserName("Invitado");
      }
    }

    async function fetchTarjetaDefault() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://mibackend-mchambas.onrender.com/api/pagos/tarjetas/", {
          headers: { Authorization: `Token ${token}` },
        });
        if (!res.ok) return;

        const data = await res.json();
        const defaultCard = data.find((t: any) => t.default);
        setTarjetaSeleccionada(defaultCard || null);
      } catch (err) {
        console.error("Error cargando tarjetas:", err);
      }
    }

    if (id) fetchService();
    fetchUserName();
    fetchTarjetaDefault();
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

    fetch("https://mibackend-mchambas.onrender.com/api/ventas/", {
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
          alert("Compra realizada con éxito (simulada)");
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
        theme === "dark" ? "bg-[#1e1e1e] text-red-300" : "bg-gray-50 text-red-700"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-red-600">Contratar Servicio</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/5 flex flex-col gap-4">

          <div
            className={`p-6 rounded-lg shadow transition-all duration-300 border ${
              theme === "dark"
                ? "bg-[#2a2a2a] border-red-600 text-red-300"
                : "bg-white border-red-500 text-red-700"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Detalles del Servicio
            </h2>

            <p><strong>Servicio:</strong> {service.title}</p>
            <p><strong>Precio:</strong> {service.price}</p>
            <p><strong>Proveedor:</strong> {service.provider.nombre}</p>

            {service.image && (
              <img
                src={`https://mibackend-mchambas.onrender.com${service.image}`}
                alt={service.title}
                className="mt-4 w-full h-48 object-cover rounded border border-red-500"
              />
            )}
          </div>

          <div
            className={`mt-4 p-4 rounded-lg border-l-4 ${
              theme === "dark"
                ? "bg-[#2a2a2a] border-red-500 text-red-300"
                : "bg-gray-100 border-red-500 text-red-700"
            }`}
          >
            <h3 className="font-semibold mb-2">Pago protegido</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Si el vendedor cancela, te reembolsamos automáticamente.</li>
              <li>Si no responde, tu pago regresa a tu cuenta.</li>
              <li>Para soporte: <strong>soporte@tuservicio.com</strong></li>
            </ul>
          </div>
        </div>

        <div
          className={`md:w-2/5 p-6 rounded-lg shadow transition-all duration-300 border ${
            theme === "dark"
              ? "bg-[#2e2e2e] border-red-500 text-red-300"
              : "bg-gray-100 border-red-500 text-red-700"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Completar Datos
          </h2>

          {tarjetaSeleccionada ? (
            <div
              className={`mb-4 p-4 border rounded ${
                theme === "dark"
                  ? "bg-[#1f1f1f] border-red-600 text-red-300"
                  : "bg-white border-red-500 text-red-700"
              }`}
            >
              <p>
                <strong>Tarjeta seleccionada:</strong>{" "}
                {tarjetaSeleccionada.nombre_titular}
              </p>
              <p>
                {tarjetaSeleccionada.numero_enmascarado} - Expira{" "}
                {String(tarjetaSeleccionada.exp_mes).padStart(2, "0")}/
                {String(tarjetaSeleccionada.exp_ano).slice(-2)}
              </p>
              <p className="mt-2 text-sm text-red-500">
                Pago simulado: no se realizará ningún cargo real.
              </p>
            </div>
          ) : (
            <p className="mb-4">No tienes una tarjeta por defecto</p>
          )}

          <CheckoutForm userName={userName} onSubmit={handleSubmitCheckout} />
        </div>
      </div>
    </div>
  );
}
