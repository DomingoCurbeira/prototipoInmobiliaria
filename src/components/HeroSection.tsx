import React, { useState } from 'react';
import { SiteConfig, FilterState, PropertyType, OperationType } from '../types';
import { Search, SlidersHorizontal, MapPin, Home, DollarSign, Bed, Sparkles, Check } from 'lucide-react';

interface HeroSectionProps {
  config: SiteConfig;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearch: () => void;
  resultsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  filters,
  setFilters,
  onSearch,
  resultsCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleOperationChange = (op: OperationType) => {
    setFilters((prev) => ({
      ...prev,
      operation: op,
      // Ajustar rangos razonables de precio según sea venta o alquiler
      minPrice: 0,
      maxPrice: op === 'venta' ? 2000000 : 5000,
    }));
  };

  return (
    <div className="relative min-h-[640px] flex items-center justify-center pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* IMAGEN DE FONDO ARQUITECTÓNICA CON OVERLAY OSCURO */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Architecture"
          className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-6">
        {/* DISTINTIVO DE LUJO */}
        <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest shadow-2xl">
          <Sparkles size={14} className="text-amber-400" />
          <span>Viviendas Singulares & Asesoramiento Exclusivo</span>
        </div>

        {/* TÍTULO PRINCIPAL DINÁMICO */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-serif-luxury leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
          Tu próximo hogar comienza en{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            {config.brandName}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
          {config.subSlogan}
        </p>

        {/* CAJA DEL BUSCADOR INTELIGENTE MULTIFILTRO */}
        <div className="mt-8 bg-slate-900/90 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl text-left max-w-4xl mx-auto">
          {/* PESTAÑAS DE OPERACIÓN: COMPRAR / ALQUILAR */}
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800/80 pb-3">
            <button
              onClick={() => handleOperationChange('venta')}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                filters.operation === 'venta'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Home size={14} />
              <span>Comprar Vivienda</span>
            </button>

            <button
              onClick={() => handleOperationChange('alquiler')}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                filters.operation === 'alquiler'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <DollarSign size={14} />
              <span>Alquilar Vivienda</span>
            </button>
          </div>

          {/* CUADRÍCULA DE FILTROS PRINCIPALES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Búsqueda por texto / Barrio */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
                <MapPin size={12} className="text-amber-400" />
                <span>Zona o Barrio</span>
              </label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Ej. Salamanca, Chamberí..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* 2. Tipo de Inmueble */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
                <Home size={12} className="text-amber-400" />
                <span>Tipo de Propiedad</span>
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, propertyType: e.target.value as PropertyType | 'todos' }))
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition cursor-pointer"
              >
                <option value="todos">Todos los tipos</option>
                <option value="piso">Piso / Apartamento</option>
                <option value="atico">Ático con Terraza</option>
                <option value="villa">Villa Exclusiva</option>
                <option value="casa">Chalet / Casa</option>
                <option value="duplex">Dúplex</option>
              </select>
            </div>

            {/* 3. Rango de Precio Máximo */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
                <DollarSign size={12} className="text-amber-400" />
                <span>
                  Precio Máx ({filters.maxPrice.toLocaleString('es-ES')} {config.currencySymbol})
                </span>
              </label>
              <input
                type="range"
                min={filters.operation === 'venta' ? 200000 : 1000}
                max={filters.operation === 'venta' ? 2000000 : 5000}
                step={filters.operation === 'venta' ? 50000 : 100}
                value={filters.maxPrice}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-amber-500 cursor-pointer mt-2"
              />
            </div>

            {/* 4. Habitaciones Mínimas */}
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1">
                <Bed size={12} className="text-amber-400" />
                <span>Habitaciones mínimas</span>
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, minBedrooms: num }))}
                    className={`py-2 text-xs font-extrabold rounded-xl border transition cursor-pointer ${
                      filters.minBedrooms === num
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {num === 0 ? 'Todas' : `${num}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FILTROS AVANZADOS DESPLEGABLES */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fadeIn">
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filters.hasPool}
                  onChange={(e) => setFilters((prev) => ({ ...prev, hasPool: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
                <span>Piscina</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filters.hasGarage}
                  onChange={(e) => setFilters((prev) => ({ ...prev, hasGarage: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
                <span>Plaza Garaje</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filters.hasTerrace}
                  onChange={(e) => setFilters((prev) => ({ ...prev, hasTerrace: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
                <span>Terraza / Balcón</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filters.hasElevator}
                  onChange={(e) => setFilters((prev) => ({ ...prev, hasElevator: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
                <span>Con Ascensor</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filters.onlyDiscounted}
                  onChange={(e) => setFilters((prev) => ({ ...prev, onlyDiscounted: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
                <span>Solo Rebajadas 🔥</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={filters.onlyExclusives}
                  onChange={(e) => setFilters((prev) => ({ ...prev, onlyExclusives: e.target.checked }))}
                  className="rounded accent-amber-500"
                />
                <span>Solo Exclusivas 💎</span>
              </label>
            </div>
          )}

          {/* BARRA DE ACCIÓN: BOTÓN FILTROS + BOTÓN BUSCAR */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
            >
              <SlidersHorizontal size={14} className="text-amber-400" />
              <span>{showAdvanced ? 'Ocultar Filtros Extra' : 'Más Filtros (Piscina, Garaje, Terraza...)'}</span>
            </button>

            <button
              onClick={onSearch}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
            >
              <Search size={16} />
              <span>Buscar {resultsCount} Inmuebles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
