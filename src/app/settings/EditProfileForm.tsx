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
      const res = await fetch(
        "https://mibackend-mchambas.onrender.com/api/user/profile/update/",
        {
          method: "PUT",
          headers: { Authorization: `Token ${token}` },
          body: formData,
        }
      );

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
        ${
          isLight
            ? "bg-white border-red-500 text-gray-800"
            : "bg-[#2e2e2e] border-red-500 text-gray-200"
        }`}
    >
      <h3 className="text-xl font-bold text-red-500">Editar Perfil</h3>

      <div>
        <label className="block text-sm mb-1 text-red-500">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={`w-full rounded px-3 py-2 border transition focus:outline-none focus:border-red-500 focus:border-2
            ${
              isLight
                ? "border-gray-300 text-gray-800 bg-white"
                : "border-gray-600 text-gray-100 bg-[#3a3a3a]"
            }`}
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-red-500">Teléfono</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className={`w-full rounded px-3 py-2 border transition focus:outline-none focus:border-red-500 focus:border-2
            ${
              isLight
                ? "border-gray-300 text-gray-800 bg-white"
                : "border-gray-600 text-gray-100 bg-[#3a3a3a]"
            }`}
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-red-500">CURP</label>
        <input
          type="text"
          value={curp}
          onChange={(e) => setCurp(e.target.value)}
          className={`w-full rounded px-3 py-2 border transition focus:outline-none focus:border-red-500 focus:border-2
            ${
              isLight
                ? "border-gray-300 text-gray-800 bg-white"
                : "border-gray-600 text-gray-100 bg-[#3a3a3a]"
            }`}
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-red-500">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className={`w-full ${isLight ? "text-gray-800" : "text-gray-200"}`}
        />
      </div>

      <div>
        <label className="block text-sm mb-1 text-red-500">Documento de identidad</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
          className={`w-full ${isLight ? "text-gray-800" : "text-gray-200"}`}
        />
      </div>

      {profile.is_verified !== undefined && (
        <p
          className={`text-sm font-semibold ${
            profile.is_verified ? "text-green-500" : "text-yellow-400"
          }`}
        >
          {profile.is_verified ? "✅ Cuenta verificada" : "⏳ En revisión"}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded font-semibold transition disabled:opacity-50
          ${
            isLight
              ? "bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500"
              : "bg-red-600 text-white hover:bg-white hover:text-red-600 hover:border hover:border-red-500"
          }`}
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
