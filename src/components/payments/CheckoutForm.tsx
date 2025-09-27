"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface CheckoutFormProps {
  userName: string;
  onSubmit: (data: CheckoutData) => void;
}

interface CheckoutData {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export default function CheckoutForm({ userName, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutData>({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const { theme } = useTheme();
  const isDark = theme === "dark";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  // Bordes con color (como en el primer código)
  const borderColor = isDark
    ? "border-purple-600 focus:border-purple-600 focus:ring-purple-600"
    : "border-green-600 focus:border-green-600 focus:ring-green-600";

  // Botón original del segundo código
  const button = isDark
    ? "bg-purple-600 text-white border-purple-600 hover:bg-white hover:text-purple-600"
    : "bg-green-600 text-white border-green-600 hover:bg-white hover:text-green-600";

  // Colores de fondo/texto de inputs y contenedor
  const inputBase = isDark
    ? "bg-[#1f1f1f] text-white border-gray-500"
    : "bg-white text-gray-800 border-gray-300";

  const container = isDark
    ? "bg-[#2a2a2a] border-gray-600 text-white"
    : "bg-white border-gray-300 text-gray-800";

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-xl mx-auto p-6 rounded-lg shadow space-y-6 transition-colors duration-300 border ${container}`}
    >
      <div>
        <label className="block font-semibold mb-1">Nombre:</label>
        <input
          type="text"
          value={userName}
          disabled
          className={`w-full px-3 py-2 rounded cursor-not-allowed border ${inputBase} ${borderColor} focus:ring-2 focus:outline-none`}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="address">
          Dirección
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Calle y número"
          className={`w-full px-3 py-2 rounded border ${inputBase} ${borderColor} focus:ring-2 focus:outline-none`}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="city">
          Ciudad
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Ciudad"
          className={`w-full px-3 py-2 rounded border ${inputBase} ${borderColor} focus:ring-2 focus:outline-none`}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="state">
          Estado/Provincia
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          placeholder="Estado o provincia"
          className={`w-full px-3 py-2 rounded border ${inputBase} ${borderColor} focus:ring-2 focus:outline-none`}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="postalCode">
          Código Postal
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
          placeholder="Código postal"
          className={`w-full px-3 py-2 rounded border ${inputBase} ${borderColor} focus:ring-2 focus:outline-none`}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="phone">
          Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Número de teléfono"
          className={`w-full px-3 py-2 rounded border ${inputBase} ${borderColor} focus:ring-2 focus:outline-none`}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-semibold border-2 transition duration-200 ${button}`}
      >
        Completar Compra
      </button>
    </form>
  );
}