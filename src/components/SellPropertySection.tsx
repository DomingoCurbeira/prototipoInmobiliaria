import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { Sparkles, Camera, ShieldCheck, TrendingUp, Users, MessageCircle } from 'lucide-react';

interface SellPropertySectionProps {
  config: SiteConfig;
}

export const SellPropertySection: React.FC<SellPropertySectionProps> = ({ config }) => {
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Casa en Condominio');
  const [approxM2, setApproxM2] = useState('');
  const [intent, setIntent] = useState<'vender' | 'alquilar'>('vender');

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = config.contact.whatsapp.replace(/[^0-9]/g, '');
    const message = `Hola ${config.brandName}, me gustaría solicitar una valoración gratuita para ${intent} mi ${propertyType} de aprox. ${approxM2 || 'varios'} m² ubicado en ${address || 'Costa Rica'}. ¿Podrían orientarme sobre el valor de mercado?`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="vender" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12 lg:p-16 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow sutil */}
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-brand-light rounded-full blur-3xl pointer-events-none opacity-30" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* COLUMNA IZQUIERDA: PROPUESTA DE VALOR PARA PROPIETARIOS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand">
              <Sparkles size={14} />
              <span>Para Propietarios en Costa Rica</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight leading-tight">
              ¿Deseas vender o alquilar tu propiedad en Costa Rica al mejor valor?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              En <strong className="text-white font-semibold">{config.brandName}</strong> conectamos tu inmueble con compradores locales e inversionistas internacionales de alto poder adquisitivo, cuidando cada detalle del proceso legal y notarial.
            </p>

            {/* 4 PILARES DE SERVICIO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <TrendingUp size={20} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Valoración Real de Mercado 24h
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Estudio comparativo con transacciones reales registradas en condominios y zonas aledañas en Costa Rica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <Camera size={20} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Fotografía Profesional & Dron
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Tomas aéreas de la zona, fotos en alta resolución y planos acotados para destacar el inmueble.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <Users size={20} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Compradores Precalificados
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Filtramos clientes con fondos listos o preaprobación bancaria para visitas seguras y efectivas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                <ShieldCheck size={20} className="text-brand shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Seguridad Legal & Registro Nacional
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Revisión de planos catastrados, gravámenes, redacción de contratos de opción de compraventa y escrituración.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO INTERACTIVO DE VALORACIÓN */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand block mb-1">
                Tasación Inicial Gratuita
              </span>
              <h3 className="text-xl font-black text-white font-serif-luxury">
                Solicita una Valoración
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sin compromiso. Uno de nuestros asesores te responderá el mismo día.
              </p>
            </div>

            <form onSubmit={handleValuationSubmit} className="space-y-4 text-xs">
              {/* Selector Vender / Alquilar */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setIntent('vender')}
                  className={`py-2 rounded-lg font-black uppercase text-[10px] transition cursor-pointer ${
                    intent === 'vender' ? 'bg-brand text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Quiero Vender
                </button>
                <button
                  type="button"
                  onClick={() => setIntent('alquilar')}
                  className={`py-2 rounded-lg font-black uppercase text-[10px] transition cursor-pointer ${
                    intent === 'alquilar' ? 'bg-brand text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Quiero Alquilar
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                  Ubicación (Cantón, Condominio o Zona)
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej: Condominio en Lindora, Santa Ana..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-solid"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Tipo de Inmueble
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-solid cursor-pointer"
                  >
                    <option value="Casa en Condominio">Casa en Condominio</option>
                    <option value="Apartamento / Torre">Apartamento en Torre</option>
                    <option value="Ático / Penthouse">Penthouse</option>
                    <option value="Villa de Playa">Villa de Playa</option>
                    <option value="Lote / Terreno">Lote / Terreno</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Superficie aprox. (m²)
                  </label>
                  <input
                    type="number"
                    value={approxM2}
                    onChange={(e) => setApproxM2(e.target.value)}
                    placeholder="Ej: 220"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-solid"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-grad text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-brand active:scale-95 transition cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Solicitar Valoración por WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
