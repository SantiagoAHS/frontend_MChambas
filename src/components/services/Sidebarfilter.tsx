import { Star } from "lucide-react";

const SidebarFilters = () => {
  return (
    <aside className="hidden lg:block w-64">
      <div className="border border-orange-600 rounded-lg bg-white p-4 space-y-6">
        <h3 className="font-semibold text-lg">Filtros</h3>

        <div>
          <label className="text-sm font-medium block mb-1">Categoría</label>
          <select className="w-full border border-orange-600 rounded px-2 py-1 text-sm" disabled>
            <option>Todas las categorías</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Ubicación</label>
          <select className="w-full border border-orange-600 rounded px-2 py-1 text-sm" disabled>
            <option>Todas las ubicaciones</option>
          </select>
        </div>

        <hr className="border-orange-600" />

        <div className="flex items-center space-x-2">
          <input type="checkbox" disabled />
          <label className="text-sm text-gray-600">Solo verificados</label>
        </div>

        <hr className="border-orange-600" />

        <div>
          <label className="text-sm font-medium block mb-1">Precio</label>
          <div className="space-y-2 text-sm text-gray-600">
            <div><input type="checkbox" disabled /> Menos de $15.000</div>
            <div><input type="checkbox" disabled /> $15.000 - $25.000</div>
            <div><input type="checkbox" disabled /> $25.000 - $35.000</div>
            <div><input type="checkbox" disabled /> Más de $35.000</div>
          </div>
        </div>

        <hr className="border-orange-600" />

        <div>
          <label className="text-sm font-medium block mb-1">Calificación</label>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <input type="checkbox" disabled />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>5 estrellas</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" disabled />
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
