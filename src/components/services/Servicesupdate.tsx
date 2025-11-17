"use client";

import { useState, useEffect } from "react";

interface ServiceFormData {
  title: string;
  verified: boolean;
  description: string;
  location: string;
  response_time: string;
  price: string;
}

interface Props {
  serviceId: string; 
}

export default function ServicesUpdate({ serviceId }: Props) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    verified: false,
    description: "",
    location: "",
    response_time: "",
    price: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchService() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No autorizado. Por favor inicia sesión.");
        return;
      }

      try {
        const res = await fetch(`https://mibackend-mchambas.onrender.com/api/services/${serviceId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Error al obtener datos del servicio");
        }
        const data = await res.json();

        setFormData({
          title: data.title || "",
          verified: data.verified || false,
          description: data.description || "",
          location: data.location || "",
          response_time: data.response_time || "",
          price: data.price || "",
        });
      } catch (err) {
        setError("Error al cargar el servicio");
      }
    }
    fetchService();
  }, [serviceId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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
    data.append("location", formData.location);
    data.append("response_time", formData.response_time);
    data.append("price", formData.price);

    try {
      const res = await fetch(`https://mibackend-mchambas.onrender.com/api/services/update/${serviceId}/`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${token}`,
        },
        body: data,
    });

      if (!res.ok) {
        const errData = await res.json();
        setError(JSON.stringify(errData));
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Actualizar Servicio</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Servicio actualizado con éxito</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />

        {/* <label className="flex items-center gap-2">
          <input name="verified" type="checkbox" checked={formData.verified} onChange={handleChange} />
          Verificado
        </label> */}

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="location"
          type="text"
          placeholder="Ubicación"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="response_time"
          type="text"
          placeholder="Tiempo de respuesta"
          value={formData.response_time}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          name="price"
          type="text"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Actualizando..." : "Actualizar Servicio"}
        </button>
      </form>
    </div>
  );
}
