"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  nombre: string;
  telefono: string;
  is_verified: boolean;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar la lista de usuarios
  useEffect(() => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) return;

    fetch("http://localhost:8000/api/user/verify/users/", {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("❌ Error al obtener usuarios:", err))
        .finally(() => setLoading(false));
    }, []);

  // 🔹 Alternar verificación
  const toggleVerification = async (id: number, current: boolean) => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
        alert("No hay token, inicia sesión");
        return;
    }

    try {
        const res = await fetch(`http://localhost:8000/api/user/verify/users/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ is_verified: !current }),
        });

        if (!res.ok) {
        const errText = await res.text();
        console.error("Error HTTP:", res.status, errText);
        alert("Error al actualizar la verificación");
        return;
        }

        setUsers((prev) =>
        prev.map((u) =>
            u.id === id ? { ...u, is_verified: !current } : u
        )
        );
    } catch (err) {
        console.error("❌ Error al modificar usuario:", err);
    }
    };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando usuarios...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Verificación de Usuarios</h1>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b">Nombre</th>
            <th className="p-3 text-left border-b">Email</th>
            <th className="p-3 text-left border-b">Teléfono</th>
            <th className="p-3 text-left border-b">Estado</th>
            <th className="p-3 text-left border-b">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{user.nombre}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.telefono || "-"}</td>
              <td className="p-3">
                {user.is_verified ? (
                  <span className="text-green-600 font-medium">Verificado</span>
                ) : (
                  <span className="text-red-500 font-medium">No verificado</span>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => toggleVerification(user.id, user.is_verified)}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    user.is_verified
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {user.is_verified ? "Desverificar" : "Verificar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
