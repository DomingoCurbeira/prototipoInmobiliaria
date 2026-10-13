export type OperationType = 'venta' | 'alquiler';

export type PropertyType =
  | 'piso'
  | 'casa'
  | 'atico'
  | 'villa'
  | 'duplex'
  | 'local'
  | 'terreno';

export type PropertyStatus =
  | 'disponible'
  | 'exclusiva'
  | 'rebajado'
  | 'nuevo'
  | 'reservado';

export type EnergyRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type CurrencyMode = 'USD' | 'CRC';

export interface Property {
  id: string;
  reference: string;
  title: string;
  description: string;
  shortDescription: string;
  operation: OperationType;
  type: PropertyType;
  status: PropertyStatus;
  priceUSD: number; // Precio base en Dólares USD
  previousPriceUSD?: number; // Para mostrar bajada de precio tachado
  province: string; // San José, Alajuela, Heredia, Puntarenas, Guanacaste
  city: string; // Escazú, Santa Ana, Quepos, etc.
  neighborhood: string; // Jaboncillos, Lindora, Manuel Antonio, etc.
  locationHighlights?: string; // Ej: "A 5 min de Multiplaza y colegios privados"
  bedrooms: number;
  bathrooms: number;
  areaBuilt: number; // m²
  areaLot?: number; // m² de terreno/parcela
  garageSpots: number;
  floor?: string; // Ej: "Torre piso 6"
  hasElevator: boolean;
  hasPool: boolean;
  hasTerrace: boolean;
  hasGarden: boolean;
  hasAirConditioning: boolean;
  hasSecurity24: boolean;
  energyRating: EnergyRating;
  yearBuilt: number;
  images: string[];
  featured: boolean;
  createdAt: string;
  agentId: string;
  hoaMonthlyUSD?: number; // Cuota condominal mensual en USD
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  photoUrl: string;
  bio: string;
  languages: string[];
  salesCount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  propertyPurchased: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl: string;
}

export interface FilterState {
  operation: OperationType;
  propertyType: PropertyType | 'todos';
  city: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  minBathrooms: number;
  hasGarage: boolean;
  hasPool: boolean;
  hasTerrace: boolean;
  hasElevator: boolean;
  onlyExclusives: boolean;
  onlyDiscounted: boolean;
  searchQuery: string;
}

export interface ThemeColors {
  id: string;
  name: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  badgeBg: string;
  description: string;
}

export interface SiteConfig {
  brandName: string;
  slogan: string;
  subSlogan: string;
  logoIcon: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    openingHours: string;
    sinpeMovil: string;
  };
  currencyMode: CurrencyMode; // 'USD' ($) o 'CRC' (₡)
  exchangeRate: number; // Tipo de cambio (ej. ₡520 por $1 USD)
  activeThemeId: string;
}
