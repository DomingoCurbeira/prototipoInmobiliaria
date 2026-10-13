import { SiteConfig, ThemeColors, CurrencyMode } from '../types';

export const THEME_PRESETS: Record<string, ThemeColors> = {
  'luxury-gold': {
    id: 'luxury-gold',
    name: 'Oro & Pizarra (Luxury Gold)',
    accent: '#d97706',
    accentHover: '#b45309',
    accentLight: '#fbbf24',
    badgeBg: '#fef3c7',
    description: 'Elegancia clásica, tonos dorados y ámbar de lujo.',
  },
  'modern-emerald': {
    id: 'modern-emerald',
    name: 'Esmeralda & Naturaleza (Costa Rica)',
    accent: '#059669',
    accentHover: '#047857',
    accentLight: '#34d399',
    badgeBg: '#d1fae5',
    description: 'Verde esmeralda y jade, ideal para arquitectura tropical moderna.',
  },
  'mediterranean': {
    id: 'mediterranean',
    name: 'Terracota & Sol del Pacífico',
    accent: '#ea580c',
    accentHover: '#c2410c',
    accentLight: '#fb923c',
    badgeBg: '#ffedd5',
    description: 'Tonos cálidos de atardecer, arena y madera noble.',
  },
  'corporate-blue': {
    id: 'corporate-blue',
    name: 'Zafiro & Corporativo (Navy)',
    accent: '#2563eb',
    accentHover: '#1d4ed8',
    accentLight: '#60a5fa',
    badgeBg: '#dbeafe',
    description: 'Azul sobrio y profesional para firmas inmobiliarias corporativas.',
  },
};

/**
 * CONFIGURACIÓN CENTRALIZADA PARA COSTA RICA (Marca Blanca)
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'Costa Rica Luxury Properties',
  slogan: 'Bienes Raíces de Alta Gama en Escazú, Santa Ana y Costa Pacífica',
  subSlogan: 'Casas en condominio, áticos y villas exclusivas en las mejores zonas de Costa Rica con asesoría bilingüe.',
  logoIcon: 'Building2',
  contact: {
    phone: '+506 2289-4500',
    whatsapp: '+506 8800-1234',
    email: 'info@crluxuryproperties.com',
    address: 'Plaza Tempo, Torre 2, Nivel 4, Escazú, San José, Costa Rica',
    openingHours: 'Lunes a Viernes: 8:30 am - 6:00 pm • Sábados: Con cita previa',
    sinpeMovil: '+506 8800-1234',
  },
  currencyMode: 'USD',
  exchangeRate: 520, // ₡520 CRC por $1 USD
  activeThemeId: 'luxury-gold',
};

/**
 * Formateador bimoneda (Dólares USD y Colones costarricenses CRC)
 */
export function formatDualPrice(
  priceUSD: number,
  currencyMode: CurrencyMode,
  exchangeRate: number = 520,
  isMonthly: boolean = false
): { primary: string; secondary: string; perM2: string } {
  const priceCRC = Math.round(priceUSD * exchangeRate);
  const suffix = isMonthly ? '/mes' : '';

  if (currencyMode === 'USD') {
    return {
      primary: `$${priceUSD.toLocaleString('en-US')}${suffix} USD`,
      secondary: `≈ ₡${priceCRC.toLocaleString('es-CR')}${suffix} CRC`,
      perM2: `$${Math.round(priceUSD / 100).toLocaleString('en-US')}/m²`,
    };
  } else {
    return {
      primary: `₡${priceCRC.toLocaleString('es-CR')}${suffix} CRC`,
      secondary: `≈ $${priceUSD.toLocaleString('en-US')}${suffix} USD`,
      perM2: `₡${Math.round(priceCRC / 100).toLocaleString('es-CR')}/m²`,
    };
  }
}

// Generador de enlace de WhatsApp con mensaje personalizado
export function getWhatsAppInquiryUrl(
  whatsappNumber: string,
  propertyRef: string,
  propertyTitle: string,
  priceText: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hola, me interesa recibir más información sobre la propiedad Ref: ${propertyRef} ("${propertyTitle}" - ${priceText}) que vi en su página web. ¿Podríamos coordinar una visita?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// Generador de WhatsApp para valoración de inmuebles (Captación en Costa Rica)
export function getWhatsAppValuationUrl(
  whatsappNumber: string,
  address: string,
  propertyType: string,
  intent: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hola, me gustaría solicitar una valoración de mercado gratuita para ${intent} mi ${propertyType} ubicado en ${address || 'Costa Rica'}. ¿Podrían brindarme asesoría?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
