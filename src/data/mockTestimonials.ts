import { Testimonial } from '../types';

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Mariana & Fernando Ruiz',
    role: 'Compradores de Vivienda Familiar',
    propertyPurchased: 'Chalet Independiente con Jardín en Mirasierra',
    rating: 5,
    comment: 'La atención de Carlos fue impecable desde el primer minuto. Nos ahorraron semanas de trámites y consiguieron que la firma ante notario fuera un proceso completamente transparente y sin sorpresas.',
    date: 'Hace 3 semanas',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    author: 'Dr. Roberto Valenzuela',
    role: 'Vendedor (Propietario)',
    propertyPurchased: 'Ático Dúplex en Barrio de Salamanca',
    rating: 5,
    comment: 'Vendieron mi ático en menos de 35 días por el precio que habíamos pactado. La fotografía profesional y el filtro que hicieron con los compradores potenciales marcaron una diferencia enorme frente a otras agencias.',
    date: 'Hace 1 mes',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    author: 'Sophie Laurent',
    role: 'Inversora Internacional',
    propertyPurchased: 'Apartamento de Diseño Reformado en Chamberí',
    rating: 5,
    comment: 'Elena entendió a la perfección lo que buscaba para alquiler de media estancia. Me facilitaron toda la gestión documental y la rentabilidad obtenida superó las previsiones iniciales.',
    date: 'Hace 2 meses',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
];
