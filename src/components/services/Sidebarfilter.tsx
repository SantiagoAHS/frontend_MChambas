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

  const red = "#ef4444"; 

  const bgColor = isLight ? "#ffffff" : "#1f1f1f";
  const textColor = isLight ? "#1f1f1f" : "#e5e5e5";
  const inputBg = isLight ? "#f9f9f9" : "#2b2b2b";

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
          border: `2px solid ${red}`,
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        <h3 className="font-semibold text-lg text-red-500">Filtros</h3>

        <div>
          <label className="text-sm font-medium block mb-1 text-red-500">Ubicación</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded px-2 py-1 text-sm"
            style={{
              border: `1px solid ${red}`,
              backgroundColor: inputBg,
              color: textColor,
            }}
          >
            <option value="">Todas las ubicaciones</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <hr style={{ borderColor: red }} />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => setVerified(e.target.checked)}
            style={{ accentColor: "#22c55e" }} 
          />
          <label className="text-sm">Solo verificados</label>
        </div>

        <hr style={{ borderColor: red }} />

        <div>
          <label className="text-sm font-medium block mb-1 text-red-500">Precio</label>
          <div className="space-y-2 text-sm">
            {[
              ["<15000", "Menos de $15.000"],
              ["15000-25000", "$15.000 - $25.000"],
              ["25000-35000", "$25.000 - $35.000"],
              [">35000", "Más de $35.000"],
            ].map(([value, label]) => (
              <div key={value}>
                <input
                  type="radio"
                  name="price"
                  value={value}
                  checked={priceRange === value}
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={{ accentColor: red }}
                />{" "}
                {label}
              </div>
            ))}
          </div>
        </div>

        <hr style={{ borderColor: red }} />

        <div>
          <label className="text-sm font-medium block mb-1 text-red-500">Calificación</label>
          <div className="space-y-2 text-sm">
            {[0, 1, 2, 3, 4, 5].reverse().map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  style={{ accentColor: red }}
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

        <button
          className="mt-2 px-4 py-2 rounded text-white"
          style={{ backgroundColor: red }}
          onClick={handleApplyFilters}
        >
          Aplicar filtros
        </button>
      </div>
    </aside>
  );
};

export default SidebarFilters;
