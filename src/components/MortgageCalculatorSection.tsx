import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { Calculator, MessageCircle } from 'lucide-react';

interface MortgageCalculatorSectionProps {
  config: SiteConfig;
}

export const MortgageCalculatorSection: React.FC<MortgageCalculatorSectionProps> = ({ config }) => {
  const isUSD = config.currencyMode === 'USD';

  // Valores base en USD
  const [propertyPriceUSD, setPropertyPriceUSD] = useState<number>(380000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(7.2); // Tasa típica en USD Costa Rica (7%-8%)

  // Cálculos matemáticos en USD
  const downPaymentAmountUSD = Math.round(propertyPriceUSD * (downPaymentPercent / 100));
  const loanAmountUSD = propertyPriceUSD - downPaymentAmountUSD;
  const estimatedExpensesUSD = Math.round(propertyPriceUSD * 0.04); // Traspaso y gastos notariales en CR (~3.5% - 4%)

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  const monthlyPaymentUSD = Math.round(
    monthlyRate === 0
      ? loanAmountUSD / totalMonths
      : (loanAmountUSD * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalCostUSD = monthlyPaymentUSD * totalMonths;
  const totalInterestUSD = Math.max(0, totalCostUSD - loanAmountUSD);

  // Equivalentes en Colones (CRC)
  const monthlyPaymentCRC = Math.round(monthlyPaymentUSD * config.exchangeRate);
  const propertyPriceCRC = Math.round(propertyPriceUSD * config.exchangeRate);
  const loanAmountCRC = Math.round(loanAmountUSD * config.exchangeRate);
  const downPaymentAmountCRC = Math.round(downPaymentAmountUSD * config.exchangeRate);

  const whatsappMessage = `Hola ${config.brandName}, he estado utilizando el simulador de hipoteca en su web para una propiedad en Costa Rica de $${propertyPriceUSD.toLocaleString('en-US')} USD (≈ ₡${propertyPriceCRC.toLocaleString('es-CR')} CRC). Me gustaría recibir asesoría para precalificación bancaria con sus entidades financieras aliadas (BAC, BN, BCR).`;
  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="hipoteca" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow de acento decorativo dinámico */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light rounded-full blur-3xl pointer-events-none opacity-40" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* COLUMNA IZQUIERDA: CONTROLES INTERACTIVOS */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand mb-2">
                <Calculator size={15} />
                <span>Simulador de Crédito en Costa Rica</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury tracking-tight">
                Calcula tu Cuota Mensual Hipotecaria
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Estimación bimoneda para financiamiento bancario con entidades como BAC Credomatic, Banco Nacional y Banco de Costa Rica (BCR).
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* 1. Precio del Inmueble */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Valor de la Propiedad</span>
                  <div className="text-right">
                    <span className="text-brand font-mono text-base font-black block">
                      ${propertyPriceUSD.toLocaleString('en-US')} USD
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      ≈ ₡{propertyPriceCRC.toLocaleString('es-CR')} CRC
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={10000}
                  value={propertyPriceUSD}
                  onChange={(e) => setPropertyPriceUSD(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>$100.000 USD</span>
                  <span>$2.000.000 USD</span>
                </div>
              </div>

              {/* 2. Prima / Entrada (%) */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Prima / Ahorro Aportado ({downPaymentPercent}%)</span>
                  <div className="text-right">
                    <span className="text-white font-mono text-sm font-black block">
                      ${downPaymentAmountUSD.toLocaleString('en-US')} USD
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      ≈ ₡{downPaymentAmountCRC.toLocaleString('es-CR')} CRC
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-brand cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10% (Prima mínima en CR)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* 3. Plazo en Años e Interés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Plazo del Crédito</span>
                    <span className="text-white font-mono text-sm font-black">{years} años</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={30}
                    step={5}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-brand cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10 años</span>
                    <span>30 años</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Tasa de Interés Anual</span>
                    <span className="text-white font-mono text-sm font-black">{interestRate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={5.0}
                    max={12.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-brand cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>5.0% (USD)</span>
                    <span>12.0% (Colones)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESULTADOS EN DÓLARES & COLONES */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-brand shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                Tu Cuota Mensual Estimada
              </span>
              <div>
                <div className="text-4xl sm:text-5xl font-black text-brand font-serif-luxury tracking-tight">
                  ${monthlyPaymentUSD.toLocaleString('en-US')}{' '}
                  <span className="text-lg font-sans text-slate-400">USD/mes</span>
                </div>
                <div className="text-lg font-mono font-bold text-slate-300 mt-1">
                  ≈ ₡{monthlyPaymentCRC.toLocaleString('es-CR')} CRC/mes
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculada sobre un préstamo de{' '}
                <strong className="text-white font-mono">${loanAmountUSD.toLocaleString('en-US')} USD</strong> (≈ ₡{loanAmountCRC.toLocaleString('es-CR')} CRC) a{' '}
                {years} años con tasa anual del {interestRate.toFixed(1)}%.
              </p>
            </div>

            {/* DESGLOSE */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Monto a Financiar (80%):</span>
                <span className="font-mono font-bold text-white">
                  ${loanAmountUSD.toLocaleString('en-US')} USD
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Intereses Totales Estimados:</span>
                <span className="font-mono font-bold text-brand">
                  ${totalInterestUSD.toLocaleString('en-US')} USD
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gastos de Traspaso / Notaría (~4% en CR):</span>
                <span className="font-mono font-bold text-slate-300">
                  ${estimatedExpensesUSD.toLocaleString('en-US')} USD
                </span>
              </div>
              <div className="flex justify-between text-xs font-black text-white pt-2 border-t border-slate-800">
                <span>Prima + Gastos Legales iniciales:</span>
                <span className="font-mono text-brand text-sm">
                  ${(downPaymentAmountUSD + estimatedExpensesUSD).toLocaleString('en-US')} USD
                </span>
              </div>
            </div>

            {/* BOTÓN ASESORAMIENTO HIPOTECARIO EN COSTA RICA */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-grad text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-brand active:scale-95 transition"
              >
                <MessageCircle size={16} />
                <span>Consultar Precalificación Bancaria</span>
              </a>
              <span className="block text-[10px] text-center text-slate-500 mt-2">
                Simulación referencial sujeta a políticas crediticias de la entidad bancaria.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
