"use client";
import { useEffect, useState } from "react";
import ServiceCard from "./Servicescard";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
  rating: number;
  reviews: number;
  location: string;
  responseTime: string;
  price: string;
  verified: boolean;
  provider: {
    nombre: string;
  };
}

export default function UserServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserServices() {
      try {
        const token = localStorage.getItem("token"); // obtener token del almacenamiento
        const res = await fetch("http://localhost:8000/api/services/my-services/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // enviar token
          },
        });

        if (!res.ok) {
          throw new Error("No autorizado o error al obtener servicios");
        }

        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserServices();
  }, []);

  if (loading) return <p>Cargando servicios...</p>;
  if (services.length === 0) return <p>No tienes servicios registrados.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
