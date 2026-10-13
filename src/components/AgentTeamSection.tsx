import React from 'react';
import { Agent, SiteConfig } from '../types';
import { Users, Phone, MessageCircle, Mail, Award, Globe } from 'lucide-react';

interface AgentTeamSectionProps {
  agents: Agent[];
  config: SiteConfig;
}

export const AgentTeamSection: React.FC<AgentTeamSectionProps> = ({ agents, config }) => {
  return (
    <section id="equipo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand">
          <Users size={14} />
          <span>Experiencia en Costa Rica & Trato Personal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
          Nuestros Asesores Inmobiliarios
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Especialistas colegiados en bienes raíces residenciales y de lujo en el Gran Área Metropolitana y zonas costeras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              {/* Foto de perfil */}
              <div className="h-64 w-full bg-slate-950 overflow-hidden relative">
                <img
                  src={agent.photoUrl}
                  alt={agent.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-bold text-brand flex items-center gap-1">
                  <Award size={12} />
                  <span>{agent.salesCount} operaciones</span>
                </div>
              </div>

              {/* Información del asesor */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-black text-white font-serif-luxury">
                    {agent.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand mt-0.5">
                    {agent.role}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {agent.bio}
                </p>

                {/* Idiomas */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                  <Globe size={13} className="text-slate-400" />
                  <span>Idiomas: {agent.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Acciones de contacto directo */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2">
              <a
                href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${agent.name}, vi tu perfil en la web de ${config.brandName} y me gustaría recibir asesoría sobre propiedades en Costa Rica.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${agent.phone}`}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition"
                title={`Llamar a ${agent.name}`}
              >
                <Phone size={15} />
              </a>

              <a
                href={`mailto:${agent.email}`}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl border border-slate-800 transition"
                title={`Enviar email a ${agent.name}`}
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
