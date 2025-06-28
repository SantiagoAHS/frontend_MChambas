"use client";
import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ServicesUpdate from "@/components/services/Servicesupdate";
import { useParams } from "next/navigation";

export default function UpdateServicePage() {
  const params = useParams();
  
  // params.id puede ser string o string[]
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!serviceId) {
    return <div>ID del servicio no encontrado en la URL</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Actualizar servicio</h2>
        <ServicesUpdate serviceId={serviceId} />
      </main>
    </div>
  );
}
