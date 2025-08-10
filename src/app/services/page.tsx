"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import SidebarFilters from "@/components/services/Sidebarfilter";
import ServicesGrid from "@/components/services/Servicesgrid";
import { useTheme } from "@/context/ThemeContext";

export default function ServicesCatalog() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/services/");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const borderColor = theme === "dark" ? "border-purple-500" : "border-green-500";
  const bgColor = theme === "dark" ? "bg-[#3a3a3a]" : "bg-white";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-500";
  const buttonBg = theme === "dark" ? "bg-purple-600 hover:bg-purple-700" : "bg-green-500 hover:bg-green-700";
  const gradientBg = theme === "dark" ? "from-purple-600 to-orange-600" : "from-orange-500 to-purple-600";
  const paginationBtnBg = theme === "dark" ? "bg-purple-600" : "bg-green-600";

  return (
    <div className={`${theme === "dark" ? "bg-[#3a3a3a]" : "bg-white"} min-h-screen`}>
      {/* Header */}
      <header className={`text-gray-400 shadow-sm border-b ${borderColor}`}>
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              className={`pl-10 pr-4 h-12 w-full border ${borderColor} rounded-md text-sm`}
              disabled
            />
          </div>
          <button className={`h-12 px-6 text-white rounded-md ${buttonBg}`} disabled>
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
                <p className={textSecondary}>
                  {loading ? "Cargando..." : `${services.length} servicios encontrados`}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button className={`lg:hidden px-4 py-2 border ${borderColor} rounded flex items-center gap-2 text-sm`} disabled>
                  <Filter className="w-4 h-4" /> Filtros
                </button>
                <select className={`border ${borderColor} rounded px-2 py-1 text-sm`} disabled>
                  <option>Más relevantes</option>
                </select>
                <div className={`flex border ${borderColor} rounded overflow-hidden`}>
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
            <div className={`bg-gradient-to-r ${gradientBg} rounded-lg p-6 mb-8 text-white`}>
              <h3 className="text-xl font-bold mb-2">🌟 Servicios Destacados</h3>
              <p className="text-blue-100">Encuentra los mejores profesionales verificados en tu área.</p>
            </div>

            {/* Services Grid */}
            <ServicesGrid services={services} />

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              {["Anterior", "1", "2", "3", "Siguiente"].map((label, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded ${
                    label === "1" ? `${paginationBtnBg} text-white` : `border ${borderColor}`
                  }`}
                  disabled
                >
                  {label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className={`rounded-lg p-8 mt-8 text-center ${bgColor} border ${borderColor}`}>
              <h3 className="text-2xl font-bold mb-4">¿Eres un profesional?</h3>
              <p className={`${textSecondary} mb-6`}>
                Únete a nuestra plataforma y conecta con miles de clientes.
              </p>
              <button className={`px-6 py-3 text-white rounded ${buttonBg}`} disabled>
                Registrar mi Servicio
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
