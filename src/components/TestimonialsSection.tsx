import React from 'react';
import { Testimonial } from '../types';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
          <MessageSquareQuote size={14} />
          <span>Opiniones Verificadas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
          La Experiencia de Nuestros Clientes
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Familias, inversores y propietarios que confiaron en nuestra gestión patrimonial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-slate-900/70 p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between space-y-4 shadow-xl relative"
          >
            {/* Estrellas */}
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{test.comment}"
              </p>
            </div>

            {/* Perfil del cliente */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <img
                src={test.avatarUrl}
                alt={test.author}
                className="w-11 h-11 rounded-full object-cover border border-amber-500/30"
              />
              <div>
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>{test.author}</span>
                  <span title="Operación verificada">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                  </span>
                </h4>
                <p className="text-[10px] text-amber-400 font-semibold">{test.role}</p>
                <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{test.propertyPurchased}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
