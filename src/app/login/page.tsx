"use client";
import React, { JSX, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setError("");

  try {
    console.log("Payload enviado:", JSON.stringify({ email, password }));

    const res = await fetch("http://localhost:8000/api/user/login/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    console.log("Respuesta status:", res.status);
    const data = await res.json();
    console.log("Respuesta data:", data);

    if (!res.ok) {
      setError(data.error || "Error en el inicio de sesión");
      return;
    }

    console.log("Token recibido:", data.token);
    localStorage.setItem("token", data.token);
    console.log("Token guardado en localStorage:", localStorage.getItem("token"));
    
    alert("¡Inicio de sesión exitoso!");
    router.push("/user");

  } catch (err) {
    setError("Error de conexión con el servidor");
    router.push("/user");
  }
};

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-red-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
