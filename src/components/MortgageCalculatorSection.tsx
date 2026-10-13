import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { formatCurrency } from '../config/siteConfig';
import { Calculator, Percent, Calendar, DollarSign, ShieldAlert, MessageCircle, ArrowRight } from 'lucide-react';

interface MortgageCalculatorSectionProps {
  config: SiteConfig;
}

export const MortgageCalculatorSection: React.FC<MortgageCalculatorSectionProps> = ({ config }) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [years, setYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(3.2);

  // Cálculos matemáticos
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanAmount = propertyPrice - downPaymentAmount;
  const estimatedExpenses = Math.round(propertyPrice * 0.10); // ~10% gastos ITP/IVA/Notaría

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;

  const monthlyPayment = Math.round(
    monthlyRate === 0
      ? loanAmount / totalMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalCost = monthlyPayment * totalMonths;
  const totalInterest = Math.max(0, totalCost - loanAmount);

  const whatsappMessage = `Hola, he estado utilizando la calculadora de hipoteca en su web para una vivienda de ${formatCurrency(propertyPrice, config.currencySymbol)} (aportando ${downPaymentPercent}% de entrada) y me gustaría recibir asesoramiento financiero gratuito con sus entidades colaboradoras.`;
  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="hipoteca" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow de acento decorativo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* COLUMNA IZQUIERDA: CONTROLES INTERACTIVOS (Sliders) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400 mb-2">
                <Calculator size={15} />
                <span>Simulador Financiero</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury tracking-tight">
                Calcula tu Cuota Mensual Estimada
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Ajusta los valores para conocer la cuota aproximada de tu hipoteca y los gastos iniciales asociados a la compraventa.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* 1. Precio del Inmueble */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Precio de la Vivienda</span>
                  <span className="text-amber-400 font-mono text-base font-black">
                    {formatCurrency(propertyPrice, config.currencySymbol)}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={2000000}
                  step={10000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100.000 {config.currencySymbol}</span>
                  <span>2.000.000 {config.currencySymbol}</span>
                </div>
              </div>

              {/* 2. Entrada / Ahorro Aportado (%) */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Ahorro Aportado / Entrada ({downPaymentPercent}%)</span>
                  <span className="text-white font-mono text-sm font-black">
                    {formatCurrency(downPaymentAmount, config.currencySymbol)}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>10% (Mínimo habitual)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* 3. Plazo en Años e Interés */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Plazo</span>
                    <span className="text-white font-mono text-sm font-black">{years} años</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={35}
                    step={5}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10 años</span>
                    <span>35 años</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Tipo de Interés Fijo</span>
                    <span className="text-white font-mono text-sm font-black">{interestRate.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={1.5}
                    max={6.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1.5%</span>
                    <span>6.0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESULTADOS VISUALES */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                Tu Cuota Mensual Estimada
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-serif-luxury tracking-tight">
                {monthlyPayment.toLocaleString('es-ES')}{' '}
                <span className="text-lg font-sans text-slate-400">{config.currencySymbol}/mes</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculada sobre un préstamo de{' '}
                <strong className="text-white font-mono">{formatCurrency(loanAmount, config.currencySymbol)}</strong> a{' '}
                {years} años con tasa del {interestRate.toFixed(1)}%.
              </p>
            </div>

            {/* DESGLOSE EN BARRAS */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Capital del Préstamo (80%):</span>
                <span className="font-mono font-bold text-white">
                  {formatCurrency(loanAmount, config.currencySymbol)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Intereses Totales Estimados:</span>
                <span className="font-mono font-bold text-amber-300">
                  {formatCurrency(totalInterest, config.currencySymbol)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gastos aprox. Compraventa (~10%):</span>
                <span className="font-mono font-bold text-slate-300">
                  {formatCurrency(estimatedExpenses, config.currencySymbol)}
                </span>
              </div>
              <div className="flex justify-between text-xs font-black text-white pt-2 border-t border-slate-800">
                <span>Ahorro inicial necesario (Entrada + Gastos):</span>
                <span className="font-mono text-amber-400 text-sm">
                  {formatCurrency(downPaymentAmount + estimatedExpenses, config.currencySymbol)}
                </span>
              </div>
            </div>

            {/* BOTÓN DE ASESORAMIENTO FINANCIERO */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 active:scale-95 transition"
              >
                <MessageCircle size={16} />
                <span>Consultar Hipoteca con un Asesor</span>
              </a>
              <span className="block text-[10px] text-center text-slate-400 mt-2">
                Simulación orientativa sin valor contractual vinculante.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
