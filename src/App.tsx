import React, { useState, useEffect, useMemo } from 'react';
import { Property, SiteConfig, FilterState } from './types';
import { DEFAULT_SITE_CONFIG, THEME_PRESETS } from './config/siteConfig';
import { MOCK_PROPERTIES } from './data/mockProperties';
import { MOCK_AGENTS } from './data/mockAgents';
import { MOCK_TESTIMONIALS } from './data/mockTestimonials';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertyCatalog } from './components/PropertyCatalog';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { MortgageCalculatorSection } from './components/MortgageCalculatorSection';
import { SellPropertySection } from './components/SellPropertySection';
import { AgentTeamSection } from './components/AgentTeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { DemoCustomizerDrawer } from './components/DemoCustomizerDrawer';
import { Footer } from './components/Footer';

import { Sparkles, MessageCircle } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  operation: 'venta',
  propertyType: 'todos',
  city: '',
  neighborhood: '',
  minPrice: 0,
  maxPrice: 2000000,
  minBedrooms: 0,
  minBathrooms: 0,
  hasGarage: false,
  hasPool: false,
  hasTerrace: false,
  hasElevator: false,
  onlyExclusives: false,
  onlyDiscounted: false,
  searchQuery: '',
};

export default function App() {
  // Configuración de Marca (Cargada desde localStorage si existe)
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('inmo_custom_config');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
  });

  // Filtros activos
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Favoritos (IDs guardados en localStorage)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('inmo_favorites');
    return saved ? JSON.parse(saved) : ['prop-1', 'prop-3']; // 2 de muestra
  });

  // Modales y Drawers
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Aplicar colores del tema al CSS raíz en tiempo real
  const applyThemeColors = (themeId: string) => {
    const theme = THEME_PRESETS[themeId] || THEME_PRESETS['luxury-gold'];
    document.documentElement.style.setProperty('--brand-primary', theme.primary);
    document.documentElement.style.setProperty('--brand-accent', theme.accent);
    document.documentElement.style.setProperty('--brand-accent-hover', theme.accentHover);
    document.documentElement.style.setProperty('--brand-accent-light', theme.accentLight);
  };

  useEffect(() => {
    applyThemeColors(config.activeThemeId);
  }, [config.activeThemeId]);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('inmo_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle de favorito
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  // Filtrado reactivo de propiedades
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      // 1. Operación (Venta / Alquiler)
      if (prop.operation !== filters.operation) return false;

      // 2. Tipo de inmueble
      if (filters.propertyType !== 'todos' && prop.type !== filters.propertyType) return false;

      // 3. Rango de precio
      if (prop.price > filters.maxPrice) return false;
      if (filters.minPrice > 0 && prop.price < filters.minPrice) return false;

      // 4. Habitaciones
      if (filters.minBedrooms > 0 && prop.bedrooms < filters.minBedrooms) return false;

      // 5. Filtros avanzados
      if (filters.hasPool && !prop.hasPool) return false;
      if (filters.hasGarage && prop.garageSpots < 1) return false;
      if (filters.hasTerrace && !prop.hasTerrace) return false;
      if (filters.hasElevator && !prop.hasElevator) return false;
      if (filters.onlyExclusives && prop.status !== 'exclusiva') return false;
      if (filters.onlyDiscounted && prop.status !== 'rebajado') return false;

      // 6. Texto libre de búsqueda (título, barrio, ciudad, referencia)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matches =
          prop.title.toLowerCase().includes(query) ||
          prop.neighborhood.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.reference.toLowerCase().includes(query) ||
          prop.description.toLowerCase().includes(query);
        if (!matches) return false;
      }

      return true;
    });
  }, [filters]);

  // Desplazamiento suave a secciones
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Propiedades favoritas completas
  const favoriteProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => favorites.includes(p.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 1. BARRA DE NAVEGACIÓN SUPERIOR */}
      <Navbar
        config={config}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenDemoCustomizer={() => setIsCustomizerOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. HERO PRINCIPAL CON BUSCADOR INTELIGENTE */}
      <main className="flex-1">
        <HeroSection
          config={config}
          filters={filters}
          setFilters={setFilters}
          onSearch={() => handleScrollToSection('catalogo')}
          resultsCount={filteredProperties.length}
        />

        {/* 3. CATÁLOGO DE INMUEBLES */}
        <PropertyCatalog
          properties={filteredProperties}
          config={config}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetails={(prop) => setSelectedProperty(prop)}
          filters={filters}
          onResetFilters={() => setFilters(INITIAL_FILTERS)}
        />

        {/* 4. CALCULADORA DE HIPOTECA INTERACTIVA */}
        <MortgageCalculatorSection config={config} />

        {/* 5. SECCIÓN PARA PROPIETARIOS ("VENDER O ALQUILAR CON NOSOTROS") */}
        <SellPropertySection config={config} />

        {/* 6. EQUIPO DE ASESORES INMOBILIARIOS */}
        <AgentTeamSection agents={MOCK_AGENTS} config={config} />

        {/* 7. OPINIONES Y TESTIMONIOS */}
        <TestimonialsSection testimonials={MOCK_TESTIMONIALS} />
      </main>

      {/* 8. PIE DE PÁGINA */}
      <Footer config={config} onScrollToSection={handleScrollToSection} />

      {/* MODAL DETALLES DE PROPIEDAD */}
      <PropertyDetailModal
        property={selectedProperty}
        config={config}
        agent={MOCK_AGENTS.find((a) => a.id === selectedProperty?.agentId) || MOCK_AGENTS[0]}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedProperty(null)}
      />

      {/* DRAWER LATERAL DE FAVORITOS */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        config={config}
        onRemoveFavorite={handleToggleFavorite}
        onClearAll={handleClearFavorites}
        onOpenDetails={(prop) => setSelectedProperty(prop)}
      />

      {/* DRAWER DE PERSONALIZACIÓN DE MARCA (MODO DEMO PARA REUNIÓN) */}
      <DemoCustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        setConfig={setConfig}
        onApplyTheme={applyThemeColors}
      />

      {/* BOTÓN FLOTANTE DISCRETO PARA REUNIÓN CON CLIENTE (Esquina inferior izquierda) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:text-white px-3.5 py-2.5 rounded-full text-xs font-black shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer"
          title="Abrir Personalizador de Marca en Vivo"
        >
          <Sparkles size={14} className="text-amber-400" />
          <span className="hidden sm:inline">Modo Demo / Ajustar Marca</span>
        </button>
      </div>

      {/* BOTÓN FLOTANTE DE WHATSAPP (Esquina inferior derecha) */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${config.brandName}, estoy navegando por su web y me gustaría hacer una consulta.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition"
          title="Hablar por WhatsApp con un Asesor"
        >
          <MessageCircle size={26} className="fill-slate-950 stroke-[1.5]" />
        </a>
      </div>
    </div>
  );
}
