"use client";

import { Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const SidebarFilters = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const borderColor = isLight ? "#22c55e" : "#9333ea";
  const bgColor = isLight ? "#ffffff" : "#1f1f1f";
  const textColor = isLight ? "#000000" : "#e5e5e5";

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

        <div>
          <label className="text-sm font-medium block mb-1">Categoría</label>
          <select
            className="w-full rounded px-2 py-1 text-sm"
            disabled
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: isLight ? "#f9f9f9" : "#2b2b2b",
              color: textColor,
            }}
          >
            <option>Todas las categorías</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Ubicación</label>
          <select
            className="w-full rounded px-2 py-1 text-sm"
            disabled
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: isLight ? "#f9f9f9" : "#2b2b2b",
              color: textColor,
            }}
          >
            <option>Todas las ubicaciones</option>
          </select>
        </div>

        <hr style={{ borderColor }} />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            disabled
            style={{ accentColor: borderColor }}
          />
          <label className="text-sm" style={{ color: textColor }}>
            Solo verificados
          </label>
        </div>

        <hr style={{ borderColor }} />

        <div>
          <label className="text-sm font-medium block mb-1">Precio</label>
          <div className="space-y-2 text-sm" style={{ color: textColor }}>
            <div>
              <input type="checkbox" disabled style={{ accentColor: borderColor }} /> Menos de $15.000
            </div>
            <div>
              <input type="checkbox" disabled style={{ accentColor: borderColor }} /> $15.000 - $25.000
            </div>
            <div>
              <input type="checkbox" disabled style={{ accentColor: borderColor }} /> $25.000 - $35.000
            </div>
            <div>
              <input type="checkbox" disabled style={{ accentColor: borderColor }} /> Más de $35.000
            </div>
          </div>
        </div>

        <hr style={{ borderColor }} />

        <div>
          <label className="text-sm font-medium block mb-1">Calificación</label>
          <div className="space-y-2 text-sm" style={{ color: textColor }}>
            <div className="flex items-center space-x-2">
              <input type="checkbox" disabled style={{ accentColor: borderColor }} />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>5 estrellas</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" disabled style={{ accentColor: borderColor }} />
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-3 h-3 text-gray-300" />
              </div>
              <span>4+ estrellas</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;
