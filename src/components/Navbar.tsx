import React from 'react';
import { SiteConfig, CurrencyMode } from '../types';
import { Building2, Phone, Heart, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  config: SiteConfig;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenDemoCustomizer: () => void;
  onScrollToSection: (sectionId: string) => void;
  onToggleCurrency: (mode: CurrencyMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  favoritesCount,
  onOpenFavorites,
  onOpenDemoCustomizer,
  onScrollToSection,
  onToggleCurrency,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* LOGO & NOMBRE DE LA INMOBILIARIA */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-brand-grad flex items-center justify-center text-slate-950 shadow-brand group-hover:scale-105 transition-transform">
            <Building2 size={24} className="stroke-[2.2]" />
          </div>
          <div className="text-left">
            <span className="text-lg font-black tracking-tight text-white block leading-tight font-serif-luxury group-hover:text-brand transition-colors">
              {config.brandName}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block leading-none">
              Costa Rica Real Estate
            </span>
          </div>
        </div>

        {/* ENLACES DE NAVEGACIÓN (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase text-slate-300">
          <button
            onClick={() => onScrollToSection('catalogo')}
            className="hover:text-brand transition-colors cursor-pointer"
          >
            Propiedades
          </button>
          <button
            onClick={() => onScrollToSection('vender')}
            className="hover:text-brand transition-colors cursor-pointer"
          >
            Vender / Alquilar
          </button>
          <button
            onClick={() => onScrollToSection('hipoteca')}
            className="hover:text-brand transition-colors cursor-pointer"
          >
            Crédito Hipotecario
          </button>
          <button
            onClick={() => onScrollToSection('equipo')}
            className="hover:text-brand transition-colors cursor-pointer"
          >
            Asesores
          </button>
          <button
            onClick={() => onScrollToSection('contacto')}
            className="hover:text-brand transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </nav>

        {/* SELECTOR DE MONEDA COSTA RICA (DÓLARES / COLONES) & ACCIONES */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* CONMUTADOR DE MONEDA BIMONEDA */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-[11px] font-black shadow-inner">
            <button
              onClick={() => onToggleCurrency('USD')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                config.currencyMode === 'USD'
                  ? 'bg-brand text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mostrar precios en Dólares Estadounidenses ($ USD)"
            >
              $ USD
            </button>
            <button
              onClick={() => onToggleCurrency('CRC')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                config.currencyMode === 'CRC'
                  ? 'bg-brand text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mostrar precios en Colones Costarricenses (₡ CRC)"
            >
              ₡ CRC
            </button>
          </div>

          {/* Botón de Favoritos */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
            title="Ver Inmuebles Favoritos"
          >
            <Heart size={18} className={favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Botón WhatsApp Inmobiliaria */}
          <a
            href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 px-3.5 py-2 rounded-xl text-xs font-bold transition"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          {/* Botón Llamar Costa Rica */}
          <a
            href={`tel:${config.contact.phone}`}
            className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 transition"
          >
            <Phone size={14} className="text-brand" />
            <span>{config.contact.phone}</span>
          </a>

          {/* Botón Personalizar Marca (Modo Demo) */}
          <button
            onClick={onOpenDemoCustomizer}
            className="flex items-center gap-1.5 bg-brand-grad text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black shadow-brand hover:scale-105 active:scale-95 transition cursor-pointer"
            title="Cambiar Nombre, Colores y Moneda en Vivo"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Modo Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
