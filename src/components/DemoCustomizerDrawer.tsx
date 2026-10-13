import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { THEME_PRESETS, DEFAULT_SITE_CONFIG } from '../config/siteConfig';
import { X, Sparkles, Palette, Building2, Phone, RotateCcw, Check, Save } from 'lucide-react';

interface DemoCustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  onApplyTheme: (themeId: string) => void;
}

export const DemoCustomizerDrawer: React.FC<DemoCustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  setConfig,
  onApplyTheme,
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('inmo_custom_config', JSON.stringify(config));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('inmo_custom_config');
    setConfig(DEFAULT_SITE_CONFIG);
    onApplyTheme(DEFAULT_SITE_CONFIG.activeThemeId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl text-left animate-slideLeft">
        {/* CABECERA */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider font-serif-luxury">
                Personalizador de Marca (Modo Demo)
              </h3>
              <span className="text-[10px] text-slate-400">Adapta el prototipo a tu cliente en 1 clic</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* FORMULARIO DE PERSONALIZACIÓN */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* SELECCIÓN DE PALETA DE COLOR */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-300 flex items-center gap-1.5">
              <Palette size={13} className="text-amber-400" />
              <span>Paleta de Colores de Marca</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {Object.entries(THEME_PRESETS).map(([id, theme]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setConfig((prev) => ({ ...prev, activeThemeId: id }));
                    onApplyTheme(id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    config.activeThemeId === id
                      ? 'border-amber-500 bg-amber-500/10 shadow-lg'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span className="text-[11px] font-black text-white truncate">
                      {theme.name.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 leading-tight">
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* DATOS DE LA INMOBILIARIA */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <label className="text-[10px] font-black uppercase text-slate-300 flex items-center gap-1.5">
              <Building2 size={13} className="text-amber-400" />
              <span>Identidad Comercial</span>
            </label>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                Nombre de la Inmobiliaria
              </label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => setConfig((prev) => ({ ...prev, brandName: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-500"
                placeholder="Ej: Costa Blanca Prime"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                Eslogan Principal
              </label>
              <input
                type="text"
                value={config.slogan}
                onChange={(e) => setConfig((prev) => ({ ...prev, slogan: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="Ej: Inmuebles Exclusivos en Zonas Prime"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Símbolo de Moneda
                </label>
                <select
                  value={config.currencySymbol}
                  onChange={(e) => setConfig((prev) => ({ ...prev, currencySymbol: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="€">Euros (€)</option>
                  <option value="$">Dólares ($)</option>
                  <option value="£">Libras (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Ciudad Principal
                </label>
                <input
                  type="text"
                  value={config.contact.address.split(',').pop()?.trim() || 'Madrid'}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, address: `Paseo Principal, ${e.target.value}` },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* DATOS DE CONTACTO */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <label className="text-[10px] font-black uppercase text-slate-300 flex items-center gap-1.5">
              <Phone size={13} className="text-amber-400" />
              <span>Canales de Contacto Directo</span>
            </label>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                WhatsApp para recibir solicitudes
              </label>
              <input
                type="text"
                value={config.contact.whatsapp}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, whatsapp: e.target.value },
                  }))
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                placeholder="+34 600 123 456"
              />
              <span className="text-[9px] text-slate-500 block mt-0.5">
                Los botones de WhatsApp de la web enviarán los mensajes a este número.
              </span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                Teléfono Fijo / Centralita
              </label>
              <input
                type="text"
                value={config.contact.phone}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value },
                  }))
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                placeholder="+34 912 345 678"
              />
            </div>
          </div>
        </div>

        {/* PIE: GUARDAR & RESTABLECER */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <button
            onClick={handleSaveToLocalStorage}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 cursor-pointer active:scale-95"
          >
            {savedSuccess ? (
              <>
                <Check size={16} />
                <span>¡Guardado en este Navegador!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Guardar Cambios de Marca</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetToDefault}
            className="w-full flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-500 hover:text-slate-300 transition py-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Restablecer valores originales</span>
          </button>
        </div>
      </div>
    </div>
  );
};
