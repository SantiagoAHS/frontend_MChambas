"use client";
import UserServices from "@/components/services/UserServices";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import { UserCircleIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<{
    email: string;
    nombre: string;
    telefono: string;
    avatar: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("https://mibackend-mchambas.onrender.com/api/user/profile/", {
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
    return <p className="p-8">Cargando perfil...</p>;
  }

  return (
    <div className={isLight ? "min-h-screen flex bg-gray-100" : "min-h-screen flex bg-[#1f1f1f]"}>
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">
        {profile && (
          <div
            className={`shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 w-full mb-8 ${
              isLight ? "bg-white text-gray-800" : "bg-[#3a3a3a] text-gray-200"
            }`}
          >
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-orange-600 object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center text-gray-700">
                <UserCircleIcon className="w-20 h-20" />
              </div>
            )}

            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                <UserCircleIcon className="w-6 h-6 text-orange-600" />
                {profile.nombre}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                {profile.email}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <PhoneIcon className="w-5 h-5 text-gray-500" />
                {profile.telefono}
              </div>
            </div>
          </div>
        )}

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-6">Mis Servicios</h1>
          <UserServices />
        </div>

        {children}
      </main>
    </div>
  );
}
