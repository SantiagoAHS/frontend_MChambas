// components/layouts/SettingsLayout.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import EditProfileForm from "@/app/settings/EditProfileForm";
import { UserCircleIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<{ email: string; nombre: string; telefono: string; avatar: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // Si no hay token, redirige al login
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
          localStorage.removeItem("token"); // Token inválido, lo eliminamos
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
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">
        {profile && (
          <>
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 w-full mb-8">
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
                <div className="text-2xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                  <UserCircleIcon className="w-6 h-6 text-red-500" />
                  {profile.nombre}
                </div>
                <div className="text-gray-700 flex items-center justify-center sm:justify-start gap-2">
                  <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                  {profile.email}
                </div>
                <div className="text-gray-700 flex items-center justify-center sm:justify-start gap-2">
                  <PhoneIcon className="w-5 h-5 text-gray-500" />
                  {profile.telefono}
                </div>
              </div>
            </div>

            <EditProfileForm profile={profile} onUpdate={() => router.refresh()} />
          </>
        )}
        {children}
      </main>
    </div>
  );

}
