import React, { useState } from 'react';
import { SiteConfig, CurrencyMode } from '../types';
import { THEME_PRESETS, DEFAULT_SITE_CONFIG } from '../config/siteConfig';
import { X, Sparkles, Palette, Building2, Phone, RotateCcw, Check, Save, DollarSign } from 'lucide-react';

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

  // Selección de paleta con persistencia automática inmediata
  const handleSelectTheme = (themeId: string) => {
    onApplyTheme(themeId);
    const updated = { ...config, activeThemeId: themeId };
    setConfig(updated);
    localStorage.setItem('inmo_custom_config', JSON.stringify(updated));
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('inmo_custom_config', JSON.stringify(config));
    onApplyTheme(config.activeThemeId);
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
            <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider font-serif-luxury">
                Personalizador de Marca (Costa Rica)
              </h3>
              <span className="text-[10px] text-slate-400">Cambia colores, moneda y datos en 1 clic</span>
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
              <Palette size={13} className="text-brand" />
              <span>Paleta de Colores en Tiempo Real</span>
            </label>

            <div className="grid grid-cols-1 gap-2">
              {Object.entries(THEME_PRESETS).map(([id, theme]) => {
                const isSelected = config.activeThemeId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelectTheme(id)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-brand-solid bg-brand-light shadow-md'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full border border-white/20 shadow-sm shrink-0"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <div>
                        <span className="text-xs font-black text-white block">
                          {theme.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {theme.description}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check size={16} className="text-brand shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MONEDA & TIPO DE CAMBIO EN COSTA RICA */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <label className="text-[10px] font-black uppercase text-slate-300 flex items-center gap-1.5">
              <DollarSign size={13} className="text-brand" />
              <span>Moneda & Tipo de Cambio en Costa Rica</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Moneda Principal
                </label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      const updated: SiteConfig = { ...config, currencyMode: 'USD' };
                      setConfig(updated);
                      localStorage.setItem('inmo_custom_config', JSON.stringify(updated));
                    }}
                    className={`py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                      config.currencyMode === 'USD'
                        ? 'bg-brand text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    $ USD
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated: SiteConfig = { ...config, currencyMode: 'CRC' };
                      setConfig(updated);
                      localStorage.setItem('inmo_custom_config', JSON.stringify(updated));
                    }}
                    className={`py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                      config.currencyMode === 'CRC'
                        ? 'bg-brand text-slate-950 font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ₡ CRC
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Tipo de Cambio (₡ / $1 USD)
                </label>
                <input
                  type="number"
                  value={config.exchangeRate}
                  onChange={(e) => {
                    const rate = Number(e.target.value) || 520;
                    const updated = { ...config, exchangeRate: rate };
                    setConfig(updated);
                    localStorage.setItem('inmo_custom_config', JSON.stringify(updated));
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-brand-solid"
                />
              </div>
            </div>
          </div>

          {/* DATOS DE LA INMOBILIARIA */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <label className="text-[10px] font-black uppercase text-slate-300 flex items-center gap-1.5">
              <Building2 size={13} className="text-brand" />
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
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-brand-solid"
                placeholder="Ej: Costa Rica Luxury Properties"
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
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-solid"
                placeholder="Ej: Bienes Raíces Exclusivos en Costa Rica"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                Dirección / Sede
              </label>
              <input
                type="text"
                value={config.contact.address}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    contact: { ...prev.contact, address: e.target.value },
                  }))
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-brand-solid"
                placeholder="Plaza Tempo, Escazú, San José, Costa Rica"
              />
            </div>
          </div>

          {/* DATOS DE CONTACTO EN COSTA RICA */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <label className="text-[10px] font-black uppercase text-slate-300 flex items-center gap-1.5">
              <Phone size={13} className="text-brand" />
              <span>Teléfonos y WhatsApp de Costa Rica (+506)</span>
            </label>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                WhatsApp para recibir solicitudes de clientes
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
                placeholder="+506 8800-1234"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  Teléfono de Oficina
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-brand-solid"
                  placeholder="+506 2289-4500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">
                  SINPE Móvil
                </label>
                <input
                  type="text"
                  value={config.contact.sinpeMovil || '+506 8800-1234'}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, sinpeMovil: e.target.value },
                    }))
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-brand-solid"
                  placeholder="+506 8800-1234"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PIE: GUARDAR & RESTABLECER */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <button
            onClick={handleSaveToLocalStorage}
            className="w-full flex items-center justify-center gap-2 bg-brand-grad text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-brand cursor-pointer active:scale-95"
          >
            {savedSuccess ? (
              <>
                <Check size={16} />
                <span>¡Guardado Permanentemente en este Navegador!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Guardar Configuración en el Navegador</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetToDefault}
            className="w-full flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-500 hover:text-slate-300 transition py-1 cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Restablecer valores originales de Costa Rica</span>
          </button>
        </div>
      </div>
    </div>
  );
};
