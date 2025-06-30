"use client";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";

const ServiceCard = ({ service }) => (
  <Link href={`/services/${service.id}`}>
    <div className="border border-orange-600 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer bg-white">
      <div className="relative">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-48 object-cover"
        />
        {service.verified && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Verificado
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
            {service.provider?.nombre?.[0] || "?"}
          </div>
          <span className="text-sm text-gray-500">
            {service.provider?.nombre || "Sin nombre"}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
        <div className="flex items-center gap-4 text-sm mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-gray-500">({service.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4" />
          <span>Responde en {service.responseTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">{service.price}</span>
          <span className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            Contactar
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default ServiceCard;
