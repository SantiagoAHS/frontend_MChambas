"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://mibackend-mchambas.onrender.com/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error en el inicio de sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("¡Inicio de sesión exitoso!");
      router.push("/user");
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  const bg = isDark ? "bg-[#3a3a3a]" : "bg-white";
  const cardBg = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const text = "text-red-500";
  const labelText = "text-red-500";

  const input = isDark
    ? "bg-[#2a2a2a] text-white border-red-500"
    : "bg-white text-gray-800 border-red-500";

  const focusRing = "focus:ring-red-500";

  const button = isDark
    ? "bg-red-500 text-white border-red-500 hover:bg-[#2a2a2a] hover:text-red-500"
    : "bg-red-500 text-white border-red-500 hover:bg-white hover:text-red-500";

  return (
    <main
      className={`w-screen h-screen flex items-center justify-center transition-colors duration-300 ${bg}`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg border-4 transition-all duration-300 
        ${cardBg} border-red-500`}
      >
        <h2 className={`text-3xl font-bold text-center mb-6 ${text}`}>
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 ${labelText}`}
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg transition duration-200 ${input} ${focusRing} focus:outline-none focus:ring-2`}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-1 ${labelText}`}
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg transition duration-200 ${input} ${focusRing} focus:outline-none focus:ring-2`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold border-2 transition duration-200 ${button}`}
          >
            Iniciar sesión
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <p className={`mt-6 text-center text-sm ${labelText}`}>
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-red-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
