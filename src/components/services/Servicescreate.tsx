"use client";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ServicesCreate() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [formData, setFormData] = useState({
    title: "",
    verified: false,
    description: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
    response_time: "",
    price: "",
  });

  const [file, setFile] = useState<File | null>(null);
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
    data.append("street", formData.street);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("postalcode", formData.postalcode);
    data.append("response_time", formData.response_time);
    data.append("price", formData.price);

    try {
      const res = await fetch("https://mibackend-mchambas.onrender.com/api/services/create/", {
        method: "POST",
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
        setFormData({
          title: "",
          verified: false,
          description: "",
          street: "",
          city: "",
          state: "",
          country: "",
          postalcode: "",
          response_time: "",
          price: "",
        });
        setFile(null);
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `
    w-full px-3 py-2 rounded
    ${isLight 
      ? "border border-red-500 bg-white text-red-500 placeholder-red-300 focus:border-red-600" 
      : "border border-red-500 bg-[#3a3a3a] text-red-500 placeholder-red-300 focus:border-red-600"
    }
    transition-colors
  `;

  const checkboxClass = `
    form-checkbox text-red-500 border-red-500
  `;

  return (
    <div
      className={`
        ${isLight ? "bg-white" : "bg-[#3a3a3a]"}
        max-w-xl mx-auto p-6 rounded shadow
      `}
    >
      <h2 className="text-2xl mb-4 font-bold text-red-500">
        
         Nuevo Servicio
      </h2>

  <div
    className={`
      mb-4 p-4 border-l-4 border-red-500 
      ${isLight ? "bg-red-500/20 text-red-500" : "bg-red-500/40 text-white"}
      rounded
    `}
  >
    ⚠️ Asegúrate de que tu cuenta esté verificada antes de un servicio.
  </div>


      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Servicio creado con éxito</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={inputClass}
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
          className={inputClass}
        />

        <input 
        name="street" 
        type="text" 
        placeholder="Calle y número" 
        value={formData.street} 
        onChange={handleChange} 
        required className={inputClass} 
        />

        <input 
        name="city" 
        type="text" 
        placeholder="Ciudad" 
        value={formData.city} 
        onChange={handleChange} 
        required className={inputClass} 
        />

        <input 
        name="state" 
        type="text" 
        placeholder="Estado" 
        value={formData.state} 
        onChange={handleChange} 
        className={inputClass} 
        />

        <input 
        name="country" 
        type="text" 
        placeholder="País" 
        value={formData.country} 
        onChange={handleChange} 
        required className={inputClass} 
        />

        <input 
        name="postalcode" 
        type="text" 
        placeholder="Código Postal" 
        value={formData.postalcode} 
        onChange={handleChange} 
        className={inputClass} 
        />

        <input 
        name="response_time" 
        type="text" 
        placeholder="Tiempo de respuesta" 
        value={formData.response_time} 
        onChange={handleChange} 
        required className={inputClass} 
        />

        <input 
        name="price" 
        type="text" 
        placeholder="Precio" 
        value={formData.price} 
        onChange={handleChange} 
        required className={inputClass} 
        />

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-2 rounded font-semibold border-2 transition
            bg-red-500 text-white border-red-500
            hover:bg-transparent hover:text-red-500
            disabled:opacity-50
           `}
        >
          {loading ? "Guardando..." : "Crear Servicio"}
        </button>

      </form>
    </div>
  );
}
