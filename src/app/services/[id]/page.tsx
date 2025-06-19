import { notFound } from "next/navigation";

// Este sería tu mock temporal (puedes moverlo a un archivo externo o reemplazar por fetch a una API)
const services = [
  {
    id: 1,
    title: "Servicio de Plomería",
    provider: "Juan Pérez",
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
  // ... más servicios
];

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const serviceId = Number(resolvedParams.id);
  const service = services.find(s => s.id === serviceId);

  if (!service) return notFound();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <p className="text-gray-600 mb-4">Ofrecido por: <strong>{service.provider}</strong></p>
        {service.image && (
          <img src={service.image} alt={service.title} className="w-full h-64 object-cover rounded mb-4" />
        )}
        <p className="text-gray-700 mb-4">{service.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <strong>Ubicación:</strong> {service.location}
          </div>
          <div>
            <strong>Responde en:</strong> {service.responseTime}
          </div>
          <div>
            <strong>Precio:</strong> {service.price}
          </div>
          <div>
            <strong>Valoración:</strong> {service.rating} ⭐ ({service.reviews} reseñas)
          </div>
        </div>
        {service.verified && (
          <div className="text-green-600 font-semibold">✅ Profesional verificado</div>
        )}
      </div>

    </div>
  );
}
