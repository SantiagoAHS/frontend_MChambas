"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import TermsModal from "@/components/layout/TermsModal";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openTerms, setOpenTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "https://mibackend-mchambas.onrender.com/api/user/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: name,
            email,
            password,
          }),
        }
      );

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

  return (
    <>
      <main
        className={`w-screen h-screen flex items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#3a3a3a] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`w-full max-w-md rounded-xl shadow-lg p-8 border-2 ${
            isDark
              ? "bg-[#1e1e1e] border-red-500"
              : "bg-white border-red-500"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-red-500">
            Crear una cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-[#2a2a2a] text-white border-red-500 focus:ring-red-500"
                    : "bg-white text-gray-800 border-red-500 focus:ring-red-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-[#2a2a2a] text-white border-red-500 focus:ring-red-500"
                    : "bg-white text-gray-800 border-red-500 focus:ring-red-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-[#2a2a2a] text-white border-red-500 focus:ring-red-500"
                    : "bg-white text-gray-800 border-red-500 focus:ring-red-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-red-500">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-[#2a2a2a] text-white border-red-500 focus:ring-red-500"
                    : "bg-white text-gray-800 border-red-500 focus:ring-red-500"
                }`}
              />
            </div>

            <div className="flex items-start space-x-2 text-sm">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <p className="text-red-500">
                Acepto los{" "}
                <button
                  type="button"
                  onClick={() => setOpenTerms(true)}
                  className="underline hover:text-red-400"
                >
                  términos y condiciones
                </button>
              </p>
            </div>

            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg border-2 transition-colors duration-200 ${
                isDark
                  ? "bg-red-500 text-white hover:bg-[#2a2a2a] hover:text-red-500 border-red-500"
                  : "bg-red-500 text-white hover:bg-white hover:text-red-500 border-red-500"
              }`}
            >
              Registrarse
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-red-500">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>

      {/* Aquí se llama el componente externo del modal */}
      <TermsModal
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        isDark={isDark}
      />
    </>
  );
}
