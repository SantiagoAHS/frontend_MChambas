"use client";

import { useState } from "react";

interface CheckoutFormProps {
  userName: string; // nombre que ya tienes del usuario autenticado
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <div>
        <label className="block font-semibold mb-1">Nombre:</label>
        <input
          type="text"
          value={userName}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="Calle y número"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          placeholder="Ciudad"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="state">Estado/Provincia</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          placeholder="Estado o provincia"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="postalCode">Código Postal</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
          placeholder="Código postal"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Número de teléfono"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Completar Compra
      </button>
    </form>
  );
}
