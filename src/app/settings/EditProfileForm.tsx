"use client";
import React, { useState, useEffect } from "react";

interface Props {
  profile: {
    email: string;
    nombre: string;
    telefono: string;
    avatar: string | null;
  };
  onUpdate: () => void; // Para recargar perfil tras actualizar
}

export default function EditProfileForm({ profile, onUpdate }: Props) {
  const [nombre, setNombre] = useState(profile.nombre);
  const [telefono, setTelefono] = useState(profile.telefono);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("telefono", telefono);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await fetch("http://localhost:8000/api/user/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Perfil actualizado");
        onUpdate(); // Refresca perfil
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-xl">
      <h3 className="text-xl font-bold text-gray-800">Editar Perfil</h3>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
