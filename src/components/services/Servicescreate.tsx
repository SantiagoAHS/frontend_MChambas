"use client";

import { useState } from "react";

export default function ServicesCreate() {
  const [formData, setFormData] = useState({
    title: "",
    verified: false,
    description: "",
    rating: "",
    reviews: "",
    location: "",
    response_time: "",
    price: "",
  });

  const [file, setFile] = useState<File | null>(null); // ⬅ archivo de imagen
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target;
    const name = target.name;

    let value: string | boolean;

    if (target.type === "checkbox") {
      value = (target as HTMLInputElement).checked;
    } else {
      value = target.value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  // Manejar archivo de imagen
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const ratingNum = parseFloat(formData.rating);
    const reviewsNum = parseInt(formData.reviews);

    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      setError("El rating debe ser un número entre 0 y 5");
      setLoading(false);
      return;
    }

    if (isNaN(reviewsNum) || reviewsNum < 0) {
      setError("El número de reseñas debe ser un entero positivo");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No autorizado. Por favor inicia sesión.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    if (file) data.append("image", file);
    data.append("verified", String(formData.verified));
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    data.append("reviews", formData.reviews);
    data.append("location", formData.location);
    data.append("response_time", formData.response_time);
    data.append("price", formData.price);

    try {
      const res = await fetch("http://localhost:8000/api/services/create/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          // ¡NO pongas Content-Type! FormData lo hace solo
        },
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(JSON.stringify(errData));
      } else {
        setSuccess(true);
        setFormData({
          title: "",
          verified: false,
          description: "",
          rating: "",
          reviews: "",
          location: "",
          response_time: "",
          price: "",
        });
        setFile(null);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Crear Nuevo Servicio</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Servicio creado con éxito</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" type="text" placeholder="Título" value={formData.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />

        <label className="flex items-center gap-2">
          <input name="verified" type="checkbox" checked={formData.verified} onChange={handleChange} />
          Verificado
        </label>

        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <input name="rating" type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" value={formData.rating} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <input name="reviews" type="number" min="0" placeholder="Número de reseñas" value={formData.reviews} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <input name="location" type="text" placeholder="Ubicación" value={formData.location} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <input name="response_time" type="text" placeholder="Tiempo de respuesta" value={formData.response_time} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <input name="price" type="text" placeholder="Precio" value={formData.price} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Guardando..." : "Crear Servicio"}
        </button>
      </form>
    </div>
  );
}
