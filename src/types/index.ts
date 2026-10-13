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

export interface Property {
  id: string;
  reference: string;
  title: string;
  description: string;
  shortDescription: string;
  operation: OperationType;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  previousPrice?: number; // Para mostrar bajada de precio tachado
  city: string;
  neighborhood: string;
  locationHighlights?: string; // Ej: "A 5 min de la playa y colegios"
  bedrooms: number;
  bathrooms: number;
  areaBuilt: number; // m²
  areaUsable?: number; // m²
  garageSpots: number;
  floor?: string; // Ej: "3ª planta"
  hasElevator: boolean;
  hasPool: boolean;
  hasTerrace: boolean;
  hasGarden: boolean;
  hasAirConditioning: boolean;
  hasHeating: boolean;
  energyRating: EnergyRating;
  yearBuilt: number;
  images: string[];
  featured: boolean;
  createdAt: string;
  agentId: string;
  communityFeesMonthly?: number; // Cuota comunidad
  ibiAnnual?: number;
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
  name: string;
  primary: string;
  primaryDark: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  badgeBg: string;
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
  };
  currencySymbol: string;
  currencyCode: string;
  activeThemeId: string;
}
