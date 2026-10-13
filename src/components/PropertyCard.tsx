import React, { useState } from 'react';
import { Property, SiteConfig } from '../types';
import { formatDualPrice, getWhatsAppInquiryUrl } from '../config/siteConfig';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Zap,
  Waves,
  Sun,
  Eye,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  config: SiteConfig;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  config,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Formato Bimoneda Costa Rica (Dólares USD y Colones CRC)
  const isRental = property.operation === 'alquiler';
  const priceData = formatDualPrice(
    property.priceUSD,
    config.currencyMode,
    config.exchangeRate,
    isRental
  );

  const previousPriceData = property.previousPriceUSD
    ? formatDualPrice(property.previousPriceUSD, config.currencyMode, config.exchangeRate, isRental)
    : null;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const whatsappUrl = getWhatsAppInquiryUrl(
    config.contact.whatsapp,
    property.reference,
    property.title,
    priceData.primary
  );

  return (
    <article className="group bg-slate-900/90 rounded-3xl border border-slate-800/80 overflow-hidden shadow-xl hover:shadow-2xl hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left relative">
      {/* SECCIÓN SUPERIOR: FOTO CON MINI-CARRUSEL & INSIGNIAS */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-950 select-none">
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradiente de contraste inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40 pointer-events-none" />

        {/* ETIQUETAS SUPERIORES IZQUIERDA: ESTADO / OPERACIÓN */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          <span className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-white border border-white/10 shadow">
            {property.operation === 'venta' ? 'En Venta' : 'En Alquiler'}
          </span>

          {property.status === 'exclusiva' && (
            <span className="bg-brand-grad text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow flex items-center gap-1">
              <Sparkles size={11} />
              <span>Exclusiva</span>
            </span>
          )}

          {property.status === 'rebajado' && property.previousPriceUSD && (
            <span className="bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow animate-pulse">
              🔥 Bajó ${((property.previousPriceUSD - property.priceUSD)).toLocaleString('en-US')} USD
            </span>
          )}

          {property.status === 'reservado' && (
            <span className="bg-rose-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow">
              Reservado
            </span>
          )}

          {property.status === 'nuevo' && (
            <span className="bg-sky-500 text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow">
              Novedad
            </span>
          )}
        </div>

        {/* BOTÓN SUPERIOR DERECHA: FAVORITOS ❤️ */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition cursor-pointer"
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart
            size={16}
            className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white hover:text-rose-400'}
          />
        </button>

        {/* CONTROLES DE NAVEGACIÓN DE FOTOS */}
        {property.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevPhoto}
              className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur text-white flex items-center justify-center hover:bg-slate-900 pointer-events-auto transition cursor-pointer shadow-lg"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextPhoto}
              className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur text-white flex items-center justify-center hover:bg-slate-900 pointer-events-auto transition cursor-pointer shadow-lg"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* CONTADOR DE FOTOS INFERIOR DERECHA */}
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-slate-300 border border-white/10">
          {currentImageIndex + 1} / {property.images.length} fotos
        </div>

        {/* REFERENCIA DISCRETA INFERIOR IZQUIERDA */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-brand border border-white/10">
          {property.reference}
        </div>
      </div>

      {/* SECCIÓN INTERMEDIA: DATOS CLAVE Y PRECIO BIMONEDA */}
      <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Ubicación en Costa Rica */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin size={13} className="text-brand shrink-0" />
            <span className="font-semibold text-slate-300">
              {property.neighborhood}, {property.city} ({property.province})
            </span>
          </div>

          {/* Título de la propiedad */}
          <h3
            onClick={() => onOpenDetails(property)}
            className="text-base font-bold text-white hover:text-brand transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {property.title}
          </h3>

          {/* Destacado emocional de ubicación */}
          {property.locationHighlights && (
            <p className="text-[11px] text-brand/90 italic font-medium line-clamp-1">
              ✨ {property.locationHighlights}
            </p>
          )}
        </div>

        {/* BLOQUE DE PRECIO BIMONEDA (DÓLARES & COLONES) */}
        <div className="pt-2 border-t border-slate-800/80">
          {previousPriceData && property.status === 'rebajado' && (
            <span className="text-xs text-slate-500 line-through block font-mono">
              {previousPriceData.primary}
            </span>
          )}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-white font-serif-luxury tracking-tight block leading-tight">
                {priceData.primary}
              </span>
              <span className="text-xs font-mono font-semibold text-brand block mt-0.5">
                {priceData.secondary}
              </span>
            </div>

            <span className="text-[11px] font-mono text-slate-400 font-medium">
              {priceData.perM2}
            </span>
          </div>
        </div>

        {/* CUADRÍCULA DE ICONOS DE CARACTERÍSTICAS */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-center">
          {/* 1. Habitaciones */}
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Bed size={14} className="text-brand" />
              <span className="text-xs font-black text-white">{property.bedrooms}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Habit.</span>
          </div>

          {/* 2. Baños */}
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Bath size={14} className="text-brand" />
              <span className="text-xs font-black text-white">{property.bathrooms}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Baños</span>
          </div>

          {/* 3. Parqueos / Cochera */}
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Car size={14} className="text-brand" />
              <span className="text-xs font-black text-white">{property.garageSpots}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Parqueos</span>
          </div>

          {/* 4. Metros Cuadrados */}
          <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
              <Maximize2 size={13} className="text-brand" />
              <span className="text-xs font-black text-white">{property.areaBuilt}</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">m² const.</span>
          </div>
        </div>

        {/* Fila de comodidades extra (Piscina, Seguridad 24/7, Terraza) */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
          <div className="flex items-center gap-2">
            {property.hasPool && (
              <span className="flex items-center gap-1 text-sky-400" title="Piscina">
                <Waves size={13} />
                <span>Piscina</span>
              </span>
            )}
            {property.hasTerrace && (
              <span className="flex items-center gap-1 text-brand" title="Terraza / Balcón">
                <Sun size={13} />
                <span>Terraza</span>
              </span>
            )}
            {property.hasSecurity24 && (
              <span className="flex items-center gap-1 text-emerald-400" title="Seguridad 24/7">
                <ShieldCheck size={13} />
                <span>Seguridad 24/7</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Zap size={11} className="text-emerald-400" />
            <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Clase {property.energyRating}
            </span>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: BOTONES DE ACCIÓN */}
      <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2">
        <button
          onClick={() => onOpenDetails(property)}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Eye size={15} />
          <span>Ver Ficha Completa</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black p-2.5 rounded-xl transition flex items-center justify-center shadow-lg shadow-emerald-500/20"
          title="Consultar por WhatsApp con referencia en Costa Rica"
        >
          <MessageCircle size={18} />
        </a>
      </div>
    </article>
  );
};
