import { Search, Filter, Grid, List } from "lucide-react"
import SidebarFilters from "@/components/services/Sidebarfilter"
import ServicesGrid from "@/components/services/Servicesgrid"

const services = [
  {
    id: 1,
    title: "Servicio de Plomería",
    provider: "Juan Pérez",
    avatar: "",
    image: "",
    verified: true,
    description: "Soluciono problemas de plomería a domicilio.",
    rating: 4.8,
    reviews: 20,
    location: "Ciudad de México",
    responseTime: "1 hora",
    price: "$20,000"
  },
  {
    id: 2,
    title: "Plomería Residencial y Comercial",
    provider: "María González",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    reviews: 89,
    price: "Desde $15.000",
    location: "Las Condes",
    category: "Plomería",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
    responseTime: "1 hora",
    description: "Instalación y reparación de tuberías, grifos, inodoros. Servicio de emergencia 24/7.",
  },
  {
    id: 3,
    title: "Instalaciones Eléctricas Certificadas",
    provider: "Juan Pérez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    reviews: 156,
    price: "Desde $20.000",
    location: "Providencia",
    category: "Electricidad",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
    responseTime: "3 horas",
    description: "Instalaciones eléctricas residenciales y comerciales. Certificación SEC incluida.",
  },
  {
    id: 4,
    title: "Carpintería y Muebles a Medida",
    provider: "Roberto Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    reviews: 73,
    price: "Desde $30.000",
    location: "Ñuñoa",
    category: "Carpintería",
    image: "/placeholder.svg?height=200&width=300",
    verified: false,
    responseTime: "4 horas",
    description: "Fabricación de muebles personalizados, reparación de puertas, ventanas y trabajos en madera.",
  },
  {
    id: 5,
    title: "Limpieza Profunda de Hogar",
    provider: "Ana Martínez",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    reviews: 203,
    price: "Desde $18.000",
    location: "Maipú",
    category: "Limpieza",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
    responseTime: "2 horas",
    description: "Servicio de limpieza profunda para hogares y oficinas. Productos ecológicos disponibles.",
  },
  {
    id: 6,
    title: "Jardinería y Paisajismo",
    provider: "Pedro Morales",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    reviews: 94,
    price: "Desde $22.000",
    location: "La Reina",
    category: "Jardinería",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
    responseTime: "6 horas",
    description: "Diseño y mantención de jardines, poda de árboles, instalación de sistemas de riego.",
  },
  // Puedes agregar más objetos aquí
]

export default function StaticServicesCatalog() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="pl-10 pr-4 h-12 w-full border rounded-md text-sm"
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
                <p className="text-gray-500">{services.length} servicios encontrados</p>
              </div>

              <div className="flex gap-2 items-center">
                <button className="lg:hidden px-4 py-2 border rounded flex items-center gap-2 text-sm" disabled>
                  <Filter className="w-4 h-4" /> Filtros
                </button>
                <select className="border rounded px-2 py-1 text-sm" disabled>
                  <option>Más relevantes</option>
                </select>
                <div className="flex border rounded overflow-hidden">
                  <button className="px-3 py-2 bg-gray-200 text-sm" disabled><Grid className="w-4 h-4" /></button>
                  <button className="px-3 py-2 text-sm" disabled><List className="w-4 h-4" /></button>
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
              <button className="px-4 py-2 border rounded" disabled>Anterior</button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded" disabled>1</button>
              <button className="px-4 py-2 border rounded" disabled>2</button>
              <button className="px-4 py-2 border rounded" disabled>3</button>
              <button className="px-4 py-2 border rounded" disabled>Siguiente</button>
            </div>

            {/* CTA */}
            <div className="bg-white rounded-lg p-8 mt-8 text-center border">
              <h3 className="text-2xl font-bold mb-4">¿Eres un profesional?</h3>
              <p className="text-gray-500 mb-6">Únete a nuestra plataforma y conecta con miles de clientes.</p>
              <button className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-red-700" disabled>
                Registrar mi Servicio
              </button>
            </div>
          </section>
        </div>
      </main>

    </div>
  )
}