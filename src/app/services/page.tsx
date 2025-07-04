"use client";
import { useEffect, useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import SidebarFilters from "@/components/services/Sidebarfilter";
import ServicesGrid from "@/components/services/Servicesgrid";

export default function ServicesCatalog() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/services/");
        const data = await response.json();
        console.log("Servicios obtenidos:", data.map(s => s.id)); // Aquí
        setServices(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-600">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="pl-10 pr-4 h-12 w-full border border-orange-600 rounded-md text-sm"
              disabled
            />
          </div>
          <button className="h-12 px-6 bg-orange-600 text-white rounded-md" disabled>
            Buscar
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <SidebarFilters />

          {/* Main Section */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Servicios Disponibles</h2>
                <p className="text-gray-500">
                  {loading ? "Cargando..." : `${services.length} servicios encontrados`}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button className="lg:hidden px-4 py-2 border border-orange-600 rounded flex items-center gap-2 text-sm" disabled>
                  <Filter className="w-4 h-4" /> Filtros
                </button>
                <select className="border border-orange-600 rounded px-2 py-1 text-sm" disabled>
                  <option>Más relevantes</option>
                </select>
                <div className="flex border border-orange-600 rounded overflow-hidden">
                  <button className="px-3 py-2 bg-gray-200 text-sm" disabled>
                    <Grid className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-2 text-sm" disabled>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
              <h3 className="text-xl font-bold mb-2">🌟 Servicios Destacados</h3>
              <p className="text-blue-100">Encuentra los mejores profesionales verificados en tu área.</p>
            </div>

            {/* Services Grid */}
            <ServicesGrid services={services} />

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              <button className="px-4 py-2 border border-orange-600 rounded" disabled>
                Anterior
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded" disabled>
                1
              </button>
              <button className="px-4 py-2 border border-orange-600 rounded" disabled>
                2
              </button>
              <button className="px-4 py-2 border border-orange-600 rounded" disabled>
                3
              </button>
              <button className="px-4 py-2 border border-orange-600 rounded" disabled>
                Siguiente
              </button>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-lg p-8 mt-8 text-center border border-orange-600">
              <h3 className="text-2xl font-bold mb-4">¿Eres un profesional?</h3>
              <p className="text-gray-500 mb-6">
                Únete a nuestra plataforma y conecta con miles de clientes.
              </p>
              <button className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-red-700" disabled>
                Registrar mi Servicio
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
