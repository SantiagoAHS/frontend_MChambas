"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import EditProfileForm from "@/app/settings/EditProfileForm";
import CreditCardDetector from "@/components/payments/Card";
import { UserCircleIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [profile, setProfile] = useState<{
    email: string;
    nombre: string;
    telefono: string;
    avatar: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/user/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <p className={`p-8 ${isLight ? "text-gray-800" : "text-gray-200"}`}>Cargando perfil...</p>
    );
  }

  return (
    <div className={`min-h-screen flex ${isLight ? "bg-white" : "bg-[#3a3a3a]"}`}>
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">
        {profile && (
          <>
            {/* Bloque del perfil */}
            <div
              className={`shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 w-full mb-8 border transition
              ${isLight ? "bg-white border-green-600" : "bg-[#2e2e2e] border-purple-600"}`}
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <UserCircleIcon className="w-20 h-20" />
                </div>
              )}

              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div
                  className={`text-2xl font-bold flex items-center justify-center sm:justify-start gap-2 ${
                    isLight ? "text-gray-800" : "text-gray-200"
                  }`}
                >
                  <UserCircleIcon
                    className={`w-6 h-6 ${
                      isLight ? "text-green-600" : "text-purple-500"
                    }`}
                  />
                  {profile.nombre}
                </div>
                <div
                  className={`flex items-center justify-center sm:justify-start gap-2 ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                  {profile.email}
                </div>
                <div
                  className={`flex items-center justify-center sm:justify-start gap-2 ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  <PhoneIcon className="w-5 h-5 text-gray-500" />
                  {profile.telefono}
                </div>
              </div>
            </div>

            {/* Formulario de edición */}
            <EditProfileForm profile={profile} onUpdate={() => router.refresh()} />

            {/* sección para la tarjeta */}
            <div
              className={`mt-8 p-6 rounded-lg shadow transition-all duration-300 border ${
                isLight
                  ? "bg-white border-green-600"
                  : "bg-[#2a2a2a] border-purple-600"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 text-orange-600">
                Métodos de Pago
              </h2>
              <CreditCardDetector />
            </div>
          </>
        )}
        {children}
      </main>
    </div>
  );
}
