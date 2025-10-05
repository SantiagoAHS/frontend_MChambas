"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface SidebarFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
  locations?: string[];
}

const SidebarFilters = ({ onFilterChange, locations = [] }: SidebarFiltersProps) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const borderColor = isLight ? "#22c55e" : "#9333ea";
  const bgColor = isLight ? "#ffffff" : "#1f1f1f";
  const textColor = isLight ? "#000000" : "#e5e5e5";

  const [location, setLocation] = useState("");
  const [verified, setVerified] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [minRating, setMinRating] = useState(0);

  const handleApplyFilters = () => {
    onFilterChange({
      location,
      verified,
      priceRange,
      min_rating: minRating,
    });
  };

  return (
    <aside className="hidden lg:block w-64">
      <div
        className="rounded-lg p-4 space-y-6"
        style={{
          border: `2px solid ${borderColor}`,
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <h3 className="font-semibold text-lg">Filtros</h3>

        {/* Ubicación */}
        <div>
          <label className="text-sm font-medium block mb-1">Ubicación</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded px-2 py-1 text-sm"
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: isLight ? "#f9f9f9" : "#2b2b2b",
              color: textColor,
            }}
          >
            <option value="">Todas las ubicaciones</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <hr style={{ borderColor }} />

        {/* Solo verificados */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            style={{ accentColor: borderColor }}
          />
          <label className="text-sm" style={{ color: textColor }}>Solo verificados</label>
        </div>

        <hr style={{ borderColor }} />

        {/* Precio */}
        <div>
          <label className="text-sm font-medium block mb-1">Precio</label>
          <div className="space-y-2 text-sm" style={{ color: textColor }}>
            <div>
              <input type="radio" name="price" value="<15000" checked={priceRange === "<15000"} onChange={(e) => setPriceRange(e.target.value)} style={{ accentColor: borderColor }} /> Menos de $15.000
            </div>
            <div>
              <input type="radio" name="price" value="15000-25000" checked={priceRange === "15000-25000"} onChange={(e) => setPriceRange(e.target.value)} style={{ accentColor: borderColor }} /> $15.000 - $25.000
            </div>
            <div>
              <input type="radio" name="price" value="25000-35000" checked={priceRange === "25000-35000"} onChange={(e) => setPriceRange(e.target.value)} style={{ accentColor: borderColor }} /> $25.000 - $35.000
            </div>
            <div>
              <input type="radio" name="price" value=">35000" checked={priceRange === ">35000"} onChange={(e) => setPriceRange(e.target.value)} style={{ accentColor: borderColor }} /> Más de $35.000
            </div>
          </div>
        </div>

        <hr style={{ borderColor }} />

        {/* Calificación */}
        <div>
          <label className="text-sm font-medium block mb-1">Calificación</label>
          <div className="space-y-2 text-sm" style={{ color: textColor }}>
            {[0, 1, 2, 3, 4, 5].reverse().map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  style={{ accentColor: borderColor }}
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span>
                  {rating === 0
                    ? "Sin calificación"
                    : rating === 1
                    ? "1 estrella"
                    : `${rating}+ estrellas`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Botón aplicar */}
        <button
          className="mt-2 px-4 py-2 rounded text-white"
          style={{ backgroundColor: borderColor }}
          onClick={handleApplyFilters}
        >
          Aplicar filtros
        </button>
      </div>
    </aside>
  );
};

export default SidebarFilters;
