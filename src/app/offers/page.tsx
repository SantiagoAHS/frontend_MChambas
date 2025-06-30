"use client"

import { useState } from "react"
import {
  Wrench,
  Scissors,
  Zap,
  Paintbrush,
  Home,
  Car,
  Gift,
  Star,
  Clock,
  Users,
  Trophy,
  Target,
} from "lucide-react"

export default function OfertasPage() {
  const [serviciosCompletados] = useState(6)

  const cuponesDisponibles = [
    {
      id: "1",
      titulo: "Primera Vez",
      descuento: "20%",
      descripcion: "Descuento para nuevos clientes en cualquier servicio",
      icono: <Gift className="h-6 w-6" />,
      color: "bg-orange-500",
      disponible: true,
      fechaExpiracion: "31 Dic 2024",
    },
    {
      id: "2",
      titulo: "Plomería Express",
      descuento: "15%",
      descripcion: "Descuento en servicios de plomería de emergencia",
      icono: <Wrench className="h-6 w-6" />,
      color: "bg-amber-500",
      disponible: true,
      fechaExpiracion: "15 Ene 2025",
    },
    {
      id: "3",
      titulo: "Jardín Perfecto",
      descuento: "25%",
      descripcion: "Descuento en servicios de jardinería y paisajismo",
      icono: <Scissors className="h-6 w-6" />,
      color: "bg-orange-600",
      disponible: true,
      usado: false,
      fechaExpiracion: "28 Feb 2025",
    },
  ]

  const cuponesProgreso = [
    {
      id: "p1",
      titulo: "Cliente Fiel",
      descuento: "30%",
      descripcion: "Descuento especial después de 4 servicios completados",
      icono: <Star className="h-6 w-6" />,
      color: "bg-amber-500",
      serviciosRequeridos: 4,
      serviciosActuales: Math.min(serviciosCompletados, 4),
      recompensa: "30% en tu próximo servicio",
    },
    {
      id: "p2",
      titulo: "Experto en Casa",
      descuento: "40%",
      descripcion: "Descuento premium después de 8 servicios completados",
      icono: <Home className="h-6 w-6" />,
      color: "bg-orange-500",
      serviciosRequeridos: 8,
      serviciosActuales: Math.min(serviciosCompletados, 8),
      recompensa: "40% + servicio de limpieza gratis",
    },
    {
      id: "p3",
      titulo: "VIP Platinum",
      descuento: "50%",
      descripcion: "Máximo descuento después de 12 servicios completados",
      icono: <Trophy className="h-6 w-6" />,
      color: "bg-gradient-to-r from-orange-400 to-amber-600",
      serviciosRequeridos: 12,
      serviciosActuales: Math.min(serviciosCompletados, 12),
      recompensa: "50% + prioridad en emergencias",
    },
    {
      id: "p4",
      titulo: "Referido Especial",
      descuento: "20%",
      descripcion: "Descuento por cada 2 amigos que refieran nuestros servicios",
      icono: <Users className="h-6 w-6" />,
      color: "bg-amber-600",
      serviciosRequeridos: 2,
      serviciosActuales: 1,
      recompensa: "20% por cada 2 referidos",
    },
  ]

  const calcularProgreso = (actual, requerido) =>
    Math.min((actual / requerido) * 100, 100)

  const esCuponDesbloqueado = (actual, requerido) => actual >= requerido

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎯 Ofertas y Cupones</h1>
          <p className="text-lg text-gray-600">
            Gana descuentos increíbles usando nuestros servicios
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Target className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-gray-700">
              Servicios completados: {serviciosCompletados}
            </span>
          </div>
        </div>

        {/* Cupones Disponibles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Gift className="h-6 w-6 text-orange-600" />
            Cupones Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuponesDisponibles.map((cupon) => (
              <div
                key={cupon.id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition relative"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 ${cupon.color}`} />
                <div className="flex justify-between items-center mb-2">
                  <div className={`p-2 rounded-lg ${cupon.color} text-white`}>
                    {cupon.icono}
                  </div>
                  <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded font-bold">
                    {cupon.descuento} OFF
                  </span>
                </div>
                <h3 className="text-lg font-bold">{cupon.titulo}</h3>
                <p className="text-sm text-gray-600 mb-2">{cupon.descripcion}</p>
                <div className="text-sm text-gray-500 mb-4">
                  Válido hasta: {cupon.fechaExpiracion}
                </div>
                <button
                  disabled={cupon.usado}
                  className={`w-full py-2 px-4 rounded text-white ${
                    cupon.usado
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  {cupon.usado ? "Cupón Usado" : "Usar Cupón"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-8 border-t" />

        {/* Cupones por Desbloquear */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-orange-600" />
            Cupones por Desbloquear
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cuponesProgreso.map((cupon) => {
              const progreso = calcularProgreso(
                cupon.serviciosActuales,
                cupon.serviciosRequeridos
              )
              const desbloqueado = esCuponDesbloqueado(
                cupon.serviciosActuales,
                cupon.serviciosRequeridos
              )

              return (
                <div
                  key={cupon.id}
                  className={`bg-white rounded-lg p-4 relative overflow-hidden transition-all ${
                    desbloqueado ? "ring-2 ring-orange-500 shadow-lg" : "hover:shadow-md"
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 ${cupon.color}`} />
                  {desbloqueado && (
                    <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded text-sm">
                      ¡Desbloqueado!
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${cupon.color} text-white w-fit`}>
                      {cupon.icono}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{cupon.titulo}</h3>
                      <p className="text-sm text-gray-600">{cupon.descripcion}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-semibold">
                        {cupon.serviciosActuales}/{cupon.serviciosRequeridos} servicios
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-3 mt-1 overflow-hidden">
                      <div
                        className="bg-orange-500 h-3"
                        style={{ width: `${progreso}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {desbloqueado
                        ? `¡Felicidades! Has desbloqueado: ${cupon.recompensa}`
                        : `Te faltan ${
                            cupon.serviciosRequeridos - cupon.serviciosActuales
                          } servicios para desbloquear`}
                    </p>
                  </div>
                  <button
                    className={`w-full py-2 px-4 rounded text-white ${
                      desbloqueado
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!desbloqueado}
                  >
                    {desbloqueado
                      ? "Reclamar Cupón"
                      : `${Math.round(progreso)}% Completado`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Servicios Disponibles */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Nuestros Servicios</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { nombre: "Plomería", icono: <Wrench className="h-6 w-6" />, color: "text-orange-600" },
              { nombre: "Jardinería", icono: <Scissors className="h-6 w-6" />, color: "text-amber-600" },
              { nombre: "Electricidad", icono: <Zap className="h-6 w-6" />, color: "text-orange-500" },
              { nombre: "Pintura", icono: <Paintbrush className="h-6 w-6" />, color: "text-amber-500" },
              { nombre: "Limpieza", icono: <Home className="h-6 w-6" />, color: "text-orange-700" },
              { nombre: "Mecánica", icono: <Car className="h-6 w-6" />, color: "text-amber-700" },
            ].map((servicio, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`${servicio.color} mb-2 flex justify-center`}>
                  {servicio.icono}
                </div>
                <span className="text-sm font-medium text-gray-700">{servicio.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
