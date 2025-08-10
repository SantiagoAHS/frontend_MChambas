"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/user/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Registro exitoso");
        window.location.href = "/";
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Ocurrió un error al registrar.");
    }
  };

  const isDark = theme === "dark";

  return (
    <main
      className={`w-screen h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-[#3a3a3a] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-xl shadow-lg p-8 border-2 ${
          isDark
            ? "bg-zinc-900 border-purple-500"
            : "bg-white border-green-500"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6 ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Crear una cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-zinc-800 text-white border-purple-500 focus:ring-purple-500"
                  : "bg-white text-gray-800 border-green-500 focus:ring-green-500"
              }`}
              placeholder="Nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-zinc-800 text-white border-purple-500 focus:ring-purple-500"
                  : "bg-white text-gray-800 border-green-500 focus:ring-green-500"
              }`}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-zinc-800 text-white border-purple-500 focus:ring-purple-500"
                  : "bg-white text-gray-800 border-green-500 focus:ring-green-500"
              }`}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-zinc-800 text-white border-purple-500 focus:ring-purple-500"
                  : "bg-white text-gray-800 border-green-500 focus:ring-green-500"
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-2 rounded-lg transition-colors duration-200 ${
              isDark
                ? "bg-purple-500 text-white hover:bg-white hover:text-purple-600 border border-purple-500"
                : "bg-green-500 text-white hover:bg-white hover:text-green-600 border border-green-500"
            }`}
          >
            Registrarse
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className={`font-medium underline ${
              isDark ? "text-purple-400 hover:text-white" : "text-green-600 hover:text-green-800"
            }`}
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
