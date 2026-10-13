import React from 'react';
import { Property, SiteConfig } from '../types';
import { formatDualPrice } from '../config/siteConfig';
import { X, Heart, Trash2, MessageCircle } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  config: SiteConfig;
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onOpenDetails: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  config,
  onRemoveFavorite,
  onClearAll,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  const totalValueUSD = favorites.reduce((acc, curr) => acc + curr.priceUSD, 0);
  const totalValueCRC = Math.round(totalValueUSD * config.exchangeRate);

  const handleInquireAll = () => {
    const refs = favorites.map((p) => `${p.reference} ($${p.priceUSD.toLocaleString('en-US')} USD)`).join(', ');
    const message = `Hola ${config.brandName}, tengo guardadas estas ${favorites.length} propiedades favoritas en su web: ${refs}. Me gustaría coordinar visitas en Costa Rica y consultar disponibilidad.`;
    const cleanNumber = config.contact.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl text-left animate-slideLeft">
        {/* CABECERA */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Heart size={16} className="fill-rose-500" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider font-serif-luxury">
                Mis Favoritos ({favorites.length})
              </h3>
              <span className="text-[10px] text-slate-400">Propiedades guardadas en Costa Rica</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* LISTADO DE INMUEBLES GUARDADOS */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {favorites.length > 0 ? (
            favorites.map((prop) => {
              const priceData = formatDualPrice(
                prop.priceUSD,
                config.currencyMode,
                config.exchangeRate,
                prop.operation === 'alquiler'
              );

              return (
                <div
                  key={prop.id}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-center gap-3 hover:border-slate-700 transition"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onOpenDetails(prop);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono font-bold text-brand block">
                      {prop.reference}
                    </span>
                    <h4
                      onClick={() => {
                        onOpenDetails(prop);
                        onClose();
                      }}
                      className="text-xs font-bold text-white truncate cursor-pointer hover:text-brand"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate">
                      {prop.neighborhood}, {prop.city}
                    </p>
                    <span className="text-xs font-black text-brand font-serif-luxury block mt-0.5">
                      {priceData.primary}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(prop.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 space-y-3">
              <Heart size={36} className="text-slate-700 mx-auto" />
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                No tienes propiedades guardadas todavía. Haz clic en el corazón (❤️) de cualquier inmueble para guardarlo aquí.
              </p>
            </div>
          )}
        </div>

        {/* PIE DEL DRAWER CON TOTAL Y BOTÓN DE WHATSAPP */}
        {favorites.length > 0 && (
          <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
            <div className="flex justify-between items-baseline text-xs">
              <span className="text-slate-400">Total Estimado:</span>
              <div className="text-right">
                <span className="text-base font-black text-brand font-serif-luxury block">
                  ${totalValueUSD.toLocaleString('en-US')} USD
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400 block">
                  ≈ ₡{totalValueCRC.toLocaleString('es-CR')} CRC
                </span>
              </div>
            </div>

            <button
              onClick={handleInquireAll}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <MessageCircle size={16} />
              <span>Consultar Selección por WhatsApp</span>
            </button>

            <button
              onClick={onClearAll}
              className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 transition py-1 cursor-pointer"
            >
              Vaciar lista de favoritos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
