import { SiteConfig, ThemeColors } from '../types';

export const THEME_PRESETS: Record<string, ThemeColors> = {
  'luxury-gold': {
    name: 'Luxury Gold & Slate',
    primary: '#090d16',
    primaryDark: '#030712',
    accent: '#d97706', // amber-600
    accentHover: '#b45309', // amber-700
    accentLight: 'rgba(217, 119, 6, 0.15)',
    badgeBg: '#fef3c7',
  },
  'modern-emerald': {
    name: 'Modern Emerald & Jade',
    primary: '#061a14',
    primaryDark: '#020d0a',
    accent: '#10b981', // emerald-500
    accentHover: '#059669', // emerald-600
    accentLight: 'rgba(16, 185, 129, 0.15)',
    badgeBg: '#d1fae5',
  },
  'mediterranean': {
    name: 'Terracotta & Arena',
    primary: '#1c130e',
    primaryDark: '#0e0907',
    accent: '#ea580c', // orange-600 / terracotta
    accentHover: '#c2410c', // orange-700
    accentLight: 'rgba(234, 88, 12, 0.15)',
    badgeBg: '#ffedd5',
  },
  'corporate-blue': {
    name: 'Sapphire & Navy',
    primary: '#0a1426',
    primaryDark: '#040914',
    accent: '#2563eb', // blue-600
    accentHover: '#1d4ed8', // blue-700
    accentLight: 'rgba(37, 99, 235, 0.15)',
    badgeBg: '#dbeafe',
  },
};

/**
 * CONFIGURACIÓN CENTRALIZADA DE LA INMOBILIARIA (Marca Blanca)
 * Modifica estos valores para personalizar toda la web en segundos.
 */
export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'InmoElite Properties',
  slogan: 'Inmuebles Exclusivos & Asesoramiento de Confianza',
  subSlogan: 'Encuentra tu próximo hogar o vende con las mejores garantías legales y difusión premium del mercado.',
  logoIcon: 'Building2',
  contact: {
    phone: '+34 912 345 678',
    whatsapp: '+34 600 123 456',
    email: 'contacto@inmoeliteproperties.com',
    address: 'Paseo de la Castellana 120, Planta 4, Madrid',
    openingHours: 'Lunes a Viernes de 9:30 a 19:30 • Sábados de 10:00 a 14:00',
  },
  currencySymbol: '€',
  currencyCode: 'EUR',
  activeThemeId: 'luxury-gold',
};

// Formateador de moneda dinámico
export function formatCurrency(amount: number, symbol: string = '€'): string {
  return `${amount.toLocaleString('es-ES')} ${symbol}`;
}

// Generador de enlace de WhatsApp con mensaje personalizado
export function getWhatsAppInquiryUrl(
  whatsappNumber: string,
  propertyRef: string,
  propertyTitle: string,
  price: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hola, me interesa recibir más información y coordinar una visita para la propiedad Ref: ${propertyRef} ("${propertyTitle}" - ${price}) que vi en su página web.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// Generador de WhatsApp para valoración de inmuebles (Captación de propietarios)
export function getWhatsAppValuationUrl(
  whatsappNumber: string,
  address: string,
  propertyType: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hola, me gustaría solicitar una valoración gratuita para vender mi ${propertyType} ubicado en ${address || 'mi zona'}. ¿Podrían orientarme?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
