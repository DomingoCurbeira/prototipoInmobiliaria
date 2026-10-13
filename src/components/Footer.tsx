import React from 'react';
import { SiteConfig } from '../types';
import { Building2, Phone, Mail, MapPin, Clock, MessageCircle, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onScrollToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* COLUMNA 1 & 2: MARCA & MISIÓN */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
                <Building2 size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-tight font-serif-luxury">
                  {config.brandName}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block leading-none">
                  Boutique Inmobiliaria
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Especialistas en intermediación patrimonial, compraventa de viviendas singulares y alquileres residenciales de alta gama con asesoramiento jurídico integral.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Oficial</span>
              </a>

              <a
                href={`tel:${config.contact.phone}`}
                className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Phone size={14} className="text-amber-400" />
                <span>Llamar Directo</span>
              </a>
            </div>
          </div>

          {/* COLUMNA 3: NAVEGACIÓN RÁPIDA */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Explorar
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onScrollToSection('catalogo')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Propiedades en Venta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('catalogo')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Propiedades en Alquiler
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('vender')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Vender mi Propiedad
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('hipoteca')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Simulador de Hipoteca
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('equipo')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Nuestros Asesores
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO & SEDE */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Sede Central
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{config.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <span>{config.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <span className="truncate">{config.contact.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{config.contact.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 5: GARANTÍAS Y SEGUROS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-400" />
              <span>Garantía Inmobiliaria</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Agencia homologada y adherida a códigos de buenas prácticas profesionales. Seguro de responsabilidad civil y depósitos de fianza garantizados.
            </p>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[10px] text-slate-400">
              Protección de datos conforme al Reglamento General de Protección de Datos (RGPD UE 2016/679).
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR: COPYRIGHT & SUBIR ARRIBA */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados. Desarrollado con tecnología InmoStudio Pro.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
