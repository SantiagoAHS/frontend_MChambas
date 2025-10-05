"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  profile: {
    email: string;
    nombre: string;
    telefono: string;
    avatar: string | null;
    curp?: string;
    id_document?: string;
    is_verified?: boolean;
  };
  onUpdate: () => void;
}

export default function EditProfileForm({ profile, onUpdate }: Props) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [nombre, setNombre] = useState(profile.nombre);
  const [telefono, setTelefono] = useState(profile.telefono);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [curp, setCurp] = useState(profile.curp || "");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);
    if (curp) formData.append("curp", curp);
    if (avatar) formData.append("avatar", avatar);
    if (idDocument) formData.append("identificacion", idDocument);

    try {
      const res = await fetch("http://localhost:8000/api/user/profile/update/", {
        method: "PUT",
        headers: { Authorization: `Token ${token}` },
        body: formData,
      });

      if (res.ok) {
        alert("Perfil actualizado");
        onUpdate();
      } else {
        alert("Error al actualizar perfil");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error del servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-xl shadow-lg space-y-4 max-w-xl mx-auto mt-10 border transition
        ${isLight 
          ? "bg-white border-green-600" 
          : "bg-[#2e2e2e] border-purple-600"
        }`}
    >
      <h3 className={`text-xl font-bold ${isLight ? "text-gray-800" : "text-gray-200"}`}>
        Editar Perfil
      </h3>

      {/* Nombre */}
      <div>
        <label className={`block text-sm mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}>
          Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={`w-full rounded px-3 py-2 border transition focus:outline-none 
            ${isLight 
              ? "border-gray-300 text-gray-800 focus:ring-2 focus:ring-green-500 bg-white" 
              : "border-gray-600 text-gray-100 focus:ring-2 focus:ring-purple-500 bg-[#3a3a3a]"
            }`}
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className={`block text-sm mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}>
          Teléfono
        </label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={`w-full rounded px-3 py-2 border transition focus:outline-none 
            ${isLight 
              ? "border-gray-300 text-gray-800 focus:ring-2 focus:ring-green-500 bg-white" 
              : "border-gray-600 text-gray-100 focus:ring-2 focus:ring-purple-500 bg-[#3a3a3a]"
            }`}
        />
      </div>

      {/* CURP */}
      <div>
        <label className={`block text-sm mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}>
          CURP
        </label>
        <input
          type="text"
          value={curp}
          onChange={(e) => setCurp(e.target.value)}
          className={`w-full rounded px-3 py-2 border transition focus:outline-none 
            ${isLight 
              ? "border-gray-300 text-gray-800 focus:ring-2 focus:ring-green-500 bg-white" 
              : "border-gray-600 text-gray-100 focus:ring-2 focus:ring-purple-500 bg-[#3a3a3a]"
            }`}
        />
      </div>

      {/* Avatar */}
      <div>
        <label className={`block text-sm mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}>
          Avatar
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className={`w-full ${isLight ? "text-gray-800" : "text-gray-200"}`}
        />
      </div>

      {/* Documento de identidad */}
      <div>
        <label className={`block text-sm mb-1 ${isLight ? "text-gray-700" : "text-gray-300"}`}>
          Documento de identidad (INE / Pasaporte)
        </label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
          className={`w-full ${isLight ? "text-gray-800" : "text-gray-200"}`}
        />
      </div>

      {/* Estado de verificación */}
      {profile.is_verified !== undefined && (
        <p
          className={`text-sm font-semibold ${
            profile.is_verified
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {profile.is_verified ? "✅ Cuenta verificada" : "⏳ En revisión"}
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded font-semibold transition disabled:opacity-50
          ${isLight 
            ? "bg-green-600 text-white hover:bg-white hover:text-green-600 hover:border hover:border-green-600"
            : "bg-purple-600 text-white hover:bg-white hover:text-purple-600 hover:border hover:border-purple-600"
          }`}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
