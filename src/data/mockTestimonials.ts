import { Testimonial } from '../types';

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Mariana & Fernando Castro',
    role: 'Compradores en Condominio Lindora',
    propertyPurchased: 'Casa Contemporánea con Jardín en Santa Ana',
    rating: 5,
    comment: 'La asesoría de Carlos fue excepcional. Nos ayudó con todo el estudio registral, la negociación del precio y la coordinación del crédito bancario en Costa Rica. Total transparencia y profesionalismo.',
    date: 'Hace 3 semanas',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    author: 'Dr. Roberto Jiménez',
    role: 'Propietario / Vendedor',
    propertyPurchased: 'Ático en Jaboncillos de Escazú',
    rating: 5,
    comment: 'Lograron vender mi ático en menos de 45 días por el monto pactado en dólares. El reportaje fotográfico y el filtro de clientes calificados marcaron una diferencia enorme frente a otras agencias.',
    date: 'Hace 1 mes',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    author: 'Michael & Sarah Davies',
    role: 'Inversionistas Internacionales',
    propertyPurchased: 'Villa con Vista al Océano en Manuel Antonio',
    rating: 5,
    comment: 'Elena made buying our retirement home in Costa Rica completely stress-free. From the legal due diligence to the closing escrow, everything was handled impeccably.',
    date: 'Hace 2 meses',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
];
