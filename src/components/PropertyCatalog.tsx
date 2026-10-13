import React, { useState } from 'react';
import { Property, SiteConfig, FilterState } from '../types';
import { PropertyCard } from './PropertyCard';
import { Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface PropertyCatalogProps {
  properties: Property[];
  config: SiteConfig;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (property: Property) => void;
  filters: FilterState;
  onResetFilters: () => void;
}

export type SortOption = 'price-asc' | 'price-desc' | 'area-desc' | 'newest';

export const PropertyCatalog: React.FC<PropertyCatalogProps> = ({
  properties,
  config,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  filters,
  onResetFilters,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Ordenamiento de propiedades
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'area-desc') return b.areaBuilt - a.areaBuilt;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      {/* CABECERA DEL CATÁLOGO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 mb-1">
            <Sparkles size={14} />
            <span>Colección Seleccionada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
            Inmuebles Disponibles
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mostrando <span className="font-bold text-white">{sortedProperties.length}</span> propiedades en {filters.operation === 'venta' ? 'venta' : 'alquiler'}
          </p>
        </div>

        {/* SELECTOR DE ORDENAMIENTO */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-400 shrink-0">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="newest">Más recientes</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="area-desc">Mayor Superficie (m²)</option>
          </select>
        </div>
      </div>

      {/* CUADRÍCULA DE PROPIEDADES */}
      {sortedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              config={config}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        /* ESTADO VACÍO SI NINGUNA PROPIEDAD COINCIDE CON LOS FILTROS */
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
            <SlidersHorizontal size={28} />
          </div>
          <h3 className="text-lg font-black text-white font-serif-luxury">
            No se encontraron inmuebles con estos filtros
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Prueba a ampliar el rango de precio o desactivar algunos filtros avanzados para ver más opciones disponibles.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Restablecer Filtros de Búsqueda</span>
          </button>
        </div>
      )}
    </section>
  );
};
