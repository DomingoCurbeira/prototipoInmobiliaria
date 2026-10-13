import React, { useState } from 'react';
import { Property, SiteConfig, Agent } from '../types';
import { formatCurrency, getWhatsAppInquiryUrl } from '../config/siteConfig';
import {
  X,
  Bed,
  Bath,
  Car,
  Maximize2,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  Zap,
  Phone,
  MessageCircle,
  Calculator,
  Share2,
  Heart,
  Sparkles,
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  config: SiteConfig;
  agent?: Agent;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  config,
  agent,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  if (!property) return null;

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const priceFormatted = formatCurrency(property.price, config.currencySymbol);
  const pricePerM2 = Math.round(property.price / property.areaBuilt);

  // Estimación rápida de hipoteca (80% financiado a 30 años al 3%)
  const loanAmount = property.price * 0.8;
  const monthlyRate = 0.03 / 12;
  const numPayments = 30 * 12;
  const estimatedMonthlyMortgage = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
  );

  const whatsappUrl = getWhatsAppInquiryUrl(
    agent?.whatsapp || config.contact.whatsapp,
    property.reference,
    property.title,
    priceFormatted
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* CONTENEDOR MODAL */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative my-auto text-left flex flex-col max-h-[92vh]">
        {/* BARRA SUPERIOR FIJA CON BOTONES DE ACCIÓN */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              {property.reference}
            </span>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              {property.neighborhood}, {property.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title="Guardar en favoritos"
            >
              <Heart
                size={18}
                className={isFavorite ? 'fill-rose-500 text-rose-500' : ''}
              />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer text-xs flex items-center gap-1.5"
              title="Copiar enlace"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">{copiedLink ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Cerrar ficha"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CONTENIDO DESPLAZABLE */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          {/* GALERÍA DE IMÁGENES PRINCIPAL */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <img
                src={property.images[activePhotoIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-black uppercase text-white border border-white/10">
                  {property.operation === 'venta' ? 'En Venta' : 'En Alquiler'}
                </span>
                {property.status === 'exclusiva' && (
                  <span className="bg-amber-500 text-slate-950 px-3 py-1 rounded-lg text-xs font-black uppercase shadow flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>Exclusiva</span>
                  </span>
                )}
              </div>
            </div>

            {/* MINIATURAS DE FOTOS */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-amber-500 scale-105 shadow-md'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* CABECERA DE PRECIO Y TÍTULO */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
                <MapPin size={14} />
                <span>{property.neighborhood}, {property.city}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
                {property.title}
              </h2>
              {property.locationHighlights && (
                <p className="text-xs text-slate-400 font-medium">
                  ✨ {property.locationHighlights}
                </p>
              )}
            </div>

            <div className="text-left sm:text-right shrink-0">
              {property.previousPrice && (
                <span className="text-xs text-slate-500 line-through block font-mono">
                  {formatCurrency(property.previousPrice, config.currencySymbol)}
                </span>
              )}
              <div className="text-3xl font-black text-amber-400 font-serif-luxury">
                {priceFormatted}
                {property.operation === 'alquiler' && <span className="text-sm font-sans text-slate-400">/mes</span>}
              </div>
              <span className="text-xs font-mono text-slate-400">
                {pricePerM2.toLocaleString('es-ES')} {config.currencySymbol}/m² construidos
              </span>
            </div>
          </div>

          {/* CUADRÍCULA DE MÉTRICAS CLAVE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Bed size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dormitorios</span>
                <span className="text-lg font-black text-white">{property.bedrooms} dobles</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Bath size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Baños</span>
                <span className="text-lg font-black text-white">{property.bathrooms} completos</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Car size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Plazas Garaje</span>
                <span className="text-lg font-black text-white">{property.garageSpots} plazas</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Maximize2 size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Superficie</span>
                <span className="text-lg font-black text-white">{property.areaBuilt} m² ({property.areaUsable || property.areaBuilt - 15} m² útiles)</span>
              </div>
            </div>
          </div>

          {/* DESCRIPCIÓN Y COMODIDADES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-300 mb-2">
                  Descripción Detallada
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* LISTA DE COMODIDADES (CHECKLIST) */}
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-300 mb-3">
                  Características & Equipamiento
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
                  {property.hasElevator && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>Ascensor directo</span>
                    </div>
                  )}
                  {property.hasAirConditioning && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>Aire Acondicionado</span>
                    </div>
                  )}
                  {property.hasHeating && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>Calefacción</span>
                    </div>
                  )}
                  {property.hasPool && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>Piscina privada/comunitaria</span>
                    </div>
                  )}
                  {property.hasTerrace && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>Terraza exterior</span>
                    </div>
                  )}
                  {property.hasGarden && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <span>Jardín</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Año de construcción: {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Planta: {property.floor || 'Principal'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-emerald-400 shrink-0" />
                    <span>Eficiencia Energética: Clase {property.energyRating}</span>
                  </div>
                </div>
              </div>

              {/* ESTIMACIÓN DE CUOTA HIPOTECARIA */}
              {property.operation === 'venta' && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                      <Calculator size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase text-white block">
                        Estimación de Hipoteca
                      </span>
                      <span className="text-[11px] text-slate-400">
                        80% financiado a 30 años al 3% de interés
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-amber-400 font-serif-luxury">
                      ~{estimatedMonthlyMortgage.toLocaleString('es-ES')} {config.currencySymbol}/mes
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* TARJETA DEL ASESOR INMOBILIARIO ASIGNADO */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 h-fit">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Asesor Especialista Asignado
              </span>

              {agent && (
                <div className="flex items-center gap-3">
                  <img
                    src={agent.photoUrl}
                    alt={agent.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-amber-500/30"
                  />
                  <div>
                    <h5 className="text-sm font-black text-white">{agent.name}</h5>
                    <p className="text-[11px] text-slate-400">{agent.role}</p>
                    <span className="text-[10px] text-amber-400 font-bold block mt-0.5">
                      ⭐ {agent.salesCount} operaciones cerradas
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-400 leading-relaxed">
                Contacta directamente para resolver dudas, solicitar planos arquitectónicos o agendar una visita privada.
              </p>

              {/* BOTONES DE CONTACTO DIRECTO */}
              <div className="space-y-2 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  <MessageCircle size={16} />
                  <span>Agendar Visita por WhatsApp</span>
                </a>

                <a
                  href={`tel:${agent?.phone || config.contact.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs border border-slate-800 transition"
                >
                  <Phone size={15} className="text-amber-400" />
                  <span>Llamar al Asesor</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
